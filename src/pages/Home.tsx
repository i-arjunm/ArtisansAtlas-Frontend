import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCategories, fetchHeroSlides, fetchFeaturedProducts, fetchBlogs } from '../services/api';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, heroSlidesData, featuredProductsData, blogsData] = await Promise.all([
          fetchCategories(),
          fetchHeroSlides(),
          fetchFeaturedProducts(),
          fetchBlogs()
        ]);
        
        setCategories(categoriesData);
        setHeroSlides(heroSlidesData);
        setFeaturedProducts(featuredProductsData);
        setBlogs(blogsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (heroSlides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroSlides.length]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative h-[60vh] rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-center">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl mb-6">{heroSlides[currentSlide].description}</p>
                <Link
                  to={heroSlides[currentSlide].link}
                  className="bg-cta text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
                >
                  Explore Now
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-display font-bold text-text-primary mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-display font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {Object.entries(featuredProducts).map(([category, products]: [string, any]) => (
        <section key={category} className="mb-12">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-8">Featured {category} Collection</h2>
          <div className="flex overflow-x-auto pb-4 space-x-6 scrollbar-hide">
            {products.map((product: any) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group flex-none w-72"
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
        </section>
      ))}

      <section className="mb-12">
        <div className="bg-sand rounded-lg p-8">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-6 text-center">Why Choose ArtisansAtlas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">Authentic Craftsmanship</h3>
              <p className="text-text-muted">Every piece tells a story of tradition and skill passed down through generations.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">Fair Trade Practices</h3>
              <p className="text-text-muted">We ensure artisans receive fair compensation for their exceptional work.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">Global Impact</h3>
              <p className="text-text-muted">Your purchase directly supports artisan communities worldwide.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/why-artisansatlas" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-display font-bold text-text-primary mb-8">Latest Articles</h2>
        <div className="flex overflow-x-auto pb-4 space-x-6 scrollbar-hide">
          {blogs.slice(0, 5).map((post: any) => (
  <Link
    key={post.id}
    to={`/blog/${post.id}`}
    className="group flex-none w-80"
  >
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-text-muted mb-2">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
          {post.title}
        </h3>
        <p className="text-text-muted line-clamp-2">{post.excerpt}</p>
      </div>
    </div>
  </Link>
))}

        </div>
      </section>

      <section className="mb-12 bg-sand rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Stay Connected</h2>
          <p className="text-text-muted mb-6">Subscribe to our newsletter for artisan stories, new products, and exclusive offers.</p>
          {subscribed ? (
            <div className="text-primary font-semibold">Thank you for subscribing!</div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                className="bg-cta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;