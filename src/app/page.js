'use client';

import { useEffect, useState } from 'react';
import { LuConstruction } from "react-icons/lu";

export default function UnderConstruction() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const updateCountdown = () => {
      const launchDate = new Date();
      launchDate.setDate(launchDate.getDate() + 30);

      const now = new Date().getTime();
      const distance = launchDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0')
      });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    alert(`Thank you! We'll notify you at ${email} when we launch.`);
    e.target.reset();
  };

  return (
    <div className={`page-container ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="construction-content">
          
          {/* Animated Construction Icon */}
          <div className="construction-icon">
            <div className="icon-wrapper">
              <LuConstruction className="construction-svg" />
            </div>
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
            <div className="pulse-ring delay-2"></div>
          </div>

          {/* Animated Title */}
          <div className="title-group">
            <h1>Under Construction</h1>
            <div className="title-underline"></div>
          </div>

          <p className="subtitle">
            We&apos;re working hard to bring you an amazing website experience.
            Our new website will be launching soon!
          </p>

          {/* Enhanced Countdown */}
          <div className="countdown">
            <div className="countdown-item">
              <div className="countdown-value" data-value={timeLeft.days}>
                {timeLeft.days}
              </div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value" data-value={timeLeft.hours}>
                {timeLeft.hours}
              </div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value" data-value={timeLeft.minutes}>
                {timeLeft.minutes}
              </div>
              <div className="countdown-label">Minutes</div>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="progress-container">
            <div className="progress-label">
              <span>Development Progress</span>
              <span>65%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill">
                <div className="progress-shine"></div>
              </div>
            </div>
          </div>

          {/* Floating Elements for Decoration */}
          <div className="floating-elements">
            <div className="floating-element element-1">🚀</div>
            <div className="floating-element element-2">⚡</div>
            <div className="floating-element element-3">🌟</div>
            <div className="floating-element element-4">💫</div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, var(--light) 0%, #ffffff 100%);
          color: var(--dark);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease;
        }

        .page-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .construction-content {
          text-align: center;
          padding: 2.5rem 0;
          position: relative;
        }

        /* Enhanced Construction Icon */
        .construction-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%);
          border-radius: 50%;
          margin: 0 auto 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 182, 122, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .construction-svg {
          font-size: 2.5rem;
          color: var(--accent);
          animation: hammer 2s ease-in-out infinite;
        }

        /* Pulse Rings */
        .pulse-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid var(--accent);
          border-radius: 50%;
          animation: pulse 3s linear infinite;
          opacity: 0;
        }

        .pulse-ring.delay-1 {
          animation-delay: 1s;
        }

        .pulse-ring.delay-2 {
          animation-delay: 2s;
        }

        /* Enhanced Title */
        .title-group {
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: slideIn 1s ease-out;
        }

        .title-underline {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, var(--accent), var(--secondary));
          margin: 0 auto;
          border-radius: 2px;
          animation: expandWidth 1s ease-out 0.5s both;
        }

        .subtitle {
          font-size: 1.25rem;
          color: var(--gray);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        /* Enhanced Countdown */
        .countdown {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .countdown-item {
          background: white;
          padding: 2rem 1.5rem;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          min-width: 120px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .countdown-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--accent), var(--secondary));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .countdown-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .countdown-item:hover::before {
          transform: scaleX(1);
        }

        .countdown-value {
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 0.5rem;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
        }

        .countdown-label {
          font-size: 0.9rem;
          color: var(--gray);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Enhanced Progress Bar */
        .progress-container {
          max-width: 500px;
          margin: 0 auto 3rem;
          animation: fadeInUp 1s ease-out 0.9s both;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--dark);
        }

        .progress-bar {
          height: 12px;
          background: #e1e3e5;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--secondary));
          width: 65%;
          border-radius: 10px;
          position: relative;
          animation: progressGrow 2s ease-in-out;
        }

        .progress-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shine 3s ease-in-out infinite;
        }

        /* Floating Elements */
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          font-size: 1.5rem;
          opacity: 0.1;
          animation: floatAround 20s linear infinite;
        }

        .element-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .element-2 { top: 20%; right: 15%; animation-delay: -5s; }
        .element-3 { bottom: 30%; left: 15%; animation-delay: -10s; }
        .element-4 { bottom: 15%; right: 10%; animation-delay: -15s; }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, 20px) rotate(90deg); }
          50% { transform: translate(0, 40px) rotate(180deg); }
          75% { transform: translate(-20px, 20px) rotate(270deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes hammer {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }

        @keyframes slideIn {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100px; }
        }

        @keyframes progressGrow {
          from { width: 0%; }
          to { width: 65%; }
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }
          
          .subtitle {
            font-size: 1.125rem;
          }
          
          .countdown {
            gap: 1rem;
          }
          
          .countdown-item {
            min-width: 90px;
            padding: 1.5rem 0.5rem;
          }
          
          .countdown-value {
            font-size: 2.2rem;
          }

          .construction-icon {
            width: 120px;
            height: 120px;
          }

          .icon-wrapper {
            width: 70px;
            height: 70px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }
          
          .construction-content {
            padding: 2rem 0;
          }
          
          .construction-icon {
            width: 100px;
            height: 100px;
            margin-bottom: 2rem;
          }

          .icon-wrapper {
            width: 60px;
            height: 60px;
          }

          .construction-svg {
            font-size: 2rem;
          }
          
          .countdown-item {
            min-width: 70px;
            padding: 1rem 0.75rem;

          }
          
          .countdown-value {
            font-size: 1.8rem;
          }

          h1 {
            font-size: 2rem;
          }

          .floating-element {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}