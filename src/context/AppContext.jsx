import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { storage } from '../utils/helpers';

const AppContext = createContext();

// Seed demo user
function seedDemoUser() {
  const users = storage.get('users') || [];
  if (!users.find(u => u.email === 'patient@demo.com')) {
    storage.set('users', [
      { id: 'p1', name: 'Demo Patient', email: 'patient@demo.com', password: '123456', role: 'patient' },
      { id: 'd1', name: 'Demo Doctor', email: 'doctor@demo.com', password: '123456', role: 'doctor' },
      { id: 'a1', name: 'Demo Admin', email: 'admin@demo.com', password: '123456', role: 'admin' },
    ]);
  }
}

export function AppProvider({ children }) {
  // Seed demo user on mount
  useEffect(() => { seedDemoUser(); }, []);

  const [authUser, setAuthUser] = useState(() => storage.get('authUser'));
  const [role, setRole] = useState(() => storage.get('role'));
  const [currentUser, setCurrentUser] = useState(() => storage.get('currentUser'));
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your appointment with Dr. Chen is confirmed for tomorrow', time: '2 min ago', read: false, type: 'appointment' },
    { id: 2, text: 'Token T-002 is next in queue', time: '5 min ago', read: false, type: 'queue' },
    { id: 3, text: 'New lab results are ready', time: '1 hour ago', read: true, type: 'lab' },
    { id: 4, text: 'You earned 50 reward points!', time: '3 hours ago', read: true, type: 'reward' },
  ]);

  const isAuthenticated = !!authUser;

  // --- Auth functions ---
  // --- Auth functions ---
  const register = useCallback((name, email, password) => {
    const users = storage.get('users') || [];
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists' };
    }
    const newUser = {
      id: 'u_' + Date.now(),
      name,
      email: email.toLowerCase(),
      password,
      role: 'patient', // default role
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    storage.set('users', users);

    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    const userProfile = { id: newUser.id, name: newUser.name, avatar: '👤' };

    setAuthUser(session);
    setRole('patient');
    setCurrentUser(userProfile);
    
    storage.set('authUser', session);
    storage.set('role', 'patient');
    storage.set('currentUser', userProfile);

    return { success: true, role: 'patient' };
  }, []);

  const login = useCallback((email, password) => {
    const users = storage.get('users') || [];
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    const session = { id: user.id, name: user.name, email: user.email };
    
    // Set role based on user account
    const userRole = user.role || 'patient';
    
    // Determine profile avatar
    let userProfile = { id: user.id, name: user.name };
    if (userRole === 'patient') userProfile = { ...userProfile, avatar: '👤' };
    else if (userRole === 'doctor') userProfile = { ...userProfile, avatar: '👩‍⚕️' };
    else if (userRole === 'admin') userProfile = { ...userProfile, avatar: '🛡️' };

    setAuthUser(session);
    setRole(userRole);
    setCurrentUser(userProfile);
    
    storage.set('authUser', session);
    storage.set('role', userRole);
    storage.set('currentUser', userProfile);
    
    return { success: true, role: userRole };
  }, []);



  // --- Logout ---
  const logout = useCallback(() => {
    setRole(null);
    setCurrentUser(null);
    setAuthUser(null);
    storage.remove('role');
    storage.remove('currentUser');
    storage.remove('authUser');
  }, []);

  // --- Notifications ---
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [
      { id: Date.now(), ...notification, time: 'Just now', read: false },
      ...prev,
    ]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // --- Timed notifications (smart triggers) ---
  useEffect(() => {
    if (!isAuthenticated || !role) return;

    const timers = [
      setTimeout(() => {
        addNotification({ text: '🩺 Dr. Sarah Chen is now available for consultations', type: 'doctor' });
      }, 30000),
      setTimeout(() => {
        addNotification({ text: '⏰ Your turn is coming up in ~5 minutes!', type: 'queue' });
      }, 45000),
      setTimeout(() => {
        addNotification({ text: '🧪 Your lab results are ready for review', type: 'lab' });
      }, 60000),
      setTimeout(() => {
        addNotification({ text: '💊 Reminder: Take your evening medication', type: 'reminder' });
      }, 90000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isAuthenticated, role, addNotification]);

  return (
    <AppContext.Provider value={{
      authUser, isAuthenticated, login, register,
      role, currentUser, logout,
      notifications, addNotification, markAllRead, unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
