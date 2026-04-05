import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import { CalendarDays, ArrowRight, Ticket } from 'lucide-react';

export default function PatientActiveStatus({ nextAppt, nextApptDoctor, userQueue }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Active Appointment */}
      <GlassCard hover={false} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={16} className="text-emerald-500" />
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Next Appointment</h3>
          </div>
          {nextAppt ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-lg">
                {nextApptDoctor?.avatar || '👨‍⚕️'}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{nextApptDoctor?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{nextApptDoctor?.specialty}</p>
                <p className="text-xs text-emerald-500 font-medium mt-1">
                  {nextAppt.date} • {nextAppt.time}
                </p>
              </div>
              {nextAppt.token && (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/30 dark:border-emerald-500/20">
                  <p className="text-[10px] text-emerald-500 uppercase tracking-wider font-bold">Token</p>
                  <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-display">{nextAppt.token}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400 mb-3">No upcoming appointments</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/appointments')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 inline-flex items-center gap-2"
              >
                Book Now <ArrowRight size={14} />
              </motion.button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Queue Status */}
      <GlassCard hover={false} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Ticket size={16} className="text-primary-500" />
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Queue Status</h3>
          </div>
          {userQueue ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-3xl font-extrabold font-display gradient-text">{userQueue.tokenNo}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">Your Token</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    userQueue.status === 'serving' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                    userQueue.status === 'next' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                  }`}>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className={`w-1.5 h-1.5 rounded-full ${
                        userQueue.status === 'serving' ? 'bg-emerald-500' :
                        userQueue.status === 'next' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                    />
                    {userQueue.status === 'serving' ? 'Your Turn!' : userQueue.status === 'next' ? 'Next Up' : `Position #${userQueue.position}`}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {userQueue.estimatedWait > 0 ? `~${userQueue.estimatedWait} min wait` : 'Serving now'}
                  </p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200/50 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(15, 100 - ((userQueue.position - 1) / 5) * 100)}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400 mb-3">Not in queue</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/queue')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 inline-flex items-center gap-2"
              >
                View Queue <ArrowRight size={14} />
              </motion.button>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
