import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PendingOrders.css';
import { getCurrentUser } from '../utils/auth';

export default function PendingOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const currentUser = getCurrentUser();
        const userId = currentUser ? currentUser.id : 1;
        fetch(`http://localhost:8080/orders/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                const activeBackendOrders = data
                    .filter(o => o.status !== 'COMPLETED' && o.status !== 'Completed')
                    .map(o => ({
                        id: '#' + o.id,
                        backendId: o.id,
                        date: o.createdAt ? new Date(o.createdAt).toLocaleString() : new Date().toLocaleString(),
                        items: [{ food: { name: o.itemName, price: o.price }, quantity: 1, allergens: [] }],
                        total: o.price,
                        paymentMethod: 'Cash at Counter',
                        status: o.status === 'PENDING' ? 'Pending Payment' : o.status
                    }));

                // Get local storage pending orders and sync with backend
                const localPending = JSON.parse(sessionStorage.getItem('pending_orders') || '[]')
                    .filter(o => o.status !== 'COMPLETED' && o.status !== 'Completed');

                const cleanedLocal = [];
                localPending.forEach(local => {
                    const matchInBackend = data.find(b => b.id === local.backendId || '#' + b.id === local.id);
                    if (matchInBackend && (matchInBackend.status === 'COMPLETED' || matchInBackend.status === 'Completed')) {
                        return; // Skip completed backend order
                    }
                    cleanedLocal.push(local);
                });

                // Update clean local storage
                sessionStorage.setItem('pending_orders', JSON.stringify(cleanedLocal));

                const combined = [...activeBackendOrders];
                cleanedLocal.forEach(local => {
                    if (!combined.some(b => b.backendId === local.backendId || b.id === local.id)) {
                        combined.push(local);
                    }
                });

                setOrders(combined);
            })
            .catch(err => {
                const pending = JSON.parse(sessionStorage.getItem('pending_orders') || '[]')
                    .filter(o => o.status !== 'COMPLETED' && o.status !== 'Completed');
                setOrders(pending);
            });
    }, []);

    const simulatePayment = (orderId) => {
        const targetOrder = orders.find(order => order.id === orderId);

        if (targetOrder) {
            const rawId = targetOrder.backendId || parseInt(targetOrder.id.replace('#', ''), 10);
            
            // Update backend order status to PAID
            fetch(`http://localhost:8080/orders/${rawId}/status?status=PAID`, {
                method: 'PUT'
            }).catch(err => console.warn("Backend order status update failed:", err));

            // Trigger backend Payment API
            const paymentPayload = {
                orderId: rawId,
                amount: targetOrder.total,
                paymentMethod: 'OTC_CASH'
            };

            fetch('http://localhost:8080/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentPayload)
            }).catch(err => console.warn("Payment API failed:", err));

            // Update state
            const updatedOrders = orders.map(o => 
                o.id === orderId ? { ...o, status: 'Paid & Preparing' } : o
            );
            setOrders(updatedOrders);

            // Update local storage
            const pending = JSON.parse(sessionStorage.getItem('pending_orders') || '[]');
            const updatedLocal = pending.map(o => (o.id === orderId || o.backendId === rawId) ? { ...o, status: 'Paid & Preparing' } : o);
            sessionStorage.setItem('pending_orders', JSON.stringify(updatedLocal));
        }
    };

    const completeOrder = (orderId) => {
        const targetOrder = orders.find(order => order.id === orderId);

        if (targetOrder) {
            const rawId = targetOrder.backendId || parseInt(targetOrder.id.replace('#', ''), 10);

            // Trigger backend Order Status update to COMPLETED
            fetch(`http://localhost:8080/orders/${rawId}/status?status=COMPLETED`, {
                method: 'PUT'
            }).catch(err => console.warn("Backend complete status update failed:", err));

            // Move to order_history in local storage
            const history = JSON.parse(sessionStorage.getItem('order_history') || '[]');
            const historyOrder = { ...targetOrder, status: 'COMPLETED', completedDate: new Date().toLocaleDateString() };
            history.unshift(historyOrder);
            sessionStorage.setItem('order_history', JSON.stringify(history));

            // Remove from active pending orders state
            const updatedOrders = orders.filter(o => o.id !== orderId);
            setOrders(updatedOrders);

            // Remove from local storage
            const pending = JSON.parse(sessionStorage.getItem('pending_orders') || '[]');
            const updatedLocal = pending.filter(o => o.id !== orderId && o.backendId !== rawId && o.backendId !== targetOrder.backendId);
            sessionStorage.setItem('pending_orders', JSON.stringify(updatedLocal));
        }
    };

    return (
        <div className="pending-orders-container">
            <h1 className="pending-title">Active & Pending Orders</h1>

            {orders.length === 0 ? (
                <div className="pending-empty-state">
                    <p>No active orders at the moment. Hungry?</p>
                    <button className="pending-order-btn" onClick={() => navigate('/menu')}>
                        Order Now
                    </button>
                </div>
            ) : (
                <div className="pending-list">
                    {orders.map((order) => (
                        <div key={order.id} className="pending-card">
                            <div className="pending-card-header">
                                <div>
                                    <span className="pending-order-id">{order.id}</span>
                                    <span className="pending-order-date">{order.date}</span>
                                </div>
                                <span className={`pending-status-badge ${
                                    (order.status || '').toLowerCase().includes('ready') ? 'ready' :
                                    (order.status || '').toLowerCase().includes('cancel') ? 'cancelled' :
                                    (order.status || '').toLowerCase().includes('preparing') ? 'preparing' : 'pending'
                                }`}>
                                    {(order.status || '').includes('READY') ? '🔔 Ready for Claiming!' :
                                     (order.status || '').includes('CANCEL') ? `❌ ${order.status}` :
                                     (order.status || '').includes('PREPARING') ? '🍳 Preparing Order' :
                                     order.status}
                                </span>
                            </div>

                            <div className="pending-items-section">
                                {order.items.map((item, index) => (
                                    <div key={index} className="pending-item-row">
                                        <div className="pending-item-left">
                                            <span className="pending-item-qty">{item.quantity}x</span>
                                            <span className="pending-item-name">{item.food.name}</span>
                                            {item.allergens && item.allergens.length > 0 && (
                                                <span className="pending-item-allergens">({item.allergens.join(', ')})</span>
                                            )}
                                        </div>
                                        <span className="pending-item-price">₱{(item.food.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {order.items.some(item => item.comment) && (
                                <div className="pending-notes-section">
                                    <strong>Special Instructions:</strong>
                                    <ul>
                                        {order.items.filter(item => item.comment).map((item, index) => (
                                            <li key={index}>
                                                <em>{item.food.name}:</em> "{item.comment}"
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="pending-card-footer">
                                <div className="pending-total">
                                    <span>Total Amount:</span>
                                    <span className="pending-total-amount">₱{order.total.toFixed(2)}</span>
                                </div>
                                
                                {(!order.status || order.status.toLowerCase().includes('pending')) && (
                                    <button className="pending-pay-btn" onClick={() => simulatePayment(order.id)}>
                                        Pay at Counter
                                    </button>
                                )}

                                {(order.status && order.status.toLowerCase().includes('preparing')) && (
                                    <span style={{ fontSize: '13px', color: '#1565c0', fontWeight: 'bold' }}>
                                        🍳 Kitchen is preparing your food...
                                    </span>
                                )}

                                {(order.status && (order.status.toLowerCase().includes('ready') || order.status.toLowerCase().includes('paid'))) && (
                                    <button className="pending-pay-btn complete-btn" onClick={() => completeOrder(order.id)}>
                                        Claim Food at Counter 🔔
                                    </button>
                                )}

                                {(order.status && order.status.toLowerCase().includes('cancel')) && (
                                    <span style={{ fontSize: '13px', color: '#c62828', fontWeight: 'bold' }}>
                                        Order Cancelled (Out of Stock / Unavailable)
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
