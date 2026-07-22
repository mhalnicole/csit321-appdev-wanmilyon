const API_BASE_URL = 'http://localhost:8080/auth';
const SESSION_KEY = 'palitdaan_current_user';
const PROFILE_KEY = 'user_profile';

function getCurrentUser() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  if (user) {
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify({
      name: user.fullName || '',
      email: user.email || ''
    }));
  }
}

function clearCurrentUser() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(PROFILE_KEY);
}

async function registerUser({ idNumber, email, firstName, lastName, password, confirmPassword }) {
  const studentId = (idNumber || '').trim();
  const userEmail = (email || '').trim().toLowerCase();
  const fullName = `${(firstName || '').trim()} ${(lastName || '').trim()}`.trim();

  if (!studentId || !userEmail || !password || !firstName || !lastName) {
    return { success: false, message: 'Please complete all required fields.' };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        studentId,
        email: userEmail,
        password,
        role: 'USER'
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || 'Registration failed.' };
    }

    return { success: true, user: data };
  } catch (error) {
    console.error('Registration API error:', error);
    return { success: false, message: 'Could not connect to the authentication server.' };
  }
}

async function loginUser({ idNumber, password }) {
  const studentId = (idNumber || '').trim();
  if (!studentId || !password) {
    return { success: false, message: 'Please enter your ID number and password.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || 'Invalid credentials.' };
    }

    setCurrentUser(data);
    return { success: true, user: data };
  } catch (error) {
    console.error('Login API error:', error);
    return { success: false, message: 'Could not connect to the authentication server.' };
  }
}

function logoutUser() {
  clearCurrentUser();
  return { success: true };
}

export { getCurrentUser, registerUser, loginUser, logoutUser, clearCurrentUser };
