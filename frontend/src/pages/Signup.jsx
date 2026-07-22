import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginlogo from '../assets/loginlogo.png';
import logocit from '../assets/logocit.png';
import { registerUser } from '../utils/auth';

export default function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        idNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [focusedField, setFocusedField] = useState('');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        console.log('Register submitting via API:', form);
        const result = await registerUser({
            idNumber: form.idNumber,
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            password: form.password,
            confirmPassword: form.confirmPassword
        });

        if (!result.success) {
            setError(result.message);
            return;
        }

        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
            navigate('/');
        }, 1500);
    }

    return (
        <div style={styles.page}>
            <div className="slide-in-right" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
                <div style={styles.header}>
                    <img src={logocit} alt="CIT-U logocit" style={styles.logocit} />
                    <h1 style={styles.heading}>Create Account</h1>  
                </div>

                <div style={styles.content}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <form onSubmit={handleSubmit} style={styles.formCard}>
                            <label style={styles.label}>
                                ID Number
                                <input
                                    name="idNumber"
                                    value={form.idNumber}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('idNumber')}
                                    onBlur={() => setFocusedField('')}
                                    style={{
                                        ...styles.input,
                                        border: focusedField === 'idNumber' ? '1.5px solid #FF5100' : '1.5px solid #EAEAEA',
                                        boxShadow: focusedField === 'idNumber' ? '0 0 0 3px rgba(255, 81, 0, 0.15)' : 'none',
                                    }}
                                    placeholder="Enter your ID number"
                                    required
                                />
                            </label>

                            <label style={styles.label}>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField('')}
                                    style={{
                                        ...styles.input,
                                        border: focusedField === 'email' ? '1.5px solid #FF5100' : '1.5px solid #EAEAEA',
                                        boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(255, 81, 0, 0.15)' : 'none',
                                    }}
                                    placeholder="Enter email address"
                                    required
                                />
                            </label>

                            <label style={styles.label}>
                                First Name
                                <input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('firstName')}
                                    onBlur={() => setFocusedField('')}
                                    style={{
                                        ...styles.input,
                                        border: focusedField === 'firstName' ? '1.5px solid #FF5100' : '1.5px solid #EAEAEA',
                                        boxShadow: focusedField === 'firstName' ? '0 0 0 3px rgba(255, 81, 0, 0.15)' : 'none',
                                    }}
                                    placeholder="Enter your first name"
                                    required
                                />
                            </label>

                            <label style={styles.label}>
                                Last Name
                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('lastName')}
                                    onBlur={() => setFocusedField('')}
                                    style={{
                                        ...styles.input,
                                        border: focusedField === 'lastName' ? '1.5px solid #FF5100' : '1.5px solid #EAEAEA',
                                        boxShadow: focusedField === 'lastName' ? '0 0 0 3px rgba(255, 81, 0, 0.15)' : 'none',
                                    }}
                                    placeholder="Enter your last name"
                                    required
                                />
                            </label>

                            <label style={styles.label}>
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField('')}
                                    style={{
                                        ...styles.input,
                                        border: focusedField === 'password' ? '1.5px solid #FF5100' : '1.5px solid #EAEAEA',
                                        boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(255, 81, 0, 0.15)' : 'none',
                                    }}
                                    placeholder="Enter your password"
                                    required
                                />
                            </label>

                            <label style={styles.label}>
                                Confirm Password
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('confirmPassword')}
                                    onBlur={() => setFocusedField('')}
                                    style={{
                                        ...styles.input,
                                        border: focusedField === 'confirmPassword' ? '1.5px solid #FF5100' : '1.5px solid #EAEAEA',
                                        boxShadow: focusedField === 'confirmPassword' ? '0 0 0 3px rgba(255, 81, 0, 0.15)' : 'none',
                                    }}
                                    placeholder="Confirm your password"
                                    required
                                />
                            </label>

                            {error && (
                                <p style={{
                                    color: '#D6566A',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    margin: '4px 0 0 0',
                                    lineHeight: '1.2'
                                }}>
                                    {error}
                                </p>
                            )}

                            {success && (
                                <p style={{
                                    color: '#1e7e34',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    margin: '4px 0 0 0',
                                    lineHeight: '1.2'
                                }}>
                                    {success}
                                </p>
                            )}

                            <div style={styles.buttonRow}>
                                <button type="submit" className="nav-link-animate" style={styles.submitButton}>Sign Up</button>
                            </div>
                        </form>

                        <p style={{ textAlign: 'center', margin: '18px 0 0 0', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                            Already have an account? <Link to="/" className="nav-link-animate" style={{ color: '#FFFFFF', textDecoration: 'underline', fontWeight: 800 }}>Login</Link>
                        </p>
                    </div>

                    <div style={styles.imageCard}>
                        <img src={loginlogo} alt="CIT-U canteen" style={styles.image} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #FF7E29 0%, #E64A00 100%)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: '24px 20px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '28px',
    },
    heading: {
        margin: 0,
        fontSize: '32px',
        fontWeight: 800,
        color: '#FFFFFF',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.15)',
    },
    logocit: {
        width: '240px',
        height: 'auto',
        maxHeight: '130px',
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        alignItems: 'stretch', 
        flexWrap: 'wrap',
    },
    formCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderRadius: '24px',
        padding: '38px 34px',
        width: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        boxSizing: 'border-box',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        fontSize: '14px',
        fontWeight: 700,
        color: '#4B3F35',
    },
    input: {
        border: '1.5px solid #EAEAEA',
        backgroundColor: '#FAF7F5',
        padding: '12px 16px',
        fontSize: '14px',
        outline: 'none',
        fontWeight: 500,
        color: '#2B2420',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '12px',
    },
    submitButton: {
        background: 'linear-gradient(135deg, #FF8F00 0%, #FF5100 100%)',
        color: '#FFFFFF',
        border: 'none',
        width: '100%',
        padding: '14px',
        borderRadius: '12px',
        fontWeight: 700,
        fontSize: '15px',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        boxShadow: '0 6px 16px rgba(255, 81, 0, 0.3)',
        transition: 'transform 0.15s ease, filter 0.15s ease',
    },
    imageCard: {
        width: '360px',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        height: '639px',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '14px',
    },
};