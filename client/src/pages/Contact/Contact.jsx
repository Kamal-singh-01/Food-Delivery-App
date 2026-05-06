import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData , setFormData] = useState({
    name:'',
    email:'',
    subject:'',
    message:''
  })

  const [submitted , setSubmitted] = useState(false);
  const [loading , setLoading] = useState(false);

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className='contact'>

      {/* Header */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have a question or feedback? We'd love to hear from you!</p>
      </div>

      <div className="contact-container">

        {/* Left - Contact Info */}
        <div className="contact-info">
          <div className="contact-info-item">
            <span>📍</span>
            <div>
              <h3>Address</h3>
              <p>123 Food Street, Agra</p>
              <p>Uttar Pradesh, India</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span>📞</span>
            <div>
              <h3>Phone</h3>
              <p>+1-212-256-7890</p>
              <p>Mon-Fri, 9am - 6pm</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span>📧</span>
            <div>
              <h3>Email</h3>
              <p>contact@tomato.com</p>
              <p>We reply within 24 hours</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span>🕐</span>
            <div>
              <h3>Working Hours</h3>
              <p>Monday - Friday: 9am - 10pm</p>
              <p>Saturday - Sunday: 10am - 8pm</p>
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="contact-form-container">
          {submitted ? (
            <div className="contact-success">
              <p>✅</p>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send us a Message</h2>

              <div className="form-row">
                <div className="form-field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message ✉️'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;