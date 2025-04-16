import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCategoryProducts } from '../services/api';

function ProductCategory() {
  const { category } = useParams<{ category: string }>();
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const data = await fetchCategoryProducts();
        if (category && data.categoryProducts[category]) {
          setCategoryData({
            products: data.categoryProducts[category],
            title: data.categoryTitles[category]
          });
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load category products');
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-text-muted">Category not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-text-primary mb-8">{categoryData.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryData.products.map((product: any) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{product.name}</h3>
                <p className="text-text-muted mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-accent-coral">By {product.artisan}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductCategory;