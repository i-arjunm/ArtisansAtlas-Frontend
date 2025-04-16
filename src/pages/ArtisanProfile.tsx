import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Star, Mail, Phone, Globe, Instagram, Facebook, Twitter } from 'lucide-react';
import { fetchArtisan } from '../services/api';
import type { Artisan } from '../types';

function ArtisanProfile() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtisan = async () => {
      try {
        if (!id) return;
        const data = await fetchArtisan(id);
        if (Object.keys(data).length === 0) {
          setError('Artisan not found');
        } else {
          setArtisan(data);
        }
      } catch (err) {
        setError('Failed to load artisan');
      } finally {
        setLoading(false);
      }
    };

    loadArtisan();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-text-muted mb-4">{error || 'Artisan not found'}</p>
          <Link to="/artisans" className="text-primary hover:underline">
            View all artisans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Cover Image */}
      <div className="relative h-80">
        <img
          src={artisan.coverImage}
          alt={`${artisan.name}'s workshop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Artisan Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <img
              src={artisan.image}
              alt={artisan.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
                {artisan.name}
              </h1>
              <div className="flex items-center text-text-muted mb-2">
                <MapPin size={18} className="mr-2" />
                <span>{artisan.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{artisan.rating}</span>
                </div>
                <span>•</span>
                <span>{artisan.sales} sales</span>
                <span>•</span>
                <span>Joined {new Date(artisan.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-8">
            {artisan.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-sand rounded-full text-primary"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Bio */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
              About {artisan.name}
            </h2>
            <div className="prose max-w-none text-text-primary">
              {artisan.bio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <a href={`mailto:${artisan.contact.email}`} className="text-text-primary hover:text-primary">
                    {artisan.contact.email}
                  </a>
                </div>
                {artisan.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <a href={`tel:${artisan.contact.phone}`} className="text-text-primary hover:text-primary">
                      {artisan.contact.phone}
                    </a>
                  </div>
                )}
                {artisan.contact.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-primary mr-3" />
                    <a href={`https://${artisan.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-primary">
                      {artisan.contact.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
                Social Media
              </h2>
              <div className="space-y-4">
                {artisan.contact.social.instagram && (
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 text-primary mr-3" />
                    <a href={`https://instagram.com/${artisan.contact.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-primary">
                      {artisan.contact.social.instagram}
                    </a>
                  </div>
                )}
                {artisan.contact.social.facebook && (
                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 text-primary mr-3" />
                    <a href={`https://facebook.com/${artisan.contact.social.facebook}`} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-primary">
                      {artisan.contact.social.facebook}
                    </a>
                  </div>
                )}
                {artisan.contact.social.twitter && (
                  <div className="flex items-center">
                    <Twitter className="h-5 w-5 text-primary mr-3" />
                    <a href={`https://twitter.com/${artisan.contact.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-primary">
                      {artisan.contact.social.twitter}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-semibold text-text-primary mb-6">
              Available Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisan.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary mb-2">{product.name}</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-bold text-primary">${product.price}</span>
                      <span className="text-sm text-text-muted line-through">${product.originalPrice}</span>
                    </div>
                    {!product.inStock && (
                      <p className="mt-2 text-red-500 text-sm">Out of Stock</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-display font-semibold text-text-primary mb-6">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {artisan.reviews.map((review) => (
                <div key={review.id} className="bg-sand rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.user.image}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
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
  );
}

export default ArtisanProfile;