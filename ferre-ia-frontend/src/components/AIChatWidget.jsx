import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import aiAvatar from '../assets/ai_avatar.png';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [historial, setHistorial] = useState([
        { rol: 'asistente', texto: '¡Hola! Soy FerreBot. ¿En qué puedo ayudarte hoy? Pídeme información sobre productos o tutoriales para tus proyectos.' }
    ]);
    const [cargando, setCargando] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [historial, cargando]);

    const enviarPregunta = async (e) => {
        e.preventDefault();
        if (!mensaje.trim()) return;

        const nuevoMensaje = { rol: 'usuario', texto: mensaje };
        setHistorial(prev => [...prev, nuevoMensaje]);
        setMensaje('');
        setCargando(true);

        try {
            const response = await axios.post('http://localhost:3000/ai/chat', { question: mensaje });
            setHistorial(prev => [...prev, { rol: 'asistente', texto: response.data.answer }]);
        } catch (error) {
            console.error('Error al hablar con la IA:', error);
            setHistorial(prev => [...prev, { rol: 'asistente', texto: 'Lo siento, tuve un problema al procesar tu solicitud.' }]);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
            {/* Botón Flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '65px',
                    height: '65px',
                    borderRadius: '50%',
                    backgroundColor: '#333',
                    color: 'var(--primary)',
                    fontSize: '1.8rem',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                    e.currentTarget.style.backgroundColor = '#000';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.backgroundColor = '#333';
                }}
            >
                {isOpen ? '✖' : (
                    <img
                        src={aiAvatar}
                        alt="AI"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}
            </button>

            {/* Ventana de Chat */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: '85px',
                    right: '0',
                    width: '400px',
                    height: '550px',
                    backgroundColor: 'var(--bg-white)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'var(--dark)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid var(--border-white)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                                <img src={aiAvatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '800', fontSize: '1rem' }}>FerreBot IA</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Soporte Experto</div>
                            </div>
                        </div>
                    </div>

                    {/* Historial */}
                    <div
                        ref={scrollRef}
                        style={{
                            flex: 1,
                            padding: '20px',
                            overflowY: 'auto',
                            backgroundColor: '#fdfdfd',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}
                    >
                        {historial.map((item, i) => (
                            <div key={i} style={{
                                alignSelf: item.rol === 'usuario' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%'
                            }}>
                                <div style={{
                                    padding: '12px 18px',
                                    borderRadius: item.rol === 'usuario' ? '20px 20px 0 20px' : '0 20px 20px 20px',
                                    backgroundColor: item.rol === 'usuario' ? 'var(--primary)' : 'var(--bg-light)',
                                    color: 'var(--dark)',
                                    fontSize: '0.9rem',
                                    boxShadow: 'var(--shadow-sm)',
                                    border: item.rol === 'usuario' ? 'none' : '1px solid var(--border)',
                                    lineHeight: '1.5'
                                }}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            table: ({ node, ...props }) => (
                                                <div style={{ overflowX: 'auto', margin: '10px 0' }}>
                                                    <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8rem' }} {...props} />
                                                </div>
                                            ),
                                            th: ({ node, ...props }) => <th style={{ border: '1px solid #ddd', padding: '6px', backgroundColor: '#f2f2f2', fontWeight: '700' }} {...props} />,
                                            td: ({ node, ...props }) => <td style={{ border: '1px solid #ddd', padding: '6px' }} {...props} />,
                                            p: ({ node, ...props }) => <p style={{ margin: '0 0 8px 0' }} {...props} />,
                                            a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 'bold' }} {...props} />
                                        }}
                                    >
                                        {item.texto}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {cargando && (
                            <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <div className="typing-dot" style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', opacity: 0.6 }}></div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>FerreBot está escribiendo...</span>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={enviarPregunta} style={{
                        padding: '20px',
                        backgroundColor: 'white',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <input
                            type="text"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            placeholder="¿En qué puedo ayudarte hoy?"
                            style={{
                                flex: 1,
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '12px 20px',
                                fontSize: '0.9rem',
                                backgroundColor: '#f8f9fa'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={cargando}
                            style={{
                                backgroundColor: 'var(--dark)',
                                color: 'var(--primary)',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                boxShadow: 'var(--shadow-md)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--dark)'}
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
