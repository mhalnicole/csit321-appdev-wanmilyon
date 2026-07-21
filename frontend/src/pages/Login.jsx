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
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F96F20',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: '30px 50px',
        boxSizing: 'border-box',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '30px',
    },
    heading: {
        margin: 0,
        fontSize: '36px',
        fontWeight: 900,
        color: '#1A1A1A',
        textAlign: 'center',
    },
    logocitWrap: {
        display: 'flex',
        justifyContent: 'center',
    },
    logocit: {
        width: '242px',
        height: '171px',
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        alignItems: 'center', 
        flexWrap: 'wrap',
    },
    formCard: {
        backgroundColor: '#E8C9A8',
        borderRadius: '20px',
        padding: '26px 30px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxSizing: 'border-box',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontSize: '14px',
        fontWeight: 700,
        color: '#1A1A1A',
    },
    input: {
        border: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.45)',
        backgroundColor: 'transparent',
        padding: '4px 2px',
        fontSize: '13px',
        outline: 'none',
        fontWeight: 400,
        color: '#333',
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '6px',
    },
    submitButton: {
        backgroundColor: '#D6566A',
        color: '#FFFFFF',
        border: 'none',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        fontWeight: 700,
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCard: {
        width: '300px',
        minWidth: '260px',
        minHeight: '400px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '12px',
    },
};