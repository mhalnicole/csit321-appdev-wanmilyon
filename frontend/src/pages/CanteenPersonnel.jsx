import { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../css/CanteenPersonnel.css';

export default function CanteenPersonnel() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const isAuthorized = currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'STAFF');

    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchOrders = () => {
        setLoading(true);
        fetch('http://localhost:8080/orders')
            .then(res => res.json())
            .then(data => {
                const mappedOrders = data.map(o => ({
                    id: '#' + o.id,
                    backendId: o.id,
                    date: o.createdAt ? new Date(o.createdAt).toLocaleString() : new Date().toLocaleString(),
                    itemName: o.itemName,
                    price: o.price,
                    status: o.status || 'PENDING',
                    specialInstructions: o.specialInstructions || '',
                    user: o.user ? (o.user.fullName || o.user.studentId) : 'Customer'
                }));

                // Sync with local storage demo pending orders
                const localPending = JSON.parse(sessionStorage.getItem('pending_orders') || '[]');
                const combined = [...mappedOrders];

                localPending.forEach(local => {
                    if (!combined.some(b => b.backendId === local.backendId || b.id === local.id)) {
                        combined.push({
                            id: local.id,
                            backendId: local.backendId || parseInt(local.id.replace('#', ''), 10) || null,
                            date: local.date || new Date().toLocaleString(),
                            itemName: local.items ? local.items.map(i => i.food.name).join(', ') : 'Canteen Order',
                            price: local.total || 0,
                            status: local.status === 'Paid & Preparing' ? 'PREPARING' : (local.status || 'PENDING'),
                            specialInstructions: local.items ? local.items.map(i => i.comment).filter(Boolean).join('; ') : '',
                            user: 'Student Customer'
                        });
                    }
                });

                setOrders(combined);
                setLoading(false);
            })
            .catch(err => {
                console.warn('Backend fetch failed, loading local orders:', err);
                const localPending = JSON.parse(sessionStorage.getItem('pending_orders') || '[]');
                const mappedLocal = localPending.map(l => ({
                    id: l.id,
                    backendId: l.backendId || null,
                    date: l.date || new Date().toLocaleString(),
                    itemName: l.items ? l.items.map(i => i.food.name).join(', ') : 'Canteen Order',
                    price: l.total || 0,
                    status: l.status === 'Paid & Preparing' ? 'PREPARING' : (l.status || 'PENDING'),
                    specialInstructions: l.items ? l.items.map(i => i.comment).filter(Boolean).join('; ') : '',
                    user: 'Student Customer'
                }));
                setOrders(mappedLocal);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000); // Auto refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const updateStatus = (order, newStatus) => {
        const rawId = order.backendId || parseInt(order.id.replace('#', ''), 10);
        
        if (rawId) {
            fetch(`http://localhost:8080/orders/${rawId}/status?status=${encodeURIComponent(newStatus)}`, {
                method: 'PUT'
            }).catch(err => console.warn('Status update API error:', err));
        }

        // Update state
        const updated = orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o);
        setOrders(updated);

        // Update local storage sync
        const pending = JSON.parse(sessionStorage.getItem('pending_orders') || '[]');
        const updatedLocal = pending.map(p => {
            if (p.id === order.id || p.backendId === rawId) {
                return { ...p, status: newStatus };
            }
            return p;
        });
        sessionStorage.setItem('pending_orders', JSON.stringify(updatedLocal));
    };

    const cancelOrder = (order) => {
        const reason = window.prompt("Reason for cancelling order (e.g. Item out of stock):", "Item out of stock");
        if (reason === null) return; // User cancelled prompt

        const statusString = reason ? `CANCELLED: ${reason}` : 'CANCELLED';
        updateStatus(order, statusString);
    };

    const getStatusCategory = (statusStr) => {
        const s = (statusStr || '').toUpperCase();
        if (s.includes('PREPARING') || s.includes('PAID')) return 'PREPARING';
        if (s.includes('READY')) return 'READY_FOR_CLAIMING';
        if (s.includes('COMPLETED')) return 'COMPLETED';
        if (s.includes('CANCEL')) return 'CANCELLED';
        return 'PENDING';
    };

    const filteredOrders = orders.filter(o => {
        const category = getStatusCategory(o.status);
        if (activeTab !== 'ALL' && category !== activeTab) return false;
        
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                o.id.toLowerCase().includes(term) ||
                o.itemName.toLowerCase().includes(term) ||
                o.user.toLowerCase().includes(term)
            );
        }
        return true;
    });

    const getTabCount = (cat) => {
        if (cat === 'ALL') return orders.length;
        return orders.filter(o => getStatusCategory(o.status) === cat).length;
    };

    if (!isAuthorized) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                maxWidth: '500px',
                margin: '40px auto',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                border: '1px solid #eaeaea'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
                <h2 style={{ fontSize: '24px', color: '#d32f2f', margin: '0 0 12px 0', fontWeight: '800' }}>Access Restricted</h2>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
                    The Kitchen & Counter Portal is restricted exclusively to authorized Canteen Personnel.
                </p>
                <button 
                    onClick={() => navigate('/menu')}
                    style={{
                        backgroundColor: '#ff7e29',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer'
                    }}
                >
                    Return to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="canteen-personnel-container">
            <div className="canteen-header">
                <div className="canteen-title-section">
                    <h1 className="canteen-title">Canteen Kitchen & Counter Portal</h1>
                    <span className="canteen-badge">Staff Admin</span>
                </div>
                <button className="refresh-btn" onClick={fetchOrders}>
                    🔄 Refresh Orders
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="canteen-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ALL')}
                >
                    All Orders <span className="tab-count">{getTabCount('ALL')}</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'PENDING' ? 'active' : ''}`}
                    onClick={() => setActiveTab('PENDING')}
                >
                    Pending Orders <span className="tab-count">{getTabCount('PENDING')}</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'PREPARING' ? 'active' : ''}`}
                    onClick={() => setActiveTab('PREPARING')}
                >
                    Preparing 🍳 <span className="tab-count">{getTabCount('PREPARING')}</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'READY_FOR_CLAIMING' ? 'active' : ''}`}
                    onClick={() => setActiveTab('READY_FOR_CLAIMING')}
                >
                    Ready for Pickup 🔔 <span className="tab-count">{getTabCount('READY_FOR_CLAIMING')}</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'COMPLETED' ? 'active' : ''}`}
                    onClick={() => setActiveTab('COMPLETED')}
                >
                    Completed ✅ <span className="tab-count">{getTabCount('COMPLETED')}</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'CANCELLED' ? 'active' : ''}`}
                    onClick={() => setActiveTab('CANCELLED')}
                >
                    Cancelled ❌ <span className="tab-count">{getTabCount('CANCELLED')}</span>
                </button>
            </div>

            {/* Search Filter */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Order #, Food Item, or Customer Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1.5px solid #e0e0e0',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Content List */}
            {loading ? (
                <div className="empty-state-box">Loading orders from backend...</div>
            ) : filteredOrders.length === 0 ? (
                <div className="empty-state-box">
                    <h3>No orders found</h3>
                    <p>There are currently no orders in this category.</p>
                </div>
            ) : (
                <div className="canteen-orders-grid">
                    {filteredOrders.map(order => {
                        const category = getStatusCategory(order.status);
                        return (
                            <div key={order.id} className="canteen-card">
                                <div className="canteen-card-header">
                                    <div>
                                        <div className="order-id-txt">{order.id}</div>
                                        <div className="order-time-txt">{order.date}</div>
                                    </div>
                                    <span className={`status-badge ${category.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="customer-info-box">
                                    Customer: <strong>{order.user}</strong>
                                </div>

                                <div className="canteen-items-list">
                                    <div className="canteen-item-row">
                                        <span>{order.itemName}</span>
                                        <span>₱{order.price.toFixed(2)}</span>
                                    </div>
                                </div>

                                {order.specialInstructions && (
                                    <div className="canteen-notes-box">
                                        <strong>Notes:</strong> {order.specialInstructions}
                                    </div>
                                )}

                                <div className="canteen-card-footer">
                                    <div className="canteen-total-row">
                                        <span>Total:</span>
                                        <span style={{ color: '#e64a00' }}>₱{order.price.toFixed(2)}</span>
                                    </div>

                                    {/* Action buttons based on status */}
                                    <div className="canteen-action-btns">
                                        {category === 'PENDING' && (
                                            <>
                                                <button 
                                                    className="btn-action btn-prepare"
                                                    onClick={() => updateStatus(order, 'PREPARING')}
                                                >
                                                    Accept & Prepare 🍳
                                                </button>
                                                <button 
                                                    className="btn-action btn-cancel"
                                                    onClick={() => cancelOrder(order)}
                                                >
                                                    Cancel (Out of Stock) ❌
                                                </button>
                                            </>
                                        )}

                                        {category === 'PREPARING' && (
                                            <>
                                                <button 
                                                    className="btn-action btn-ready"
                                                    onClick={() => updateStatus(order, 'READY_FOR_CLAIMING')}
                                                >
                                                    Tag Ready for Claiming 🔔
                                                </button>
                                                <button 
                                                    className="btn-action btn-cancel"
                                                    onClick={() => cancelOrder(order)}
                                                >
                                                    Cancel ❌
                                                </button>
                                            </>
                                        )}

                                        {category === 'READY_FOR_CLAIMING' && (
                                            <button 
                                                className="btn-action btn-complete"
                                                onClick={() => updateStatus(order, 'COMPLETED')}
                                            >
                                                Mark as Claimed ✅
                                            </button>
                                        )}

                                        {category === 'COMPLETED' && (
                                            <span style={{ fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
                                                Order Completed & Handed Over
                                            </span>
                                        )}

                                        {category === 'CANCELLED' && (
                                            <span style={{ fontSize: '13px', color: '#c62828', fontWeight: 'bold' }}>
                                                Order Cancelled
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
