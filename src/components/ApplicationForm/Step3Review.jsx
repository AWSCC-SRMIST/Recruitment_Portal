import React from 'react';
import {
  FaCheckCircle, FaArrowLeft, FaPaperPlane, FaUser,
  FaLayerGroup, FaShieldAlt,
} from 'react-icons/fa';
import './ApplicationForm.css';

function InfoTile({ label, value }) {
  return (
    <div style={{
      background: '#f8f9ff', border: '1px solid #eef0fa',
      borderRadius: 10, padding: '14px 16px',
    }}>
      <p style={{
        fontFamily: 'Share Tech, sans-serif', fontSize: 11,
        color: '#7C5AED', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0,
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: 'Raleway, sans-serif', fontSize: 14, fontWeight: 600,
        color: '#1a1a2e', margin: '4px 0 0',
        wordBreak: 'break-word',
      }}>
        {value || <span style={{ color: '#ccc' }}>Not provided</span>}
      </p>
    </div>
  );
}

function SectionBlock({ icon, title, color, children }) {
  return (
    <div style={{
      border: '1px solid rgba(124,90,237,0.1)', borderRadius: 14,
      overflow: 'hidden', marginBottom: 20,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 20px', background: 'rgba(124,90,237,0.04)',
        borderBottom: '1px solid rgba(124,90,237,0.08)',
      }}>
        <span style={{ color: color || '#7C5AED', fontSize: 18 }}>{icon}</span>
        <p style={{
          fontFamily: 'Sarpanch, sans-serif', fontSize: 16, fontWeight: 700,
          color: '#1a1a2e', margin: 0,
        }}>
          {title}
        </p>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {children}
      </div>
    </div>
  );
}

function TileGrid({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: 12,
    }}>
      {children}
    </div>
  );
}

const DOMAIN_NAMES = { tech: 'Tech', corp: 'Corp', creatives: 'Creatives' };

export default function Step3Review({
  personalInfo, docsAndDomains, onPrev, onSubmit, submitting, submitError,
}) {
  const pi = personalInfo;
  const dd = docsAndDomains;

  const notices = [
    'Please ensure all information is accurate and up-to-date',
    'Your application will be reviewed by our team',
    'You will receive an email confirmation after submission',
    'Further communication will be sent to your SRM email address',
  ];

  return (
    <div className="af-form-card">
      <div className="af-card-header">
        <div className="af-card-icon"><FaCheckCircle /></div>
        <div>
          <h2 className="af-card-title">Review Your Application</h2>
          <p className="af-card-subtitle">Please review all information before submitting</p>
        </div>
      </div>

      {/* Personal Info */}
      <SectionBlock icon={<FaUser />} title="Personal Information">
        <TileGrid>
          <InfoTile label="Name" value={pi.name} />
          <InfoTile label="Degree Program" value={pi.degree} />
          <InfoTile label="SRM Email" value={pi.srmEmail} />
          <InfoTile label="Contact Number" value={pi.contact} />
          <InfoTile label="Registration Number" value={pi.regNumber} />
          <InfoTile label="Personal Email" value={pi.personalEmail} />
          <InfoTile label="Academic Year" value={pi.year} />
          <InfoTile label="Date of Birth" value={pi.dob} />
        </TileGrid>
      </SectionBlock>

      {/* Preferences & Docs */}
      <SectionBlock icon={<FaLayerGroup />} title="Preferences & Documents" color="#4361ee">
        <div style={{ marginBottom: 16 }}>
          <p style={{
            fontFamily: 'Share Tech, sans-serif', fontSize: 11,
            color: '#7C5AED', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8,
          }}>
            Domain Preference ({dd.subDomains.length} sub-domain{dd.subDomains.length !== 1 ? 's' : ''} selected)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span style={{
              background: 'rgba(124,90,237,0.1)', border: '1px solid rgba(124,90,237,0.2)',
              borderRadius: 20, padding: '4px 14px',
              fontFamily: 'Share Tech, sans-serif', fontSize: 13, color: '#7C5AED',
            }}>
              {DOMAIN_NAMES[dd.domain] || 'Not selected'}
            </span>
            {dd.subDomains.map(s => (
              <span key={s} style={{
                background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.2)',
                borderRadius: 20, padding: '4px 14px',
                fontFamily: 'Share Tech, sans-serif', fontSize: 13, color: '#4361ee',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <TileGrid>
          <InfoTile
            label={`AWS Certificate${dd.certLinks.filter(l => l.trim()).length > 1 ? 's' : ''}`}
            value={`${dd.certLinks.filter(l => l.trim()).length} link(s) provided`}
          />
          <InfoTile label="Resume Link" value={dd.resumeLink} />
          <InfoTile label="LinkedIn Profile" value={dd.linkedin} />
          <InfoTile label="GitHub Profile" value={dd.github || 'Not provided'} />
        </TileGrid>
      </SectionBlock>

      {/* Before you submit */}
      <SectionBlock icon={<FaShieldAlt />} title="Before You Submit" color="#22c55e">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {notices.map((n, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              background: 'rgba(67,97,238,0.04)', border: '1px solid rgba(67,97,238,0.1)',
              borderRadius: 10, padding: '12px 14px',
            }}>
              <span style={{ color: '#7C5AED', marginTop: 1, fontSize: 12 }}>•</span>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 13, color: '#444', margin: 0, lineHeight: 1.5 }}>
                {n}
              </p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {submitError && (
        <div style={{
          background: 'rgba(229,62,62,0.06)', border: '1px solid rgba(229,62,62,0.2)',
          borderRadius: 10, padding: '12px 16px', marginBottom: 16,
        }}>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 13, color: '#e53e3e', margin: 0 }}>
            {submitError}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="af-nav-buttons">
        <button className="af-btn-prev" onClick={onPrev} disabled={submitting}>
          <FaArrowLeft /> Previous
        </button>
        <div style={{ textAlign: 'right' }}>
          <button
            className="af-btn-submit"
            onClick={onSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : (
              <><FaPaperPlane /> Submit Application</>
            )}
          </button>
          <p className="af-submit-note">
            {submitting
              ? 'Please don\'t close this tab while submitting'
              : 'Processing may take up to 15 seconds'}
          </p>
        </div>
      </div>
    </div>
  );
}
