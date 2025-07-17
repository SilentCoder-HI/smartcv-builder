import { CVData } from "@/types/cv-types";

export const graphicDesignerCV: CVData = {
  personalInfo: {
    fullName: "Ava Bennett",
    email: "ava.bennett@creovibe.com",
    phone: "+1 (415) 333-2121",
    address: "101 Market St, San Francisco, CA",
    jobTitle: "Graphic Designer",
    summary:
      "Creative and detail-oriented Graphic Designer with 6+ years of experience in advanced branding, print, and digital design. Expert in visual identity systems, complex layout composition, and cross-platform design strategy. Proficient in Adobe Suite, Figma, and motion graphics, delivering visually compelling results for clients across industries. Adept at collaborating with marketing and product teams to translate business goals into innovative visual solutions.",
  },
  education: [
    {
      id: "edu-1",
      institution: "California College of the Arts",
      degree: "Bachelor of Fine Arts",
      field: "Graphic Design",
      startDate: "2012-08-01",
      endDate: "2016-05-01",
      gpa: "3.5",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "CreoVibe",
      position: "Graphic Designer",
      startDate: "2017-06-01",
      endDate: "Present",
      description:
        "Led end-to-end design for 30+ client brands, including logo systems, packaging, and digital campaigns. Developed advanced visual guidelines and ensured consistency across all touchpoints. Collaborated with cross-functional teams to deliver high-impact marketing collateral and interactive assets. Implemented motion graphics for social media, increasing engagement by 45%. Mentored junior designers and established internal design best practices.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Design",
      items: [
        "Advanced Branding & Visual Identity Systems",
        "Complex Layout & Editorial Design",
        "Motion Graphics & Animation",
        "Cross-Platform Digital Design (Web, Mobile, Social)",
        "Design Systems & Component Libraries"
      ],
    },
    {
      category: "Tools",
      items: [
        "Adobe Creative Cloud (Photoshop, Illustrator, InDesign, After Effects)",
        "Figma (Prototyping & Design Systems)",
        "Sketch (Symbol Libraries)",
        "Cinema 4D (3D Mockups)",
        "Miro (Collaboration & Ideation)"
      ],
    },
  ],
  certifications: ["Adobe Certified Expert (ACE)", "UX Design Certificate – Google"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Photography", "Poster Collecting", "Design Blogging"],
};

export const contentWriterCV: CVData = {
  personalInfo: {
    fullName: "Isabella Rhodes",
    email: "isa.rhodes@wordcraft.co",
    phone: "+1 (718) 567-4455",
    address: "120 Dean St, Brooklyn, NY",
    jobTitle: "Content Writer",
    summary:
      "Imaginative Content Writer with 5 years of experience producing SEO-optimized blogs, long-form articles, and conversion-focused website copy. Advanced in digital content strategy, data-driven storytelling, and multi-channel content planning. Skilled at collaborating with marketing, SEO, and design teams to deliver measurable results.",
  },
  education: [
    {
      id: "edu-1",
      institution: "New York University",
      degree: "Bachelor of Arts",
      field: "English Literature",
      startDate: "2011-08-01",
      endDate: "2015-05-01",
      gpa: "3.7",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "WordCraft Media",
      position: "Content Writer",
      startDate: "2019-01-01",
      endDate: "Present",
      description:
        "Produced 200+ pieces of high-performing web content, including pillar pages, case studies, and whitepapers. Developed advanced SEO strategies in collaboration with digital marketing teams, resulting in a 30% increase in organic traffic. Led content audits and implemented editorial calendars. Optimized copy for conversion and user engagement using A/B testing. Trained junior writers on advanced research and editing techniques.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Writing",
      items: [
        "Long-Form Content Strategy & Planning",
        "Advanced SEO Copywriting & On-Page Optimization",
        "Data-Driven Storytelling & Analytics",
        "Content Auditing & Editorial Calendars",
        "Conversion-Focused Web Copy"
      ],
    },
    {
      category: "Tools",
      items: [
        "Grammarly (Advanced Editing)",
        "WordPress (Custom Blocks & SEO Plugins)",
        "Google Docs (Collaboration & Versioning)",
        "SEMRush (Keyword Research & Analytics)",
        "SurferSEO (Content Optimization)"
      ],
    },
  ],
  certifications: ["HubSpot Content Marketing", "SEO Writing Masterclass"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Poetry", "Journaling", "Book Club Moderator"],
};

export const videoEditorCV: CVData = {
  personalInfo: {
    fullName: "Leo Thompson",
    email: "leo.editz@clipdash.com",
    phone: "+1 (312) 777-8080",
    address: "1450 N Wells St, Chicago, IL",
    jobTitle: "Video Editor",
    summary:
      "Skilled Video Editor with 7+ years of experience in advanced post-production for commercials, social media, and short films. Expert in multi-cam editing, color grading, and sound design. Adept at leading post-production workflows from concept to delivery, collaborating with directors and producers to achieve creative vision.",
  },
  education: [
    {
      id: "edu-1",
      institution: "DePaul University",
      degree: "Bachelor of Science",
      field: "Film and Television",
      startDate: "2010-08-01",
      endDate: "2014-05-01",
      gpa: "3.6",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "ClipDash Studios",
      position: "Senior Video Editor",
      startDate: "2018-02-01",
      endDate: "Present",
      description:
        "Edited 500+ hours of footage for commercials, branded content, and short films. Specialized in advanced color grading, sound mixing, and motion graphics. Managed post-production pipelines, including asset management and client review cycles. Collaborated with directors to refine narrative pacing and visual storytelling. Implemented workflow automation, reducing delivery times by 20%.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Video Editing",
      items: [
        "Multi-Cam Editing & Advanced Timeline Management",
        "Professional Color Grading (DaVinci Resolve, Lumetri)",
        "Sound Design & Audio Mixing",
        "Motion Graphics & Visual Effects Integration",
        "Workflow Automation & Asset Management"
      ],
    },
    {
      category: "Tools",
      items: [
        "Adobe Premiere Pro (Advanced Editing)",
        "After Effects (Motion Graphics & VFX)",
        "DaVinci Resolve (Color Grading)",
        "Final Cut Pro (Multi-Cam Editing)",
        "Adobe Audition (Audio Post-Production)"
      ],
    },
  ],
  certifications: ["Adobe Premiere Pro Expert", "Video Editing Bootcamp – Udemy"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Filmmaking", "Drone Videography", "YouTube Channel Host"],
};

export const uxDesignerCV: CVData = {
  personalInfo: {
    fullName: "Zara Patel",
    email: "z.patel@uxlab.io",
    phone: "+1 (213) 543-2222",
    address: "600 S Grand Ave, Los Angeles, CA",
    jobTitle: "UX Designer",
    summary:
      "Human-centered UX Designer with advanced expertise in usability, accessibility, and interaction design. Experienced in leading user research, prototyping, and iterative testing for web and mobile products. Passionate about driving product improvements through data-driven insights and cross-functional collaboration.",
  },
  education: [
    {
      id: "edu-1",
      institution: "ArtCenter College of Design",
      degree: "Bachelor of Science",
      field: "Interaction Design",
      startDate: "2013-09-01",
      endDate: "2017-06-01",
      gpa: "3.8",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "UXLab",
      position: "UX Designer",
      startDate: "2018-07-01",
      endDate: "Present",
      description:
        "Redesigned core user flows, boosting retention by 40%. Led 20+ usability tests and in-depth user interviews. Developed advanced wireframes, interactive prototypes, and accessibility audits. Collaborated with product and engineering teams to implement user-centered solutions. Established design systems and mentored junior designers.",
      current: true,
    },
  ],
  skills: [
    {
      category: "UX Design",
      items: [
        "Advanced Wireframing & Interactive Prototyping",
        "Usability Testing & Accessibility Audits (WCAG 2.1)",
        "User Research (Interviews, Surveys, Analytics)",
        "Design Systems & Component Libraries",
        "Interaction Design & Microinteractions"
      ],
    },
    {
      category: "Tools",
      items: [
        "Figma (Prototyping & Design Systems)",
        "Sketch (Symbol Libraries)",
        "Adobe XD (User Flows)",
        "InVision (Interactive Prototypes)",
        "Maze (Remote Testing & Analytics)"
      ],
    },
  ],
  certifications: ["NN/g UX Certification", "Google UX Design Professional Certificate"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["UX Meetups", "Empathy Mapping", "Design Workshops"],
};

export const illustratorCV: CVData = {
  personalInfo: {
    fullName: "Max Rivera",
    email: "max.rivera@freestylearts.com",
    phone: "+1 (617) 678-1122",
    address: "50 Harrison Ave, Boston, MA",
    jobTitle: "Illustrator",
    summary:
      "Imaginative Illustrator with advanced skills in digital and traditional media. Specializes in editorial, book, and concept art with a whimsical and detailed style. Experienced in collaborating with publishers and game studios to deliver high-impact visual narratives.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Rhode Island School of Design",
      degree: "Bachelor of Fine Arts",
      field: "Illustration",
      startDate: "2008-09-01",
      endDate: "2012-05-01",
      gpa: "3.9",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Freestyle Arts",
      position: "Lead Illustrator",
      startDate: "2015-01-01",
      endDate: "Present",
      description:
        "Illustrated covers and layouts for 40+ published books and graphic novels. Developed original character concepts and detailed backgrounds for games and stories. Led visual development for cross-media projects, including animation and interactive apps. Conducted advanced workshops on digital painting and visual storytelling. Collaborated with art directors to refine project vision and style guides.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Illustration",
      items: [
        "Advanced Character Design & Concept Art",
        "Editorial & Book Illustration",
        "Digital Painting & Mixed Media",
        "Visual Storytelling & Sequential Art",
        "Style Development & Art Direction"
      ],
    },
    {
      category: "Tools",
      items: [
        "Procreate (Digital Illustration)",
        "Adobe Photoshop (Advanced Painting)",
        "Adobe Illustrator (Vector Art)",
        "Clip Studio Paint (Comics & Manga)",
        "Wacom Cintiq (Professional Drawing Tablet)"
      ],
    },
  ],
  certifications: ["Digital Painting Masterclass", "Children's Book Illustration Course"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Sketchbooks", "Storyboarding", "Art Exhibitions"],
};
