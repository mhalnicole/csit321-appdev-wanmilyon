import { useState, useEffect } from 'react';
import '../css/OrderHistory.css';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/orders/user/1')
            .then(res => res.json())
            .then(data => {
                // Sort by ID descending so latest orders show first
                const sorted = data.sort((a, b) => b.id - a.id);
                setOrders(sorted);
            })
            .catch(err => {
                console.warn("Failed to fetch order history from backend:", err);
                const history = JSON.parse(localStorage.getItem('order_history') || '[]');
                setOrders(history);
            });
    }, []);

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
                                    <td className="history-order-id-col">#{order.id}</td>
                                    <td>{order.itemName}</td>
                                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                                    <td className="history-amount-col">₱{order.price.toFixed(2)}</td>
                                    <td>
                                        <span className={`history-status-badge ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
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
                                <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                                <p><strong>Date & Time:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}</p>
                                <p><strong>Status:</strong> <span className="receipt-paid-tag">{selectedOrder.status}</span></p>
                            </div>

                            <div className="receipt-divider"></div>

                            <div className="receipt-items-list">
                                <h3>Items Ordered</h3>
                                <div className="receipt-item-row">
                                    <div className="receipt-item-left">
                                        <span className="receipt-item-name">{selectedOrder.itemName}</span>
                                    </div>
                                    <span className="receipt-item-price">₱{selectedOrder.price.toFixed(2)}</span>
                                </div>
                            </div>

                            {selectedOrder.specialInstructions && (
                                <>
                                    <div className="receipt-divider"></div>
                                    <div className="receipt-notes-section">
                                        <h3>Special Requests</h3>
                                        <p>"{selectedOrder.specialInstructions}"</p>
                                    </div>
                                </>
                            )}

                            <div className="receipt-divider"></div>

                            <div className="receipt-total-row">
                                <span>TOTAL AMOUNT:</span>
                                <span>₱{selectedOrder.price.toFixed(2)}</span>
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
