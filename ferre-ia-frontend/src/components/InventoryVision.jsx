import React, { useState, useRef } from 'react';
import axios from 'axios';

const InventoryVision = ({ onProductSaved }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setResult(null);
                setPrice('');
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!preview) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3000/ai/vision/analyze', {
                image: preview
            });
            setResult(response.data);
            setPrice(''); // Reset para que el usuario lo llene
        } catch (err) {
            console.error('Error analyzing image:', err);
            setError('No se pudo analizar la imagen. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const saveProduct = async () => {
        if (!result || !price) {
            setError('Por favor, ingresa el precio antes de guardar.');
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/products', {
                name: result.name,
                brand: result.brand,
                price: parseFloat(price),
                stock: 1, // Default por registro inicial
                ai_description: result.description,
                image_url: preview // Usamos la misma imagen capturada
            });
            alert('Producto registrado exitosamente');
            setResult(null);
            setPreview(null);
            setImage(null);
            setPrice('');
            if (onProductSaved) onProductSaved();
        } catch (err) {
            console.error('Error saving product:', err);
            setError('Error al guardar el producto en la base de datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                height: '350px',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/src/assets/hero_bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px',
                marginBottom: '40px'
            }}>
                <div className="fade-in" style={{ maxWidth: '800px' }}>
                    <h1 style={{ color: 'var(--primary)', fontSize: '3rem', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        FerreNext | Inventario IA
                    </h1>
                    <p style={{ fontSize: '1.2rem', fontWeight: '300', opacity: 0.9 }}>
                        Digitaliza tus productos en segundos usando Visión Artificial avanzada.
                    </p>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '100px' }}>
                <div className="fade-in" style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                        <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', fontSize: '1.5rem' }}>📦</div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Registro Inteligente</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Captura o sube una imagen para identificar el producto automáticamente.</p>
                        </div>
                    </div>

                    <div
                        onClick={() => fileInputRef.current.click()}
                        style={{
                            width: '100%',
                            height: '400px',
                            border: '2px dashed var(--primary)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: '#fdfdfc',
                            transition: 'var(--transition)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fffbed'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fdfdfc'}
                    >
                        {preview ? (
                            <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '15px', color: 'var(--primary)' }}>📷</div>
                                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark)' }}>Haz clic para elegir una imagen</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>Optimizado para herramientas y repuestos industriales</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                        <button
                            onClick={analyzeImage}
                            disabled={!preview || loading}
                            style={{
                                flex: 2,
                                padding: '16px',
                                backgroundColor: 'var(--primary)',
                                color: 'var(--dark)',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                opacity: (!preview || loading) ? 0.6 : 1,
                                boxShadow: '0 4px 12px rgba(255, 179, 0, 0.3)',
                                cursor: (!preview || loading) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading && !result ? '🤖 Analizando con IA...' : '🔍 Identificar con Inteligencia Artificial'}
                        </button>
                        {preview && (
                            <button
                                onClick={() => { setPreview(null); setResult(null); }}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    backgroundColor: '#f1f1f1',
                                    color: '#555',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                }}
                            >
                                Reintentar
                            </button>
                        )}
                    </div>

                    {error && (
                        <div style={{
                            marginTop: '20px',
                            padding: '15px',
                            backgroundColor: '#fff5f5',
                            border: '1px solid #feb2b2',
                            borderRadius: 'var(--radius-sm)',
                            color: '#c53030',
                            textAlign: 'center',
                            fontSize: '0.9rem'
                        }}>
                            ❌ {error}
                        </div>
                    )}

                    {result && (
                        <div className="fade-in" style={{
                            marginTop: '40px',
                            padding: '30px',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--primary)',
                            boxShadow: '0 10px 30px rgba(255, 179, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #efefef' }}>
                                <span style={{ fontSize: '1.4rem' }}>✨</span>
                                <h3 style={{ fontSize: '1.3rem' }}>Detalles Detectados</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Nombre del Producto</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{result.name}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Marca</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{result.brand}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Estado</span>
                                    <span style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        color: result.state === 'nuevo' ? '#2f855a' : '#c05621',
                                        backgroundColor: result.state === 'nuevo' ? '#f0fff4' : '#fffaf0',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        width: 'fit-content'
                                    }}>{result.state.toUpperCase()}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Categoría</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{result.category}</span>
                                </div>
                                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Descripción Técnica</span>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#444' }}>{result.description}</p>
                                </div>
                            </div>

                            <div style={{
                                padding: '25px',
                                backgroundColor: '#fefcf0',
                                borderRadius: 'var(--radius-md)',
                                border: '2px solid var(--primary)',
                                marginBottom: '25px'
                            }}>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '12px', color: 'var(--dark)', fontSize: '1rem' }}>
                                    💰 Definir Precio de Venta (COP)
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: 'var(--dark)' }}>$</span>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        style={{
                                            width: '100%',
                                            padding: '16px 16px 16px 35px',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1.4rem',
                                            fontWeight: '700',
                                            color: 'var(--dark)',
                                            backgroundColor: 'white'
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={saveProduct}
                                disabled={loading || !price}
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    backgroundColor: 'var(--dark)',
                                    color: 'var(--primary)',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '800',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    opacity: (loading || !price) ? 0.6 : 1,
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                {loading ? '💾 Procesando...' : <>💾 Confirmar y Guardar en Catalog</>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryVision;

