import { useState } from 'react';
import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, CalendarDays, Users, Clock, MessageCircle,
  FileText, History, LogOut, Menu, X, Sun, Moon,
  Bell, Heart, Activity
} from 'lucide-react';

const roleMenus = {
  patient: [
    { path: '/patient', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/appointments', label: 'Appointments', icon: CalendarDays },
    { path: '/queue', label: 'Queue Status', icon: Clock },
    { path: '/history', label: 'Medical History', icon: History },
    { path: '/prescriptions', label: 'Prescriptions', icon: FileText },
    { path: '/chat', label: 'AI Assistant', icon: MessageCircle },
  ],
  doctor: [
    { path: '/doctor', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/appointments', label: 'Appointments', icon: CalendarDays },
    { path: '/patients', label: 'My Patients', icon: Users },
    { path: '/queue', label: 'Queue Mgmt', icon: Clock },
    { path: '/prescriptions', label: 'Prescriptions', icon: FileText },
    { path: '/chat', label: 'AI Assistant', icon: MessageCircle },
  ],
  admin: [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/appointments', label: 'Appointments', icon: CalendarDays },
    { path: '/patients', label: 'All Patients', icon: Users },
    { path: '/doctors', label: 'Doctors', icon: Activity },
    { path: '/queue', label: 'Queue System', icon: Clock },
    { path: '/chat', label: 'AI Assistant', icon: MessageCircle },
  ],
};

export default function Layout() {
  const { dark, toggle } = useTheme();
  const { role, currentUser, logout, notifications, unreadCount, markAllRead } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menus = roleMenus[role] || roleMenus.patient;

  return (
    <div className="min-h-screen mesh-gradient noise-overlay relative">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72
        bg-white/80 dark:bg-surface-900/80
        backdrop-blur-2xl
        border-r border-white/20 dark:border-white/[0.06]
        transition-transform duration-300 ease-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Heart size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-display gradient-text">MediVerse</h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold">Smart Hospital</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {menus.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="block"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-600 dark:text-primary-400 shadow-sm shadow-primary-500/5'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    <item.icon size={18} className={isActive ? 'text-primary-500' : ''} />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                        transition={{ type: 'spring', bounce: 0.3 }}
                      />
                    )}
                  </motion.div>
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-200/50 dark:border-white/[0.06]">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-lg">
                {currentUser?.avatar || '👤'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{currentUser?.name || 'User'}</p>
                <p className="text-xs text-gray-400 capitalize">{role}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-danger-500 hover:bg-danger-500/10 transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/60 dark:bg-surface-900/60 backdrop-blur-xl border-b border-white/20 dark:border-white/[0.06]">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <Menu size={22} />
            </motion.button>

            {/* Page Title */}
            <div className="hidden lg:block">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {menus.find(m => m.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <motion.div
                  key={dark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllRead(); }}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center pulse-glow"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-200/50 dark:border-white/[0.06]">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map((notif, i) => (
                          <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`px-4 py-3 border-b border-gray-100/50 dark:border-white/[0.04] hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors ${!notif.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}
                          >
                            <p className="text-sm text-gray-700 dark:text-gray-300">{notif.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
