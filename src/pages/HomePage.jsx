import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  Heart, ArrowRight, Clock, Bot, Activity, Shield, Zap,
  CalendarDays, Users, Star, ChevronRight, Sun, Moon,
  MapPin, Phone, Mail, Sparkles, CheckCircle2, QrCode
} from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Clock,
    title: 'Smart Queue System',
    desc: 'Real-time queue tracking with estimated wait times. No more sitting in crowded waiting rooms.',
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/25',
  },
  {
    icon: Bot,
    title: 'AI Health Assistant',
    desc: 'Describe your symptoms and get instant department recommendations powered by intelligent matching.',
    gradient: 'from-purple-500 to-pink-600',
    shadow: 'shadow-purple-500/25',
  },
  {
    icon: Activity,
    title: 'Live Tracking',
    desc: 'Track your queue position, estimated wait time, and get notified when your turn is approaching.',
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/25',
  },
  {
    icon: CalendarDays,
    title: 'Easy Booking',
    desc: 'Book appointments from home. Choose department, doctor, date and time in just a few taps.',
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/25',
  },
  {
    icon: QrCode,
    title: 'Digital Token',
    desc: 'Get a digital QR token instantly after booking. Show it at the hospital for seamless check-in.',
    gradient: 'from-cyan-500 to-blue-600',
    shadow: 'shadow-cyan-500/25',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your health data stays private. End-to-end encryption ensures your medical records are protected.',
    gradient: 'from-rose-500 to-red-600',
    shadow: 'shadow-rose-500/25',
  },
];

const stats = [
  { value: '50K+', label: 'Patients Served', icon: Users },
  { value: '200+', label: 'Expert Doctors', icon: Star },
  { value: '15 min', label: 'Avg Wait Time', icon: Clock },
  { value: '98%', label: 'Satisfaction', icon: Heart },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Patient', text: 'MediVerse completely changed how I visit the hospital. I booked from home and walked right in!', avatar: '👩' },
  { name: 'Dr. Rajesh Kumar', role: 'Cardiologist', text: 'The queue management system reduced patient wait times by 60%. A game changer for our department.', avatar: '👨‍⚕️' },
  { name: 'Ananya Patel', role: 'Patient', text: 'The AI assistant correctly suggested I visit a neurologist. Saved me from going to the wrong department!', avatar: '👩‍💼' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
};

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useApp();
  const { dark, toggle } = useTheme();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-surface-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Heart size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold font-display gradient-text">MediVerse</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Testimonials</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(isAuthenticated ? `/${role}` : '/auth')}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
            >
              {isAuthenticated ? 'Dashboard' : 'Get Started'}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 mesh-gradient" />
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
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-warning-400/10 rounded-full blur-3xl"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-8"
            >
              <Sparkles size={14} />
              AI-Powered Healthcare Platform
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-display leading-tight mb-6"
          >
            <span className="text-gray-900 dark:text-white">Skip the Queue.</span>
            <br />
            <span className="gradient-text">Book Your Visit Smarter.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            MediVerse revolutionizes your hospital experience with smart queue management,
            AI-powered health assistance, and seamless appointment booking — all from your phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(isAuthenticated ? '/appointments' : '/auth')}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow flex items-center gap-3"
            >
              Book Appointment
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(isAuthenticated ? '/queue' : '/auth')}
              className="px-8 py-4 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center gap-3"
            >
              <Clock size={20} />
              Check Queue Status
            </motion.button>
          </motion.div>

          {/* Floating preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-3xl">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-50 dark:from-surface-950 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="grid grid-cols-3 gap-4 px-4">
                {[
                  { label: 'Token', value: 'A-023', color: 'from-blue-500 to-indigo-600' },
                  { label: 'Wait Time', value: '~12 min', color: 'from-emerald-500 to-teal-600' },
                  { label: 'Position', value: '#3', color: 'from-amber-500 to-orange-600' },
                ].map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="rounded-2xl p-5 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-white/30 dark:border-white/[0.08] shadow-xl"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{card.label}</p>
                    <p className={`text-2xl font-bold font-display bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                      {card.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-12 mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                whileHover={{ y: -6 }}
                className="text-center p-6 rounded-2xl bg-white/80 dark:bg-white/[0.06] backdrop-blur-xl border border-white/30 dark:border-white/[0.08] shadow-lg"
              >
                <stat.icon size={24} className="mx-auto mb-3 text-primary-500" />
                <p className="text-3xl font-extrabold font-display text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-600 dark:text-accent-400 text-sm font-semibold mb-4">
              <Zap size={14} /> Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              From booking to check-in, MediVerse handles your entire hospital visit experience.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 rounded-3xl bg-white/70 dark:bg-white/[0.05] backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg ${feature.shadow}`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative bg-gradient-to-b from-transparent via-primary-50/30 dark:via-primary-950/10 to-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">
              <CheckCircle2 size={14} /> How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-gray-900 dark:text-white mb-4">
              Simple. Fast. Smart.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your free account in seconds', icon: Users, color: 'from-blue-500 to-indigo-600' },
              { step: '02', title: 'Book', desc: 'Choose department, doctor, date & time', icon: CalendarDays, color: 'from-emerald-500 to-teal-600' },
              { step: '03', title: 'Get Token', desc: 'Receive your digital queue token instantly', icon: QrCode, color: 'from-amber-500 to-orange-600' },
              { step: '04', title: 'Visit', desc: 'Walk in at your time, skip the queue', icon: CheckCircle2, color: 'from-purple-500 to-pink-600' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-300 dark:from-white/10 to-transparent" />
                )}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-2xl`}
                >
                  <s.icon size={32} className="text-white" />
                </motion.div>
                <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">Step {s.step}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-4">
              <Star size={14} /> Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-gray-900 dark:text-white">
              Loved by Thousands
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={item}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-white/70 dark:bg-white/[0.05] backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 text-white text-center shadow-2xl shadow-primary-500/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 w-60 h-60 border border-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/10 rounded-full"
            />

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold font-display mb-4">
                Ready to Skip the Queue?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of patients who book smarter and wait less. Your health journey starts here.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="px-10 py-4 rounded-2xl bg-white text-primary-600 font-bold text-lg shadow-2xl hover:shadow-3xl transition-shadow inline-flex items-center gap-3"
              >
                Create Free Account
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-16 border-t border-gray-200/50 dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Heart size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold font-display gradient-text">MediVerse</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                MediVerse is a smart hospital management platform that transforms the patient experience with
                AI-powered health assistance, real-time queue tracking, and seamless appointment booking.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                {['Features', 'How It Works', 'Testimonials', 'Contact'].map(l => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={14} className="text-primary-500" />
                  123 Healthcare Blvd, Medical City
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Phone size={14} className="text-primary-500" />
                  +91 1800-MEDI-VERSE
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Mail size={14} className="text-primary-500" />
                  hello@mediverse.health
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200/50 dark:border-white/[0.06] text-center">
            <p className="text-xs text-gray-400 dark:text-gray-600">
              © 2026 MediVerse. Powered by Advanced AI Healthcare Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
