# Smart CV Builder – Complete Documentation

## 1. Overview

Smart CV Builder is an AI-powered resume and CV creation web app designed to help users build professional, ATS-friendly resumes in real-time. It includes a wide variety of templates, AI writing assistance, export features, and career-related tools like job matching and live job feeds.

---

## 2. Purpose & Goals

* Help users create effective CVs quickly
* Use AI to reduce manual writing effort
* Allow users to export resumes in multiple formats
* Monetize through freemium and Pro subscription models
* Stand out with real-time features and smart suggestions

---

## 3. Core Features

### A. Free Features

* 3 free templates
* Manual resume builder
* PDF export
* Real-time preview
* Live auto-save
* LinkedIn profile linking
* Limited job board access

### B. Pro Features (Subscription Required)

* 25+ premium templates
* AI Resume Assistant (GPT)
* AI-powered cover letter generator
* Word (.docx) export
* Multiple CV profiles per account
* ATS optimization suggestions
* Smart suggestions for grammar/tone
* Job-CV match analyzer (AI-based)
* Real-time collaboration & shareable link
* Job Tracker & Notification System
* LinkedIn data sync (optional)
* Priority support

---

## 4. Tech Stack

### Frontend:

* Next.js (React Framework)
* Tailwind CSS + ShadCN UI for styling
* Clerk for user auth and social logins (Google, LinkedIn)

### Backend:

* Firebase or Supabase (Realtime DB + Auth)
* Node.js with PostgreSQL (if needed)
* Puppeteer for PDF export
* html-docx-js for Word export

### AI Services:

* OpenAI API (for resume generation, correction, and cover letter)
* Optional: Custom fine-tuned GPT model in future

### Storage:

* Firebase Storage or Cloudinary (for images)

---

## 5. Authentication

* Clerk or NextAuth.js integration
* Supports:

  * Email/password
  * Google login
  * LinkedIn OAuth login
* Store user data in Supabase/Firebase

---

## 6. LinkedIn Integration

* Users can log in using LinkedIn OAuth
* OR manually link their LinkedIn profile URL
* Data stored: LinkedIn URL, profile image, name, job title

---

## 7. Job Search API Integration

* **JSearch (via RapidAPI)** for live jobs
* Supports filtering by keyword, location, and job type
* Display job cards with title, company, salary, link
* AI Match Score (using OpenAI or embeddings)

---

## 8. Freemium Model

### Free Plan:

* Limited templates
* PDF only
* 1 CV per user
* AI usage capped (1 resume, no cover letter)

### Pro Plan:

* \$4.99/month
* Unlimited templates, exports, AI resume assistant, cover letters, etc.

### Pro+ Plan:

* \$9.99/month
* Job tracking, unlimited CVs, priority support

---

## 9. Revenue Streams

* Monthly subscriptions
* Lifetime access deal (\$29.99)
* Template packs (\$4.99 one-time)
* Affiliate links (LinkedIn Premium, Grammarly, etc.)

---

## 10. UI/UX Suggestions

* Clean, minimal interface
* Use cards for templates
* CV editing split into sections: Profile, Education, Work, Skills, Projects
* Preview CV in real-time
* Floating save button
* Clear CTA for AI writing features

---

## 11. AI Builder Suggestions

* Add context-aware AI prompts (e.g., "I was a front-end developer at XYZ")
* Add AI actions:

  * Fix grammar
  * Add power verbs
  * Reword summary
  * Write experience based on job title
* Smart Tag system to help match CVs to jobs
* Resume Score based on job description

---

## 12. Security & Privacy

* Encrypt user data
* Don't store or share CVs without permission
* GDPR-compliant privacy policy

---

## 13. Future Roadmap

* Mobile App (React Native)
* Browser extension (for job apply automation)
* Job board integration (Indeed/Adzuna)
* Career coaching AI chatbot
* Resume review by experts

---

## 14. Useful Links

* [OpenAI API Docs](https://platform.openai.com/docs)
* [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
* [Clerk Auth](https://clerk.dev)
* [html-docx-js](https://github.com/evidenceprime/html-docx-js)
* [Puppeteer PDF Guide](https://pptr.dev)

---

## 15. Team / Solo Notes

* If solo dev, use Supabase + Clerk for simplicity
* Focus on real-time user experience and AI quality
* Ship MVP fast, then build advanced AI matching

---

## 16. Marketing & SEO

* Landing page optimized for “free resume builder”
* Add blog with resume tips (for SEO)
* Add Google Search Console
* Run Quora & Reddit promotion
* Launch on ProductHunt and IndieHackers

---

## 17. Versioning

* v1.0.0 – Manual resume builder + PDF export
* v1.2.0 – AI resume writing + more templates
* v2.0.0 – Pro version launch, LinkedIn + Job APIs

---

> Built with ❤️ by a future tech billionaire

---
