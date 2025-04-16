import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Truck, Shield, ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { fetchProduct } from '../services/api';
import type { Product as ProductType } from '../types';

function Product() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) return;
        const data = await fetchProduct(id);
        if (Object.keys(data).length === 0) {
          setError('Product not found');
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const calculateDiscount = () => {
    if (!product) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-text-muted mb-4">{error || 'Product not found'}</p>
          <Link to="/products" className="text-primary hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              ref={imageRef}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPosition({ x: 0, y: 0 })}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{
                  transform: zoomPosition.x ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: zoomPosition.x ? 'none' : 'transform 0.3s ease-out'
                }}
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-text-muted mb-2">
                <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary">
                  {product.category}
                </Link>
              </div>
              <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.artisan.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-text-muted">({product.reviews.length} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <span className="text-xl text-text-muted line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-lg text-cta">Save {calculateDiscount()}%</span>
              </div>
              {!product.inStock && (
                <p className="mt-2 text-red-500 font-semibold">Currently Out of Stock</p>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="prose max-w-none text-text-primary">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-text-primary">
                    <ArrowRight size={16} className="text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-4 bg-sand rounded-lg">
                <Truck className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-text-primary">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-sand rounded-lg">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-text-primary">Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-sand rounded-lg">
                <Star className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-text-primary">Authentic Artisan</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full px-8 py-4 rounded-lg mb-6 ${
                product.inStock
                  ? 'bg-cta text-white hover:bg-opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-colors duration-200`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Artisan Information */}
            <Link
              to={`/artisans/${product.artisan.id}`}
              className="block bg-sand rounded-lg p-6 hover:bg-opacity-80 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.artisan.image}
                  alt={product.artisan.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-text-primary">{product.artisan.name}</h3>
                  <div className="flex items-center text-text-muted">
                    <MapPin size={16} className="mr-1" />
                    <span>{product.artisan.location}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-text-primary">{product.artisan.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{product.artisan.sales} sales</span>
                  </div>
                </div>
                <ExternalLink size={20} className="text-primary" />
              </div>
            </Link>

            {/* Reviews Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-display font-bold text-text-primary mb-6">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={review.user.image}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-text-primary">{review.user.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                          <span className="ml-2 text-sm text-text-muted">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-text-primary">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;