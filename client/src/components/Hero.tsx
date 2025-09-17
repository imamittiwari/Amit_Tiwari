import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Mail } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    "Machine Learning",
    "Data Analytics", 
    "Artificial Intelligence",
    "Deep Learning",
    "Data Visualization"
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      timeout = setTimeout(() => {}, 500);
    } else {
      const nextText = isDeleting
        ? currentPhrase.substring(0, displayText.length - 1)
        : currentPhrase.substring(0, displayText.length + 1);

      timeout = setTimeout(() => setDisplayText(nextText), isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      data-testid="hero-section"
    >
      <ParticleBackground />
      
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            data-testid="hero-title"
          >
            Hi, I'm <span className="gradient-text">Amit Tiwari</span>
          </motion.h1>
          
          <motion.h2
            className="text-xl md:text-2xl text-muted-foreground mb-6"
            data-testid="hero-subtitle"
          >
            Data Science Student passionate about
          </motion.h2>
          
          <div className="text-2xl md:text-3xl font-semibold text-primary mb-8 h-12">
            <span className="typing-cursor" data-testid="typing-text">
              {displayText}
            </span>
          </div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
              data-testid="button-view-projects"
            >
              <Code size={20} />
              View Projects
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 glassmorphism rounded-lg hover:bg-opacity-20 transition-all inline-flex items-center gap-2"
              data-testid="button-contact"
            >
              <Mail size={20} />
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
