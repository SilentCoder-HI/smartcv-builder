import { CVData } from "@/types/cv-types";

export const researchScientistCV: CVData = {
  personalInfo: {
    fullName: "Dr. Emily Dawson",
    email: "emily.dawson@genetechlab.org",
    phone: "+1 (617) 999-1122",
    address: "77 Longwood Ave, Boston, MA",
    jobTitle: "Research Scientist",
    summary:
      "Accomplished molecular biologist with 10+ years of advanced research in gene therapy, CRISPR/Cas9 genome editing, and translational medicine. Proven track record in leading multidisciplinary teams, securing competitive grants, and publishing in high-impact journals. Adept at experimental design, data analysis, and mentoring junior scientists.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Harvard University",
      degree: "Ph.D.",
      field: "Molecular Biology",
      startDate: "2010-08-01",
      endDate: "2016-05-01",
      gpa: "3.9",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Genetech Lab",
      position: "Research Scientist",
      startDate: "2017-06-01",
      endDate: "Present",
      description:
        "Lead investigator for gene editing projects contributing to FDA pre-clinical trials. Supervised a team of 8 scientists, managed multi-million dollar grants, and authored 12 peer-reviewed publications. Developed novel CRISPR protocols and established robust data analysis pipelines.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Research",
      items: [
        "CRISPR/Cas9 Genome Editing – Advanced protocol development and troubleshooting",
        "Next-Generation Sequencing (NGS) – Library prep, data QC, and variant analysis",
        "Experimental Design & Statistical Analysis – R, Python, and SPSS for complex datasets",
        "Grant Writing & Scientific Communication – NIH, NSF, and private funding success",
        "Team Leadership & Mentorship – Training junior scientists and fostering collaboration"
      ],
    },
    {
      category: "Tools",
      items: [
        "Python (BioPython, Pandas) – Data wrangling and bioinformatics pipelines",
        "R (tidyverse, Bioconductor) – Statistical modeling and visualization",
        "SPSS – Advanced statistical analysis for clinical and experimental data",
        "Electronic Lab Notebooks (Benchling, LabArchives) – Protocol management",
        "GraphPad Prism – Data visualization and statistical testing"
      ],
    },
  ],
  certifications: ["Good Laboratory Practices (GLP)", "NIH Research Ethics Training"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Journals Club", "DNA Art", "Science Blogging"],
};

export const universityLecturerCV: CVData = {
  personalInfo: {
    fullName: "Dr. Alan Chen",
    email: "alan.chen@uw.edu",
    phone: "+1 (206) 888-4444",
    address: "3900 University Way, Seattle, WA",
    jobTitle: "University Lecturer",
    summary:
      "Dynamic university lecturer with a Ph.D. in Computer Science and 8+ years of experience teaching core CS courses. Expert in curriculum development, student mentorship, and integrating real-world applications into academic settings. Recognized for innovative teaching methods and fostering inclusive learning environments.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Ph.D.",
      field: "Computer Science",
      startDate: "2008-09-01",
      endDate: "2014-06-01",
      gpa: "3.8",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "University of Washington",
      position: "Lecturer",
      startDate: "2016-01-01",
      endDate: "Present",
      description:
        "Delivered 10+ undergraduate and graduate courses in algorithms, data structures, and computational theory. Supervised 25+ undergraduate theses, led curriculum redesign initiatives, and received multiple teaching awards for excellence and innovation.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Academic",
      items: [
        "Lecturing & Public Speaking – Engaging delivery for large and small classes",
        "Curriculum & Course Design – Syllabus creation, assessment, and learning outcomes",
        "Academic Advising & Mentorship – Guiding students in research and career planning",
        "Research Supervision – Overseeing undergraduate and graduate research projects",
        "Assessment & Feedback – Constructive evaluation and continuous improvement"
      ],
    },
    {
      category: "Technical",
      items: [
        "C++ – Advanced programming and algorithm implementation",
        "Python – Data analysis, scripting, and instructional materials",
        "LaTeX – Professional academic writing and publication formatting",
        "Git & Version Control – Collaborative courseware and research projects",
        "Moodle/Canvas – Online course management and e-learning tools"
      ],
    },
  ],
  certifications: ["University Teaching Certificate", "Inclusive Classroom Training"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Hackathons", "Research Journals", "Public Lectures"],
};

export const phdStudentCV: CVData = {
  personalInfo: {
    fullName: "Rachel Kim",
    email: "r.kim@mit.edu",
    phone: "+1 (857) 555-3210",
    address: "77 Massachusetts Ave, Cambridge, MA",
    jobTitle: "Ph.D. Candidate – Artificial Intelligence",
    summary:
      "Motivated Ph.D. candidate at MIT specializing in deep reinforcement learning and robotics. Experienced in publishing at top-tier conferences, collaborating on interdisciplinary projects, and presenting complex research to diverse audiences.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Massachusetts Institute of Technology (MIT)",
      degree: "Ph.D.",
      field: "Computer Science – AI",
      startDate: "2021-09-01",
      endDate: "Present",
      gpa: "4.0",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "MIT Media Lab",
      position: "Graduate Researcher",
      startDate: "2021-09-01",
      endDate: "Present",
      description:
        "Designed and executed deep RL experiments for robotic control. Published in NeurIPS and IJCAI, and served as Teaching Assistant for 'Intro to AI'. Collaborated with cross-functional teams on AI-driven robotics projects.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Research & AI",
      items: [
        "Deep Learning – Neural network design, optimization, and deployment",
        "Reinforcement Learning – Policy gradient methods, Q-learning, and simulation",
        "Scientific Writing & Publishing – Peer-reviewed papers and technical reports",
        "Conference Presentations – Oral and poster sessions at international venues",
        "Collaboration & Project Management – Agile teamwork in research settings"
      ],
    },
    {
      category: "Tools",
      items: [
        "Python (NumPy, TensorFlow, PyTorch) – Model development and experimentation",
        "Jupyter Notebooks – Interactive research and reproducible workflows",
        "MATLAB – Simulation and algorithm prototyping",
        "PyTorch – Custom model architectures and training pipelines",
        "LaTeX – Academic writing and presentation preparation"
      ],
    },
  ],
  certifications: ["MIT Teaching Workshop", "Machine Learning Certificate – Coursera"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Robotics Club", "Academic Blogging", "AI Conferences"],
};

export const historianCV: CVData = {
  personalInfo: {
    fullName: "Dr. Julia Morales",
    email: "julia.morales@historyinstitute.org",
    phone: "+1 (312) 321-7788",
    address: "350 Michigan Ave, Chicago, IL",
    jobTitle: "Historian & Author",
    summary:
      "Award-winning historian specializing in 19th-century American history. Extensive experience in archival research, public history projects, and scholarly publishing. Skilled communicator and frequent keynote speaker at national conferences.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Yale University",
      degree: "Ph.D.",
      field: "History",
      startDate: "2003-09-01",
      endDate: "2009-06-01",
      gpa: "3.9",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "History Institute",
      position: "Senior Historian",
      startDate: "2010-01-01",
      endDate: "Present",
      description:
        "Authored 5 books and 30+ journal articles. Led research on Civil War archives, curated museum exhibits, and participated in public history outreach. Regularly invited as a guest lecturer and panelist.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Research",
      items: [
        "Archival Research – Manuscript analysis and primary source discovery",
        "Historical Writing – Monographs, articles, and public history materials",
        "Oral History – Interviewing, transcription, and narrative construction",
        "Public Lecturing – Engaging presentations for academic and general audiences",
        "Project Leadership – Coordinating research teams and grant-funded initiatives"
      ],
    },
    {
      category: "Tools",
      items: [
        "Zotero – Reference management and citation organization",
        "Scrivener – Long-form writing and research project structuring",
        "SPSS – Quantitative analysis for historical data",
        "EndNote – Bibliography and citation management",
        "Omeka – Digital archiving and public history web exhibits"
      ],
    },
  ],
  certifications: ["Historical Society Fellowship", "Digital History Certificate"],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Professional Working Proficiency" },
  ],
  hobbies: ["Museum Visits", "Historical Novels", "Podcasting"],
};

export const clinicalPsychologistCV: CVData = {
  personalInfo: {
    fullName: "Dr. Natalie Singh",
    email: "natalie.singh@mindcareclinic.com",
    phone: "+1 (917) 654-2323",
    address: "500 5th Ave, New York, NY",
    jobTitle: "Clinical Psychologist",
    summary:
      "Board-certified clinical psychologist with 12+ years of experience in evidence-based therapy, diagnostics, and patient-centered care. Expert in CBT, trauma-focused interventions, and clinical supervision. Committed to advancing mental health through research and community outreach.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Columbia University",
      degree: "Psy.D.",
      field: "Clinical Psychology",
      startDate: "2005-09-01",
      endDate: "2011-05-01",
      gpa: "3.9",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "MindCare Clinic",
      position: "Lead Psychologist",
      startDate: "2012-03-01",
      endDate: "Present",
      description:
        "Developed and implemented treatment plans for 200+ patients. Specialized in anxiety and trauma disorders, conducted diagnostic assessments, and supervised junior clinicians. Led workshops on mindfulness and resilience.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Psychology",
      items: [
        "Cognitive Behavioral Therapy (CBT) – Advanced intervention and case formulation",
        "Trauma Counseling – EMDR, exposure therapy, and crisis intervention",
        "Psychological Diagnostics – Comprehensive assessment and report writing",
        "Patient Assessment – Intake, progress monitoring, and outcome evaluation",
        "Clinical Supervision – Training and mentoring early-career psychologists"
      ],
    },
    {
      category: "Tools",
      items: [
        "TheraNest – Electronic health records and practice management",
        "SimplePractice – Telehealth and client scheduling",
        "DSM-5 – Diagnostic criteria and treatment planning",
        "Zoom Health – Secure teletherapy and remote consultations",
        "Biofeedback Devices – Mindfulness and stress reduction tools"
      ],
    },
  ],
  certifications: ["Licensed Clinical Psychologist – NY", "CBT Certified Therapist"],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Hindi", proficiency: "Fluent" },
  ],
  hobbies: ["Mindfulness Retreats", "Psych Lit", "Therapy Webinars"],
};
