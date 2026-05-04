import React from 'react';

const AboutUs = () => {
    return (
        <div style={{ backgroundColor: 'var(--bg-white)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{
                height: '300px',
                background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1200") center/cover no-repeat', // Imagen de ferretería profesional
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--primary)',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <h1 style={{ color: 'var(--primary)', fontSize: '3rem', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Nuestra Ferretería
                </h1>
                <p style={{ color: 'white', fontSize: '1.2rem', maxWidth: '800px' }}>
                    Más de 20 años brindando soluciones de calidad para tus proyectos de construcción y hogar.
                </p>
            </div>

            {/* Content Section */}
            <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <section>
                        <h2 style={{ borderLeft: '5px solid var(--primary)', paddingLeft: '15px', marginBottom: '20px' }}>Nuestra Misión</h2>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Proveer las mejores herramientas y suministros industriales, garantizando la satisfacción de nuestros clientes
                            a través de un servicio experto y una asesoría impulsada por tecnología de vanguardia.
                        </p>
                    </section>
                    <section>
                        <h2 style={{ borderLeft: '5px solid var(--primary)', paddingLeft: '15px', marginBottom: '20px' }}>Nuestros Valores</h2>
                        <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
                            <li style={{ marginBottom: '10px' }}>✅ <strong>Calidad:</strong> Solo trabajamos con las mejores marcas.</li>
                            <li style={{ marginBottom: '10px' }}>✅ <strong>Confianza:</strong> Tu éxito es nuestro compromiso.</li>
                            <li style={{ marginBottom: '10px' }}>✅ <strong>Innovación:</strong> Implementamos IA para ayudarte a encontrar lo que necesitas.</li>
                        </ul>
                    </section>
                </div>

                <div style={{
                    marginTop: '60px',
                    padding: '40px',
                    backgroundColor: 'var(--bg-light)',
                    borderRadius: 'var(--radius)',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '20px' }}>¿Donde Estamos?</h2>
                    <p style={{ color: 'var(--text-muted)' }}>📍 Calle Principal #123, Ciudad Ferretera</p>
                    <p style={{ color: 'var(--text-muted)' }}>📞 Teléfono: (123) 456-7890</p>
                    <p style={{ color: 'var(--text-muted)' }}>✉️ Email: contacto@gramas-suministros.com</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
