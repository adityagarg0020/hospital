import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getGreeting } from '../utils/helpers';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { statsData, weeklyData, departmentData, funFacts, healthTips, healthScoreData, appointments, doctors, queueData, patients, nearbyHospitals } from '../data/mockData';
import PatientActiveStatus from '../components/dashboard/PatientActiveStatus';
import PatientHealthScore from '../components/dashboard/PatientHealthScore';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import {
  Users, CalendarDays, Clock, Activity, TrendingUp, Bed,
  AlertTriangle, Star, Zap, Lightbulb, Trophy, ArrowRight, MapPin, Navigation
} from 'lucide-react';

const statCards = [
  { label: 'Total Patients', key: 'totalPatients', icon: Users, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
  { label: "Today's Appointments", key: 'todayAppointments', icon: CalendarDays, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20' },
  { label: 'Active Tokens', key: 'activeTokens', icon: Clock, color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20' },
  { label: 'Avg Wait (min)', key: 'avgWaitTime', icon: Activity, color: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/20' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
};

export default function Dashboard() {
  const { role, currentUser } = useApp();
  const navigate = useNavigate();
  const greeting = getGreeting();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(statsData);
  const [currentFact, setCurrentFact] = useState(0);
  const [rewardPoints] = useState(currentUser?.rewardPoints || 450);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate live counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeTokens: prev.activeTokens + (Math.random() > 0.6 ? 1 : Math.random() > 0.4 ? -1 : 0),
        todayAppointments: prev.todayAppointments + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Get the user's next appointment
  const nextAppt = appointments.find(a => a.patientId === (currentUser?.id || 'p1') && (a.status === 'confirmed' || a.status === 'pending'));
  const nextApptDoctor = nextAppt ? doctors.find(d => d.id === nextAppt.doctorId) : null;

  // User's queue token
  const userQueue = queueData.find(q => q.patientId === (currentUser?.id || 'p1'));

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader type="card" count={1} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonLoader type="stat" count={4} />
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Greeting Banner */}
      <motion.div variants={item}>
        <GlassCard hover={false} className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-gray-500 dark:text-gray-400 mb-1"
              >
                {greeting.emoji} {greeting.text}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-display"
              >
                Welcome back, <span className="gradient-text">{currentUser?.name?.split(' ')[0] || 'User'}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 dark:text-gray-400 mt-1"
              >
                {role === 'admin' ? 'Here\'s your hospital overview' :
                 role === 'doctor' ? 'You have upcoming consultations today' :
                 'Your health dashboard is ready'}
              </motion.p>
            </div>

            {/* Gamification - Reward Points */}
            {role === 'patient' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
              >
                <Trophy size={24} className="text-amber-500" />
                <div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Reward Points</p>
                  <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                    <AnimatedCounter value={rewardPoints} />
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* Patient-specific: Active Appointment & Queue Status */}
      {role === 'patient' && (
        <motion.div variants={item}>
          <PatientActiveStatus nextAppt={nextAppt} nextApptDoctor={nextApptDoctor} userQueue={userQueue} />
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <motion.div
            key={stat.key}
            variants={item}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`
              relative overflow-hidden rounded-2xl p-5
              bg-white/70 dark:bg-white/[0.06]
              backdrop-blur-xl
              border border-white/20 dark:border-white/[0.08]
              shadow-lg ${stat.shadow}
            `}
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${stat.color} opacity-10 rounded-full -translate-y-1/3 translate-x-1/3`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md ${stat.shadow}`}>
                  <stat.icon size={16} className="text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white font-display">
                <AnimatedCounter value={stats[stat.key]} />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-xs text-emerald-500 font-semibold">
                  +{Math.floor(Math.random() * 10) + 2}%
                </span>
                <span className="text-xs text-gray-400">vs last week</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Health Score (Patient only) */}
      {role === 'patient' && <PatientHealthScore />}

      {/* Charts Row */}
      <DashboardCharts />

      {/* Nearby Hospitals (Patient only) */}
      {role === 'patient' && (
        <motion.div variants={item}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-primary-500" />
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Nearby Hospitals</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearbyHospitals.map((hospital, i) => (
                <motion.div
                  key={hospital.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-xl bg-gray-50/50 dark:bg-white/[0.03] border border-gray-200/30 dark:border-white/[0.06] cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{hospital.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <MapPin size={10} /> {hospital.address}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">🕐 {hospital.hours}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <Star size={10} fill="currentColor" /> {hospital.rating}
                      </div>
                      <p className="text-xs text-primary-500 font-semibold mt-0.5 flex items-center gap-0.5">
                        <Navigation size={10} /> {hospital.distance}
                      </p>
                      {hospital.emergency && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">ER</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fun Facts / Health Tips */}
        <motion.div variants={item}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} className="text-amber-500" />
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Did You Know?</h3>
            </div>
            <motion.div
              key={currentFact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed min-h-[3rem]"
            >
              {funFacts[currentFact]}
            </motion.div>
            <div className="flex gap-1 mt-4">
              {funFacts.slice(0, 6).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === currentFact % 6 ? 'bg-primary-500' : 'bg-gray-200 dark:bg-white/10'}`} />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Health Tips */}
        <motion.div variants={item}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-emerald-500" />
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Health Tips</h3>
            </div>
            <div className="space-y-2">
              {healthTips.slice(0, 4).map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm text-gray-600 dark:text-gray-400 py-1.5 px-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-500/[0.06] border border-emerald-200/30 dark:border-emerald-500/10"
                >
                  {tip}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Extra stats for admin */}
      {role === 'admin' && (
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Bed size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Bed Occupancy</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  <AnimatedCounter value={stats.bedOccupancy} suffix="%" />
                </p>
              </div>
            </div>
          </GlassCard>
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Star size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Patient Satisfaction</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  <AnimatedCounter value={Math.floor(stats.satisfaction)} suffix="%" />
                </p>
              </div>
            </div>
          </GlassCard>
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <AlertTriangle size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active Emergencies</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  <AnimatedCounter value={stats.emergencies} />
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
}
