import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            // Guardar info del usuario localmente (por ahora simple)
            localStorage.setItem('user', JSON.stringify(response.data));
            onLoginSuccess(response.data);
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'var(--bg-white)',
                padding: '2.5rem',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                border: '1px solid var(--border)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '3rem' }}>🔐</span>
                    <h2 style={{ marginTop: '1rem' }}>Iniciar Sesión</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Panel Administrativo</p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#ffebee',
                        color: '#c62828',
                        padding: '10px',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        border: '1px solid #ffcdd2'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="email" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@ferreia.com"
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="password" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'var(--dark)',
                            padding: '12px',
                            fontSize: '1rem',
                            marginTop: '10px'
                        }}
                        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = 'var(--primary-dark)')}
                        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = 'var(--primary)')}
                    >
                        {loading ? 'Verificando...' : 'Entrar'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <p>Credenciales de prueba:</p>
                    <p><strong>admin@ferreia.com</strong> / <strong>admin</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
