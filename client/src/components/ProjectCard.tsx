import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  gradient: string;
  delay?: number;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  category,
  gradient,
  delay = 0,
}: ProjectCardProps) {
  const techColors: Record<string, string> = {
    Python: "bg-primary/20 text-primary",
    "Scikit-learn": "bg-accent/20 text-accent",
    Pandas: "bg-purple-500/20 text-purple-400",
    Plotly: "bg-green-500/20 text-green-400",
    Dash: "bg-blue-500/20 text-blue-400",
    NLTK: "bg-purple-500/20 text-purple-400",
    Transformers: "bg-pink-500/20 text-pink-400",
    PyTorch: "bg-orange-500/20 text-orange-400",
    Seaborn: "bg-red-500/20 text-red-400",
    Jupyter: "bg-blue-500/20 text-blue-400",
    TensorFlow: "bg-indigo-500/20 text-indigo-400",
    Keras: "bg-purple-600/20 text-purple-400",
    OpenCV: "bg-green-500/20 text-green-400",
    React: "bg-teal-500/20 text-teal-400",
    "D3.js": "bg-cyan-500/20 text-cyan-400",
    API: "bg-blue-500/20 text-blue-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="project-card"
      data-testid={`project-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Card className="glassmorphism rounded-xl overflow-hidden h-full">
        <div className={`h-48 ${gradient} opacity-80`} />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2" data-testid="project-title">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4" data-testid="project-description">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`text-xs ${techColors[tech] || 'bg-secondary/20 text-secondary-foreground'}`}
                data-testid={`tech-badge-${tech.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-')}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-3">
            {githubUrl && (
              <Button
                size="sm"
                className="flex-1 text-center bg-primary hover:bg-primary/90 transition-all"
                onClick={() => window.open(githubUrl, '_blank')}
                data-testid="button-github"
              >
                <Github size={16} className="mr-2" />
                GitHub
              </Button>
            )}
            {liveUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-center glassmorphism hover:bg-opacity-20 transition-all"
                onClick={() => window.open(liveUrl, '_blank')}
                data-testid="button-live-demo"
              >
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
