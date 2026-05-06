import React, { useState, useEffect } from 'react';

const Navbar = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '12px 0' : '20px 0',
        backgroundColor: isScrolled ? 'var(--glass-dark)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-white)' : 'none',
        transition: 'var(--transition)',
        color: isScrolled ? 'var(--text-white)' : 'var(--dark)'
    };

    const linkStyles = (isActive = false) => ({
        padding: '8px 16px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        position: 'relative',
        color: 'white', // Siempre blanco para visibilidad sobre hero y glass dark
        transition: 'var(--transition)',
    });

    return (
        <nav style={navStyles}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                    onClick={() => onNavigate('catalog')}
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'white'
                    }}
                >
                    <span style={{ backgroundColor: 'var(--primary)', color: 'var(--dark)', padding: '4px 8px', borderRadius: '4px' }}>G</span>
                    <span style={{ letterSpacing: '-1px' }}>GRAMAS</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div onClick={() => onNavigate('catalog')} style={linkStyles()}>Productos</div>
                    <div onClick={() => onNavigate('about')} style={linkStyles()}>Nosotros</div>
                    <button
                        onClick={() => onNavigate('login')}
                        style={{
                            marginLeft: '16px',
                            padding: '10px 24px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--dark)',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'var(--transition)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = 'var(--shadow-lg)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'var(--shadow-md)';
                        }}
                    >
                        Ingresar
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
