// Mock data for the Smart Hospital Management System

export const departments = [
  { id: 'cardiology', name: 'Cardiology', icon: '🫀', color: 'from-red-500 to-rose-600', desc: 'Heart & cardiovascular care' },
  { id: 'neurology', name: 'Neurology', icon: '🧠', color: 'from-purple-500 to-indigo-600', desc: 'Brain & nervous system' },
  { id: 'orthopedics', name: 'Orthopedics', icon: '🦴', color: 'from-blue-500 to-cyan-600', desc: 'Bones, joints & muscles' },
  { id: 'dermatology', name: 'Dermatology', icon: '🧴', color: 'from-amber-500 to-orange-600', desc: 'Skin, hair & nails' },
  { id: 'pediatrics', name: 'Pediatrics', icon: '👶', color: 'from-pink-500 to-rose-600', desc: 'Children\'s health' },
  { id: 'general', name: 'General Medicine', icon: '🏥', color: 'from-emerald-500 to-teal-600', desc: 'General health checkups' },
  { id: 'dental', name: 'Dental', icon: '🦷', color: 'from-sky-500 to-blue-600', desc: 'Teeth & oral health' },
  { id: 'ent', name: 'ENT', icon: '👂', color: 'from-violet-500 to-purple-600', desc: 'Ear, nose & throat' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️', color: 'from-teal-500 to-emerald-600', desc: 'Eye care & vision' },
  { id: 'psychiatry', name: 'Psychiatry', icon: '🧘', color: 'from-indigo-500 to-blue-600', desc: 'Mental health & wellness' },
];

export const doctors = [
  { id: 'd1', name: 'Dr. Sarah Chen', specialty: 'Cardiology', department: 'cardiology', avatar: '👩‍⚕️', rating: 4.9, experience: 15, patients: 1240, available: true, nextSlot: '10:30 AM', fee: 150 },
  { id: 'd2', name: 'Dr. James Wilson', specialty: 'Neurology', department: 'neurology', avatar: '👨‍⚕️', rating: 4.8, experience: 12, patients: 980, available: true, nextSlot: '11:00 AM', fee: 175 },
  { id: 'd3', name: 'Dr. Priya Sharma', specialty: 'Orthopedics', department: 'orthopedics', avatar: '👩‍⚕️', rating: 4.7, experience: 10, patients: 850, available: false, nextSlot: '2:00 PM', fee: 130 },
  { id: 'd4', name: 'Dr. Michael Brown', specialty: 'Dermatology', department: 'dermatology', avatar: '👨‍⚕️', rating: 4.9, experience: 18, patients: 1560, available: true, nextSlot: '10:00 AM', fee: 120 },
  { id: 'd5', name: 'Dr. Emily Zhang', specialty: 'Pediatrics', department: 'pediatrics', avatar: '👩‍⚕️', rating: 4.8, experience: 8, patients: 720, available: true, nextSlot: '11:30 AM', fee: 100 },
  { id: 'd6', name: 'Dr. Robert Kim', specialty: 'General Medicine', department: 'general', avatar: '👨‍⚕️', rating: 4.6, experience: 20, patients: 2100, available: true, nextSlot: '9:30 AM', fee: 90 },
  { id: 'd7', name: 'Dr. Anjali Mehta', specialty: 'Dental', department: 'dental', avatar: '👩‍⚕️', rating: 4.8, experience: 11, patients: 950, available: true, nextSlot: '10:00 AM', fee: 110 },
  { id: 'd8', name: 'Dr. David Park', specialty: 'Dental', department: 'dental', avatar: '👨‍⚕️', rating: 4.7, experience: 9, patients: 780, available: true, nextSlot: '11:00 AM', fee: 100 },
  { id: 'd9', name: 'Dr. Lisa Thompson', specialty: 'ENT', department: 'ent', avatar: '👩‍⚕️', rating: 4.6, experience: 14, patients: 1120, available: true, nextSlot: '2:30 PM', fee: 140 },
  { id: 'd10', name: 'Dr. Arjun Patel', specialty: 'Cardiology', department: 'cardiology', avatar: '👨‍⚕️', rating: 4.9, experience: 22, patients: 2500, available: true, nextSlot: '9:00 AM', fee: 200 },
  { id: 'd11', name: 'Dr. Maria Santos', specialty: 'Ophthalmology', department: 'ophthalmology', avatar: '👩‍⚕️', rating: 4.7, experience: 13, patients: 1050, available: true, nextSlot: '10:30 AM', fee: 135 },
  { id: 'd12', name: 'Dr. Vikram Singh', specialty: 'Psychiatry', department: 'psychiatry', avatar: '👨‍⚕️', rating: 4.8, experience: 16, patients: 890, available: true, nextSlot: '3:00 PM', fee: 180 },
];

export const patients = [
  { id: 'p1', name: 'Alex Thompson', age: 34, gender: 'Male', blood: 'O+', phone: '+1-555-0101', email: 'alex@email.com', condition: 'Hypertension', avatar: '🧑', rewardPoints: 450 },
  { id: 'p2', name: 'Maria Garcia', age: 28, gender: 'Female', blood: 'A+', phone: '+1-555-0102', email: 'maria@email.com', condition: 'Migraine', avatar: '👩', rewardPoints: 320 },
  { id: 'p3', name: 'David Lee', age: 45, gender: 'Male', blood: 'B+', phone: '+1-555-0103', email: 'david@email.com', condition: 'Diabetes Type 2', avatar: '🧑', rewardPoints: 680 },
  { id: 'p4', name: 'Sophie Williams', age: 22, gender: 'Female', blood: 'AB-', phone: '+1-555-0104', email: 'sophie@email.com', condition: 'Asthma', avatar: '👩', rewardPoints: 150 },
  { id: 'p5', name: 'Raj Patel', age: 52, gender: 'Male', blood: 'O-', phone: '+1-555-0105', email: 'raj@email.com', condition: 'Arthritis', avatar: '🧑', rewardPoints: 890 },
];

export const appointments = [
  { id: 'a1', patientId: 'p1', doctorId: 'd1', date: '2026-04-01', time: '10:30 AM', status: 'confirmed', type: 'Follow-up', notes: 'Blood pressure check', token: 'A-017' },
  { id: 'a2', patientId: 'p2', doctorId: 'd2', date: '2026-04-01', time: '11:00 AM', status: 'confirmed', type: 'Consultation', notes: 'Recurring headaches', token: 'A-018' },
  { id: 'a3', patientId: 'p3', doctorId: 'd6', date: '2026-04-01', time: '9:30 AM', status: 'in-progress', type: 'Check-up', notes: 'Quarterly diabetes review', token: 'A-019' },
  { id: 'a4', patientId: 'p4', doctorId: 'd5', date: '2026-04-02', time: '11:30 AM', status: 'pending', type: 'New Visit', notes: 'Breathing difficulty', token: 'A-020' },
  { id: 'a5', patientId: 'p5', doctorId: 'd3', date: '2026-04-02', time: '2:00 PM', status: 'confirmed', type: 'Follow-up', notes: 'Knee pain assessment', token: 'A-021' },
  { id: 'a6', patientId: 'p1', doctorId: 'd4', date: '2026-04-03', time: '10:00 AM', status: 'pending', type: 'New Visit', notes: 'Skin rash evaluation', token: 'A-022' },
];

export const queueData = [
  { tokenNo: 'T-001', patientId: 'p3', doctorId: 'd6', status: 'serving', estimatedWait: 0, position: 1 },
  { tokenNo: 'T-002', patientId: 'p1', doctorId: 'd1', status: 'next', estimatedWait: 8, position: 2 },
  { tokenNo: 'T-003', patientId: 'p2', doctorId: 'd2', status: 'waiting', estimatedWait: 15, position: 3 },
  { tokenNo: 'T-004', patientId: 'p4', doctorId: 'd5', status: 'waiting', estimatedWait: 25, position: 4 },
  { tokenNo: 'T-005', patientId: 'p5', doctorId: 'd3', status: 'waiting', estimatedWait: 35, position: 5 },
];

export const prescriptions = [
  {
    id: 'rx1', patientId: 'p1', doctorId: 'd1', date: '2026-03-28',
    medicines: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
      { name: 'Losartan', dosage: '50mg', frequency: 'Once daily', duration: '30 days' },
    ],
    diagnosis: 'Essential Hypertension',
    notes: 'Monitor BP weekly. Reduce sodium intake.',
  },
  {
    id: 'rx2', patientId: 'p2', doctorId: 'd2', date: '2026-03-25',
    medicines: [
      { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', duration: '15 days' },
      { name: 'Propranolol', dosage: '40mg', frequency: 'Twice daily', duration: '30 days' },
    ],
    diagnosis: 'Chronic Migraine',
    notes: 'Avoid triggers. Maintain sleep schedule.',
  },
  {
    id: 'rx3', patientId: 'p3', doctorId: 'd6', date: '2026-03-20',
    medicines: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '90 days' },
      { name: 'Glimepiride', dosage: '2mg', frequency: 'Once daily', duration: '90 days' },
    ],
    diagnosis: 'Type 2 Diabetes Mellitus',
    notes: 'HbA1c test in 3 months. Diet control essential.',
  },
];

export const patientHistory = [
  { id: 'h1', patientId: 'p1', date: '2026-03-28', event: 'Consultation', doctor: 'Dr. Sarah Chen', description: 'Blood pressure monitoring. Adjusted medication dosage.', type: 'visit' },
  { id: 'h2', patientId: 'p1', date: '2026-03-15', event: 'Lab Test', doctor: 'Lab Department', description: 'Complete blood count and lipid profile. Results normal.', type: 'lab' },
  { id: 'h3', patientId: 'p1', date: '2026-02-28', event: 'Consultation', doctor: 'Dr. Sarah Chen', description: 'Initial diagnosis of hypertension. Started medication.', type: 'visit' },
  { id: 'h4', patientId: 'p1', date: '2026-02-10', event: 'Emergency Visit', doctor: 'Dr. Robert Kim', description: 'Chest pain evaluation. ECG normal. Advised follow-up.', type: 'emergency' },
  { id: 'h5', patientId: 'p1', date: '2026-01-20', event: 'Annual Check-up', doctor: 'Dr. Robert Kim', description: 'Routine physical examination. BMI slightly elevated.', type: 'checkup' },
];

export const chatResponses = {
  greeting: [
    "Hello! I'm MediBot, your AI health assistant. How can I help you today? 😊",
    "Welcome to MediVerse! I'm here to help you with health queries, appointments, and more.",
  ],
  symptoms: {
    headache: "I understand you're experiencing headaches. Here are some suggestions:\n\n• Stay hydrated and rest in a quiet, dark room\n• Over-the-counter pain relief may help\n• If headaches persist for more than 3 days, please book an appointment with our **Neurology** department\n\n🏥 Recommended: **Dr. James Wilson** (Neurology)\n\nWould you like me to help schedule an appointment?",
    fever: "For fever management:\n\n• Rest and stay hydrated\n• Take acetaminophen as directed\n• Monitor temperature every 4 hours\n• Seek immediate care if temperature exceeds 103°F\n\n🏥 Recommended: **General Medicine**\n\nShall I connect you with a doctor?",
    cough: "For persistent cough:\n\n• Stay hydrated with warm fluids\n• Use honey and ginger tea for relief\n• Avoid irritants and cold air\n• If cough persists beyond a week, consider a check-up\n\n🏥 Recommended: **General Medicine** or **ENT**\n\nWould you like to book a consultation?",
    'chest pain': "⚠️ Chest pain can be serious. If you're experiencing:\n\n• Severe or crushing chest pain\n• Pain radiating to arm or jaw\n• Difficulty breathing\n\nPlease call emergency services immediately!\n\nFor mild chest discomfort:\n🏥 Recommended: **Dr. Sarah Chen** (Cardiology)\n\nI'd recommend booking an urgent cardiology consultation.",
    'tooth pain': "For tooth pain / toothache:\n\n• Rinse with warm salt water\n• Use clove oil for temporary relief\n• Take OTC pain relievers\n• Avoid very hot or cold foods\n\n🏥 Recommended: **Dental** department\n👩‍⚕️ **Dr. Anjali Mehta** or **Dr. David Park**\n\nWould you like to book a dental appointment?",
    toothache: "For toothache:\n\n• Rinse mouth with warm salt water\n• Apply a cold compress to the cheek\n• Take ibuprofen for pain relief\n• Floss gently around the affected tooth\n\n🏥 Recommended: **Dental** department\n👩‍⚕️ **Dr. Anjali Mehta** (next slot: 10:00 AM)\n\nShall I book you a dental appointment?",
    'back pain': "For back pain:\n\n• Rest but avoid prolonged bed rest\n• Apply ice or heat therapy\n• Gentle stretching exercises\n• Maintain good posture\n\n🏥 Recommended: **Orthopedics** department\n👩‍⚕️ **Dr. Priya Sharma** (Orthopedics)\n\nWould you like to schedule an orthopedic consultation?",
    'skin rash': "For skin rash / skin irritation:\n\n• Keep the area clean and dry\n• Apply calamine lotion\n• Avoid scratching\n• Use hypoallergenic products\n\n🏥 Recommended: **Dermatology** department\n👨‍⚕️ **Dr. Michael Brown** (18 yrs experience)\n\nWould you like to book a dermatology appointment?",
    'ear pain': "For ear pain:\n\n• Apply a warm compress\n• Use OTC pain relievers\n• Keep ear dry\n• Don't insert anything into the ear canal\n\n🏥 Recommended: **ENT** department\n👩‍⚕️ **Dr. Lisa Thompson** (ENT specialist)\n\nShall I schedule an ENT consultation?",
    'eye pain': "For eye pain / vision issues:\n\n• Rest your eyes from screens\n• Use lubricating eye drops\n• Avoid rubbing your eyes\n• If sudden vision changes, seek immediate care\n\n🏥 Recommended: **Ophthalmology** department\n👩‍⚕️ **Dr. Maria Santos** (Eye specialist)\n\nWould you like to book an eye appointment?",
    anxiety: "For anxiety / stress management:\n\n• Practice deep breathing exercises\n• Try 5-minute meditation\n• Limit caffeine intake\n• Maintain a regular sleep schedule\n• Talk to someone you trust\n\n🏥 Recommended: **Psychiatry** department\n👨‍⚕️ **Dr. Vikram Singh** (Mental health)\n\n💙 You're not alone. Would you like to schedule a consultation?",
    stress: "For stress management:\n\n• Deep breathing: 4-7-8 technique\n• Physical exercise for 30 minutes daily\n• Limit screen time before bed\n• Connect with friends and family\n\n🏥 If persistent, our **Psychiatry** team can help\n👨‍⚕️ **Dr. Vikram Singh** is available\n\nYour mental health matters. Want to book a session?",
    default: "I appreciate you sharing that with me. Based on your symptoms, I'd recommend:\n\n1. Monitor your symptoms carefully\n2. Stay hydrated and rest well\n3. Consider booking an appointment if symptoms persist\n\nWould you like me to help you find the right specialist?",
  },
  appointment: "I can help you book an appointment! Here are the available specialties:\n\n🫀 Cardiology — Dr. Sarah Chen / Dr. Arjun Patel\n🧠 Neurology — Dr. James Wilson\n🦴 Orthopedics — Dr. Priya Sharma\n🧴 Dermatology — Dr. Michael Brown\n👶 Pediatrics — Dr. Emily Zhang\n🏥 General Medicine — Dr. Robert Kim\n🦷 Dental — Dr. Anjali Mehta / Dr. David Park\n👂 ENT — Dr. Lisa Thompson\n👁️ Ophthalmology — Dr. Maria Santos\n🧘 Psychiatry — Dr. Vikram Singh\n\nWhich department would you prefer?",
  wait: "Current estimated wait times:\n\n• General Medicine: ~15 min\n• Cardiology: ~25 min\n• Neurology: ~20 min\n• Pediatrics: ~10 min\n• Dental: ~12 min\n• ENT: ~18 min\n\n⏱️ These are approximate times and may vary.",
  thanks: "You're welcome! 😊 Take care and don't hesitate to reach out if you need anything else. Your health is our priority! 💙",
};

export const funFacts = [
  "💡 Did you know? The human heart beats about 100,000 times per day!",
  "🧠 Your brain uses 20% of your body's total energy.",
  "🦷 Tooth enamel is the hardest substance in the human body.",
  "👁️ Your eyes can distinguish approximately 10 million different colors.",
  "🫁 Your lungs contain about 1,500 miles of airways.",
  "❤️ Red blood cells can travel through your entire body in about 20 seconds.",
  "🦴 Babies are born with about 300 bones, but adults have only 206.",
  "🧬 If you uncoiled all of your DNA, it would stretch to Pluto and back.",
  "💪 The strongest muscle in the human body is the masseter (jaw muscle).",
  "👃 Your nose can remember 50,000 different scents.",
];

export const healthTips = [
  "🥗 Eat a balanced diet with plenty of fruits and vegetables",
  "💧 Drink at least 8 glasses of water daily",
  "🏃 Exercise for at least 30 minutes a day",
  "😴 Get 7-8 hours of quality sleep every night",
  "🧘 Practice mindfulness or meditation for stress relief",
  "🚶 Take short breaks every hour if you sit for long periods",
  "🍎 An apple a day keeps the doctor away!",
  "☀️ Get 15 minutes of sunlight daily for vitamin D",
];

export const statsData = {
  totalPatients: 2847,
  totalDoctors: 48,
  todayAppointments: 156,
  activeTokens: 23,
  avgWaitTime: 18,
  satisfaction: 94.5,
  emergencies: 3,
  bedOccupancy: 78,
};

export const weeklyData = [
  { day: 'Mon', patients: 142, appointments: 98 },
  { day: 'Tue', patients: 165, appointments: 112 },
  { day: 'Wed', patients: 138, appointments: 105 },
  { day: 'Thu', patients: 178, appointments: 125 },
  { day: 'Fri', patients: 195, appointments: 140 },
  { day: 'Sat', patients: 110, appointments: 78 },
  { day: 'Sun', patients: 65, appointments: 45 },
];

export const departmentData = [
  { name: 'Cardiology', value: 28, color: '#6366f1' },
  { name: 'Neurology', value: 22, color: '#8b5cf6' },
  { name: 'Orthopedics', value: 18, color: '#06b6d4' },
  { name: 'Pediatrics', value: 15, color: '#10b981' },
  { name: 'Dermatology', value: 10, color: '#f59e0b' },
  { name: 'General', value: 7, color: '#ef4444' },
];

export const healthScoreData = {
  overall: 82,
  metrics: [
    { label: 'Heart Rate', value: 72, unit: 'bpm', icon: '❤️', status: 'normal', color: 'from-red-500 to-rose-600' },
    { label: 'Steps Today', value: 6420, unit: 'steps', icon: '🚶', status: 'good', color: 'from-emerald-500 to-teal-600' },
    { label: 'Sleep', value: 7.2, unit: 'hrs', icon: '😴', status: 'good', color: 'from-indigo-500 to-purple-600' },
    { label: 'Water Intake', value: 5, unit: 'glasses', icon: '💧', status: 'low', color: 'from-cyan-500 to-blue-600' },
    { label: 'Calories', value: 1850, unit: 'kcal', icon: '🔥', status: 'normal', color: 'from-amber-500 to-orange-600' },
    { label: 'BMI', value: 23.4, unit: '', icon: '⚖️', status: 'normal', color: 'from-violet-500 to-purple-600' },
  ],
};

export const nearbyHospitals = [
  { name: 'MediVerse Central Hospital', distance: '0.5 km', rating: 4.8, address: '123 Healthcare Blvd', hours: '24/7', emergency: true },
  { name: 'City Medical Center', distance: '2.1 km', rating: 4.5, address: '456 Medical Ave', hours: '8AM - 10PM', emergency: true },
  { name: 'Green Valley Clinic', distance: '3.4 km', rating: 4.3, address: '789 Wellness St', hours: '9AM - 6PM', emergency: false },
  { name: 'Star Healthcare Hub', distance: '5.2 km', rating: 4.6, address: '321 Hospital Rd', hours: '24/7', emergency: true },
];
