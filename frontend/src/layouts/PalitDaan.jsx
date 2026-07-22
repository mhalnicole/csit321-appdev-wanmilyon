import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MainContent from './MainContent';
import { useState } from 'react';

export default function PalitDaan() {   
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#ffa07a' 
        }}>
            <Navbar toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 54px)', overflow: 'hidden' }}>
                {isSidebarOpen && <Sidebar />}
                <div style={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    boxSizing: 'border-box'
                }}>
                    <MainContent />
                </div>
            </div>
        </div>
    );
}