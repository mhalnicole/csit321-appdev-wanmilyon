import { Routes, Route, useLocation } from 'react-router-dom';
import MenuPage from '../pages/MenuPage';
import SpecialInstructions from '../pages/SpecialInstructions';
import ProfileSettings from '../pages/ProfileSettings';
import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';
import PendingOrders from '../pages/PendingOrders';
import OrderHistory from '../pages/OrderHistory';
import OrderConfirmation from '../pages/OrderConfirmation';
import CanteenPersonnel from '../pages/CanteenPersonnel';

export default function MainContent() {
    const location = useLocation();

    return (
            <div 
                key={location.pathname}
                className="slide-up-fade-in"
                style={{
                    backgroundColor: '#ffffff',
                    flex: 1,
                    padding: '20px',
                    minHeight: 'calc(100vh - 74px)',
                    boxSizing: 'border-box'
                }}
            >
            <Routes> {/* <Route path='/' element={<Navigate to='/dashboard' replace />} /> */}
                <Route path='/canteen-dashboard' element={<CanteenPersonnel />} />
                <Route path='/orders' element={<OrderHistory />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />
                <Route path='/special-instructions' element={<SpecialInstructions />} />
                <Route path='/menu' element={<MenuPage />} />
                <Route path='/profile' element={<ProfileSettings />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/pendingorders' element={<PendingOrders />} />
                <Route path='/orderhistory' element={<OrderHistory />} />
                <Route path='/profilesettings' element={<ProfileSettings />} />
                <Route path='/logout' element={<div style={{ padding: '20px' }}><h2>Logged Out</h2><p>You have been successfully logged out.</p></div>} />
            </Routes>
        </div>
    );
}