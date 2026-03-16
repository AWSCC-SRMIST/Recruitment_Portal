import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLayerGroup, FaCheckCircle, FaArrowLeft, FaCloud } from 'react-icons/fa';

import CertificateGate from './CertificateGate';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2DocsAndDomains from './Step2DocsAndDomains';
import Step3Review from './Step3Review';
import './ApplicationForm.css';

const STEPS = [
  { label: 'Personal Info', icon: <FaUser /> },
  { label: 'Preferences', icon: <FaLayerGroup /> },
  { label: 'Review & Submit', icon: <FaCheckCircle /> },
];

const INITIAL_PERSONAL = {
  srmEmail: '', name: '', regNumber: '', year: '',
  degree: '', contact: '', personalEmail: '', dob: '',
};

const INITIAL_DOCS = {
  certLinks: [''],  // string[] (1-3 URLs)
  domain: '',       // 'tech' | 'corp' | 'creatives'
  subDomains: [],   // string[]
  resumeLink: '',   // string URL
  linkedin: '',
  github: '',
};

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [hasCert, setHasCert] = useState(null); // null | 'yes' | 'no'
  const [step, setStep] = useState(0);           // 0-2 (after gate)
  const [personalInfo, setPersonalInfo] = useState(INITIAL_PERSONAL);
  const [docsAndDomains, setDocsAndDomains] = useState(INITIAL_DOCS);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // If certificate gate not passed yet
  if (hasCert === null || hasCert === 'no') {
    return (
      <CertificateGate
        value={hasCert}
        onChange={setHasCert}
      />
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError('');
    try {
      const certLinks = docsAndDomains.certLinks.filter(l => l.trim() !== '');
      const payload = {
        timestamp: new Date().toISOString(),
        name: personalInfo.name,
        srmEmail: personalInfo.srmEmail,
        personalEmail: personalInfo.personalEmail,
        regNumber: personalInfo.regNumber,
        year: personalInfo.year,
        degree: personalInfo.degree,
        contact: personalInfo.contact,
        dob: personalInfo.dob || '',
        domain: docsAndDomains.domain,
        subDomains: docsAndDomains.subDomains.join(', '),
        linkedin: docsAndDomains.linkedin,
        github: docsAndDomains.github || '',
        resumeUrl: docsAndDomains.resumeLink,
        certUrl1: certLinks[0] || '',
        certUrl2: certLinks[1] || '',
        certUrl3: certLinks[2] || '',
      };

      const scriptUrl = process.env.REACT_APP_SCRIPT_URL;
      if (scriptUrl && !scriptUrl.includes('YOUR_SCRIPT_ID')) {
        await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      } else {
        console.log('Google Sheets payload (no script URL configured):', payload);
      }

      navigate('/success');
    } catch (err) {
      console.error(err);
      setSubmitError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
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

        {/* Step indicator */}
        <div className="af-steps">
          {STEPS.map((s, i) => {
            const state = i < step ? 'done' : i === step ? 'active' : 'inactive';
            return (
              <React.Fragment key={i}>
                <div className={`af-step ${state}`}>
                  <div className="af-step-icon">
                    {state === 'done' ? <FaCheckCircle /> : s.icon}
                  </div>
                  <span className="af-step-label">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <span className="af-step-chevron">›</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step content */}
        {step === 0 && (
          <Step1PersonalInfo
            data={personalInfo}
            onChange={setPersonalInfo}
            onNext={() => setStep(1)}
          />
        )}

        {step === 1 && (
          <Step2DocsAndDomains
            data={docsAndDomains}
            onChange={setDocsAndDomains}
            onPrev={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step3Review
            personalInfo={personalInfo}
            docsAndDomains={docsAndDomains}
            onPrev={() => setStep(1)}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitError={submitError}
          />
        )}

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
