import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setCountry(data.country_name);
        setCurrency(data.currency);
      })
      .catch(() => {
        setCountry('United States');
        setCurrency('USD');
      });
  }, []);

  return (
    <>
      <footer className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-display font-semibold mb-4">About Us</h3>
              <p className="text-sm font-body">To empower artisans from every corner of the world by giving their work the visibility it deserves — and to offer customers the joy of owning authentic, handmade pieces crafted with care, tradition, and love.</p>
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 font-body">
                <li><Link to="/" className="text-sm hover:text-secondary transition-colors">Home</Link></li>
                <li><Link to="/cart" className="text-sm hover:text-secondary transition-colors">Cart</Link></li>
                <li><Link to="/blog" className="text-sm hover:text-secondary transition-colors">Blog</Link></li>
                <li><Link to="/why-artisansatlas" className="text-sm hover:text-secondary transition-colors">Why Choose Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold mb-4">Contact</h3>
              <p className="text-sm font-body">Email: hello@artisansatlas.com</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-accent-indigo text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center">
            You're shopping from {country} ({currency})
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;