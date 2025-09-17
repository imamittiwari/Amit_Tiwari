import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SkillCircle from "./SkillCircle";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  SiPython,
  SiScikitlearn,
  SiTensorflow,
  SiAmazon,
  SiR,
  SiPandas,
} from "react-icons/si";
import { Database, BarChart3, Brain } from "lucide-react";

export default function Skills() {
  const { ref, isVisible } = useIntersectionObserver();

  const circularSkills = [
    {
      skill: "Python",
      percentage: 90,
      icon: <SiPython />,
      color: "hsl(217, 91%, 60%)",
    },
    {
      skill: "Machine Learning",
      percentage: 85,
      icon: <Brain size={24} />,
      color: "hsl(188, 95%, 43%)",
    },
    {
      skill: "SQL",
      percentage: 80,
      icon: <Database size={24} />,
      color: "hsl(282, 100%, 50%)",
    },
    {
      skill: "Data Viz",
      percentage: 75,
      icon: <BarChart3 size={24} />,
      color: "hsl(142, 76%, 36%)",
    },
    {
      skill: "AWS",
      percentage: 70,
      icon: <SiAmazon />,
      color: "hsl(47, 96%, 53%)",
    },
  ];

  const programmingSkills = [
    { name: "Python", percentage: 90, color: "hsl(217, 91%, 60%)" },
    { name: "R", percentage: 75, color: "hsl(188, 95%, 43%)" },
    { name: "SQL", percentage: 85, color: "hsl(282, 100%, 50%)" },
  ];

  const mlSkills = [
    { name: "Scikit-learn", percentage: 88, color: "hsl(142, 76%, 36%)" },
    { name: "TensorFlow", percentage: 72, color: "hsl(47, 96%, 53%)" },
    { name: "Pandas", percentage: 95, color: "hsl(217, 91%, 60%)" },
  ];

  return (
    <section id="skills" className="py-20" data-testid="skills-section">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4" data-testid="skills-title">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="skills-description">
            A comprehensive overview of my technical skills and proficiency levels across various domains.
          </p>
        </motion.div>

        {/* Circular Skills */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {circularSkills.map((skill, index) => (
            <SkillCircle
              key={skill.skill}
              skill={skill.skill}
              percentage={skill.percentage}
              icon={skill.icon}
              color={skill.color}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Progress Bar Skills */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="glassmorphism rounded-xl p-6" data-testid="programming-languages-card">
              <h3 className="text-xl font-semibold mb-6">Programming Languages</h3>
              <div className="space-y-6">
                {programmingSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    data-testid={`programming-skill-${skill.name.toLowerCase()}`}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <Progress
                      value={skill.percentage}
                      className="h-2"
                      style={{
                        "--progress-foreground": skill.color,
                      } as React.CSSProperties}
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="glassmorphism rounded-xl p-6" data-testid="ml-tools-card">
              <h3 className="text-xl font-semibold mb-6">Machine Learning & Tools</h3>
              <div className="space-y-6">
                {mlSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    data-testid={`ml-skill-${skill.name.toLowerCase()}`}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <Progress
                      value={skill.percentage}
                      className="h-2"
                      style={{
                        "--progress-foreground": skill.color,
                      } as React.CSSProperties}
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
