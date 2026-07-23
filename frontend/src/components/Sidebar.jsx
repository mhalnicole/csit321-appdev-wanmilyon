import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
 
export default function Sidebar({ isOpen, onLogout }) {
    const location = useLocation();
    const currentUser = getCurrentUser();
    const isAdminOrStaff = currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'STAFF');
 
    const menuItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Pending Orders', path: '/pendingorders' },
        { label: 'Order History', path: '/orderhistory' },
        { label: 'Profile Settings', path: '/profilesettings' }
    ];

    if (isAdminOrStaff) {
        menuItems.unshift({ label: '🍳 Kitchen Portal', path: '/canteen-dashboard', isStaff: true });
    }
 
    return (
        <div style={{
            backgroundColor: '#2d2d2d',
            width: isOpen ? '200px' : '0px',
            minWidth: isOpen ? '200px' : '0px',
            padding: isOpen ? '16px 12px' : '0px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: isOpen ? '2px 0 8px rgba(0,0,0,0.15)' : 'none',
            boxSizing: 'border-box',
            overflow: 'hidden',
            opacity: isOpen ? 1 : 0,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '176px',
                minWidth: '176px',
                boxSizing: 'border-box',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="nav-link-animate"
                                style={{
                                    backgroundColor: '#f5821f',
                                    color: 'white',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                                    transition: 'all 0.15s ease',
                                    cursor: 'pointer',
                                    opacity: isActive ? 1 : 0.9,
                                    border: isActive ? '2px solid #ffffff' : '2px solid transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.filter = 'brightness(1.1)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.filter = 'brightness(1)';
                                    e.currentTarget.style.transform = 'none';
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
                
                <Link
                    to="#"
                    className="nav-link-animate"
                    onClick={(e) => {
                        e.preventDefault();
                        if (onLogout) {
                            onLogout();
                        }
                    }}
                    style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        textDecoration: 'none',
                        textAlign: 'center',
                        padding: '10px 8px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '14px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                        marginTop: 'auto'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'brightness(1.1)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'brightness(1)';
                        e.currentTarget.style.transform = 'none';
                    }}
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}