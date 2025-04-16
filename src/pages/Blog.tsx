import React from 'react';
import { Link } from 'react-router-dom';

const sharedImage = 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800';

const blogPosts = [
  {
    id: '1',
    title: 'The Art of Traditional Pottery Making',
    excerpt: 'Discover the ancient techniques that still influence modern ceramic artisans and how these practices are being preserved for future generations.',
    content: `Traditional pottery making is an art form that has been passed down through generations...`,
    image: sharedImage,
    date: '2024-03-15',
    author: 'Maria Rodriguez',
    category: 'Crafts'
  },
  {
    id: '2',
    title: 'Supporting Global Artisan Communities',
    excerpt: 'How fair trade practices are empowering craftspeople worldwide and creating sustainable economic opportunities.',
    content: `Fair trade practices have become increasingly important in the global marketplace...`,
    image: sharedImage,
    date: '2024-03-10',
    author: 'John Smith',
    category: 'Community'
  },
  {
    id: '3',
    title: 'The Revival of Traditional Weaving',
    excerpt: 'Exploring how young artisans are breathing new life into ancient weaving techniques and creating contemporary designs.',
    content: `Traditional weaving techniques are experiencing a renaissance among young craftspeople...`,
    image: sharedImage,
    date: '2024-03-05',
    author: 'Emma Wilson',
    category: 'Trends'
  },
  {
    id: '4',
    title: "Reviving India's Native Cotton: The Kala Cotton Initiative",
    excerpt: 'Exploring grassroots efforts in Kutch, Gujarat, to revive the indigenous kala cotton, promoting sustainable and ethical fashion.',
    content: 'In Kutch, Gujarat, the Khamir organization has spearheaded the revival of the indigenous kala cotton, connecting farmers, spinners, and weavers to create a sustainable supply chain...',
    image: sharedImage,
    date: '2025-03-27',
    author: 'Aditi Sharma',
    category: 'Sustainability'
  },
  {
    id: '5',
    title: 'The Digital Revival of Traditional Embroidery Crafts',
    excerpt: 'Analyzing how digital platforms are aiding the resurgence of traditional embroidery techniques among artisans.',
    content: 'A systematic literature review reveals that digital platforms have played a pivotal role in reviving traditional embroidery crafts...',
    image: sharedImage,
    date: '2025-03-18',
    author: 'Ravi Kumar',
    category: 'Technology'
  },
  {
    id: '6',
    title: 'Weaving Knowledge: Integrating Traditional Crafts into Modern Fashion Education',
    excerpt: 'Discussing initiatives that bridge the gap between traditional craft knowledge and contemporary fashion design education.',
    content: 'The National Institute of Fashion Technology has established resource centers that digitize and preserve traditional craft knowledge...',
    image: sharedImage,
    date: '2016-06-06',
    author: 'Meera Nair',
    category: 'Education'
  },
  {
    id: '7',
    title: 'Handloom Clusters: Revitalizing Traditional Weaving Communities',
    excerpt: 'Examining government initiatives aimed at developing handloom clusters to support traditional weavers.',
    content: 'The Comprehensive Handloom Cluster Development Scheme aims to enhance the handloom sector by establishing mega clusters...',
    image: sharedImage,
    date: '2025-03-05',
    author: 'Sunil Verma',
    category: 'Policy'
  },
  {
    id: '8',
    title: 'Empowering Women Through Traditional Textile Revival in Uttarakhand',
    excerpt: "Highlighting how Avani's initiatives in Uttarakhand are empowering women through the revival of traditional textile crafts.",
    content: "Avani's natural dye and textile program in Uttarakhand has been instrumental in reviving traditional handspun yarn and handwoven textiles...",
    image: sharedImage,
    date: '2020-01-15',
    author: 'Anjali Joshi',
    category: 'Empowerment'
  },
  {
    id: '9',
    title: 'Revival of Traditional Handloom Techniques in Contemporary Fashion',
    excerpt: 'Exploring how traditional handloom techniques are being integrated into modern fashion trends.',
    content: 'A study discusses the resurgence of traditional handloom techniques in contemporary fashion...',
    image: sharedImage,
    date: '2024-10-17',
    author: 'Akhil Goyal',
    category: 'Fashion'
  },
  {
    id: '10',
    title: 'Bridging Heritage and Modern Demand in Indian Traditional Textiles',
    excerpt: 'Analyzing the efforts to align traditional textile crafts with contemporary market demands.',
    content: 'Efforts to revive Indian traditional textiles involve bridging the gap between heritage and modern demand...',
    image: sharedImage,
    date: '2025-03-05',
    author: 'Neha Gupta',
    category: 'Market Trends'
  },
  {
    id: '11',
    title: 'Reviving Ancient Textile Traditions: A Global Perspective',
    excerpt: 'Exploring global efforts in rediscovering and preserving ancient textile traditions.',
    content: 'Organizations worldwide, such as Blossom Global Trust, are working to support communities in preserving their textile heritage...',
    image: sharedImage,
    date: '2024-06-03',
    author: 'Sanjay Patel',
    category: 'Cultural Preservation'
  }
];


function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-text-primary mb-8">Artisan Stories & Insights</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-accent-coral">{post.category}</span>
                  <span className="text-sm text-text-muted">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-display font-semibold text-text-primary mb-2">{post.title}</h2>
                <p className="text-text-muted mb-4">{post.excerpt}</p>
                <div className="flex items-center">
                  <span className="text-sm text-text-muted">By {post.author}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;