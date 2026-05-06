import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('No se pudieron cargar los productos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Cargando catálogo...</p>
        </div>
    );

    if (error) return (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>
            <p>{error}</p>
        </div>
    );

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Excelencia en cada pieza</span>
                <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Nuestro Catálogo</h2>
                <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto' }}></div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2.5rem'
            }}>
                {products.map(product => (
                    <div key={product.id} className="fade-in">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--bg-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No hay productos registrados en este momento.</p>
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;
