import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MainContent from './MainContent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logocit from '../assets/logocit.png';

export default function PalitDaan() {   
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('pending_orders');
            sessionStorage.removeItem('order_counter');
            sessionStorage.removeItem('order_history');
            navigate('/');
        }, 1100);
    };

    return (
        <div 
            className={isLoggingOut ? "fade-out" : "fade-in"}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                backgroundColor: '#ffa07a' 
            }}
        >
            <Navbar toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 54px)', overflow: 'hidden' }}>
                <Sidebar isOpen={isSidebarOpen} onLogout={handleLogout} />
                <div style={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    boxSizing: 'border-box'
                }}>
                    <MainContent />
                </div>
            </div>

            {/* Logout transition overlay */}
            {isLoggingOut && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#F96F20',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                }}>
                    <img src={logocit} alt="CIT-U logo" className="pulse-logo" />
                    <div className="loader-bar">
                        <div className="loader-bar-fill"></div>
                    </div>
                </div>
            )}
        </div>
    );
}