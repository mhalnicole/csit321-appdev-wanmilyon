import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();

    const popularPicks = [
        {
            id: 1,
            name: "Classic Cheeseburger",
            price: "₱85.00",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
            rating: "4.8"
        },
        {
            id: 2,
            name: "Spicy Fried Chicken",
            price: "₱110.00",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
            rating: "4.9"
        },
        {
            id: 3,
            name: "Pork Sisig Combo",
            price: "₱130.00",
            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80",
            rating: "4.7"
        }
    ];

    return (
        <div className="dashboard-container">
            {/* Hero Section */}
            <div className="dashboard-hero">
                <div className="hero-content">
                    <h1>Unsa imo ganahan paliton karon?</h1>
                    <p>Discover delicious local favorites delivered straight to your table.</p>
                    <button className="hero-btn" onClick={() => navigate('/menu')}>
                        Browse Full Menu
                    </button>
                </div>
            </div>

            {/* Popular Section */}
            <div className="dashboard-section">
                <div className="section-header">
                    <h2>Popular Picks 🔥</h2>
                    <button className="text-btn" onClick={() => navigate('/menu')}>See All</button>
                </div>
                <div className="popular-grid">
                    {popularPicks.map((item) => (
                        <div key={item.id} className="popular-card" onClick={() => navigate('/menu')}>
                            <div className="card-img-container">
                                <img src={item.image} alt={item.name} />
                                <span className="card-rating">★ {item.rating}</span>
                            </div>
                            <div className="card-details">
                                <h3>{item.name}</h3>
                                <div className="card-footer">
                                    <span className="card-price">{item.price}</span>
                                    <button className="order-btn">Order Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
