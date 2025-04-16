import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBlog } from '../services/api';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        if (!id) return;
        const data = await fetchBlog(id);
        if (Object.keys(data).length === 0) {
          setError('Blog post not found');
        } else {
          setPost(data);
        }
      } catch (err) {
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-text-muted mb-4">{error || 'Blog post not found'}</p>
          <Link to="/blog" className="text-primary hover:underline">
            View all blog posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary hover:text-accent-coral mb-6 inline-block">
          ← Back to Blog
        </Link>
        
        <div className="mb-8">
          <span className="text-accent-coral">{post.category}</span>
          <h1 className="text-4xl font-display font-bold text-text-primary mt-2 mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-text-muted">
            <span>By {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none">
          {post.content.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-text-primary mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default BlogPost;