import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { queueData, doctors, patients, funFacts } from '../data/mockData';
import { predictWaitTime } from '../utils/helpers';
import { Clock, Users, Zap, ChevronRight, Volume2, Timer, Sparkles } from 'lucide-react';

function getQueuePatient(q) {
  return patients.find(p => p.id === q.patientId);
}
function getQueueDoctor(q) {
  return doctors.find(d => d.id === q.doctorId);
}

export default function QueuePage() {
  const { role, addNotification } = useApp();
  const [queue, setQueue] = useState(queueData);
  const [currentFact, setCurrentFact] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const [lastAnnouncedToken, setLastAnnouncedToken] = useState(null);

  // Simulate queue movement
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => {
        const serving = prev.find(q => q.status === 'serving');
        const next = prev.find(q => q.status === 'next');
        if (!serving || !next) return prev;

        return prev
          .filter(q => q.tokenNo !== serving.tokenNo)
          .map((q, i) => {
            if (q.tokenNo === next.tokenNo) {
              return { ...q, status: 'serving', estimatedWait: 0, position: 1 };
            }
            const newPos = i + 1;
            return {
              ...q,
              status: newPos === 1 ? 'serving' : newPos === 2 ? 'next' : 'waiting',
              position: newPos,
              estimatedWait: predictWaitTime(newPos - 1),
            };
          });
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Handle side-effects cleanly when queue state updates
  useEffect(() => {
    const servingToken = queue.find(q => q.status === 'serving');
    if (servingToken && servingToken.tokenNo !== lastAnnouncedToken) {
      setLastAnnouncedToken(servingToken.tokenNo);
      
      const patient = getQueuePatient(servingToken);
      setAnnouncement(`Now serving ${patient?.name || 'Patient'} — Token ${servingToken.tokenNo}`);
      addNotification({ text: `Token ${servingToken.tokenNo} is now being served`, type: 'queue' });

      const timer = setTimeout(() => setAnnouncement(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [queue, lastAnnouncedToken, addNotification]);

  // Fun facts rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const servingToken = queue.find(q => q.status === 'serving');
  const nextToken = queue.find(q => q.status === 'next');
  const waitingTokens = queue.filter(q => q.status === 'waiting');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Announcement Banner */}
      <AnimatePresence>
        {announcement && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white flex items-center gap-3 shadow-lg shadow-primary-500/30"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Volume2 size={20} />
            </motion.div>
            <p className="font-semibold text-sm">{announcement}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">In Queue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                <AnimatedCounter value={queue.length} />
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Timer size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Wait Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                <AnimatedCounter value={18} suffix=" min" />
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Served Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                <AnimatedCounter value={47} />
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Now Serving - Hero Card */}
      {servingToken && (
        <motion.div
          layout
          className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 text-white shadow-2xl shadow-primary-500/30"
        >
          {/* Animated background circles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-60 h-60 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/10 rounded-full"
          />

          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm"
            >
              <Sparkles size={14} />
              NOW SERVING
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-5xl font-bold font-display mb-2">{servingToken.tokenNo}</h2>
                <p className="text-xl text-white/90">{getQueuePatient(servingToken)?.name}</p>
                <p className="text-sm text-white/60 mt-1">
                  {getQueueDoctor(servingToken)?.name} — {getQueueDoctor(servingToken)?.specialty}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-white/60">Consultation</p>
                  <p className="text-lg font-bold">In Progress</p>
                </div>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Queue Line */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-primary-500" />
          Queue Line
        </h3>

        <LayoutGroup>
          <div className="space-y-3">
            {/* Next in line */}
            {nextToken && (
              <motion.div
                layout
                layoutId={nextToken.tokenNo}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 dark:border-amber-500/20"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-3 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400"
                >
                  NEXT UP
                </motion.div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/25">
                    {getQueuePatient(nextToken)?.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-900 dark:text-white font-display">{nextToken.tokenNo}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{getQueuePatient(nextToken)?.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {getQueueDoctor(nextToken)?.name} • Est. wait: ~{nextToken.estimatedWait} min
                    </p>
                  </div>
                  <ChevronRight className="text-amber-500" />
                </div>
              </motion.div>
            )}

            {/* Waiting tokens */}
            <AnimatePresence>
              {waitingTokens.map((token, i) => (
                <motion.div
                  key={token.tokenNo}
                  layout
                  layoutId={token.tokenNo}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-4 bg-white/50 dark:bg-white/[0.04] backdrop-blur-sm border border-white/20 dark:border-white/[0.06] cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-xl">
                      {getQueuePatient(token)?.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-800 dark:text-white font-display">{token.tokenNo}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{getQueuePatient(token)?.name}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {getQueueDoctor(token)?.name} • Position #{token.position}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">~{token.estimatedWait} min</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Wait Time</p>
                    </div>
                  </div>

                  {/* Wait time progress bar */}
                  <div className="mt-3 w-full h-1.5 bg-gray-200/50 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(10, 100 - (token.estimatedWait / 40) * 100)}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>

      {/* While you wait section */}
      <GlassCard hover={false}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-primary-500" />
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">While You Wait...</h3>
        </div>
        <motion.p
          key={currentFact}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          {funFacts[currentFact]}
        </motion.p>
      </GlassCard>

      {/* Admin/Doctor: Queue management */}
      {(role === 'doctor' || role === 'admin') && (
        <GlassCard hover={false}>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Queue Management</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setQueue(prev => {
                  if (prev.length < 2) return prev;
                  const updated = prev.slice(1).map((q, i) => ({
                    ...q,
                    status: i === 0 ? 'serving' : i === 1 ? 'next' : 'waiting',
                    position: i + 1,
                    estimatedWait: predictWaitTime(i),
                  }));
                  return updated;
                });
              }}
            >
              Advance Queue
            </Button>
            <Button variant="secondary" size="sm">
              Skip Current
            </Button>
            <Button variant="ghost" size="sm">
              Reset Queue
            </Button>
          </div>
        </GlassCard>
      )}
    </motion.div>
  );
}
