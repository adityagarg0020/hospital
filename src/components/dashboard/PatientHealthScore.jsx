import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { healthScoreData } from '../../data/mockData';
import { Activity } from 'lucide-react';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
};

export default function PatientHealthScore() {
  return (
    <motion.div variants={item}>
      <GlassCard hover={false}>
        <div className="flex items-center gap-2 mb-6">
          <Activity size={16} className="text-primary-500" />
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Health Score</h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
              {healthScoreData.overall}/100
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {healthScoreData.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="text-center p-4 rounded-2xl bg-gray-50/50 dark:bg-white/[0.03] border border-gray-200/30 dark:border-white/[0.06]"
            >
              <span className="text-2xl block mb-2">{metric.icon}</span>
              <p className="text-lg font-bold text-gray-900 dark:text-white font-display">{metric.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{metric.unit}</p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{metric.label}</p>
              <div className={`mt-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                metric.status === 'normal' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                metric.status === 'good' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
              }`}>
                {metric.status}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
