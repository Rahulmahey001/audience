'use client';

import { useState } from 'react';
import Head from 'next/head';
import ReviewForm from './ReviewForm';

export default function SubmitReviewPage() {
  return (
    <>
      <Head>
        <title>Submit Review - Share Your Experience</title>
        <meta name="description" content="Share your feedback and help us improve our services" />
      </Head>

      <div className="page-container">
        <div className="page-header">
          <h1>Write a Review</h1>
          <p>Your honest feedback helps us improve and serve you better</p>
        </div>
        
        <ReviewForm />
        
        <div className="info-section">
          <h3>Why your review matters:</h3>
          <ul>
            <li>Help other customers make informed decisions</li>
            <li>Provide valuable feedback for our improvement</li>
            <li>Share your unique experience with our community</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 2rem 1rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 2.5rem;
        }

        .page-header p {
          color: #666;
          font-size: 1.2rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .info-section {
          max-width: 600px;
          margin: 3rem auto 0;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .info-section h3 {
          color: #333;
          margin-bottom: 1rem;
        }

        .info-section ul {
          color: #666;
          line-height: 1.6;
          padding-left: 1.5rem;
        }

        .info-section li {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }

          .page-header p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}