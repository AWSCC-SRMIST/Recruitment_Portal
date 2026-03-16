import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft, FaArrowRight, FaAward, FaTimesCircle, FaCheckCircle, FaCloud,
} from 'react-icons/fa';

import './ApplicationForm.css';

export default function CertificateGate({ value, onChange }) {
  const [selected, setSelected] = useState(value);

  function handleProceed() {
    if (selected === 'yes') onChange('yes');
  }

  return (
    <div className="af-page">
      <div className="af-container">

        {/* Header */}
        <div className="acc-card af-header">
          <div className="af-header-left">
            <div className="af-logo">
              <FaCloud style={{ fontSize: 22 }} />
            </div>
            <div>
              <p className="af-header-title">AWS CLOUD CLUB SRM</p>
              <p className="af-header-subtitle">ACC'25 Team Recruitment</p>
            </div>
          </div>
          <Link to="/" className="af-back-btn">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>

        {/* Gate card */}
        <div className="af-form-card" style={{ textAlign: 'center', padding: '48px 36px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'linear-gradient(135deg, rgba(124,90,237,0.12), rgba(67,97,238,0.12))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: '#7C5AED', margin: '0 auto 20px',
          }}>
            <FaAward />
          </div>

          <h2 style={{
            fontFamily: 'Sarpanch, sans-serif', fontSize: 22, fontWeight: 700,
            color: '#1a1a2e', marginBottom: 8,
          }}>
            AWS Certification Check
          </h2>
          <p style={{
            fontFamily: 'Raleway, sans-serif', fontSize: 14, color: '#666',
            maxWidth: 420, margin: '0 auto 32px', lineHeight: 1.7,
          }}>
            AWS Cloud Club SRM requires all applicants to hold at least one valid
            AWS Certification. Please confirm before proceeding.
          </p>

          {/* Yes/No options */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {/* YES */}
            <div
              onClick={() => setSelected('yes')}
              style={{
                width: 180, padding: '24px 16px', borderRadius: 14, cursor: 'pointer',
                border: `2px solid ${selected === 'yes' ? '#7C5AED' : '#dde2f0'}`,
                background: selected === 'yes' ? 'rgba(124,90,237,0.06)' : '#fff',
                transition: 'all 0.2s', textAlign: 'center',
              }}
            >
              <FaCheckCircle
                style={{
                  fontSize: 32, marginBottom: 10,
                  color: selected === 'yes' ? '#7C5AED' : '#ccc',
                }}
              />
              <p style={{
                fontFamily: 'Sarpanch, sans-serif', fontWeight: 700,
                fontSize: 16, color: selected === 'yes' ? '#7C5AED' : '#333', margin: 0,
              }}>
                Yes, I do
              </p>
              <p style={{
                fontFamily: 'Raleway, sans-serif', fontSize: 12,
                color: '#888', marginTop: 4,
              }}>
                I hold an AWS Certification
              </p>
            </div>

            {/* NO */}
            <div
              onClick={() => setSelected('no')}
              style={{
                width: 180, padding: '24px 16px', borderRadius: 14, cursor: 'pointer',
                border: `2px solid ${selected === 'no' ? '#e53e3e' : '#dde2f0'}`,
                background: selected === 'no' ? 'rgba(229,62,62,0.04)' : '#fff',
                transition: 'all 0.2s', textAlign: 'center',
              }}
            >
              <FaTimesCircle
                style={{
                  fontSize: 32, marginBottom: 10,
                  color: selected === 'no' ? '#e53e3e' : '#ccc',
                }}
              />
              <p style={{
                fontFamily: 'Sarpanch, sans-serif', fontWeight: 700,
                fontSize: 16, color: selected === 'no' ? '#e53e3e' : '#333', margin: 0,
              }}>
                No, I don't
              </p>
              <p style={{
                fontFamily: 'Raleway, sans-serif', fontSize: 12,
                color: '#888', marginTop: 4,
              }}>
                I don't have one yet
              </p>
            </div>
          </div>

          {/* Blocked message */}
          {selected === 'no' && (
            <div style={{
              background: 'rgba(229,62,62,0.06)', border: '1px solid rgba(229,62,62,0.2)',
              borderRadius: 12, padding: '20px 24px', maxWidth: 460, margin: '0 auto 24px',
            }}>
              <p style={{
                fontFamily: 'Sarpanch, sans-serif', fontSize: 15, fontWeight: 700,
                color: '#e53e3e', marginBottom: 8,
              }}>
                Application Not Eligible
              </p>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 13, color: '#c0392b', lineHeight: 1.7, margin: 0 }}>
                An AWS Certification is mandatory to apply. Get certified first, then come back to apply!
                Visit our{' '}
                <a
                  href="https://aws-cloud-club-srm.vercel.app/resources"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#7C5AED', fontWeight: 600 }}
                >
                  Resources page
                </a>
                {' '}for the 30-day certification guide.
              </p>
            </div>
          )}

          {/* Proceed button */}
          {selected === 'yes' && (
            <button className="btn-primary-acc" onClick={handleProceed} style={{ fontSize: 15 }}>
              Continue to Application <FaArrowRight />
            </button>
          )}

          {!selected && (
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 13, color: '#aaa' }}>
              Please select an option above
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="af-footer">
          <p className="af-footer-brand">AWS CLOUD CLUB SRM</p>
          <p className="af-footer-copy">
            &copy; {new Date().getFullYear()} AWS Cloud Club at SRM Institute of Science and Technology.
          </p>
        </div>

      </div>
    </div>
  );
}
