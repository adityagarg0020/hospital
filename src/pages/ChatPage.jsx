import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { chatResponses } from '../data/mockData';
import { Send, Bot, User, Mic, MicOff, Sparkles, AlertCircle } from 'lucide-react';

const quickActions = [
  { label: '📅 Book Appointment', key: 'appointment' },
  { label: '⏱️ Wait Times', key: 'wait' },
  { label: '🤕 I have a headache', key: 'headache' },
  { label: '🤒 I have a fever', key: 'fever' },
  { label: '🦷 Tooth pain', key: 'tooth' },
  { label: '😰 Feeling anxious', key: 'anxiety' },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
          className="w-2 h-2 bg-primary-400 rounded-full"
        />
      ))}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: chatResponses.greeting[0], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, typing]);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setInput(finalTranscript);
      } else if (interimTranscript) {
        setInput(interimTranscript);
      }
    };

    recognition.onend = () => {
      setMicActive(false);
      // Auto-send if there's input after recognition ends
      // We use a small delay to ensure the final transcript is set
    };

    recognition.onerror = (event) => {
      console.log('Speech recognition error:', event.error);
      setMicActive(false);
      if (event.error === 'not-allowed') {
        setMicSupported(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
    };
  }, []);

  const toggleMic = () => {
    if (!micSupported || !recognitionRef.current) return;

    if (micActive) {
      recognitionRef.current.stop();
      setMicActive(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setMicActive(true);
    }
  };

  const getReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('appointment') || lower.includes('book')) return chatResponses.appointment;
    if (lower.includes('wait') || lower.includes('queue')) return chatResponses.wait;
    if (lower.includes('thank')) return chatResponses.thanks;
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return chatResponses.greeting[1];
    // Symptom matching
    if (lower.includes('chest pain') || lower.includes('chest')) return chatResponses.symptoms['chest pain'];
    if (lower.includes('tooth') || lower.includes('dental')) return chatResponses.symptoms['tooth pain'];
    if (lower.includes('toothache')) return chatResponses.symptoms.toothache;
    if (lower.includes('headache') || lower.includes('head pain') || lower.includes('migraine')) return chatResponses.symptoms.headache;
    if (lower.includes('fever') || lower.includes('temperature')) return chatResponses.symptoms.fever;
    if (lower.includes('cough') || lower.includes('cold')) return chatResponses.symptoms.cough;
    if (lower.includes('back pain') || lower.includes('spine')) return chatResponses.symptoms['back pain'];
    if (lower.includes('skin') || lower.includes('rash') || lower.includes('itch')) return chatResponses.symptoms['skin rash'];
    if (lower.includes('ear') || lower.includes('hearing')) return chatResponses.symptoms['ear pain'];
    if (lower.includes('eye') || lower.includes('vision') || lower.includes('sight')) return chatResponses.symptoms['eye pain'];
    if (lower.includes('anxious') || lower.includes('anxiety') || lower.includes('panic')) return chatResponses.symptoms.anxiety;
    if (lower.includes('stress') || lower.includes('depression') || lower.includes('sad')) return chatResponses.symptoms.stress;
    return chatResponses.symptoms.default;
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: getReply(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (key) => {
    const action = quickActions.find(a => a.key === key);
    if (action) {
      sendMessage(action.label.replace(/[^\w\s]/g, '').trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-8rem)]"
    >
      {/* Chat Header */}
      <GlassCard hover={false} className="mb-4 !p-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25"
          >
            <Bot size={24} className="text-white" />
          </motion.div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
              MediBot
              <Sparkles size={14} className="text-primary-500" />
            </h2>
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-emerald-500 rounded-full"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">Online • AI Health Assistant</span>
            </div>
          </div>
          {!micSupported && (
            <div className="flex items-center gap-1 text-xs text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg">
              <AlertCircle size={12} />
              <span>Mic unavailable</span>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-white/30 dark:bg-white/[0.02] backdrop-blur-sm border border-white/20 dark:border-white/[0.06] p-4 space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 mb-4">
                  <Bot size={14} className="text-white" />
                </div>
              )}

              <div className={`max-w-[75%] ${msg.type === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`
                    rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line
                    ${msg.type === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-md shadow-lg shadow-primary-500/20'
                      : 'bg-white/80 dark:bg-white/[0.08] text-gray-800 dark:text-gray-200 rounded-bl-md border border-white/30 dark:border-white/[0.06]'
                    }
                  `}
                >
                  {msg.text}
                </div>
                <p className={`text-[10px] text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  {msg.time}
                </p>
              </div>

              {msg.type === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center flex-shrink-0 mb-4">
                  <User size={14} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-white/80 dark:bg-white/[0.08] rounded-2xl rounded-bl-md border border-white/30 dark:border-white/[0.06]">
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {quickActions.map((action) => (
          <motion.button
            key={action.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickAction(action.key)}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/60 dark:bg-white/[0.06] backdrop-blur-sm border border-white/20 dark:border-white/[0.08] text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors"
          >
            {action.label}
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-lg">
          {/* Voice button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={toggleMic}
            disabled={!micSupported}
            className={`p-3 rounded-xl transition-colors ${
              micActive
                ? 'bg-danger-500 text-white shadow-lg shadow-danger-500/30'
                : micSupported
                ? 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400'
                : 'opacity-30 cursor-not-allowed text-gray-400'
            }`}
          >
            {micActive ? (
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <MicOff size={18} />
              </motion.div>
            ) : (
              <Mic size={18} />
            )}
          </motion.button>

          {/* Listening indicator */}
          {micActive && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-1.5 px-2"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 bg-red-500 rounded-full"
              />
              <span className="text-xs text-red-500 font-medium whitespace-nowrap">Listening...</span>
            </motion.div>
          )}

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={micActive ? 'Speak now...' : 'Ask me anything about your health...'}
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 px-2"
          />

          <motion.button
            type="submit"
            disabled={!input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 disabled:opacity-40 disabled:shadow-none transition-all"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
