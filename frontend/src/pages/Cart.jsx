import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('CASH');

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(items);
    }, []);

    const updateQuantity = (id, change) => {
        const updated = cartItems.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + change;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const calculateTotal = () => {
        return cartItems.reduce((runningTotal, item) => runningTotal + (item.food.price * item.quantity), 0);
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;

        // Map frontend structure to Spring Boot Order entity fields
        const orderItemNames = cartItems.map(item => `${item.food.name} x${item.quantity}`).join(', ');
        
        // Combine special instructions/allergens
        const instructions = cartItems.map(item => {
            const notes = item.comment ? `Comment: "${item.comment}"` : '';
            const allergensList = item.allergens.length > 0 ? `Allergens: [${item.allergens.join(', ')}]` : '';
            return [notes, allergensList].filter(Boolean).join(' | ');
        }).filter(Boolean).join(' ; ');

        // Status is PENDING. If GCASH, the payment API will automatically advance it to Paid.
        const orderData = {
            user: { id: 1 },
            itemName: orderItemNames,
            price: calculateTotal(),
            status: 'PENDING',
            specialInstructions: instructions
        };

        fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(res => {
            if (!res.ok) throw new Error("Order creation failed on backend");
            return res.json();
        })
        .then(savedOrder => {
            // Keep local storage order count working
            const nextOrderNumber = parseInt(localStorage.getItem('order_counter') || '0', 10) + 1;
            localStorage.setItem('order_counter', nextOrderNumber.toString());

            const isGCash = paymentMethod === 'GCASH';
            const localOrder = {
                id: '#' + nextOrderNumber,
                backendId: savedOrder.id,
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                items: cartItems,
                total: calculateTotal(),
                paymentMethod: isGCash ? 'GCash (Online)' : 'Cash at Counter',
                status: isGCash ? 'Paid & Preparing' : 'Pending Payment'
            };

            const pendingOrders = JSON.parse(localStorage.getItem('pending_orders') || '[]');
            pendingOrders.unshift(localOrder);
            localStorage.setItem('pending_orders', JSON.stringify(pendingOrders));

            // Save latest order for the confirmation page
            localStorage.setItem('latest_order', JSON.stringify(localOrder));

            // If GCash, trigger the Payments API immediately to update backend
            if (isGCash) {
                const paymentPayload = {
                    orderId: savedOrder.id,
                    amount: calculateTotal(),
                    paymentMethod: 'GCASH',
                    paymentStatus: 'COMPLETED'
                };

                fetch('http://localhost:8080/payments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(paymentPayload)
                })
                .then(res => res.json())
                .then(data => {
                    console.log("GCash payment successfully processed on backend:", data);
                })
                .catch(err => {
                    console.warn("Could not sync GCash payment with backend database:", err);
                });
            }

            // Clear cart
            localStorage.removeItem('cart');
            setCartItems([]);

            // Redirect to confirmation page
            navigate('/confirmation');
        })
        .catch(err => {
            console.warn("Using offline cart fallback due to error:", err);
            
            // Fallback: Offline mode (Save to local storage only)
            const nextOrderNumber = parseInt(localStorage.getItem('order_counter') || '0', 10) + 1;
            localStorage.setItem('order_counter', nextOrderNumber.toString());

            const localOrder = {
                id: '#' + nextOrderNumber,
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                items: cartItems,
                total: calculateTotal(),
                status: 'Pending Payment'
            };

            const pendingOrders = JSON.parse(localStorage.getItem('pending_orders') || '[]');
            pendingOrders.unshift(localOrder);
            localStorage.setItem('pending_orders', JSON.stringify(pendingOrders));

            // Save latest order for the confirmation page
            localStorage.setItem('latest_order', JSON.stringify(localOrder));

            localStorage.removeItem('cart');
            setCartItems([]);
            navigate('/confirmation');
        });
    };

    return (
        <div className="cart-page-container">
            <h1 className="cart-title">Your Shopping Cart 🛒</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart-state">
                    <p>Your cart is empty. Let's get some delicious food!</p>
                    <button className="back-menu-btn" onClick={() => navigate('/menu')}>
                        Go to Menu 🍔
                    </button>
                </div>
            ) : (
                <div className="cart-layout">
                    {/* Items List */}
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <img src={item.food.image} alt={item.food.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h3>{item.food.name}</h3>
                                    <p className="cart-item-desc">{item.food.description}</p>
                                    
                                    {item.allergens.length > 0 && (
                                        <div className="cart-item-allergens">
                                            <strong>Allergens:</strong> {item.allergens.join(', ')}
                                        </div>
                                    )}
                                    
                                    {item.comment && (
                                        <div className="cart-item-comment">
                                            <strong>Notes:</strong> "{item.comment}"
                                        </div>
                                    )}

                                    <div className="cart-item-controls">
                                        <span className="cart-item-price">₱{item.food.price.toFixed(2)}</span>
                                        <div className="qty-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="cart-summary-sidebar">
                        <div className="summary-card">
                            <h2>Summary</h2>
                            <div className="summary-row">
                                <span>Items Subtotal:</span>
                                <span>₱{calculateTotal().toFixed(2)}</span>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="payment-selector">
                                <h3>Payment Method</h3>
                                <label className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="CASH" 
                                        checked={paymentMethod === 'CASH'}
                                        onChange={() => setPaymentMethod('CASH')}
                                    />
                                    Cash at Counter
                                </label>
                                <label className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="GCASH" 
                                        checked={paymentMethod === 'GCASH'}
                                        onChange={() => setPaymentMethod('GCASH')}
                                    />
                                    GCash (Online)
                                </label>
                            </div>

                            <div className="summary-row total-row">
                                <span>Total:</span>
                                <span>₱{calculateTotal().toFixed(2)}</span>
                            </div>
                            <button className="place-order-submit-btn" onClick={handlePlaceOrder}>
                                Place Order (₱{calculateTotal().toFixed(2)})
                            </button>
                            <button className="continue-shopping-btn" onClick={() => navigate('/menu')}>
                                Add More Items
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
