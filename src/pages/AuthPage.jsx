import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  Heart, Mail, Lock, User, ArrowRight, Eye, EyeOff,
  Sun, Moon, Sparkles, UserRound, Stethoscope, ShieldCheck
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useApp();
  const { dark, toggle } = useTheme();

  const autofillDemo = (role) => {
    setEmail(`${role}@demo.com`);
    setPassword('123456');
    toast.success(`Filled ${role} credentials`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isLogin && !name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (password.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }

    setLoading(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        toast.success(`Welcome back!`);
        setTimeout(() => navigate(`/${result.role}`), 600);
      } else {
        toast.error(result.message);
      }
    } else {
      const result = register(name, email, password);
      if (result.success) {
        toast.success('Account created successfully!');
        setTimeout(() => navigate(`/${result.role}`), 600);
      } else {
        toast.error(result.message);
      }
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen mesh-gradient noise-overlay relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-warning-400/10 rounded-full blur-3xl"
      />

      {/* Theme toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        className="absolute top-6 right-6 z-20 p-2.5 rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-white/15 text-gray-600 dark:text-gray-300 transition-colors"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      {/* Back to home */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -4 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
      >
        <Heart size={18} className="text-primary-500" />
        <span className="font-semibold font-display gradient-text">MediVerse</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-white/[0.06] backdrop-blur-2xl border border-white/30 dark:border-white/[0.08] shadow-2xl shadow-black/10 dark:shadow-black/30">
          {/* Header gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

          <div className="p-8 pt-6">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-primary-500/30"
              >
                <Heart size={28} className="text-white" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'register'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-1">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isLogin ? 'Sign in to access your dashboard' : 'Join MediVerse today — it\'s free'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/30 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/30 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/30 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-primary-500 hover:text-primary-600 font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 disabled:opacity-70 flex items-center justify-center gap-2 transition-shadow"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Toggle Login/Register */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={toggleMode}
                  className="text-primary-500 hover:text-primary-600 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Demo credentials hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles size={14} className="text-primary-500" />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">One-Click Auto Fill</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => autofillDemo('patient')}
                  disabled={loading}
                  className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors border border-blue-100 dark:border-blue-500/20"
                >
                  <UserRound size={16} />
                  <span className="text-[10px] font-bold">Patient</span>
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemo('doctor')}
                  disabled={loading}
                  className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors border border-emerald-100 dark:border-emerald-500/20"
                >
                  <Stethoscope size={16} />
                  <span className="text-[10px] font-bold">Doctor</span>
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemo('admin')}
                  disabled={loading}
                  className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors border border-amber-100 dark:border-amber-500/20"
                >
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold">Admin</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
