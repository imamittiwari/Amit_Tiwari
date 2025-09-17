import { motion } from "framer-motion";
import { Download, GraduationCap, Briefcase, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function About() {
  const { ref, isVisible } = useIntersectionObserver();

  const handleDownloadResume = () => {
    // Create a downloadable PDF resume
    const link = document.createElement('a');
    link.href = '/api/resume'; // This would be implemented on the backend
    link.download = 'Amit_Tiwari_Resume.pdf';
    link.click();
  };

  const timelineItems = [
    {
      title: "Bachelor's in Data Science",
      organization: "University Name",
      period: "2022 - 2026",
      description: "Currently pursuing degree with focus on ML, statistics, and data engineering.",
      icon: GraduationCap,
      color: "text-primary",
    },
    {
      title: "Data Science Internship",
      organization: "Tech Company",
      period: "Summer 2023",
      description: "Worked on predictive analytics and data pipeline optimization.",
      icon: Briefcase,
      color: "text-accent",
    },
    {
      title: "Kaggle Competitions",
      organization: "Multiple Competitions",
      period: "2023 - Present",
      description: "Active participant in data science competitions with top 20% rankings.",
      icon: Trophy,
      color: "text-purple-400",
    },
  ];

  const skills = ["Python", "Machine Learning", "Deep Learning", "Data Visualization"];

  return (
    <section id="about" className="py-20" data-testid="about-section">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4" data-testid="about-title">
            About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="about-description">
            Passionate data science student with a focus on machine learning, artificial intelligence,
            and analytics. I love transforming raw data into meaningful insights and building predictive models.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glassmorphism rounded-xl p-8" data-testid="professional-summary">
              <h3 className="text-2xl font-semibold mb-6">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Currently pursuing a degree in Data Science with hands-on experience in machine learning,
                deep learning, and data visualization. Skilled in Python, R, SQL, and various ML frameworks.
                Passionate about solving real-world problems through data-driven approaches.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className={`
                      ${index === 0 ? 'bg-primary/20 text-primary' : ''}
                      ${index === 1 ? 'bg-accent/20 text-accent' : ''}
                      ${index === 2 ? 'bg-purple-500/20 text-purple-400' : ''}
                      ${index === 3 ? 'bg-green-500/20 text-green-400' : ''}
                    `}
                    data-testid={`skill-badge-${skill.toLowerCase().replace(' ', '-')}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <Button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2"
                data-testid="button-download-resume"
              >
                <Download size={20} />
                Download Resume
              </Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-8" data-testid="timeline-title">
              Education & Timeline
            </h3>
            
            <div className="space-y-6">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    className="relative pl-8"
                    data-testid={`timeline-item-${index}`}
                  >
                    <div className={`absolute left-0 top-2 w-4 h-4 ${item.color} rounded-full`}>
                      <Icon size={16} className="absolute -left-1 -top-1" />
                    </div>
                    {index < timelineItems.length - 1 && (
                      <div className="absolute left-2 top-6 w-0.5 h-full bg-border"></div>
                    )}
                    
                    <Card className="glassmorphism rounded-lg p-4">
                      <h4 className={`font-semibold ${item.color}`}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.organization} • {item.period}
                      </p>
                      <p className="text-sm mt-2">{item.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
