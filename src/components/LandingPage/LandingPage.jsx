import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCloud, FaAward, FaUsers, FaLaptopCode, FaRocket,
  FaBriefcase, FaChalkboardTeacher, FaArrowRight,
  FaCode, FaPalette, FaPhoneAlt,
} from 'react-icons/fa';

import './LandingPage.css';

const benefits = [
  { icon: <FaAward />, label: 'AWS Certification\nGuidance' },
  { icon: <FaLaptopCode />, label: 'Hands-on Cloud\nProjects' },
  { icon: <FaUsers />, label: 'Networking\nOpportunities' },
  { icon: <FaChalkboardTeacher />, label: 'Industry Expert\nSessions' },
  { icon: <FaRocket />, label: 'Hackathon\nParticipation' },
  { icon: <FaBriefcase />, label: 'Leadership\nExperience' },
  { icon: <FaCloud />, label: 'AWS Credits\nAccess' },
  { icon: <FaCloud />, label: 'Career\nDevelopment' },
];

const domains = [
  {
    key: 'tech',
    name: 'Tech',
    iconClass: 'tech',
    icon: <FaCode />,
    desc: 'Drive innovation through development projects, cloud workshops, and AI/ML research initiatives.',
    tags: ['Web / App Dev', 'AI & ML', 'Cloud & DevOps'],
    tagClass: '',
  },
  {
    key: 'corp',
    name: 'Corp',
    iconClass: 'corp',
    icon: <FaBriefcase />,
    desc: 'Lead event planning, public relations, HR, sponsorship drives, and strategic execution.',
    tags: ['Events', 'Personal Relations', 'HR & Admin', 'Sponsorship'],
    tagClass: 'corp-tag',
  },
  {
    key: 'creatives',
    name: 'Creatives',
    iconClass: 'creatives',
    icon: <FaPalette />,
    desc: 'Create compelling visual experiences through design, media, and UI/UX for ACC\'s brand.',
    tags: ['Digital Design', 'Media', 'UI/UX'],
    tagClass: 'creatives-tag',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4ff' }}>
      <div className="lp-container">

        {/* Header */}
        <div className="acc-card lp-header" style={{ marginTop: 24 }}>
          <div className="lp-header-inner">
            <div className="lp-logo">
              <FaCloud style={{ fontSize: 26 }} />
            </div>
            <div>
              <p className="lp-header-title">AWS CLOUD CLUB SRM</p>
              <p className="lp-header-subtitle">ACC'25 Team Recruitment</p>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="acc-card lp-hero" style={{ marginBottom: 24 }}>
          <div className="lp-hero-badge">
            <FaCloud />
            Join the ACC Family
          </div>
          <h1 className="lp-hero-title">
            Shape the{' '}
            <span className="gradient-text">Future of Cloud</span>
          </h1>
          <p className="lp-hero-desc">
            AWS Cloud Club at SRM Institute of Science and Technology empowers
            students to build cloud expertise, lead projects, and launch careers
            in the fastest-growing tech domain.
          </p>
          <button
            className="btn-primary-acc"
            onClick={() => navigate('/apply')}
            style={{ fontSize: 16, padding: '14px 40px' }}
          >
            Start Your Application <FaArrowRight />
          </button>
          <p className="lp-hero-cta-note">Application takes just 5 minutes</p>
        </div>

        {/* Benefits */}
        <div className="lp-section">
          <h2 className="lp-section-title">Why Join AWS Cloud Club SRM?</h2>
          <div className="lp-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="lp-benefit-card">
                <span className="lp-benefit-icon">{b.icon}</span>
                <p className="lp-benefit-label" style={{ whiteSpace: 'pre-line' }}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="lp-section">
          <h2 className="lp-section-title">Choose Your Domain</h2>
          <div className="lp-domains-grid">
            {domains.map((d) => (
              <div key={d.key} className="lp-domain-card">
                <div className={`lp-domain-icon-wrap ${d.iconClass}`}>{d.icon}</div>
                <p className="lp-domain-name">{d.name}</p>
                <p className="lp-domain-desc">{d.desc}</p>
                <div className="lp-domain-tags">
                  {d.tags.map((t) => (
                    <span key={t} className={`lp-domain-tag ${d.tagClass}`}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="lp-section">
          <div className="lp-cta-card">
            <h2 className="lp-cta-title">Ready to Join?</h2>
            <p className="lp-contact-line">
              <FaPhoneAlt style={{ color: '#7C5AED' }} />
              Questions? Contact your recruitment coordinators
            </p>
            <div className="lp-cta-buttons">
              <button
                className="btn-primary-acc"
                onClick={() => navigate('/apply')}
              >
                Apply Now <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="lp-footer">
          <p className="lp-footer-brand">AWS CLOUD CLUB SRM</p>
          <p className="lp-footer-copy">
            &copy; {new Date().getFullYear()} AWS Cloud Club at SRM Institute of Science and Technology.
            All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
