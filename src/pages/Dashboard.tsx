import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Workouts', value: '12', unit: 'this month' },
    { label: 'Calories', value: '8,450', unit: 'burned' },
    { label: 'Steps', value: '45,678', unit: 'today' },
    { label: 'Water', value: '2.5', unit: 'liters' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'workout',
      title: 'HIIT Burn',
      time: '2 hours ago',
      duration: '45 min'
    },
    {
      id: 2,
      type: 'meal',
      title: 'Breakfast logged',
      time: '4 hours ago',
      calories: '450'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'New Personal Best',
      time: 'Yesterday',
      description: 'Bench Press: 185 lbs'
    }
  ];

  return (
    <main className="dashboard">
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <div className="user-profile">
            <img src="/images/profile.jpg" alt="User Profile" className="profile-image" />
            <h2>John Doe</h2>
            <p>Pro Member</p>
          </div>
          <nav className="dashboard-nav">
            <Link to="/dashboard" className="active">Overview</Link>
            <Link to="/dashboard/workouts">Workouts</Link>
            <Link to="/dashboard/nutrition">Nutrition</Link>
            <Link to="/dashboard/progress">Progress</Link>
            <Link to="/dashboard/settings">Settings</Link>
          </nav>
        </aside>

        <div className="dashboard-content">
          <section className="dashboard-header">
            <h1>Welcome back, John!</h1>
            <p>Here's your fitness overview for today</p>
          </section>

          <section className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.label}</h3>
                <div className="stat-value">
                  <span className="number">{stat.value}</span>
                  <span className="unit">{stat.unit}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="today-workout">
            <h2>Today's Workout</h2>
            <div className="workout-card">
              <div className="workout-info">
                <h3>Upper Body Strength</h3>
                <p>45 minutes • Intermediate</p>
                <ul className="workout-exercises">
                  <li>Bench Press: 3 sets x 12 reps</li>
                  <li>Shoulder Press: 3 sets x 10 reps</li>
                  <li>Bicep Curls: 3 sets x 15 reps</li>
                </ul>
              </div>
              <button className="start-workout">Start Workout</button>
            </div>
          </section>

          <section className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'workout' && '💪'}
                    {activity.type === 'meal' && '🍎'}
                    {activity.type === 'achievement' && '🏆'}
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.time}</p>
                    {activity.duration && <span>{activity.duration}</span>}
                    {activity.calories && <span>{activity.calories} calories</span>}
                    {activity.description && <p>{activity.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard; 