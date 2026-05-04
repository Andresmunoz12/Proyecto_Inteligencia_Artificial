import React from 'react';

const Navbar = ({ onNavigate }) => {
    return (
        <nav style={{
            backgroundColor: 'var(--dark)',
            color: 'var(--primary)',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'var(--shadow)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>🛠️ FerreIA</span>
            </div>
            <ul style={{
                display: 'flex',
                listStyle: 'none',
                gap: '2rem',
                margin: 0,
                padding: 0,
                alignItems: 'center'
            }}>
                <li>
                    <button
                        onClick={() => onNavigate('catalog')}
                        style={{
                            background: 'none',
                            color: 'var(--bg-light)',
                            fontSize: '1rem',
                            padding: '5px 10px'
                        }}
                        onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--bg-light)'}
                    >
                        Catálogo
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onNavigate('about')}
                        style={{
                            background: 'none',
                            color: 'var(--bg-light)',
                            fontSize: '1rem',
                            padding: '5px 10px'
                        }}
                        onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--bg-light)'}
                    >
                        Sobre Nosotros
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onNavigate('login')}
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'var(--dark)',
                            fontSize: '0.9rem',
                            padding: '8px 16px',
                            borderRadius: '20px'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-dark)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary)'}
                    >
                        Iniciar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
