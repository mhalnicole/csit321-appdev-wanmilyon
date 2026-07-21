const USERS_KEY = 'palitdaan_users';
const SESSION_KEY = 'palitdaan_current_user';

function getStoredUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}

function ensureDefaultUser() {
  let users = getStoredUsers();
  if (users.length === 0) {
    users = [
      {
        idNumber: '2021001',
        studentId: '2021001',
        email: 'student@cit.edu',
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        fullName: 'Juan Dela Cruz',
        password: 'password123',
        createdAt: new Date().toISOString(),
      },
    ];
    saveUsers(users);
  }
  return users;
}

function registerUser({ idNumber, email, firstName, lastName, password, studentId, name, confirmPassword }) {
  const profileId = (idNumber || studentId || '').trim();
  const profileEmail = (email || '').trim().toLowerCase();
  const fullName = (name || `${firstName || ''} ${lastName || ''}`).trim();

  if (!profileId || !profileEmail || !password || !fullName) {
    return { success: false, message: 'Please complete all required fields.' };
  }

  if (confirmPassword && password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }

  const users = ensureDefaultUser();
  const duplicateId = users.some((user) => user.idNumber === profileId || user.studentId === profileId);
  const duplicateEmail = users.some((user) => user.email.toLowerCase() === profileEmail);

  if (duplicateId) {
    return { success: false, message: 'An account already exists with that student ID.' };
  }

  if (duplicateEmail) {
    return { success: false, message: 'An account already exists with that email address.' };
  }

  const newUser = {
    idNumber: profileId,
    studentId: profileId,
    email: profileEmail,
    firstName: firstName || '',
    lastName: lastName || '',
    fullName,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

function loginUser({ idNumber, password }) {
  const profileId = (idNumber || '').trim();
  if (!profileId || !password) {
    return { success: false, message: 'Please enter your ID number and password.' };
  }

  const users = ensureDefaultUser();
  const user = users.find((u) => u.idNumber === profileId || u.studentId === profileId);

  if (!user) {
    return { success: false, message: 'Student ID not found. Please register first.' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

function logoutUser() {
  clearCurrentUser();
  return { success: true };
}

export { getStoredUsers, getCurrentUser, registerUser, loginUser, logoutUser, clearCurrentUser };
