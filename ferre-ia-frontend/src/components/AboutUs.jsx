import React from 'react';

const AboutUs = ({ onNavigate }) => {
    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{
                height: '400px',
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1200") center/cover no-repeat',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--primary)',
                textAlign: 'center',
                padding: '0 20px',
                marginBottom: '60px'
            }}>
                <h1 style={{ color: 'var(--primary)', fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    Nuestra Historia
                </h1>
                <p style={{ color: 'white', fontSize: '1.25rem', maxWidth: '800px', fontWeight: '300', opacity: 0.9, marginBottom: '2rem' }}>
                    Más de 20 años construyendo confianza y brindando soluciones de calidad para cada proyecto.
                </p>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button
                        onClick={() => onNavigate('catalog')}
                        style={{
                            padding: '12px 32px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '2px solid var(--primary)',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}
                    >
                        Ver Catálogo
                    </button>
                    <button
                        onClick={() => onNavigate('about')}
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
                        Conócenos
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="container" style={{ paddingBottom: '80px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <section style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
                        <h2 style={{ color: 'var(--dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '4px', height: '24px', backgroundColor: 'var(--primary)', borderRadius: '2px' }}></span>
                            Nuestra Misión
                        </h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            Proveer las mejores herramientas y suministros industriales, garantizando la satisfacción de nuestros clientes
                            a través de un servicio experto y una asesoría impulsada por tecnología de vanguardia.
                        </p>
                    </section>

                    <section style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
                        <h2 style={{ color: 'var(--dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '4px', height: '24px', backgroundColor: 'var(--primary)', borderRadius: '2px' }}></span>
                            Nuestros Valores
                        </h2>
                        <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: 'var(--primary)' }}>✔</span> <strong>Calidad:</strong> Marcas líderes a nivel mundial.
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: 'var(--primary)' }}>✔</span> <strong>Confianza:</strong> Relaciones duraderas con nuestros clientes.
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: 'var(--primary)' }}>✔</span> <strong>Innovación:</strong> Tecnología IA para una mejor experiencia.
                            </li>
                        </ul>
                    </section>
                </div>

                <div style={{
                    marginTop: '60px',
                    padding: '60px',
                    backgroundColor: 'var(--dark)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Contacto Directo</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
                        <div>
                            <p style={{ fontWeight: '700', marginBottom: '0.5rem' }}>📍 Ubicación</p>
                            <p style={{ opacity: 0.8 }}>Calle Principal #123, Ciudad Ferretera</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: '700', marginBottom: '0.5rem' }}>📞 Teléfono</p>
                            <p style={{ opacity: 0.8 }}>(123) 456-7890</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: '700', marginBottom: '0.5rem' }}>✉️ Correo</p>
                            <p style={{ opacity: 0.8 }}>contacto@ferrenext.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
