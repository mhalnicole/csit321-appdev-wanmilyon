import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/OrderConfirmation.css';

export default function OrderConfirmation() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const latestOrder = JSON.parse(sessionStorage.getItem('latest_order'));
        setOrder(latestOrder);
    }, []);

    if (!order) {
        return (
            <div className="confirmation-page">
                <div className="empty-card">
                    <div className="empty-icon">🍽️</div>
                    <h2>No Recent Order</h2>
                    <p>You don't have any recently placed orders.</p>
                    <button className="primary-btn" onClick={() => navigate('/menu')}>
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation-page">
            <div className="receipt-card">
                {/* Success Banner */}
                <div className="success-banner">
                    <div className="success-icon">✓</div>
                    <div className="success-text">
                        <h1>Order Confirmed!</h1>
                        <p>Thank you! Your food is now being prepared.</p>
                    </div>
                </div>

                {/* Order Details Grid */}
                <div className="receipt-info-grid">
                    <div className="info-box">
                        <span>Order Number</span>
                        <strong>{order.id}</strong>
                    </div>
                    <div className="info-box">
                        <span>Date</span>
                        <strong>{order.date}</strong>
                    </div>
                    <div className="info-box">
                        <span>Payment</span>
                        <strong>{order.paymentMethod || "Cash"}</strong>
                    </div>
                    <div className="info-box">
                        <span>Status</span>
                        <span className="status-badge-sm">{order.status}</span>
                    </div>
                </div>



                {/* Items List */}
                <div className="receipt-items-section">
                    <h3 className="section-title">Items Ordered</h3>
                    <div className="items-list">
                        {order.items.map((item, index) => (
                            <div className="receipt-item-row" key={index}>
                                <div className="item-details-left">
                                    <span className="food-name">{item.food.name}</span>
                                    <span className="food-qty-tag">x{item.quantity}</span>
                                    {item.comment && <div className="food-note">{item.comment}</div>}
                                </div>
                                <span className="item-price">₱{(item.food.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total */}
                <div className="total-row">
                    <span>Total Amount</span>
                    <span className="total-price">₱{order.total.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="button-group">
                    <button className="secondary-btn" onClick={() => navigate('/menu')}>
                        Back to Menu
                    </button>
                    <button className="primary-btn" onClick={() => navigate('/pendingorders')}>
                        View My Orders
                    </button>
                </div>
            </div>
        </div>
    );
}