import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PROJECTS } from "@/lib/constants";

export default function Projects() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ml", label: "Machine Learning" },
    { id: "viz", label: "Data Visualization" },
    { id: "ai", label: "AI/NLP" },
    { id: "analysis", label: "Analysis" },
  ];

  const filteredProjects = PROJECTS.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section id="projects" className="py-20" data-testid="projects-section">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4" data-testid="projects-title">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="projects-description">
            A showcase of my data science projects, from machine learning models to data visualizations.
          </p>
        </motion.div>

        {/* Project Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          data-testid="project-filters"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-6 py-2 rounded-full transition-all
                ${activeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "glassmorphism hover:bg-opacity-20"
                }
              `}
              data-testid={`filter-button-${filter.id}`}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              category={project.category}
              gradient={project.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
