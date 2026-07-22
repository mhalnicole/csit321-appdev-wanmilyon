import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginlogo from '../assets/loginlogo.png';
import logocit from '../assets/logocit.png';

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        idNumber: '',
        password: '',
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Login submitted:', form);
        // TODO: call your login API here
        navigate('/dashboard');
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div style={styles.logocitWrap}>
                    <img src={logocit} alt="CIT-U logocit" style={styles.logocit} />
                </div>
                <h1 style={styles.heading}>Login</h1>
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

                    <div style={styles.buttonRow}>
                        <button type="submit" style={styles.submitButton} aria-label="Log in">→</button>
                    </div>
                </form>

                <div style={styles.imageCard}>
                    <img src={loginlogo} alt="CIT-U canteen" style={styles.image} />
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
        padding: '20px 20px 30px',
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
        marginTop: '10px',
        marginBottom: '24px',
    },
    heading: {
        margin: 0,
        fontSize: '24px',
        fontWeight: 900,
        color: '#1A1A1A',
        textAlign: 'center',
    },
    logocitWrap: {
        display: 'flex',
        justifyContent: 'center',
    },
    logocit: {
        width: '250px',
        height: 'auto',
        maxHeight: '315px',
        objectFit: 'contain',
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        alignItems: 'center', 
        flexWrap: 'wrap',
    },
    formCard: {
        backgroundColor: '#E8C9A8',
        borderRadius: '16px',
        padding: '20px 24px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxSizing: 'border-box',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontSize: '13px',
        fontWeight: 700,
        color: '#1A1A1A',
    },
    input: {
        border: 'none',
        borderBottom: '2px solid rgba(0,0,0,0.3)',
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: '6px 8px',
        fontSize: '13px',
        outline: 'none',
        fontWeight: 500,
        color: '#222',
        borderRadius: '4px',
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '8px',
    },
    submitButton: {
        backgroundColor: '#D6566A',
        color: '#FFFFFF',
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        fontWeight: 700,
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(214,86,106,0.3)',
        transition: 'transform 0.2s',
    },
    imageCard: {
        width: '260px',
        height: '240px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '10px',
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
};