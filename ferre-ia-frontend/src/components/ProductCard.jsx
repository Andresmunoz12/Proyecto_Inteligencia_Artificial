import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div style={{
            backgroundColor: 'var(--bg-white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            border: '1px solid var(--border)',
            transition: 'var(--transition)'
        }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{
                backgroundColor: 'var(--bg-light)',
                height: '150px',
                borderRadius: 'var(--radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
            }}>
                📦
            </div>
            <h3 style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{product.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{product.brand}</p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1rem'
            }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--dark)' }}>
                    ${parseFloat(product.price).toLocaleString()}
                </span>
                <span style={{
                    fontSize: '0.8rem',
                    padding: '4px 8px',
                    backgroundColor: product.stock > 0 ? '#e8f5e9' : '#ffebee',
                    color: product.stock > 0 ? '#2e7d32' : '#c62828',
                    borderRadius: '4px'
                }}>
                    Stock: {product.stock}
                </span>
            </div>
            <button style={{
                marginTop: '1rem',
                backgroundColor: 'var(--primary)',
                color: 'var(--dark)',
                padding: '10px',
                width: '100%'
            }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-dark)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary)'}
            >
                Ver Detalles
            </button>
        </div>
    );
};

export default ProductCard;
