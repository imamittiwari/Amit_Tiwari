import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { getUncachableGitHubClient } from "./githubClient";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store contact in database/storage
      const contact = await storage.createContact(validatedData);
      
      // Note: Email sending is now handled client-side via EmailJS

      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to submit contact form" 
      });
    }
  });

  // GitHub repositories endpoint
  app.get("/api/github/repos", async (req, res) => {
    try {
      const github = await getUncachableGitHubClient();
      
      const { data: repos } = await github.rest.repos.listForAuthenticatedUser({
        sort: "updated",
        per_page: 10,
        visibility: "public"
      });

      const formattedRepos = repos.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
        topics: repo.topics || []
      }));

      res.json(formattedRepos);
    } catch (error) {
      console.error("GitHub API error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch GitHub repositories" 
      });
    }
  });

  // Resume download endpoint
  app.get("/api/resume", async (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), "assets", "Amit_Tiwari_Resume.pdf");
      
      // Check if resume file exists
      if (fs.existsSync(resumePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="Amit_Tiwari_Resume.pdf"');
        
        const fileStream = fs.createReadStream(resumePath);
        fileStream.pipe(res);
      } else {
        // If no resume file exists, return error
        res.status(404).json({ 
          success: false, 
          message: "Resume file not found" 
        });
      }
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to download resume" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
