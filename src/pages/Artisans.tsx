import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const artisans = [
  {
    id: 'maria-rodriguez',
    name: 'Maria Rodriguez',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    coverImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200',
    location: 'Oaxaca, Mexico',
    specialties: ['Traditional Pottery', 'Ceramic Art'],
    rating: 4.8,
    sales: 1234,
    bio: 'Third-generation potter specializing in traditional Mexican ceramics'
  },
  {
    id: 'ahmed-hassan',
    name: 'Ahmed Hassan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    coverImage: 'https://images.unsplash.com/photo-1590422749897-47c47673ba0b?w=1200',
    location: 'Cairo, Egypt',
    specialties: ['Textile Weaving', 'Traditional Patterns'],
    rating: 4.9,
    sales: 856,
    bio: 'Master weaver preserving ancient Egyptian textile traditions'
  },
  {
    id: 'mei-chen',
    name: 'Mei Chen',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    coverImage: 'https://images.unsplash.com/photo-1516727003284-a96541e51e9c?w=1200',
    location: 'Hangzhou, China',
    specialties: ['Silk Embroidery', 'Traditional Painting'],
    rating: 4.7,
    sales: 923,
    bio: 'Skilled artisan combining traditional Chinese techniques with modern designs'
  }
];

function Artisans() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-text-primary mb-8">Our Artisans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artisans.map((artisan) => (
          <Link
            key={artisan.id}
            to={`/artisans/${artisan.id}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={artisan.coverImage}
                alt={`${artisan.name}'s workshop`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-16 h-16 rounded-full border-2 border-white object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-white">{artisan.name}</h2>
                    <div className="flex items-center text-white/90">
                      <MapPin size={16} className="mr-1" />
                      <span>{artisan.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {artisan.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-sand rounded-full text-sm text-primary"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <p className="text-text-muted mb-4">{artisan.bio}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{artisan.rating}</span>
                  <span className="mx-2">•</span>
                  <span>{artisan.sales} sales</span>
                </div>
                <span className="text-primary group-hover:underline">View Profile →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Artisans;