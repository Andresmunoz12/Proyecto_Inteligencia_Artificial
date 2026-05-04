import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import AIChatWidget from './components/AIChatWidget';
import AboutUs from './components/AboutUs';
import Login from './components/Login';

function App() {
    const [currentView, setCurrentView] = useState('catalog');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setCurrentView('catalog');
    };

    const renderView = () => {
        switch (currentView) {
            case 'catalog':
                return <ProductCatalog />;
            case 'about':
                return <AboutUs />;
            case 'login':
                return <Login onLoginSuccess={handleLoginSuccess} />;
            default:
                return <ProductCatalog />;
        }
    };

    return (
        <div className="app-container">
            <Navbar onNavigate={setCurrentView} />

            {user && (
                <div style={{ backgroundColor: 'var(--primary)', padding: '5px 20px', fontSize: '0.8rem', textAlign: 'right' }}>
                    Conectado como: <strong>{user.username}</strong>
                </div>
            )}

            <main style={{ flex: 1 }}>
                {renderView()}
            </main>

            <AIChatWidget />

            <footer style={{
                padding: '2rem',
                backgroundColor: 'var(--dark)',
                color: 'var(--bg-light)',
                textAlign: 'center',
                marginTop: 'auto'
            }}>
                <p>&copy; 2026 Ferretería Gramas y Suministros - Impulsado por IA</p>
            </footer>
        </div>
    );
}

export default App;
