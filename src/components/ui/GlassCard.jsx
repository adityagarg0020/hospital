import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, glow = false, onClick, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-6
        bg-white/70 dark:bg-white/[0.06]
        backdrop-blur-xl backdrop-saturate-150
        border border-white/20 dark:border-white/[0.08]
        shadow-lg shadow-black/[0.04] dark:shadow-black/20
        transition-shadow duration-300
        ${hover ? 'hover:shadow-xl hover:shadow-black/[0.08] dark:hover:shadow-black/30 cursor-pointer' : ''}
        ${glow ? 'glow-primary' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
