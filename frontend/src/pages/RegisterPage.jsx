import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        studentId: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const result = registerUser(form);

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate('/login');
    }

    return (
        <div style={styles.page}>
            <div style={styles.navbar}>
                <Link to="/about" style={styles.pillButton}>About</Link>
                <Link to="/login" style={styles.pillButton}>Login</Link>
            </div>

            <div style={styles.card}>
                <div style={styles.logoRow}>
                    <div>
                        <h1 style={styles.wordmark}>
                            PALIT <span style={styles.wordmarkAccent}>DAAN</span>
                        </h1>
                        <div style={styles.underline}></div>
                        <p style={styles.tagline}>CANTEEN PRE-ORDER SYSTEM</p>
                    </div>
                </div>

                <h2 style={styles.heading}>Create Account</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        Full Name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Juan Dela Cruz"
                            required
                        />
                    </label>

                    <label style={styles.label}>
                        Student ID
                        <input
                            name="studentId"
                            value={form.studentId}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="21-1234-567"
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
                            style={styles.input}
                            placeholder="example.email@cit.edu"
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
                            style={styles.input}
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
                            style={styles.input}
                            required
                        />
                    </label>

                    <button type="submit" style={styles.submitButton}>Sign Up</button>
                </form>

                <p style={styles.footerText}>
                    Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F96F20',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: '20px',
        boxSizing: 'border-box',
    },
    navbar: {
        width: '100%',
        maxWidth: '900px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        padding: '10px 0 30px 0',
    },
    pillButton: {
        backgroundColor: '#F5D9A0',
        color: '#1B2A41',
        fontWeight: 700,
        textDecoration: 'none',
        padding: '10px 22px',
        borderRadius: '999px',
        fontSize: '14px',
    },
    card: {
        backgroundColor: '#FFFBF5',
        borderRadius: '24px',
        padding: '36px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 40px rgba(27, 42, 65, 0.25)',
        boxSizing: 'border-box',
    },
    wordmark: {
        margin: 0,
        fontSize: '22px',
        fontWeight: 900,
        letterSpacing: '0.5px',
        color: '#1B2A41',
        lineHeight: 1,
    },
    wordmarkAccent: {
        color: '#E67E30',
    },
    underline: {
        width: '70px',
        height: '3px',
        backgroundColor: '#1B2A41',
        margin: '6px 0 4px 0',
    },
    tagline: {
        margin: 0,
        fontSize: '9px',
        letterSpacing: '1px',
        color: '#8A8A8A',
    },
    heading: {
        margin: '0 0 20px 0',
        fontSize: '20px',
        fontWeight: 800,
        color: '#1B2A41',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '13px',
        fontWeight: 600,
        color: '#1B2A41',
        gap: '6px',
    },
    input: {
        padding: '11px 14px',
        borderRadius: '10px',
        border: '1px solid #E3D9C9',
        backgroundColor: '#FFFFFF',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    submitButton: {
        marginTop: '10px',
        padding: '13px',
        borderRadius: '999px',
        border: 'none',
        backgroundColor: '#1B2A41',
        color: '#F5D9A0',
        fontWeight: 700,
        fontSize: '15px',
        cursor: 'pointer',
    },
    footerText: {
        marginTop: '18px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#555',
    },
    link: {
        color: '#E67E30',
        fontWeight: 700,
        textDecoration: 'none',
    },
};