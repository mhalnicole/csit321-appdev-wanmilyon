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
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#ffa07a' 
        }}>
            <Navbar toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', flex: 1 }}>
                {isSidebarOpen && <Sidebar />}
                <div style={{ flex: 1 }}>
                    <MainContent />
                </div>
            </div>
        </div>
    );
}