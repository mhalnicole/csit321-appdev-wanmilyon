import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

export default function Navbar({ toggleSidebar }) {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/orders') {
            return location.pathname === '/orders' || location.pathname === '/';
        }
        return location.pathname === path;
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <button 
                    onClick={toggleSidebar} 
                    className="menu-toggle-btn"
                    aria-label="Toggle menu"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className="navbar-center">
                PALIT DAAN
            </div>
            <div className="navbar-links">
                <Link className={`navbar-link nav-link-animate ${isActive('/menu') ? 'active' : ''}`} to="/menu">Menu</Link>
                <Link className={`navbar-link nav-link-animate ${isActive('/orders') ? 'active' : ''}`} to="/orders">Orders</Link>
                <Link className={`navbar-link nav-link-animate ${isActive('/profile') ? 'active' : ''}`} to="/profile">Profile</Link>
            </div>
        </div>
    );
}