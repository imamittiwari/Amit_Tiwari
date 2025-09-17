import { motion } from "framer-motion";

interface SkillCircleProps {
  skill: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

export default function SkillCircle({ skill, percentage, icon, color, delay = 0 }: SkillCircleProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
      data-testid={`skill-circle-${skill.toLowerCase().replace(/[\s\/]/g, '-')}`}
    >
      <div className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer">
        <svg className="w-24 h-24 -rotate-90 group-hover:scale-110 transition-transform duration-300">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="48"
            cy="48"
            r="45"
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.5 }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl mb-1" style={{ color }}>
            {icon}
          </div>
          <span className="text-xs font-semibold">{percentage}%</span>
        </div>
      </div>
      <p className="font-medium text-sm">{skill}</p>
    </motion.div>
  );
}
