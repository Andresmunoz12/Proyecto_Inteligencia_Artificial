import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [historial, setHistorial] = useState([
        { rol: 'bot', texto: '¡Hola! Soy FerreBot, tu asistente experto. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [cargando, setCargando] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [historial, isOpen]);

    const enviarPregunta = async (e) => {
        e.preventDefault();
        if (!mensaje.trim()) return;

        const nuevaInteraccion = { rol: 'usuario', texto: mensaje };
        setHistorial(prev => [...prev, nuevaInteraccion]);
        const preguntaActual = mensaje;
        setMensaje('');
        setCargando(true);

        try {
            const res = await axios.post('http://localhost:3000/ai/chat', {
                question: preguntaActual
            });
            setHistorial(prev => [...prev, { rol: 'bot', texto: res.data.answer }]);
        } catch (error) {
            console.error("Error:", error);
            setHistorial(prev => [...prev, { rol: 'bot', texto: "Lo siento, tuve un problema al consultar el inventario." }]);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
            {/* Botón Flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--dark)',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
                {isOpen ? '✖' : '🤖'}
            </button>

            {/* Ventana de Chat */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    right: '0',
                    width: '350px',
                    height: '450px',
                    backgroundColor: 'var(--bg-white)',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid var(--border)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '15px',
                        backgroundColor: 'var(--dark)',
                        color: 'var(--primary)',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span>🤖 FerreBot IA</span>
                    </div>

                    {/* Historial */}
                    <div
                        ref={scrollRef}
                        style={{
                            flex: 1,
                            padding: '15px',
                            overflowY: 'auto',
                            backgroundColor: '#f9f9f9',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        {historial.map((item, i) => (
                            <div key={i} style={{
                                alignSelf: item.rol === 'usuario' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%'
                            }}>
                                <div style={{
                                    padding: '10px 14px',
                                    borderRadius: item.rol === 'usuario' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                    backgroundColor: item.rol === 'usuario' ? 'var(--primary)' : 'var(--border)',
                                    color: 'var(--dark)',
                                    fontSize: '0.9rem',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    {item.texto}
                                </div>
                            </div>
                        ))}
                        {cargando && (
                            <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                FerreBot está pensando...
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={enviarPregunta} style={{
                        padding: '15px',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        gap: '8px'
                    }}>
                        <input
                            type="text"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            placeholder="Pregúntame algo..."
                            style={{
                                flex: 1,
                                border: '1px solid var(--border)',
                                borderRadius: '20px',
                                padding: '8px 15px',
                                fontSize: '0.9rem'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={cargando}
                            style={{
                                backgroundColor: 'var(--dark)',
                                color: 'var(--primary)',
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AIChatWidget;
