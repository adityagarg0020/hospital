import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import BookingModal from '../components/appointments/BookingModal';
import { appointments, doctors, patients } from '../data/mockData';
import { storage, formatDate } from '../utils/helpers';
import {
  CalendarDays, Clock, Plus, Ticket
} from 'lucide-react';

export default function AppointmentsPage() {
  const { role, currentUser, addNotification } = useApp();
  const [appts, setAppts] = useState(() => storage.get('appointments') || appointments);
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    storage.set('appointments', appts);
  }, [appts]);

  const handleBookComplete = (newAppt) => {
    // Add to our list
    setAppts(prev => [...prev, newAppt]);
    
    // Notify
    addNotification({
      text: `🎟️ Appointment booked! Token: ${newAppt.token} — ${newAppt.doctorObj?.name} on ${formatDate(newAppt.date)}`,
      type: 'appointment',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  if (loading) {
    return <SkeletonLoader type="card" count={3} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Appointments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{appts.length} total appointments</p>
        </div>
        {role === 'patient' && (
          <Button icon={Plus} onClick={() => setShowBooking(true)}>
            Book Appointment
          </Button>
        )}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {appts.map((appt, i) => {
          const doctor = doctors.find(d => d.id === appt.doctorId);
          const patient = patients.find(p => p.id === appt.patientId);
          return (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="!p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-xl shadow-md">
                      {doctor?.avatar || '👨‍⚕️'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{doctor?.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{doctor?.specialty}</p>
                      {(role === 'doctor' || role === 'admin') && (
                        <p className="text-xs text-primary-500 mt-0.5">Patient: {patient?.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    {appt.token && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-500/10 border border-primary-200/30 dark:border-primary-500/20">
                        <Ticket size={12} className="text-primary-500" />
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{appt.token}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <CalendarDays size={14} />
                      {formatDate(appt.date)}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <Clock size={14} />
                      {appt.time}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(appt.status)}`}>
                      {appt.status}
                    </span>
                  </div>
                </div>
                {appt.notes && (
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-white/[0.02] rounded-lg px-3 py-2">
                    📝 {appt.notes}
                  </p>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        onBookComplete={handleBookComplete}
      />
    </motion.div>
  );
}
