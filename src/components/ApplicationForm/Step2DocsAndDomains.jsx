import React, { useState } from 'react';
import {
  FaLayerGroup, FaArrowLeft, FaArrowRight, FaPlus, FaTrash,
  FaLinkedin, FaGithub, FaCode, FaBriefcase, FaPalette, FaAward,
  FaLink, FaFileAlt,
} from 'react-icons/fa';
import './ApplicationForm.css';

const DOMAINS = [
  {
    key: 'tech',
    name: 'Tech',
    icon: <FaCode />,
    color: '#7C5AED',
    bg: 'rgba(124,90,237,0.08)',
    subDomains: ['Web / App Dev', 'AI & ML', 'Cloud & DevOps'],
  },
  {
    key: 'corp',
    name: 'Corp',
    icon: <FaBriefcase />,
    color: '#4361ee',
    bg: 'rgba(67,97,238,0.08)',
    subDomains: ['Events', 'Public Relations', 'HR & Admin', 'Sponsorship'],
  },
  {
    key: 'creatives',
    name: 'Creatives',
    icon: <FaPalette />,
    color: '#f77f00',
    bg: 'rgba(247,127,0,0.08)',
    subDomains: ['Digital Design', 'Media', 'UI/UX'],
  },
];

function isValidUrl(url) {
  try { new URL(url); return true; } catch { return false; }
}

function validate(data) {
  const errs = {};

  // Cert links — at least 1 non-empty valid URL
  const validCerts = data.certLinks.filter(l => l.trim() !== '');
  if (validCerts.length === 0)
    errs.certLinks = 'Please provide at least one AWS certificate link (e.g., Credly)';
  else if (validCerts.some(l => !isValidUrl(l)))
    errs.certLinks = 'One or more certificate links are not valid URLs';

  if (!data.domain)
    errs.domain = 'Please select a domain';
  if (!data.subDomains || data.subDomains.length === 0)
    errs.subDomains = 'Please select at least one sub-domain';

  if (!data.resumeLink || !isValidUrl(data.resumeLink))
    errs.resumeLink = 'Please provide a valid resume link (e.g., Google Drive, Notion)';

  if (!data.linkedin || !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(data.linkedin))
    errs.linkedin = 'Please enter a valid LinkedIn profile URL';

  if (data.domain === 'tech') {
    if (!data.github || !/^https?:\/\/(www\.)?github\.com\/.+/.test(data.github))
      errs.github = 'GitHub profile is required for the Tech domain';
  }

  return errs;
}

export default function Step2DocsAndDomains({ data, onChange, onPrev, onNext }) {
  const [errors, setErrors] = useState({});

  function update(field, val) {
    onChange({ ...data, [field]: val });
  }

  function updateCertLink(idx, val) {
    const updated = [...data.certLinks];
    updated[idx] = val;
    update('certLinks', updated);
  }

  function addCertLink() {
    if (data.certLinks.length < 3)
      update('certLinks', [...data.certLinks, '']);
  }

  function removeCertLink(idx) {
    const updated = data.certLinks.filter((_, i) => i !== idx);
    update('certLinks', updated.length === 0 ? [''] : updated);
  }

  function selectDomain(key) {
    onChange({ ...data, domain: key, subDomains: [], github: '' });
  }

  function toggleSubDomain(sub) {
    const next = data.subDomains.includes(sub)
      ? data.subDomains.filter(s => s !== sub)
      : [...data.subDomains, sub];
    update('subDomains', next);
  }

  function handleNext() {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onNext();
  }

  const selectedDomain = DOMAINS.find(d => d.key === data.domain);
  const e = errors;

  return (
    <div className="af-form-card">
      <div className="af-card-header">
        <div className="af-card-icon"><FaLayerGroup /></div>
        <div>
          <h2 className="af-card-title">Domain Preferences &amp; Documents</h2>
          <p className="af-card-subtitle">Choose your domain and share your document links</p>
        </div>
      </div>

      {/* AWS Certificate Links */}
      <div className="af-field-group">
        <label className="af-label">
          AWS Certificate Link(s) <span className="req">*</span>
          <span style={{ color: '#aaa', fontWeight: 400, marginLeft: 8 }}>Min 1, Max 3 — share your Credly or AWS portal link</span>
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.certLinks.map((link, idx) => (
            <div key={idx} className="af-input-wrap" style={{ gap: 8 }}>
              <span className="af-input-icon"><FaLink /></span>
              <input
                className={`af-input ${e.certLinks ? 'has-error' : ''}`}
                type="url"
                placeholder={`https://www.credly.com/badges/your-badge-${idx + 1}`}
                value={link}
                onChange={ev => updateCertLink(idx, ev.target.value)}
              />
              {data.certLinks.length > 1 && (
                <button
                  onClick={() => removeCertLink(idx)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#e53e3e', fontSize: 14, padding: '0 4px', flexShrink: 0,
                  }}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
        {data.certLinks.length < 3 && (
          <button
            onClick={addCertLink}
            style={{
              marginTop: 10, background: 'none', border: '1.5px dashed rgba(124,90,237,0.35)',
              borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
              fontFamily: 'Share Tech, sans-serif', fontSize: 13, color: '#7C5AED',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <FaPlus style={{ fontSize: 11 }} /> Add another certificate
          </button>
        )}
        {e.certLinks && <p className="field-error"><span>•</span>{e.certLinks}</p>}
      </div>

      {/* Domain selection */}
      <div className="af-field-group">
        <label className="af-label">Domain Preference <span className="req">*</span></label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {DOMAINS.map(d => (
            <div
              key={d.key}
              onClick={() => selectDomain(d.key)}
              style={{
                flex: '1 1 160px', minWidth: 140, padding: '18px 16px',
                borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                border: `2px solid ${data.domain === d.key ? d.color : '#dde2f0'}`,
                background: data.domain === d.key ? d.bg : '#fff',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 22, color: data.domain === d.key ? d.color : '#ccc', marginBottom: 8 }}>
                {d.icon}
              </div>
              <p style={{
                fontFamily: 'Sarpanch, sans-serif', fontSize: 14, fontWeight: 700,
                color: data.domain === d.key ? d.color : '#333', margin: 0,
              }}>
                {d.name}
              </p>
            </div>
          ))}
        </div>
        {e.domain && <p className="field-error"><span>•</span>{e.domain}</p>}
      </div>

      {/* Sub-domain selection */}
      {selectedDomain && (
        <div className="af-field-group">
          <label className="af-label">
            Sub-Domain <span className="req">*</span>
            <span style={{ color: '#aaa', fontWeight: 400, marginLeft: 8 }}>You can select multiple</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {selectedDomain.subDomains.map(sub => {
              const isActive = data.subDomains.includes(sub);
              return (
                <div
                  key={sub}
                  onClick={() => toggleSubDomain(sub)}
                  style={{
                    padding: '10px 18px', borderRadius: 8, cursor: 'pointer',
                    border: `1.5px solid ${isActive ? selectedDomain.color : '#dde2f0'}`,
                    background: isActive ? selectedDomain.bg : '#fff',
                    fontFamily: 'Share Tech, sans-serif', fontSize: 13,
                    color: isActive ? selectedDomain.color : '#555',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {isActive && <FaAward style={{ fontSize: 11 }} />}
                  {sub}
                </div>
              );
            })}
          </div>
          {e.subDomains && <p className="field-error"><span>•</span>{e.subDomains}</p>}
        </div>
      )}

      {/* Resume Link */}
      <div className="af-field-group">
        <label className="af-label">
          Resume Link <span className="req">*</span>
          <span style={{ color: '#aaa', fontWeight: 400, marginLeft: 8 }}>Google Drive, Notion, or any shareable link</span>
        </label>
        <div className="af-input-wrap">
          <span className="af-input-icon"><FaFileAlt /></span>
          <input
            className={`af-input ${e.resumeLink ? 'has-error' : ''}`}
            type="url"
            placeholder="https://drive.google.com/file/d/your-resume"
            value={data.resumeLink}
            onChange={ev => update('resumeLink', ev.target.value)}
          />
        </div>
        {e.resumeLink && <p className="field-error"><span>•</span>{e.resumeLink}</p>}
      </div>

      {/* LinkedIn */}
      <div className="af-field-group">
        <label className="af-label">LinkedIn Profile <span className="req">*</span></label>
        <div className="af-input-wrap">
          <span className="af-input-icon"><FaLinkedin /></span>
          <input
            className={`af-input ${e.linkedin ? 'has-error' : ''}`}
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            value={data.linkedin}
            onChange={ev => update('linkedin', ev.target.value)}
          />
        </div>
        {e.linkedin && <p className="field-error"><span>•</span>{e.linkedin}</p>}
      </div>

      {/* GitHub — mandatory only for Tech */}
      <div className="af-field-group">
        <label className="af-label">
          GitHub Profile
          {data.domain === 'tech'
            ? <span className="req"> *</span>
            : <span style={{ color: '#aaa', fontWeight: 400, marginLeft: 8 }}>(Optional — required for Tech)</span>
          }
        </label>
        <div className="af-input-wrap">
          <span className="af-input-icon"><FaGithub /></span>
          <input
            className={`af-input ${e.github ? 'has-error' : ''}`}
            type="url"
            placeholder="https://github.com/your-username"
            value={data.github}
            onChange={ev => update('github', ev.target.value)}
          />
        </div>
        {e.github && <p className="field-error"><span>•</span>{e.github}</p>}
      </div>

      {/* Navigation */}
      <div className="af-nav-buttons">
        <button className="af-btn-prev" onClick={onPrev}>
          <FaArrowLeft /> Previous
        </button>
        <button className="af-btn-next" onClick={handleNext}>
          Next Step <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
