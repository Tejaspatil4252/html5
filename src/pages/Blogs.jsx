import React, { useState, useEffect } from 'react';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import EmptyState from '../components/EmptyState';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/blog');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleBlogClick = (blogId) => {
    window.location.href = `/blog/${blogId}`;
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
        <Navigation />
        <EmptyState 
          type="blog"
          title="Error Loading Blog"
          description={error}
          showActionButton={true}
          actionText="Try Again"
          onActionClick={handleRefresh}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* 🔥 BEAUTIFUL HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Rapptorsoft <span className="text-red-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Insights, tutorials, and expert perspectives from our development team. 
            Learn the latest in web technologies and best practices.
          </p>
        </div>

        {/* 📱 BEAUTIFUL BLOG GRID - NOW WITH REAL API DATA */}
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => handleBlogClick(post.id)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100 hover:shadow-2xl hover:border-red-200 transition-all duration-300 cursor-pointer"
              >
                {/* 🖼️ FEATURED IMAGE OR GRADIENT FALLBACK */}
                <div className="h-48 overflow-hidden relative">
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    // 🔥 RED GRADIENT FALLBACK
                    <div className="w-full h-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <div className="text-4xl font-bold mb-2 opacity-90">
                          {post.category?.charAt(0) || 'B'}
                        </div>
                        <div className="text-white/80 text-sm font-medium">
                          {post.category || 'Blog'}
                        </div>
                      </div>
                      
                      {/* Floating Code Elements */}
                      <div className="absolute top-4 left-4 text-white/30 text-xl">{"</>"}</div>
                      <div className="absolute bottom-4 right-4 text-white/30 text-xl">{"{}"}</div>
                    </div>
                  )}
                  
                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* 📝 CONTENT */}
                <div className="p-6">
                  {/* CATEGORY & DATE */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category || 'General'}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(post.publishDate)}
                    </span>
                  </div>
                  
                  {/* TITLE */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* EXCERPT */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {post.content.length > 120 
                      ? post.content.substring(0, 120) + '...' 
                      : post.content
                    }
                  </p>
                  
                  {/* AUTHOR */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>By {post.author}</span>
                  </div>
                </div>
                
              

              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            type="blog"
            title="No Blog Posts Yet"
            description="We're working on some amazing content. Stay tuned for updates!"
            showActionButton={true}
            actionText="Refresh"
            onActionClick={handleRefresh}
          />
        )}

    

      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;