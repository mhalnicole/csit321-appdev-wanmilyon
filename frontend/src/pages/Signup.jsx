import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginlogo from '../assets/loginlogo.png';
import logocit from '../assets/logocit.png';

export default function SignUp() {
    const [form, setForm] = useState({
        idNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Sign up submitted:', form);
        // TODO: call your register API here
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                    <img src={logocit} alt="CIT-U logocit" style={styles.logocit} />
                <h1 style={styles.heading}>Sign up</h1>  
                <div style={styles.headerSpacer} />
            </div>

            <div style={styles.content}>
                <form onSubmit={handleSubmit} style={styles.formCard}>
                    <label style={styles.label}>
                        ID Number
                        <input
                            name="idNumber"
                            value={form.idNumber}
                            onChange={handleChange}
                            style={styles.input}
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
                            style={styles.input}
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
                            style={styles.input}
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
                            style={styles.input}
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
                            style={styles.input}
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
                            style={styles.input}
                            placeholder="Confirm your password"
                            required
                        />
                    </label>

                    <div style={styles.buttonRow}>
                        <button type="submit" style={styles.submitButton}>Sign up</button>
                    </div>
                </form>

                <div style={styles.imageCard}>
                    <img src={loginlogo} alt="CIT-U canteen" style={styles.image} />
                    <p style={styles.imagePlaceholder}></p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#F96F20',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: '16px 20px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        marginTop: '6px',
        marginBottom: '16px',
    },
    heading: {
        margin: 0,
        fontSize: '22px',
        fontWeight: 900,
        color: '#1A1A1A',
        textAlign: 'center',
    },
    logocitWrap: {
        display: 'flex',
        justifyContent: 'center',
    },
    logocit: {
        width: '160px',
        height: 'auto',
        maxHeight: '95px',
        objectFit: 'contain',
    },
    logocitPlaceholder: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '9px',
        fontWeight: 700,
        color: '#999',
    },
    headerSpacer: {
        width: '50px',
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    formCard: {
        backgroundColor: '#E8C9A8',
        borderRadius: '14px',
        padding: '14px 20px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        boxSizing: 'border-box',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        fontSize: '11px',
        fontWeight: 700,
        color: '#1A1A1A',
    },
    input: {
        border: 'none',
        borderBottom: '1px dashed rgba(0,0,0,0.3)',
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: '4px 6px',
        fontSize: '12px',
        outline: 'none',
        fontWeight: 500,
        color: '#222',
        borderRadius: '4px',
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '6px',
    },
    submitButton: {
        backgroundColor: '#CF455C',
        color: '#FFFFFF',
        border: 'none',
        padding: '8px 24px',
        borderRadius: '999px',
        fontWeight: 700,
        fontSize: '13px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(207,69,92,0.3)',
    },
    imageCard: {
        width: '240px',
        height: '280px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    imagePlaceholder: {
        color: '#AAAAAA',
        fontSize: '12px',
        textAlign: 'center',
        margin: 0,
    },
};