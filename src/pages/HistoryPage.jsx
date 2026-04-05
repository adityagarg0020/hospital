import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { patientHistory } from '../data/mockData';
import { formatDate } from '../utils/helpers';
import {
  Stethoscope, TestTube, AlertTriangle, ClipboardCheck,
  ChevronDown, ChevronUp, Calendar
} from 'lucide-react';

const eventIcons = {
  visit: { icon: Stethoscope, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  lab: { icon: TestTube, color: 'from-purple-500 to-pink-600', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  emergency: { icon: AlertTriangle, color: 'from-red-500 to-pink-600', bg: 'bg-red-50 dark:bg-red-500/10' },
  checkup: { icon: ClipboardCheck, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
};

const timelineVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', damping: 20 } },
};

export default function HistoryPage() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
          <Calendar size={24} className="text-primary-500" />
          Medical History
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your complete health journey timeline</p>
      </div>

      {/* Timeline */}
      <motion.div
        variants={timelineVariants}
        initial="hidden"
        animate="show"
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent" />

        <div className="space-y-6">
          {patientHistory.map((entry, i) => {
            const config = eventIcons[entry.type] || eventIcons.visit;
            const Icon = config.icon;
            const isExpanded = expandedId === entry.id;

            return (
              <motion.div
                key={entry.id}
                variants={itemVariants}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-3.5 w-5 h-5 rounded-full bg-gradient-to-br ${config.color} shadow-lg ring-4 ring-white dark:ring-surface-900 z-10`}
                  style={{ top: '1.5rem' }}
                />

                {/* Card */}
                <motion.div
                  layout
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  className={`
                    rounded-2xl p-5 cursor-pointer transition-all
                    bg-white/70 dark:bg-white/[0.06]
                    backdrop-blur-xl
                    border border-white/20 dark:border-white/[0.08]
                    shadow-md hover:shadow-lg
                    ${isExpanded ? 'ring-2 ring-primary-500/20' : ''}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{entry.event}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{entry.doctor}</p>
                        <p className="text-xs text-primary-500 font-medium">{formatDate(entry.date)}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-gray-400 mt-1"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`mt-4 p-4 rounded-xl ${config.bg}`}>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {entry.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
