import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Better Workout Recovery',
      date: 'March 15, 2024',
      category: 'tips',
      description: 'Learn how to optimize your recovery and maximize your gains.',
      image: '/images/blog-1.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'The Science of Nutrition Timing',
      date: 'March 12, 2024',
      category: 'nutrition',
      description: 'Understanding when to eat for optimal performance.',
      image: '/images/blog-2.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'Success Story: John\'s Transformation',
      date: 'March 10, 2024',
      category: 'success',
      description: 'How John lost 30 pounds in 6 months with FitKick.',
      image: '/images/blog-3.jpg',
      featured: true
    },
    {
      id: 4,
      title: 'Essential Workout Equipment Guide',
      date: 'March 8, 2024',
      category: 'workouts',
      description: 'The must-have equipment for your home gym.',
      image: '/images/blog-4.jpg',
      featured: false
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main>
      <section className="blog-hero">
        <h1>FitKick Blog</h1>
        <p>Fitness tips, success stories, and expert advice</p>
      </section>

      <section className="blog-categories">
        <div className="category-filters">
          <button 
            className={activeCategory === 'all' ? 'active' : ''} 
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={activeCategory === 'nutrition' ? 'active' : ''} 
            onClick={() => setActiveCategory('nutrition')}
          >
            Nutrition
          </button>
          <button 
            className={activeCategory === 'workouts' ? 'active' : ''} 
            onClick={() => setActiveCategory('workouts')}
          >
            Workouts
          </button>
          <button 
            className={activeCategory === 'success' ? 'active' : ''} 
            onClick={() => setActiveCategory('success')}
          >
            Success Stories
          </button>
          <button 
            className={activeCategory === 'tips' ? 'active' : ''} 
            onClick={() => setActiveCategory('tips')}
          >
            Tips & Tricks
          </button>
        </div>

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className={`blog-card ${post.featured ? 'featured' : ''}`}>
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="date">{post.date}</span>
                  <span className="category">{post.category}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <Link to={`/blog/${post.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest fitness tips and updates</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Blog; 