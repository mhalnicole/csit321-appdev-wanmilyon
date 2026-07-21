import { useState, useEffect } from 'react';

const initialProfile = {
  name: 'Juan Dela Cruz',
  email: 'example_email@mail.com',
  address: '123 Palit Daan Street, Manila',
  mobile: '+63 912 345 6789',
  dietaryPreferences: 'No preferences',
  membership: 'Gold Member',
  joined: 'March 2024',
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (key) => (event) => {
    setProfile((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSave = () => {
    alert('Profile settings saved successfully.');
  };

  const handleCancel = () => {
    setProfile(initialProfile);
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={contentAreaStyle}>
        <header style={heroStyle}>
          <div>
            <p style={eyebrowStyle}>Account settings</p>
            <h1 style={heroTitleStyle}>Profile Settings</h1>
            <p style={heroCopyStyle}>
              Review and update your personal details, communication preferences, and membership information.
            </p>
          </div>
          <div style={heroActionsStyle}>
            <button type="button" onClick={handleCancel} style={ghostButtonStyle}>
              Reset
            </button>
            <button type="button" onClick={handleSave} style={primaryButtonStyle}>
              Save Changes
            </button>
          </div>
        </header>

        <div style={gridStyle}>
          <aside style={summaryCardStyle}>
            <div style={profileBadgeStyle}>
              <span style={profileInitialStyle}>JD</span>
            </div>
            <div>
              <p style={summaryLabelStyle}>Account holder</p>
              <h2 style={summaryTitleStyle}>{profile.name}</h2>
              <p style={summaryDetailStyle}>{profile.email}</p>
            </div>

            <div style={summaryBlocksStyle}>
              <div style={summaryBlockStyle}>
                <span style={summaryBlockTitle}>Member status</span>
                <span style={summaryBlockValue}>{profile.membership}</span>
              </div>
              <div style={summaryBlockStyle}>
                <span style={summaryBlockTitle}>Joined</span>
                <span style={summaryBlockValue}>{profile.joined}</span>
              </div>
            </div>

            <div style={infoListStyle}>
              <div>
                <span style={infoLabelStyle}>Phone</span>
                <p style={infoTextStyle}>{profile.mobile}</p>
              </div>
              <div>
                <span style={infoLabelStyle}>Address</span>
                <p style={infoTextStyle}>{profile.address}</p>
              </div>
              <div>
                <span style={infoLabelStyle}>Dietary note</span>
                <p style={infoTextStyle}>{profile.dietaryPreferences}</p>
              </div>
            </div>
          </aside>

          <main style={formCardStyle}>
            <section style={sectionStyle}>
              <div style={sectionHeaderStyle}>
                <div>
                  <h2 style={sectionTitleStyle}>Personal Information</h2>
                  <p style={sectionSubtitleStyle}>Update the information you share with the restaurant.</p>
                </div>
              </div>

              <div style={fieldGridStyle}>
                <label style={fieldWrapperStyle}>
                  <span style={fieldLabelStyle}>Full name</span>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={handleChange('name')}
                    style={inputStyle}
                  />
                </label>
                <label style={fieldWrapperStyle}>
                  <span style={fieldLabelStyle}>Email address</span>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={handleChange('email')}
                    style={inputStyle}
                  />
                </label>
                <label style={fieldWrapperStyle}>
                  <span style={fieldLabelStyle}>Phone number</span>
                  <input
                    type="tel"
                    value={profile.mobile}
                    onChange={handleChange('mobile')}
                    style={inputStyle}
                  />
                </label>
                <label style={fieldWrapperStyleFull}>
                  <span style={fieldLabelStyle}>Address</span>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={handleChange('address')}
                    style={inputStyle}
                  />
                </label>
                <label style={fieldWrapperStyleFull}>
                  <span style={fieldLabelStyle}>Dietary preferences</span>
                  <textarea
                    rows={5}
                    value={profile.dietaryPreferences}
                    onChange={handleChange('dietaryPreferences')}
                    style={textareaStyle}
                  />
                </label>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

const pageWrapperStyle = {
    width: '100%',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
};

const contentAreaStyle = {
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden'
};

const heroStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '24px',
  marginBottom: '15px',
  flexWrap: 'wrap',
  flexShrink: 0
};

const eyebrowStyle = {
  margin: 0,
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#ff6a20'
};

const heroTitleStyle = {
  margin: '6px 0 8px',
  fontSize: '32px',
  lineHeight: '1.05',
  fontWeight: 800,
  color: '#2b2b2b'
};

const heroCopyStyle = {
  margin: 0,
  maxWidth: '720px',
  fontSize: '14px',
  color: '#51423a',
  lineHeight: '1.5'
};

const heroActionsStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap'
};

const primaryButtonStyle = {
  background: '#ff6a1a',
  color: '#ffffff',
  border: 'none',
  borderRadius: '999px',
  padding: '12px 24px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 12px 30px rgba(255,106,26,0.24)',
  flexShrink: 0
};

const ghostButtonStyle = {
  background: 'rgba(255,255,255,0.9)',
  color: '#4a3e35',
  border: '1px solid rgba(74,62,53,0.16)',
  borderRadius: '999px',
  padding: '12px 22px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
  flexShrink: 0
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  gap: '16px',
  flex: 1,
  minHeight: 0,
  overflow: 'hidden'
};

const summaryCardStyle = {
  background: '#ffffff',
  borderRadius: '28px',
  padding: '24px',
  boxShadow: '0 22px 55px rgba(16, 24, 40, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
  minHeight: 0,
  height: '100%'
};

const profileBadgeStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ff6a1a 0%, #ffb86c 100%)',
  display: 'grid',
  placeItems: 'center',
  boxShadow: '0 16px 30px rgba(255,106,26,0.2)',
  flexShrink: 0
};

const profileInitialStyle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 800
};

const summaryLabelStyle = {
  margin: '0 0 2px',
  color: '#8f7562',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  fontSize: '10px',
  fontWeight: 700
};

const summaryTitleStyle = {
  margin: '0 0 4px',
  fontSize: '22px',
  fontWeight: 800,
  color: '#1f1d1b'
};

const summaryDetailStyle = {
  margin: 0,
  color: '#6a5c50',
  fontSize: '13px',
  lineHeight: '1.5'
};

const summaryBlocksStyle = {
  display: 'grid',
  gap: '12px'
};

const summaryBlockStyle = {
  background: '#f8f1ec',
  borderRadius: '22px',
  padding: '14px 16px'
};

const summaryBlockTitle = {
  display: 'block',
  marginBottom: '4px',
  color: '#7e675a',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.14em'
};

const summaryBlockValue = {
  color: '#2b2420',
  fontSize: '16px',
  fontWeight: 700
};

const infoListStyle = {
  display: 'grid',
  gap: '12px'
};

const infoLabelStyle = {
  margin: 0,
  color: '#8f7562',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.14em'
};

const infoTextStyle = {
  margin: '4px 0 0',
  color: '#4d4238',
  fontSize: '13px',
  lineHeight: '1.5'
};

const formCardStyle = {
  background: '#ffffff',
  borderRadius: '28px',
  padding: '18px',
  boxShadow: '0 22px 55px rgba(16, 24, 40, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  minHeight: 0,
  height: '100%'
};

const sectionStyle = {
  display: 'grid',
  gap: '12px'
};

const sectionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px'
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 800,
  color: '#2b2b2b'
};

const sectionSubtitleStyle = {
  margin: '6px 0 0',
  fontSize: '13px',
  color: '#6a5c50',
  lineHeight: '1.5'
};

const fieldGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px'
};

const fieldWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const fieldWrapperStyleFull = {
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const fieldLabelStyle = {
  margin: 0,
  color: '#4a4037',
  fontSize: '12px',
  fontWeight: 700
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '18px',
  border: '1px solid #e6d4c5',
  background: '#fcfaf7',
  color: '#3f332d',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  height: '60px',
  padding: '14px 16px',
  borderRadius: '18px',
  border: '1px solid #e6d4c5',
  background: '#fcfaf7',
  color: '#3f332d',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  resize: 'none'
};
