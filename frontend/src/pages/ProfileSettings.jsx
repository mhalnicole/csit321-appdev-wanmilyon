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
  const getInitialState = () => {
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  };

  const [profile, setProfile] = useState(getInitialState);
  const [savedProfile, setSavedProfile] = useState(getInitialState);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/users/1')
      .then(res => res.json())
      .then(user => {
        if (user && user.fullName) {
          const updated = {
            ...savedProfile,
            name: user.fullName || savedProfile.name,
            email: user.email || savedProfile.email,
          };
          setSavedProfile(updated);
          setProfile(updated);
          localStorage.setItem('user_profile', JSON.stringify(updated));
        }
      })
      .catch(err => console.warn("Using offline user profile:", err));
  }, []);

  // Detect whether form has unsaved modifications
  const hasChanges = JSON.stringify(profile) !== JSON.stringify(savedProfile);

  const handleChange = (key) => (event) => {
    setProfile((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSave = () => {
    if (!hasChanges) return;
    // 1. Commit as saved profile
    setSavedProfile(profile);
    localStorage.setItem('user_profile', JSON.stringify(profile));

    // 2. Sync to Backend API
    fetch('http://localhost:8080/users/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: profile.name,
        email: profile.email
      })
    })
    .then(res => res.json())
    .then(data => console.log("Profile successfully updated in MySQL:", data))
    .catch(err => console.warn("Backend profile update failed (offline mode):", err));

    // 3. Show saved banner notification
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleCancel = () => {
    if (!hasChanges) return;
    // Revert unsaved typed edits back to last saved profile
    setProfile(savedProfile);
  };

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={contentAreaStyle}>
        {savedMessage && (
          <div style={{
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '10px',
            marginBottom: '12px',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
          }}>
            ✓ Profile settings saved and synchronized successfully!
          </div>
        )}
        <header style={heroStyle}>
          <div>
            <p style={eyebrowStyle}>Account settings</p>
            <h1 style={heroTitleStyle}>Profile Settings</h1>
            <p style={heroCopyStyle}>
              Review and update your personal details, communication preferences, and membership information.
            </p>
          </div>
          <div style={heroActionsStyle}>
            <button 
              type="button" 
              onClick={handleCancel} 
              disabled={!hasChanges}
              style={{
                ...ghostButtonStyle,
                opacity: hasChanges ? 1 : 0.4,
                cursor: hasChanges ? 'pointer' : 'not-allowed'
              }}
            >
              Discard Changes
            </button>
            <button 
              type="button" 
              onClick={handleSave} 
              disabled={!hasChanges}
              style={{
                ...primaryButtonStyle,
                opacity: hasChanges ? 1 : 0.4,
                cursor: hasChanges ? 'pointer' : 'not-allowed'
              }}
            >
              Save Changes
            </button>
          </div>
        </header>

        <div style={gridStyle}>
          <aside style={summaryCardStyle}>
            <div style={profileBadgeStyle}>
              <span style={profileInitialStyle}>{getInitials(profile.name)}</span>
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
    padding: '12px 16px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
};

const contentAreaStyle = {
  width: '100%',
  maxWidth: '1100px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden'
};

const heroStyle = {
  display: 'flex',
  justifyAttribute: 'space-between',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '10px',
  flexWrap: 'wrap',
  flexShrink: 0
};

const eyebrowStyle = {
  margin: 0,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#ff6a20'
};

const heroTitleStyle = {
  margin: '2px 0 4px',
  fontSize: '1.4rem',
  lineHeight: '1.1',
  fontWeight: 800,
  color: '#2b2b2b'
};

const heroCopyStyle = {
  margin: 0,
  maxWidth: '650px',
  fontSize: '0.82rem',
  color: '#51423a',
  lineHeight: '1.35'
};

const heroActionsStyle = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap'
};

const primaryButtonStyle = {
  background: '#ff6a1a',
  color: '#ffffff',
  border: 'none',
  borderRadius: '999px',
  padding: '8px 18px',
  fontSize: '0.88rem',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(255,106,26,0.24)',
  flexShrink: 0
};

const ghostButtonStyle = {
  background: 'rgba(255,255,255,0.9)',
  color: '#4a3e35',
  border: '1px solid rgba(74,62,53,0.16)',
  borderRadius: '999px',
  padding: '8px 16px',
  fontSize: '0.88rem',
  fontWeight: 700,
  cursor: 'pointer',
  flexShrink: 0
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '220px 1fr',
  gap: '12px',
  flex: 1,
  minHeight: 0,
  overflow: 'hidden'
};

const summaryCardStyle = {
  background: '#ffffff',
  borderRadius: '16px',
  padding: '14px',
  boxShadow: '0 6px 20px rgba(16, 24, 40, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  overflowY: 'auto',
  minHeight: 0,
  height: '100%'
};

const profileBadgeStyle = {
  width: '54px',
  height: '54px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ff6a1a 0%, #ffb86c 100%)',
  display: 'grid',
  placeItems: 'center',
  boxShadow: '0 8px 18px rgba(255,106,26,0.2)',
  flexShrink: 0
};

const profileInitialStyle = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 800
};

const summaryLabelStyle = {
  margin: '0 0 2px',
  color: '#8f7562',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontSize: '9px',
  fontWeight: 700
};

const summaryTitleStyle = {
  margin: '0 0 2px',
  fontSize: '15px',
  fontWeight: 800,
  color: '#1f1d1b'
};

const summaryDetailStyle = {
  margin: 0,
  color: '#6a5c50',
  fontSize: '11px',
  lineHeight: '1.3'
};

const summaryBlocksStyle = {
  display: 'grid',
  gap: '8px'
};

const summaryBlockStyle = {
  background: '#f8f1ec',
  borderRadius: '12px',
  padding: '8px 10px'
};

const summaryBlockTitle = {
  display: 'block',
  marginBottom: '2px',
  color: '#7e675a',
  fontSize: '9px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em'
};

const summaryBlockValue = {
  color: '#2b2420',
  fontSize: '13px',
  fontWeight: 700
};

const infoListStyle = {
  display: 'grid',
  gap: '8px'
};

const infoLabelStyle = {
  margin: 0,
  color: '#8f7562',
  fontSize: '9px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em'
};

const infoTextStyle = {
  margin: '2px 0 0',
  color: '#4d4238',
  fontSize: '11px',
  lineHeight: '1.3'
};

const formCardStyle = {
  background: '#ffffff',
  borderRadius: '16px',
  padding: '14px 18px',
  boxShadow: '0 6px 20px rgba(16, 24, 40, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  minHeight: 0,
  height: '100%'
};

const sectionStyle = {
  display: 'grid',
  gap: '8px'
};

const sectionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px'
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: '1.05rem',
  fontWeight: 800,
  color: '#2b2b2b'
};

const sectionSubtitleStyle = {
  margin: '2px 0 0',
  fontSize: '11px',
  color: '#6a5c50',
  lineHeight: '1.3'
};

const fieldGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px'
};

const fieldWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const fieldWrapperStyleFull = {
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const fieldLabelStyle = {
  margin: 0,
  color: '#4a4037',
  fontSize: '11px',
  fontWeight: 700
};

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: '10px',
  border: '1px solid #e6d4c5',
  background: '#fcfaf7',
  color: '#3f332d',
  fontSize: '12px',
  outline: 'none',
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  height: '45px',
  padding: '8px 10px',
  borderRadius: '10px',
  border: '1px solid #e6d4c5',
  background: '#fcfaf7',
  color: '#3f332d',
  fontSize: '12px',
  outline: 'none',
  boxSizing: 'border-box',
  resize: 'none'
};
