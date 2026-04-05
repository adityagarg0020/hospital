import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import QRCodeCanvas from '../ui/QRCodeCanvas';
import { doctors, departments } from '../../data/mockData';
import { generateId, formatDate } from '../../utils/helpers';
import {
  Check, ChevronRight, ChevronLeft, Search, Star,
  CalendarDays, Clock, Sparkles
} from 'lucide-react';

const steps = ['Department', 'Select Doctor', 'Date & Time', 'Confirm'];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -200 : 200, opacity: 0 }),
};

function generateTokenNumber() {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const num = Math.floor(Math.random() * 90 + 10);
  return `${letter}-${num}`;
}

export default function BookingModal({ isOpen, onClose, onBookComplete }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const nextStep = () => { setDirection(1); setStep(s => Math.min(s + 1, steps.length - 1)); };
  const prevStep = () => { setDirection(-1); setStep(s => Math.max(s - 1, 0)); };

  const handleBook = () => {
    const token = generateTokenNumber();
    setGeneratedToken(token);
    
    const newAppt = {
      id: generateId(),
      doctorId: selectedDoctor.id,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      type: 'New Visit',
      notes,
      token,
      doctorObj: selectedDoctor // passing doctor object temporarily for notification formatting in parent
    };
    
    setBookingSuccess(true);
    if (onBookComplete) {
      onBookComplete(newAppt);
    }
  };

  const resetBooking = () => {
    onClose();
    // Use a small timeout so the modal closing animation finishes before state reset
    setTimeout(() => {
      setBookingSuccess(false);
      setStep(0);
      setSelectedDept(null);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setNotes('');
      setGeneratedToken('');
      setSearchTerm('');
    }, 300);
  };

  // Filter doctors by selected department
  const deptDoctors = selectedDept
    ? doctors.filter(d => d.department === selectedDept.id)
    : doctors;

  const filteredDoctors = deptDoctors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate next 7 dates
  const futureDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  // Deterministic booked slots (based on date+time hash)
  const isSlotBooked = (time) => {
    if (!selectedDate) return false;
    let hash = 0;
    const str = selectedDate + time;
    for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    return (Math.abs(hash) % 10) > 6;
  };

  return (
    <Modal isOpen={isOpen} onClose={resetBooking} title="Book Appointment" size="lg">
      {bookingSuccess ? (
        /* Success Animation with Token & QR */
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Check size={40} className="text-white" />
            </motion.div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-2"
          >
            Booking Confirmed! 🎉
          </motion.h3>

          {/* Token display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="my-6 inline-block"
          >
            <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-2xl shadow-primary-500/30">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Your Token</p>
              <p className="text-4xl font-extrabold font-display">{generatedToken}</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            {selectedDoctor?.name} • {formatDate(selectedDate)} at {selectedTime}
          </motion.p>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Scan at Hospital</p>
            <QRCodeCanvas text={`MEDIVERSE-${generatedToken}-${selectedDate}-${selectedTime}`} size={150} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-3"
          >
            <Button onClick={resetBooking}>Done</Button>
          </motion.div>
        </motion.div>
      ) : (
        <>
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-0 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: i <= step ? 'var(--color-primary-500)' : 'transparent',
                    borderColor: i <= step ? 'var(--color-primary-500)' : '#d1d5db',
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    i <= step ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </motion.div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-1 rounded-full transition-colors ${
                    i < step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">{steps[step]}</p>

          {/* Step Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Step 0: Department */}
              {step === 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {departments.map(dept => (
                    <motion.button
                      key={dept.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedDept(dept); setSelectedDoctor(null); }}
                      className={`p-4 rounded-2xl text-center transition-all ${
                        selectedDept?.id === dept.id
                          ? 'bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-500/30 shadow-sm'
                          : 'bg-white/50 dark:bg-white/[0.03] border border-gray-200/30 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="text-2xl block mb-2">{dept.icon}</span>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{dept.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{dept.desc}</p>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 1: Doctor */}
              {step === 1 && (
                <div>
                  <div className="relative mb-4">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or specialty..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  {selectedDept && (
                    <p className="text-xs text-primary-500 font-semibold mb-3 flex items-center gap-1">
                      <span>{selectedDept.icon}</span> {selectedDept.name} — {filteredDoctors.length} doctors available
                    </p>
                  )}
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {filteredDoctors.map(doctor => (
                      <motion.div
                        key={doctor.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDoctor(doctor)}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                          selectedDoctor?.id === doctor.id
                            ? 'bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-500/30 shadow-sm'
                            : 'bg-white/50 dark:bg-white/[0.03] border border-gray-200/30 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-xl">
                          {doctor.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{doctor.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{doctor.specialty} • {doctor.experience} yrs exp</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs text-amber-500">
                            <Star size={12} fill="currentColor" />{doctor.rating}
                          </div>
                          <p className="text-xs text-gray-400">${doctor.fee}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">Select Date</label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {futureDates.map(date => {
                        const d = new Date(date);
                        const isSelected = selectedDate === date;
                        return (
                          <motion.button
                            key={date}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-xl text-center transition-all ${
                              isSelected
                                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-white/50 dark:bg-white/[0.04] border border-gray-200/30 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.06] text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <p className="text-[10px] uppercase">{d.toLocaleDateString('en', { weekday: 'short' })}</p>
                            <p className="text-lg font-bold">{d.getDate()}</p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">Select Time</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map(time => {
                        const isSelected = selectedTime === time;
                        const booked = isSlotBooked(time);
                        return (
                          <motion.button
                            key={time}
                            whileHover={{ scale: booked ? 1 : 1.05 }}
                            whileTap={{ scale: booked ? 1 : 0.95 }}
                            onClick={() => !booked && setSelectedTime(time)}
                            disabled={booked}
                            className={`p-2.5 rounded-xl text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                                : booked
                                ? 'bg-gray-100 dark:bg-white/[0.02] text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                                : 'bg-white/50 dark:bg-white/[0.04] border border-gray-200/30 dark:border-white/[0.06] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.06]'
                            }`}
                          >
                            {time}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-primary-50/50 dark:bg-primary-500/[0.06] border border-primary-200/30 dark:border-primary-500/10 p-5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Sparkles size={16} className="text-primary-500" />
                      Appointment Summary
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Department</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{selectedDept?.icon} {selectedDept?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Doctor</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{selectedDoctor?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Specialty</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{selectedDoctor?.specialty}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{formatDate(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Consultation Fee</span>
                        <span className="font-bold text-primary-600 dark:text-primary-400">${selectedDoctor?.fee}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Notes (optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe your symptoms or reason for visit..."
                      rows={3}
                      className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-sm outline-none focus:ring-2 focus:ring-primary-500/50 resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={step === 0 ? resetBooking : prevStep} icon={ChevronLeft}>
              {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            {step < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                iconRight={ChevronRight}
                disabled={
                  (step === 0 && !selectedDept) ||
                  (step === 1 && !selectedDoctor) ||
                  (step === 2 && (!selectedDate || !selectedTime))
                }
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleBook} icon={Check} variant="success">
                Confirm Booking
              </Button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
