import React from 'react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  return (
    <main>
      <section className="pricing-hero">
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your fitness journey</p>
      </section>

      <section className="pricing-grid">
        <div className="pricing-card">
          <div className="pricing-header">
            <h3>Basic</h3>
            <div className="price">
              <span className="amount">$9.99</span>
              <span className="period">/month</span>
            </div>
          </div>
          <ul className="features-list">
            <li>Basic workout tracking</li>
            <li>Standard workout plans</li>
            <li>Community access</li>
            <li>Email support</li>
          </ul>
          <Link to="/signup" className="pricing-button">Get Started</Link>
        </div>

        <div className="pricing-card featured">
          <div className="pricing-header">
            <h3>Pro</h3>
            <div className="price">
              <span className="amount">$19.99</span>
              <span className="period">/month</span>
            </div>
          </div>
          <ul className="features-list">
            <li>Advanced workout tracking</li>
            <li>Custom workout plans</li>
            <li>Priority community access</li>
            <li>24/7 support</li>
            <li>Nutrition tracking</li>
            <li>Progress analytics</li>
          </ul>
          <Link to="/signup" className="pricing-button">Get Started</Link>
        </div>

        <div className="pricing-card">
          <div className="pricing-header">
            <h3>Elite</h3>
            <div className="price">
              <span className="amount">$29.99</span>
              <span className="period">/month</span>
            </div>
          </div>
          <ul className="features-list">
            <li>All Pro features</li>
            <li>Personal trainer access</li>
            <li>Custom meal plans</li>
            <li>Video consultations</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
          </ul>
          <Link to="/signup" className="pricing-button">Get Started</Link>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Can I cancel my subscription?</h3>
            <p>Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
          </div>
          <div className="faq-item">
            <h3>Is there a free trial?</h3>
            <p>Yes, we offer a 14-day free trial for all plans. No credit card required.</p>
          </div>
          <div className="faq-item">
            <h3>Can I change plans later?</h3>
            <p>Yes, you can upgrade or downgrade your plan at any time.</p>
          </div>
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing; 