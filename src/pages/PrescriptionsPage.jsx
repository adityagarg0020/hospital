import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import Modal from '../components/ui/Modal';
import { prescriptions, doctors, patients } from '../data/mockData';
import { formatDate } from '../utils/helpers';
import { FileText, Pill, User, Calendar, ChevronRight, Download } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PrescriptionsPage() {
  const [selectedRx, setSelectedRx] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
          <FileText size={24} className="text-primary-500" />
          Prescriptions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your medication history and active prescriptions</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((rx) => {
          const doctor = doctors.find(d => d.id === rx.doctorId);
          const patient = patients.find(p => p.id === rx.patientId);
          return (
            <motion.div key={rx.id} variants={item}>
              <GlassCard onClick={() => setSelectedRx(rx)} className="!p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
                      <Pill size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{rx.diagnosis}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{doctor?.name}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(rx.date)}</span>
                </div>

                <div className="space-y-2 mb-4">
                  {rx.medicines.slice(0, 2).map((med, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-white/[0.03] rounded-lg px-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      <span className="font-medium">{med.name}</span>
                      <span className="text-gray-400">• {med.dosage}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{rx.medicines.length} medications</span>
                  <div className="flex items-center gap-1 text-primary-500 text-xs font-semibold">
                    View Details <ChevronRight size={12} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedRx}
        onClose={() => setSelectedRx(null)}
        title="Prescription Details"
      >
        {selectedRx && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-primary-500/[0.06] border border-primary-200/30 dark:border-primary-500/10">
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{selectedRx.diagnosis}</h4>
              <p className="text-sm text-gray-500">{doctors.find(d => d.id === selectedRx.doctorId)?.name} • {formatDate(selectedRx.date)}</p>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Medications</h5>
              <div className="space-y-3">
                {selectedRx.medicines.map((med, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/50 dark:bg-white/[0.04] border border-gray-200/30 dark:border-white/[0.06]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Pill size={14} className="text-primary-500" />
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{med.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Dosage:</span> {med.dosage}</div>
                      <div><span className="font-medium">Frequency:</span> {med.frequency}</div>
                      <div><span className="font-medium">Duration:</span> {med.duration}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {selectedRx.notes && (
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-500/[0.06] border border-amber-200/30 dark:border-amber-500/10">
                <p className="text-sm text-gray-700 dark:text-gray-300">📝 {selectedRx.notes}</p>
              </div>
            )}

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              <Download size={16} />
              Download Prescription
            </button>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
