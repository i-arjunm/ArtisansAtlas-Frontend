import { API_BASE_URL } from '../config';

export const fetchArtisans = async () => {
  const response = await fetch(`${API_BASE_URL}/artisans`);
  if (!response.ok) throw new Error('Failed to fetch artisans');
  return response.json();
};

export const fetchArtisan = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/artisans/${id}`);
  if (!response.ok) throw new Error('Failed to fetch artisan');
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProduct = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const fetchCategoryProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/category`);
  if (!response.ok) throw new Error('Failed to fetch category products');
  return response.json();
};

export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

export const fetchBlog = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};

export const fetchHeroSlides = async () => {
  const response = await fetch(`${API_BASE_URL}/heroSlides`);
  if (!response.ok) throw new Error('Failed to fetch hero slides');
  return response.json();
};

export const fetchFeaturedProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/featuredProducts`);
  if (!response.ok) throw new Error('Failed to fetch featured products');
  return response.json();
};