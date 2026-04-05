import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { role, logout } = useApp();

  const handleGoBack = () => {
    if (role) {
      navigate(`/${role}`);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen mesh-gradient noise-overlay relative flex items-center justify-center p-4">
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-20 w-72 h-72 bg-danger-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-warning-500/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative z-10 w-full max-w-md text-center bg-white/80 dark:bg-surface-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-2xl rounded-3xl p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-danger-500 to-warning-500 flex items-center justify-center shadow-lg shadow-danger-500/30"
        >
          <ShieldAlert size={36} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
          Access Denied
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          You don't have permission to access this page. Please return to your designated dashboard.
        </p>

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoBack}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Return to Dashboard
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-gray-100 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Sign Out
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
