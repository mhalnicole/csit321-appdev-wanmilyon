import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/OrderConfirmation.css';

export default function OrderConfirmation() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const latestOrder = JSON.parse(localStorage.getItem('latest_order'));
        setOrder(latestOrder);
    }, []);

    if (!order) {
        return (
            <div className="confirmation-page">
                <div className="empty-card">
                    <div className="empty-icon">🍽️</div>

                    <h2>No Recent Order</h2>

                    <p>
                        You don't have any recently placed orders.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() => navigate('/menu')}
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation-page">

            <div className="success-section">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Order Confirmed!</h1>

                <p>
                    Thank you for your order. Your food is now being prepared.
                </p>

            </div>

            <div className="receipt-card">

                <div className="receipt-header">

                    <div>

                        <h2>Receipt</h2>

                        <p>{order.date}</p>

                    </div>

                    <div className="status-badge">
                        {order.status}
                    </div>

                </div>

                <div className="receipt-info">

                    <div>
                        <span>Order Number</span>
                        <strong>{order.id}</strong>
                    </div>

                    <div>
                        <span>Payment</span>
                        <strong>
                            {order.paymentMethod || "Cash on Delivery"}
                        </strong>
                    </div>

                </div>

                <hr />

                <h3 className="section-title">
                    Items Ordered
                </h3>

                {order.items.map((item, index) => (

                    <div
                        className="receipt-item"
                        key={index}
                    >

                        <div>

                            <div className="food-name">
                                {item.food.name}
                            </div>

                            <div className="food-qty">
                                Quantity × {item.quantity}
                            </div>

                            {item.comment && (
                                <div className="food-note">
                                    📝 {item.comment}
                                </div>
                            )}

                        </div>

                        <strong>
                            ₱{(item.food.price * item.quantity).toFixed(2)}
                        </strong>

                    </div>

                ))}

                <hr />

                <div className="total-row">

                    <span>Total Payment</span>

                    <span className="total-price">
                        ₱{order.total.toFixed(2)}
                    </span>

                </div>

            </div>

            <div className="button-group">

                <button
                    className="secondary-btn"
                    onClick={() => navigate('/menu')}
                >
                    Continue Shopping
                </button>

                <button
                    className="primary-btn"
                    onClick={() => navigate('/pendingorders')}
                >
                    View My Orders
                </button>

            </div>

        </div>
    );
}