import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Workouts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const workouts = [
    {
      id: 1,
      title: 'Beginner Strength',
      description: 'Perfect for those new to strength training',
      duration: '45 min',
      level: 'Beginner',
      equipment: 'Dumbbells',
      category: 'strength',
      image: '/images/workout-1.jpg'
    },
    {
      id: 2,
      title: 'HIIT Burn',
      description: 'High-intensity interval training for maximum calorie burn',
      duration: '30 min',
      level: 'Intermediate',
      equipment: 'None',
      category: 'hiit',
      image: '/images/workout-2.jpg'
    },
    {
      id: 3,
      title: 'Yoga Flow',
      description: 'Relaxing yoga session for mind and body',
      duration: '60 min',
      level: 'All Levels',
      equipment: 'Yoga Mat',
      category: 'yoga',
      image: '/images/workout-3.jpg'
    },
    {
      id: 4,
      title: 'Advanced Strength',
      description: 'Challenging strength workout for experienced athletes',
      duration: '60 min',
      level: 'Advanced',
      equipment: 'Full Gym',
      category: 'strength',
      image: '/images/workout-4.jpg'
    }
  ];

  const filteredWorkouts = activeCategory === 'all' 
    ? workouts 
    : workouts.filter(workout => workout.category === activeCategory);

  return (
    <main>
      <section className="workouts-hero">
        <h1>Workout Programs</h1>
        <p>Find the perfect workout program for your fitness goals</p>
      </section>

      <section className="workout-categories">
        <div className="category-filters">
          <button 
            className={activeCategory === 'all' ? 'active' : ''} 
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={activeCategory === 'strength' ? 'active' : ''} 
            onClick={() => setActiveCategory('strength')}
          >
            Strength
          </button>
          <button 
            className={activeCategory === 'cardio' ? 'active' : ''} 
            onClick={() => setActiveCategory('cardio')}
          >
            Cardio
          </button>
          <button 
            className={activeCategory === 'yoga' ? 'active' : ''} 
            onClick={() => setActiveCategory('yoga')}
          >
            Yoga
          </button>
          <button 
            className={activeCategory === 'hiit' ? 'active' : ''} 
            onClick={() => setActiveCategory('hiit')}
          >
            HIIT
          </button>
        </div>

        <div className="workout-grid">
          {filteredWorkouts.map(workout => (
            <div key={workout.id} className="workout-card">
              <div className="workout-image">
                <img src={workout.image} alt={workout.title} />
              </div>
              <div className="workout-content">
                <h3>{workout.title}</h3>
                <p>{workout.description}</p>
                <div className="workout-details">
                  <span>{workout.duration}</span>
                  <span>{workout.level}</span>
                  <span>{workout.equipment}</span>
                </div>
                <Link to={`/workout/${workout.id}`} className="workout-button">
                  Start Program
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Our Workout Programs?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Expert Design</h3>
            <p>Programs created by certified fitness professionals</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>Monitor your improvements and stay motivated</p>
          </div>
          <div className="feature-card">
            <h3>Flexible Schedule</h3>
            <p>Work out at your own pace and convenience</p>
          </div>
          <div className="feature-card">
            <h3>Community Support</h3>
            <p>Connect with others on the same fitness journey</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Workouts; 