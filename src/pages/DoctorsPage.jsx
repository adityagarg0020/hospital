import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { doctors } from '../data/mockData';
import {
  Activity, Star, Clock, Users, Award, Search, ChevronRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
            <Activity size={24} className="text-primary-500" />
            Doctors
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{doctors.length} practicing physicians</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-800 dark:text-gray-200"
          />
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((doctor) => (
          <motion.div
            key={doctor.id}
            variants={item}
            onHoverStart={() => setHoveredId(doctor.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <GlassCard className="!p-0 overflow-hidden">
              {/* Top gradient bar */}
              <div className="h-2 bg-gradient-to-r from-primary-500 to-accent-500" />

              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    animate={hoveredId === doctor.id ? { scale: 1.1, rotate: 5 } : {}}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-3xl shadow-lg shadow-primary-500/20"
                  >
                    {doctor.avatar}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                    <p className="text-sm text-primary-500 font-medium">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} fill="#f59e0b" className="text-amber-500" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{doctor.rating}</span>
                      <span className="text-xs text-gray-400">• {doctor.experience} yrs</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-white/[0.03] rounded-lg px-3 py-2">
                    <Users size={12} className="text-primary-500" />
                    {doctor.patients}+ patients
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-white/[0.03] rounded-lg px-3 py-2">
                    <Clock size={12} className="text-primary-500" />
                    Next: {doctor.nextSlot}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50 dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    <span className={`text-xs font-medium ${doctor.available ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {doctor.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">${doctor.fee}/visit</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
