import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import AIChatWidget from './components/AIChatWidget';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import InventoryVision from './components/InventoryVision';

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

    const renderHero = () => (
        <section style={{
            height: '80vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/src/assets/hero_bg.png')`, // Suponiendo que la imagen se movió aquí
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '0 20px'
        }}>
            <div className="fade-in" style={{ maxWidth: '800px' }}>
                <h1 style={{ color: 'var(--primary)', fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    FerreNext
                </h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: '300', opacity: 0.9 }}>
                    El futuro de las ferreterías.
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button
                        onClick={() => setCurrentView('catalog')}
                        style={{
                            padding: '12px 32px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--dark)',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: '700',
                            fontSize: '1rem',
                            boxShadow: 'var(--shadow-md)'
                        }}
                    >
                        Ver Catálogo
                    </button>
                    <button
                        onClick={() => setCurrentView('about')}
                        style={{
                            padding: '12px 32px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '2px solid white',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}
                    >
                        Conócenos
                    </button>
                </div>
            </div>
        </section>
    );

    const renderView = () => {
        switch (currentView) {
            case 'catalog':
                return (
                    <>
                        {renderHero()}
                        <div id="catalog-section" style={{ padding: '80px 0' }}>
                            <ProductCatalog />
                        </div>
                    </>
                );
            case 'about':
                return <AboutUs onNavigate={setCurrentView} />;
            case 'inventory':
                return <InventoryVision onProductSaved={() => setCurrentView('catalog')} />;
            case 'login':
                return <Login onLoginSuccess={handleLoginSuccess} />;
            default:
                return (
                    <>
                        {renderHero()}
                        <ProductCatalog />
                    </>
                );
        }
    };

    return (
        <div className="app-container">
            <Navbar onNavigate={setCurrentView} currentView={currentView} />

            {user && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    right: '20px',
                    zIndex: 900,
                    backgroundColor: 'var(--primary)',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-sm)',
                    fontWeight: '600'
                }}>
                    👋 {user.username}
                </div>
            )}

            <main style={{ flex: 1 }}>
                {renderView()}
            </main>

            <AIChatWidget />

            <footer style={{
                padding: '4rem 0',
                backgroundColor: 'var(--dark)',
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                borderTop: '1px solid var(--border-white)'
            }}>
                <div className="container">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>FERRENEXT</h3>
                    <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>Construyendo el futuro con calidad y tecnología.</p>
                    <p style={{ fontSize: '0.8rem' }}>&copy; 2026 Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
