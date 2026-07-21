import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/SpecialInstructions.css';

export default function SpecialInstructions() {
    const location = useLocation();
    const navigate = useNavigate();

    let food = { name: 'Hotdog', price: 30 };
    if (location.state && location.state.food) {
        food = location.state.food;
    }

    const [comment, setComment] = useState('');
    const [nuts, setNuts] = useState(false);
    const [dairy, setDairy] = useState(false);
    const [eggs, setEggs] = useState(false);
    const [others, setOthers] = useState(false);

    function handleCommentChange(e) {
        setComment(e.target.value);
    }

    function handleNutsClick() {
        setNuts(!nuts);
    }

    function handleDairyClick() {
        setDairy(!dairy);
    }

    function handleEggsClick() {
        setEggs(!eggs);
    }

    function handleOthersClick() {
        setOthers(!others);
    }

    function handleConfirmOrder() {
        const allergens = [];
        if (nuts) allergens.push('Nuts');
        if (dairy) allergens.push('Dairy');
        if (eggs) allergens.push('Eggs');
        if (others) allergens.push('Others');

        const cartItem = {
            id: Date.now(), // Unique ID for cart item
            food: food,
            comment: comment,
            allergens: allergens,
            quantity: 1
        };

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        existingCart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        navigate('/menu');
    }

    let nutsClass = 'special-allergen-btn';
    if (nuts === true) {
        nutsClass = 'special-allergen-btn selected';
    }

    let dairyClass = 'special-allergen-btn';
    if (dairy === true) {
        dairyClass = 'special-allergen-btn selected';
    }

    let eggsClass = 'special-allergen-btn';
    if (eggs === true) {
        eggsClass = 'special-allergen-btn selected';
    }

    let othersClass = 'special-allergen-btn';
    if (others === true) {
        othersClass = 'special-allergen-btn selected';
    }

    return (
        <div className="special-instructions-container">
            {/* Left Column: Input Form */}
            <div className="special-instructions-left">
                <h1 className="special-instructions-title">Special Instructions</h1>
                <p className="special-instructions-subtitle">
                    Add comments or allergen notes before confirming your order
                </p>

                <h3 className="special-instructions-section-title">Comments / Special Requests</h3>
                <textarea
                    rows="6"
                    className="special-instructions-textarea"
                    placeholder="e.g. Less rice, extra sauce, no onions..."
                    value={comment}
                    onChange={handleCommentChange}
                />

                <h3 className="special-instructions-section-title-spaced">Allergen Concerns</h3>
                <p className="special-instructions-hint">Select all that apply:</p>

                <div className="special-instructions-allergen-group">
                    <button onClick={handleNutsClick} className={nutsClass}>
                        {nuts === true ? (
                            <span className="special-allergen-icon selected">✓</span>
                        ) : (
                            <span className="special-allergen-icon">●</span>
                        )}
                        Nuts
                    </button>

                    <button onClick={handleDairyClick} className={dairyClass}>
                        {dairy === true ? (
                            <span className="special-allergen-icon selected">✓</span>
                        ) : (
                            <span className="special-allergen-icon">●</span>
                        )}
                        Dairy
                    </button>

                    <button onClick={handleEggsClick} className={eggsClass}>
                        {eggs === true ? (
                            <span className="special-allergen-icon selected">✓</span>
                        ) : (
                            <span className="special-allergen-icon">●</span>
                        )}
                        Eggs
                    </button>

                    <button onClick={handleOthersClick} className={othersClass}>
                        {others === true ? (
                            <span className="special-allergen-icon selected">✓</span>
                        ) : (
                            <span className="special-allergen-icon">●</span>
                        )}
                        Others
                    </button>
                </div>
            </div>

            {/* Right Column: Order Summary Panel */}
            <div className="special-instructions-right">
                <div className="special-instructions-summary-card">
                    <div>
                        <h2 className="special-instructions-summary-heading">Order Summary</h2>

                        <div className="special-instructions-summary-item">
                            <div className="special-instructions-summary-item-row">
                                <span className="special-instructions-summary-item-name">{food.name}</span>
                                <span className="special-instructions-summary-item-price">₱{food.price.toFixed(2)}</span>
                            </div>
                            <div className="special-instructions-summary-item-qty">x1</div>
                        </div>
                    </div>

                    <div>
                        <div className="special-instructions-total-row">
                            <span className="special-instructions-total-label">TOTAL:</span>
                            <span className="special-instructions-total-price">₱{food.price.toFixed(2)}</span>
                        </div>

                        <button onClick={handleConfirmOrder} className="special-instructions-confirm-btn">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}