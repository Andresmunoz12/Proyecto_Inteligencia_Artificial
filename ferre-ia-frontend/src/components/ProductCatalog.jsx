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
        <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', borderLeft: '5px solid var(--primary)', paddingLeft: '15px' }}>
                Nuestro Catálogo
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {products.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No hay productos registrados.</p>
            )}
        </div>
    );
};

export default ProductCatalog;
