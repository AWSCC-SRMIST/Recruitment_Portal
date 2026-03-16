import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaCloud } from 'react-icons/fa';

import './SuccessPage.css';

export default function SuccessPage() {
  const [ref] = useState(() => `ACC-${Date.now().toString(36).toUpperCase()}`);

  // Prevent going back to form after submission
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handler = () => window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return (
    <div className="sp-page">
      <div className="sp-card">
        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, marginBottom: 32,
        }}>
          <div style={{
            width: 36, height: 36, background: 'linear-gradient(135deg, #7C5AED, #FF9900)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FaCloud style={{ color: '#fff', fontSize: 18 }} />
          </div>
          <span style={{ fontFamily: 'Michroma, sans-serif', fontSize: 14, color: '#1a1a2e', fontWeight: 700 }}>
            AWS CLOUD CLUB SRM
          </span>
        </div>

        {/* Success icon */}
        <div className="sp-icon-wrap">
          <FaCheckCircle />
        </div>

        <h1 className="sp-title">Application Submitted!</h1>
        <p className="sp-subtitle">
          Thank you for applying to AWS Cloud Club SRM. Your application has been
          received and will be reviewed by our team. We'll reach out to your SRM
          email address with next steps.
        </p>

        {/* Reference ID */}
        <div className="sp-ref">
          <p className="sp-ref-label">Application Reference ID</p>
          <p className="sp-ref-value">{ref}</p>
        </div>

        {/* Next steps */}
        <div className="sp-next-steps">
          <p className="sp-next-title">What happens next</p>
          {[
            'Our recruitment team reviews your application',
            'Shortlisted candidates will be contacted for an interview',
            'Final results will be announced via SRM email',
          ].map((text, i) => (
            <div key={i} className="sp-step-item">
              <div className="sp-step-num">{i + 1}</div>
              <p className="sp-step-text">{text}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="sp-actions">
          <Link to="/" className="btn-primary-acc">
            <FaHome /> Back to Home
          </Link>
        </div>

        {/* Footer note */}
        <p style={{
          fontFamily: 'Raleway, sans-serif', fontSize: 12, color: '#aaa',
          marginTop: 28,
        }}>
          &copy; {new Date().getFullYear()} AWS Cloud Club at SRM Institute of Science and Technology
        </p>
      </div>
    </div>
  );
}
