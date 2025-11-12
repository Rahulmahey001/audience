import { useState } from 'react';

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    rating: '5',
    review: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating)
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          text: 'Thank you! Your review has been submitted successfully.',
          type: 'success'
        });
        // Reset form
        setFormData({ name: '', rating: '5', review: '' });
        setCharCount(0);
      } else {
        setMessage({
          text: result.message || 'Error submitting review. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      setMessage({
        text: 'Network error. Please check your connection and try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update character count for review field
    if (name === 'review') {
      setCharCount(value.length);
    }
  };

  const RatingStars = ({ value, onChange }) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="star-label">
            <input
              type="radio"
              name="rating"
              value={star}
              checked={value === star.toString()}
              onChange={onChange}
              className="star-input"
            />
            <span className="star">★</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="review-form-container">
      <h2>Share Your Experience</h2>
      <p className="form-subtitle">We value your feedback! Please share your thoughts below.</p>
      
      <form onSubmit={handleSubmit} className="review-form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength="100"
            className="form-input"
            placeholder="Enter your name"
          />
        </div>

        {/* Rating Field */}
        <div className="form-group">
          <label className="form-label">
            Rating *
          </label>
          <div className="rating-container">
            <RatingStars value={formData.rating} onChange={handleChange} />
            <span className="rating-text">
              {formData.rating === '5' ? 'Excellent' :
               formData.rating === '4' ? 'Very Good' :
               formData.rating === '3' ? 'Good' :
               formData.rating === '2' ? 'Fair' : 'Poor'}
            </span>
          </div>
        </div>

        {/* Review Field */}
        <div className="form-group">
          <label htmlFor="review" className="form-label">
            Your Review *
          </label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            maxLength="1000"
            rows="6"
            className="form-textarea"
            placeholder="Share your detailed experience with us..."
          />
          <div className="char-count">
            {charCount}/1000 characters
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>

      {/* Message Display */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <style jsx>{`
        .review-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: #333;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .form-subtitle {
          color: #666;
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #0070f3;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .rating-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .rating-stars {
          display: flex;
          gap: 0.25rem;
        }

        .star-label {
          cursor: pointer;
          padding: 0.25rem;
        }

        .star-input {
          display: none;
        }

        .star {
          font-size: 2rem;
          color: #ddd;
          transition: color 0.2s ease;
        }

        .star-input:checked ~ .star,
        .star-label:hover .star {
          color: #ffc107;
        }

        .rating-text {
          font-weight: 600;
          color: #666;
        }

        .char-count {
          text-align: right;
          font-size: 0.875rem;
          color: #666;
          margin-top: 0.25rem;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: #0051a8;
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .message {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
        }

        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .review-form-container {
            padding: 1rem;
            margin: 1rem;
          }

          .rating-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}