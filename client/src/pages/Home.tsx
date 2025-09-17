import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Visualizations from "@/components/Visualizations";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Visualizations />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Amit Tiwari. Built with passion for data science.
          </p>
        </div>
      </footer>
    </div>
  );
}
