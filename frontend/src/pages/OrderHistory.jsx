import { useState, useEffect } from 'react';
import '../css/OrderHistory.css';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('order_history') || '[]');
        setOrders(history);
    }, []);

    const formatFoodNames = (orderItems) => {
        if (!orderItems || orderItems.length === 0) return '';
        if (orderItems.length === 1) return orderItems[0].food.name;
        
        // Show first item + count of other items
        return `${orderItems[0].food.name} + ${orderItems.length - 1} other${orderItems.length > 2 ? 's' : ''}`;
    };

    return (
        <main className="history-container">
            <header className="history-header">
                <h1>Order History</h1>
                <p>View all your previous and pending orders</p>
            </header>

            {orders.length === 0 ? (
                <div className="history-empty-state">
                    <p>No completed orders found. Once you pay for your pending orders, they will appear here!</p>
                </div>
            ) : (
                <div className="history-table-wrapper">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Food Item</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="history-order-id-col">{order.id}</td>
                                    <td>{formatFoodNames(order.items)}</td>
                                    <td>{order.date.split(' ')[0]}</td> {/* Only show date part */}
                                    <td className="history-amount-col">₱{order.total.toFixed(2)}</td>
                                    <td>
                                        <span className="history-status-badge">Completed</span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className="history-view-btn" onClick={() => setSelectedOrder(order)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Receipt Modal Overlay */}
            {selectedOrder && (
                <div className="history-modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="history-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="history-modal-header">
                            <h2>ORDER RECEIPT</h2>
                            <button className="history-modal-close" onClick={() => setSelectedOrder(null)}>×</button>
                        </div>

                        <div className="history-receipt-body">
                            <div className="receipt-header-details">
                                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                                <p><strong>Date & Time:</strong> {selectedOrder.date}</p>
                                <p><strong>Status:</strong> <span className="receipt-paid-tag">PAID</span></p>
                            </div>

                            <div className="receipt-divider"></div>

                            <div className="receipt-items-list">
                                <h3>Items Ordered</h3>
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="receipt-item-row">
                                        <div className="receipt-item-left">
                                            <span className="receipt-item-qty">{item.quantity}x</span>
                                            <span className="receipt-item-name">{item.food.name}</span>
                                            {item.allergens.length > 0 && (
                                                <span className="receipt-item-allergens">({item.allergens.join(', ')})</span>
                                            )}
                                        </div>
                                        <span className="receipt-item-price">₱{(item.food.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {selectedOrder.items.some(item => item.comment) && (
                                <>
                                    <div className="receipt-divider"></div>
                                    <div className="receipt-notes-section">
                                        <h3>Special Requests</h3>
                                        <ul>
                                            {selectedOrder.items.filter(item => item.comment).map((item, index) => (
                                                <li key={index}>
                                                    <strong>{item.food.name}:</strong> "{item.comment}"
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}

                            <div className="receipt-divider"></div>

                            <div className="receipt-total-row">
                                <span>TOTAL PAID:</span>
                                <span>₱{selectedOrder.total.toFixed(2)}</span>
                            </div>

                            <div className="receipt-footer-stamp">
                                <div className="stamp-border">
                                    <span>CIT-U CANTEEN</span>
                                    <span>TRANSACTION VERIFIED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
