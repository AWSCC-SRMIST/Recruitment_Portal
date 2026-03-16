import React, { useState } from 'react';
import {
  FaUser, FaEnvelope, FaHashtag, FaGraduationCap,
  FaPhone, FaCalendarAlt, FaArrowRight,
} from 'react-icons/fa';
import './ApplicationForm.css';

function validate(data) {
  const errs = {};
  if (!data.srmEmail || !/^[^@]+@srmist\.edu\.in$/.test(data.srmEmail))
    errs.srmEmail = 'Please enter a valid SRM email address (@srmist.edu.in)';
  if (!data.name || data.name.trim().length < 2)
    errs.name = 'Name must be 2–100 characters';
  if (!data.regNumber || !/^RA\d{10,13}$/.test(data.regNumber.trim()))
    errs.regNumber = 'Please enter a valid registration number (e.g., RA2311003011411)';
  if (!data.year)
    errs.year = 'Please select your year';
  if (!data.degree || data.degree.trim().length < 2)
    errs.degree = 'Please enter your degree / program';
  if (!data.contact || !/^[6-9]\d{9}$/.test(data.contact.replace(/\D/g, '')))
    errs.contact = 'Please enter a valid 10-digit Indian mobile number';
  if (!data.personalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalEmail))
    errs.personalEmail = 'Please enter a valid personal email address';
  return errs;
}

function Field({ label, required, icon, error, children }) {
  return (
    <div className="af-field-group">
      <label className="af-label">
        {label} {required && <span className="req">*</span>}
      </label>
      <div className="af-input-wrap">
        {icon && <span className="af-input-icon">{icon}</span>}
        {children}
      </div>
      {error && <p className="field-error"><span>•</span>{error}</p>}
    </div>
  );
}

export default function Step1PersonalInfo({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function update(field, val) {
    onChange({ ...data, [field]: val });
    if (touched[field]) {
      const errs = validate({ ...data, [field]: val });
      setErrors(prev => ({ ...prev, [field]: errs[field] }));
    }
  }

  function handleBlur(field) {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate(data);
    setErrors(prev => ({ ...prev, [field]: errs[field] }));
  }

  function handleNext() {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched(Object.fromEntries(Object.keys(errs).map(k => [k, true])));
      return;
    }
    onNext();
  }

  const e = errors;

  return (
    <div className="af-form-card">
      <div className="af-card-header">
        <div className="af-card-icon"><FaUser /></div>
        <div>
          <h2 className="af-card-title">Personal Information</h2>
          <p className="af-card-subtitle">Please provide your basic details</p>
        </div>
      </div>

      {/* SRM Email — full width */}
      <Field label="SRM Email Address" required icon={<FaEnvelope />} error={e.srmEmail}>
        <input
          className={`af-input ${e.srmEmail ? 'has-error' : ''}`}
          type="email"
          placeholder="your.name@srmist.edu.in"
          value={data.srmEmail}
          onChange={ev => update('srmEmail', ev.target.value)}
          onBlur={() => handleBlur('srmEmail')}
        />
      </Field>

      {/* Name + Reg Number */}
      <div className="af-field-row">
        <Field label="Full Name" required icon={<FaUser />} error={e.name}>
          <input
            className={`af-input ${e.name ? 'has-error' : ''}`}
            type="text"
            placeholder="Enter your full name"
            value={data.name}
            onChange={ev => update('name', ev.target.value)}
            onBlur={() => handleBlur('name')}
          />
        </Field>
        <Field label="Registration Number" required icon={<FaHashtag />} error={e.regNumber}>
          <input
            className={`af-input ${e.regNumber ? 'has-error' : ''}`}
            type="text"
            placeholder="RA2311003011411"
            value={data.regNumber}
            onChange={ev => update('regNumber', ev.target.value.toUpperCase())}
            onBlur={() => handleBlur('regNumber')}
          />
        </Field>
      </div>

      {/* Year + Degree */}
      <div className="af-field-row">
        <Field label="Academic Year" required error={e.year}>
          <select
            className={`af-select ${e.year ? 'has-error' : ''}`}
            value={data.year}
            onChange={ev => update('year', ev.target.value)}
            onBlur={() => handleBlur('year')}
          >
            <option value="">Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </Field>
        <Field label="Degree / Program" required icon={<FaGraduationCap />} error={e.degree}>
          <input
            className={`af-input ${e.degree ? 'has-error' : ''}`}
            type="text"
            placeholder="e.g., B.Tech Computer Science"
            value={data.degree}
            onChange={ev => update('degree', ev.target.value)}
            onBlur={() => handleBlur('degree')}
          />
        </Field>
      </div>

      {/* Contact + Personal Email */}
      <div className="af-field-row">
        <Field label="Contact Number" required icon={<FaPhone />} error={e.contact}>
          <input
            className={`af-input ${e.contact ? 'has-error' : ''}`}
            type="tel"
            placeholder="+91 9876543210"
            value={data.contact}
            onChange={ev => update('contact', ev.target.value)}
            onBlur={() => handleBlur('contact')}
          />
        </Field>
        <Field label="Personal Email Address" required icon={<FaEnvelope />} error={e.personalEmail}>
          <input
            className={`af-input ${e.personalEmail ? 'has-error' : ''}`}
            type="email"
            placeholder="your.email@gmail.com"
            value={data.personalEmail}
            onChange={ev => update('personalEmail', ev.target.value)}
            onBlur={() => handleBlur('personalEmail')}
          />
        </Field>
      </div>

      {/* Date of Birth — optional */}
      <Field label="Date of Birth" icon={<FaCalendarAlt />}>
        <input
          className="af-input"
          type="date"
          value={data.dob}
          onChange={ev => update('dob', ev.target.value)}
        />
      </Field>

      {/* Navigation */}
      <div className="af-nav-buttons" style={{ justifyContent: 'flex-end' }}>
        <button className="af-btn-next" onClick={handleNext}>
          Next Step <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
