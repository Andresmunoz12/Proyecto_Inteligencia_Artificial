import React from 'react';

const ProductCard = ({ product }) => {
    // Función para obtener imagen basada en el nombre o categoría (simulación)
    const getProductImage = (name) => {
        const n = name.toLowerCase();
        if (n.includes('martillo')) return 'https://images.unsplash.com/photo-1586864387917-f679b50e10cc?auto=format&fit=crop&q=80&w=400';
        if (n.includes('taladro')) return 'https://images.unsplash.com/photo-1504148455328-497c5efdf13a?auto=format&fit=crop&q=80&w=400';
        if (n.includes('pintura') || n.includes('vinilo')) return 'https://images.unsplash.com/photo-1589939705384-5185138a7c0d?auto=format&fit=crop&q=80&w=400';
        if (n.includes('tubo') || n.includes('pvc')) return 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400';
        return 'https://images.unsplash.com/photo-1530124560676-4fbc9dfabd6c?auto=format&fit=crop&q=80&w=400'; // Herramientas general
    };

    return (
        <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            transition: 'var(--transition)',
            height: '100%',
        }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
        >
            <div style={{
                height: '220px',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border)',
                backgroundColor: '#ffffff', // Fondo blanco para que luzcan mejor los productos
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px' // Espacio para que no toquen los bordes
            }}>
                <img
                    src={product.image_url || getProductImage(product.name)}
                    alt={product.name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        transition: 'var(--transition)'
                    }}
                />
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '1px' }}>{product.brand}</span>
                <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem', color: 'var(--dark)' }}>{product.name}</h3>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Precio unitario</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--dark)' }}>
                                ${parseFloat(product.price).toLocaleString()}
                            </span>
                        </div>
                        <span style={{
                            fontSize: '0.7rem',
                            padding: '6px 12px',
                            backgroundColor: product.stock > 0 ? '#E8F5E9' : '#FFEBEE',
                            color: product.stock > 0 ? '#2E7D32' : '#C62828',
                            borderRadius: '20px',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                        }}>
                            {product.stock > 0 ? `En Stock: ${product.stock}` : 'Agotado'}
                        </span>
                    </div>

                    <button style={{
                        backgroundColor: 'var(--dark)',
                        color: 'var(--primary)',
                        padding: '12px',
                        width: '100%',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#000';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'var(--dark)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <span>🛒 Añadir al Carrito</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
