import { CVData } from "@/types/cv-types";

export const frontendDeveloperCV: CVData = {
  personalInfo: {
    fullName: "Alex Kim",
    email: "alex.kim@devmail.com",
    phone: "+1 (415) 555-0198",
    address: "123 Market St, San Francisco, CA",
    jobTitle: "Senior Frontend Developer",
    summary:
      "Innovative and detail-oriented Senior Frontend Developer with 8+ years of experience building scalable, performant, and accessible web applications. Expert in React, TypeScript, and modern JavaScript frameworks. Passionate about UI/UX, design systems, and collaborating with cross-functional teams to deliver exceptional digital experiences. Adept at mentoring junior developers and driving best practices in code quality and testing.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2011-09-01",
      endDate: "2015-06-01",
      gpa: "3.8",
    },
    {
      id: "edu-2",
      institution: "Coursera / Udemy",
      degree: "Professional Certificates",
      field: "Advanced React, TypeScript, Web Accessibility",
      startDate: "2017-01-01",
      endDate: "2019-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechNova Solutions",
      position: "Senior Frontend Developer",
      startDate: "2020-03-01",
      endDate: "Present",
      description:
        "• Led the migration of a legacy AngularJS platform to a modern React/TypeScript stack, improving performance by 40% and reducing technical debt.\n" +
        "• Designed and implemented a reusable component library using Storybook and styled-components, increasing development speed and UI consistency across teams.\n" +
        "• Collaborated with UX/UI designers to deliver pixel-perfect, accessible interfaces (WCAG 2.1 AA compliance).\n" +
        "• Mentored 4 junior developers, conducted code reviews, and established best practices for testing (Jest, React Testing Library).\n" +
        "• Integrated RESTful and GraphQL APIs, optimizing data fetching and state management with Redux Toolkit and React Query.",
      current: true,
    },
    {
      id: "exp-2",
      company: "BrightApps Inc.",
      position: "Frontend Developer",
      startDate: "2017-06-01",
      endDate: "2020-02-28",
      description:
        "• Developed and maintained multiple single-page applications (SPAs) using React, Redux, and SASS.\n" +
        "• Implemented responsive layouts and dynamic dashboards for enterprise clients, resulting in a 30% increase in user engagement.\n" +
        "• Automated CI/CD pipelines with GitHub Actions and Netlify, reducing deployment times by 50%.\n" +
        "• Collaborated closely with backend engineers to define API contracts and optimize data flows.",
      current: false,
    },
    {
      id: "exp-3",
      company: "Freelance",
      position: "Web Developer",
      startDate: "2015-07-01",
      endDate: "2017-05-31",
      description:
        "• Built custom websites and e-commerce solutions for small businesses using React, Next.js, and Shopify.\n" +
        "• Provided consulting on SEO, web performance, and accessibility improvements.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "Redux Toolkit",
        "HTML5"
      ],
    },
    {
      category: "Tools",
      items: [
        "Git",
        "Webpack",
        "Figma",
        "Jira",
        "GitHub Actions"
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Mentoring",
        "Agile/Scrum",
        "Cross-functional Collaboration",
        "Code Review",
        "Problem Solving"
      ],
    },
  ],
  certifications: [
    "Meta Front-End Developer Professional Certificate",
    "Google Mobile Web Specialist",
    "Certified ScrumMaster (CSM)"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Korean", proficiency: "Conversational" }
  ],
  hobbies: [
    "UI Animation",
    "Open Source Contributions",
    "Hackathons",
    "Cycling",
    "Tech Blogging"
  ],
};

export const backendDeveloperCV: CVData = {
  personalInfo: {
    fullName: "Priya Nair",
    email: "priya.nair@devmail.com",
    phone: "+44 20 7946 0958",
    address: "221B Baker Street, London, UK",
    jobTitle: "Lead Backend Engineer",
    summary:
      "Results-driven Lead Backend Engineer with 10+ years of experience designing, developing, and scaling distributed systems and APIs. Specializes in Node.js, Python, and cloud-native architectures. Proven track record in leading engineering teams, optimizing system performance, and ensuring robust security and reliability. Passionate about DevOps, automation, and continuous learning.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Imperial College London",
      degree: "Master of Science",
      field: "Software Engineering",
      startDate: "2012-09-01",
      endDate: "2013-09-01",
      gpa: "Distinction",
    },
    {
      id: "edu-2",
      institution: "University of Manchester",
      degree: "Bachelor of Engineering",
      field: "Computer Engineering",
      startDate: "2008-09-01",
      endDate: "2012-06-01",
      gpa: "First Class",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Cloudify Ltd.",
      position: "Lead Backend Engineer",
      startDate: "2018-04-01",
      endDate: "Present",
      description:
        "• Architected and implemented a microservices platform on AWS using Node.js, Docker, and Kubernetes, supporting 1M+ users with 99.99% uptime.\n" +
        "• Led a team of 6 backend engineers, driving adoption of TDD, code reviews, and CI/CD best practices.\n" +
        "• Designed and optimized RESTful and GraphQL APIs, reducing average response times by 60%.\n" +
        "• Integrated OAuth2, JWT, and SSO for secure authentication and authorization.\n" +
        "• Automated infrastructure provisioning with Terraform and Ansible.",
      current: true,
    },
    {
      id: "exp-2",
      company: "FinTech Innovations",
      position: "Backend Developer",
      startDate: "2014-10-01",
      endDate: "2018-03-31",
      description:
        "• Developed high-throughput payment processing services in Python (Django, FastAPI) and Node.js.\n" +
        "• Implemented real-time data pipelines with Kafka and Redis, supporting analytics and fraud detection.\n" +
        "• Collaborated with frontend and DevOps teams to deliver end-to-end solutions.",
      current: false,
    },
    {
      id: "exp-3",
      company: "Open Source",
      position: "Contributor",
      startDate: "2013-10-01",
      endDate: "2014-09-30",
      description:
        "• Contributed to open-source projects in the Node.js and Python ecosystems, focusing on API design and testing frameworks.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Backend",
      items: [
        "Node.js",
        "Python",
        "Docker",
        "Kubernetes",
        "REST APIs"
      ],
    },
    {
      category: "Security & DevOps",
      items: [
        "OAuth2",
        "JWT",
        "CI/CD",
        "Terraform",
        "Monitoring (Prometheus, Grafana)"
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Team Leadership",
        "Mentoring",
        "Agile Methodologies",
        "Technical Documentation"
      ],
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "Certified Kubernetes Administrator (CKA)",
    "HashiCorp Certified: Terraform Associate"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Hindi", proficiency: "Professional Working Proficiency" }
  ],
  hobbies: [
    "Cloud Automation",
    "Open Source",
    "Chess",
    "Travel",
    "Tech Meetups"
  ],
};

export const fullstackDeveloperCV: CVData = {
  personalInfo: {
    fullName: "Diego Martínez",
    email: "diego.martinez@devmail.com",
    phone: "+34 91 123 4567",
    address: "Calle Gran Vía, 45, Madrid, Spain",
    jobTitle: "Full Stack Developer",
    summary:
      "Versatile Full Stack Developer with 7+ years of experience building robust web applications from concept to deployment. Proficient in both frontend and backend technologies, including React, Node.js, and PostgreSQL. Strong advocate for clean code, automated testing, and continuous integration. Enjoys collaborating with designers, product managers, and fellow engineers to deliver impactful solutions.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Universidad Politécnica de Madrid",
      degree: "Bachelor of Engineering",
      field: "Software Engineering",
      startDate: "2011-09-01",
      endDate: "2015-06-01",
      gpa: "3.6",
    },
    {
      id: "edu-2",
      institution: "Platzi",
      degree: "Diploma",
      field: "Full Stack Web Development",
      startDate: "2016-01-01",
      endDate: "2016-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "InnovaWeb",
      position: "Full Stack Developer",
      startDate: "2018-02-01",
      endDate: "Present",
      description:
        "• Designed and developed end-to-end web applications using React, Node.js, and PostgreSQL, serving over 200K monthly users.\n" +
        "• Implemented authentication, authorization, and role-based access control using JWT and Passport.js.\n" +
        "• Built CI/CD pipelines with GitLab CI and Docker, reducing deployment errors by 80%.\n" +
        "• Led the migration of legacy PHP codebase to a modern JavaScript stack, improving maintainability and performance.\n" +
        "• Collaborated with UI/UX designers to deliver responsive, mobile-first interfaces.",
      current: true,
    },
    {
      id: "exp-2",
      company: "StartApp",
      position: "Frontend & Backend Developer",
      startDate: "2015-07-01",
      endDate: "2018-01-31",
      description:
        "• Developed RESTful APIs and integrated third-party services (Stripe, SendGrid, Google Maps).\n" +
        "• Built interactive dashboards and admin panels using React and Chart.js.\n" +
        "• Wrote unit and integration tests with Mocha, Chai, and Jest.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Redux",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5"
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MongoDB",
        "REST APIs"
      ],
    },
    {
      category: "DevOps & Tools",
      items: [
        "Docker",
        "GitLab CI",
        "Git",
        "Jira",
        "Figma"
      ],
    },
    {
      category: "Testing",
      items: [
        "Jest",
        "Mocha",
        "Chai",
        "React Testing Library"
      ],
    },
  ],
  certifications: [
    "Platzi Full Stack Web Developer",
    "MongoDB Certified Developer Associate"
  ],
  languages: [
    { language: "Spanish", proficiency: "Native" },
    { language: "English", proficiency: "Professional Working Proficiency" }
  ],
  hobbies: [
    "Hackathons",
    "Travel",
    "Cooking",
    "Board Games",
    "Open Source"
  ],
};

export const mobileDeveloperCV: CVData = {
  personalInfo: {
    fullName: "Emily Chen",
    email: "emily.chen@devmail.com",
    phone: "+1 (646) 555-1234",
    address: "456 Park Ave, New York, NY",
    jobTitle: "Mobile Application Developer",
    summary:
      "Creative Mobile Application Developer with 6+ years of experience building high-quality iOS and Android apps. Skilled in React Native, Swift, and Kotlin. Strong focus on performance, usability, and delivering delightful user experiences. Experienced in publishing and maintaining apps with 100K+ downloads. Enjoys working in agile teams and exploring new mobile technologies.",
  },
  education: [
    {
      id: "edu-1",
      institution: "New York University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012-09-01",
      endDate: "2016-06-01",
      gpa: "3.7",
    },
    {
      id: "edu-2",
      institution: "Udacity",
      degree: "Nanodegree",
      field: "Android Developer",
      startDate: "2017-01-01",
      endDate: "2017-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "AppVenture Studios",
      position: "Mobile Application Developer",
      startDate: "2018-05-01",
      endDate: "Present",
      description:
        "• Developed and maintained 5+ cross-platform mobile apps using React Native, reaching over 200K users.\n" +
        "• Implemented push notifications, in-app purchases, and deep linking for enhanced user engagement.\n" +
        "• Optimized app performance, reducing load times by 35% and improving App Store ratings.\n" +
        "• Collaborated with designers and QA to deliver pixel-perfect, bug-free releases.\n" +
        "• Integrated RESTful APIs and real-time data with Firebase and GraphQL.",
      current: true,
    },
    {
      id: "exp-2",
      company: "Freelance",
      position: "iOS & Android Developer",
      startDate: "2016-07-01",
      endDate: "2018-04-30",
      description:
        "• Built custom iOS (Swift) and Android (Kotlin) apps for startups and small businesses.\n" +
        "• Provided consulting on app store optimization (ASO) and analytics.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Mobile",
      items: [
        "React Native",
        "Swift",
        "Kotlin",
        "Firebase",
        "REST APIs"
      ],
    },
    {
      category: "Tools",
      items: [
        "Xcode",
        "Android Studio",
        "Expo",
        "Jest",
        "Figma"
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Agile Development",
        "Teamwork",
        "Problem Solving",
        "User-Centered Design"
      ],
    },
  ],
  certifications: [
    "Udacity Android Developer Nanodegree",
    "Apple Certified iOS App Developer"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Mandarin", proficiency: "Professional Working Proficiency" }
  ],
  hobbies: [
    "Mobile Game Development",
    "Photography",
    "Yoga",
    "Travel",
    "App Store Reviews"
  ],
};

export const devopsEngineerCV: CVData = {
  personalInfo: {
    fullName: "Lars Johansson",
    email: "lars.johansson@devmail.com",
    phone: "+46 8 123 4567",
    address: "Sveavägen 10, Stockholm, Sweden",
    jobTitle: "DevOps Engineer",
    summary:
      "Proactive DevOps Engineer with 9+ years of experience automating infrastructure, optimizing CI/CD pipelines, and ensuring high system reliability. Deep expertise in AWS, Docker, Kubernetes, and Infrastructure as Code. Adept at monitoring, incident response, and fostering a culture of collaboration between development and operations teams.",
  },
  education: [
    {
      id: "edu-1",
      institution: "KTH Royal Institute of Technology",
      degree: "Master of Science",
      field: "Computer Systems Engineering",
      startDate: "2010-09-01",
      endDate: "2015-06-01",
      gpa: "4.2/5.0",
    },
    {
      id: "edu-2",
      institution: "Linux Academy",
      degree: "Certificate",
      field: "AWS Certified DevOps Engineer",
      startDate: "2017-01-01",
      endDate: "2017-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "NordicCloud AB",
      position: "DevOps Engineer",
      startDate: "2017-08-01",
      endDate: "Present",
      description:
        "• Automated infrastructure provisioning and configuration using Terraform and Ansible, reducing manual work by 90%.\n" +
        "• Designed and maintained CI/CD pipelines with Jenkins and GitHub Actions, enabling multiple daily deployments.\n" +
        "• Managed Kubernetes clusters (EKS, GKE) for microservices architectures, ensuring high availability and scalability.\n" +
        "• Implemented centralized logging and monitoring with Prometheus, Grafana, and ELK Stack.\n" +
        "• Led incident response and root cause analysis for critical outages.",
      current: true,
    },
    {
      id: "exp-2",
      company: "ScandiTech",
      position: "Systems Engineer",
      startDate: "2015-07-01",
      endDate: "2017-07-31",
      description:
        "• Maintained Linux servers and automated deployments with Bash and Python scripts.\n" +
        "• Supported migration to AWS, including EC2, S3, and RDS setup.",
      current: false,
    },
  ],
  skills: [
    {
      category: "DevOps & Cloud",
      items: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Linux"
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Incident Management",
        "Collaboration",
        "Documentation",
        "Continuous Improvement"
      ],
    },
  ],
  certifications: [
    "AWS Certified DevOps Engineer – Professional",
    "Certified Kubernetes Administrator (CKA)",
    "HashiCorp Certified: Terraform Associate"
  ],
  languages: [
    { language: "Swedish", proficiency: "Native" },
    { language: "English", proficiency: "Professional Working Proficiency" }
  ],
  hobbies: [
    "Home Automation",
    "Mountain Biking",
    "Linux User Groups",
    "Cloud Meetups",
    "Travel"
  ],
};
