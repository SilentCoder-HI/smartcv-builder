import { CVData } from "@/types/cv-types";

export const marketingManagerCV: CVData = {
  personalInfo: {
    fullName: "Sophia Carter",
    email: "sophia.carter@bizmail.com",
    phone: "+1 (312) 456-7890",
    address: "1200 W Madison St, Chicago, IL",
    jobTitle: "Senior Marketing Manager",
    summary:
      "Dynamic and results-driven Senior Marketing Manager with over 10 years of progressive experience in B2B and B2C marketing, brand strategy, and digital transformation. Adept at leading cross-functional teams, developing data-driven campaigns, and driving revenue growth for Fortune 500 and high-growth startups. Expert in omnichannel marketing, market research, and leveraging analytics to optimize ROI. Recognized for innovative thinking, strong leadership, and a passion for building high-performing teams that exceed business objectives.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of Michigan",
      degree: "MBA",
      field: "Marketing",
      startDate: "2013-09-01",
      endDate: "2015-06-01",
      gpa: "3.7",
    },
    {
      id: "edu-2",
      institution: "Northwestern University",
      degree: "Bachelor of Arts",
      field: "Communications",
      startDate: "2008-09-01",
      endDate: "2012-06-01",
      gpa: "3.8",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "BrandEdge Inc.",
      position: "Senior Marketing Manager",
      startDate: "2017-01-01",
      endDate: "Present",
      description:
        "• Led a team of 12 in the development and execution of integrated marketing campaigns across digital, print, and social channels, resulting in a 40% increase in lead generation and a 25% boost in customer acquisition.\n" +
        "• Oversaw a $2M annual marketing budget, optimizing spend through data-driven analysis and vendor negotiations, achieving a 30% reduction in cost per acquisition.\n" +
        "• Directed a company-wide rebranding initiative, including new website launch, content strategy, and PR outreach, which elevated brand awareness by 60% within 12 months.\n" +
        "• Implemented advanced marketing automation (HubSpot, Marketo) and CRM strategies, increasing email open rates by 35% and conversion rates by 18%.\n" +
        "• Mentored and developed junior marketers, fostering a culture of innovation and continuous improvement.",
      current: true,
    },
    {
      id: "exp-2",
      company: "BlueSky Digital",
      position: "Marketing Strategist",
      startDate: "2015-07-01",
      endDate: "2016-12-31",
      description:
        "• Designed and launched multi-channel campaigns for SaaS and e-commerce clients, resulting in a 50% increase in web traffic and 20% growth in online sales.\n" +
        "• Conducted market research and competitor analysis to inform product positioning and go-to-market strategies.\n" +
        "• Collaborated with creative and product teams to develop compelling messaging and content.",
      current: false,
    },
    {
      id: "exp-3",
      company: "Freelance",
      position: "Digital Marketing Consultant",
      startDate: "2012-07-01",
      endDate: "2013-08-31",
      description:
        "• Provided digital marketing consulting for small businesses, focusing on SEO, SEM, and social media strategy.\n" +
        "• Increased organic search traffic for clients by an average of 70% within 6 months.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Marketing",
      items: [
        "Brand Strategy",
        "Digital Marketing",
        "Content Marketing",
        "SEO/SEM",
        "Email Marketing",
        "Social Media Management",
        "Market Research",
        "Lead Generation",
        "Campaign Analytics",
        "Customer Segmentation"
      ],
    },
    {
      category: "Tools",
      items: [
        "HubSpot",
        "Marketo",
        "Mailchimp",
        "Google Analytics",
        "Google Ads",
        "Salesforce",
        "Excel",
        "Canva",
        "Tableau",
        "Hootsuite"
      ],
    },
    {
      category: "Leadership",
      items: [
        "Team Management",
        "Cross-functional Collaboration",
        "Budgeting",
        "Mentoring",
        "Strategic Planning"
      ],
    },
  ],
  certifications: [
    "HubSpot Inbound Marketing",
    "Google Ads Certified",
    "AMA Professional Certified Marketer (PCM)",
    "Facebook Blueprint Certification"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "French", proficiency: "Professional Working Proficiency" },
    { language: "Spanish", proficiency: "Conversational" },
  ],
  hobbies: [
    "Traveling",
    "Blogging",
    "Brand Strategy Podcast Host",
    "Photography",
    "Public Speaking"
  ],
};

export const operationsDirectorCV: CVData = {
  personalInfo: {
    fullName: "Ethan Brooks",
    email: "ethan.brooks@logixcorp.com",
    phone: "+1 (646) 897-4567",
    address: "88 Wall Street, New York, NY",
    jobTitle: "Director of Operations",
    summary:
      "Accomplished Director of Operations with 15+ years of experience in optimizing business processes, supply chain management, and organizational transformation for global enterprises. Proven track record in leading large teams, implementing lean methodologies, and driving multimillion-dollar cost savings. Expert in ERP implementation, cross-functional leadership, and building scalable systems that support rapid business growth. Recognized for strategic vision, analytical rigor, and a hands-on approach to operational excellence.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Columbia University",
      degree: "Bachelor of Science",
      field: "Business Administration",
      startDate: "2005-09-01",
      endDate: "2009-06-01",
      gpa: "3.6",
    },
    {
      id: "edu-2",
      institution: "MIT Sloan School of Management",
      degree: "Executive Certificate",
      field: "Operations Management",
      startDate: "2012-01-01",
      endDate: "2012-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "LogiX Corp",
      position: "Director of Operations",
      startDate: "2018-01-01",
      endDate: "Present",
      description:
        "• Led a team of 40+ across logistics, procurement, and production, overseeing $100M in annual operations.\n" +
        "• Reduced operational expenses by 18% through lean process redesign, Six Sigma initiatives, and automation.\n" +
        "• Spearheaded the implementation of SAP ERP, resulting in a 30% improvement in workflow efficiency and real-time reporting.\n" +
        "• Developed and executed supply chain strategies that improved on-time delivery from 85% to 98%.\n" +
        "• Established KPIs and dashboards for continuous performance monitoring and improvement.",
      current: true,
    },
    {
      id: "exp-2",
      company: "TransGlobal Logistics",
      position: "Operations Manager",
      startDate: "2013-03-01",
      endDate: "2017-12-31",
      description:
        "• Managed end-to-end supply chain operations for a multinational logistics provider, overseeing 5 regional teams.\n" +
        "• Negotiated contracts with vendors and carriers, saving $2.5M annually.\n" +
        "• Implemented ISO 9001 quality management systems, achieving certification within 9 months.",
      current: false,
    },
    {
      id: "exp-3",
      company: "Metro Distribution",
      position: "Process Improvement Analyst",
      startDate: "2009-07-01",
      endDate: "2013-02-28",
      description:
        "• Analyzed and optimized warehouse and distribution processes, increasing throughput by 22%.\n" +
        "• Led cross-functional Kaizen events to identify and eliminate bottlenecks.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Operations",
      items: [
        "Lean Six Sigma",
        "Process Optimization",
        "Supply Chain Management",
        "Inventory Management",
        "ERP Implementation",
        "Logistics",
        "Quality Assurance",
        "Budgeting",
        "Vendor Management",
        "Change Management"
      ],
    },
    {
      category: "Management",
      items: [
        "Team Leadership",
        "Cross-functional Collaboration",
        "KPI Development",
        "Strategic Planning",
        "Performance Management"
      ],
    },
    {
      category: "Technical",
      items: [
        "SAP",
        "Oracle",
        "MS Project",
        "Tableau",
        "Advanced Excel"
      ],
    },
  ],
  certifications: [
    "Lean Six Sigma Black Belt",
    "Certified Supply Chain Professional (CSCP)",
    "APICS CPIM",
    "Project Management Professional (PMP)"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "German", proficiency: "Professional Working Proficiency" }
  ],
  hobbies: [
    "Golf",
    "Business Books",
    "Mentoring",
    "Sailing",
    "Process Improvement Forums"
  ],
};

export const hrBusinessPartnerCV: CVData = {
  personalInfo: {
    fullName: "Linda Nguyen",
    email: "linda.nguyen@hrplus.com",
    phone: "+1 (408) 654-3210",
    address: "500 Santana Row, San Jose, CA",
    jobTitle: "Senior HR Business Partner",
    summary:
      "Strategic Senior HR Business Partner with over 12 years of experience in talent management, organizational development, and employee relations for technology and Fortune 500 companies. Expert in driving HR transformation, building high-engagement cultures, and aligning people strategy with business goals. Skilled in change management, DEI initiatives, and HR analytics. Recognized for exceptional communication, coaching, and a consultative approach to solving complex workforce challenges.",
  },
  education: [
    {
      id: "edu-1",
      institution: "San Jose State University",
      degree: "Bachelor of Arts",
      field: "Human Resources",
      startDate: "2010-09-01",
      endDate: "2014-06-01",
      gpa: "3.8",
    },
    {
      id: "edu-2",
      institution: "Cornell University",
      degree: "Certificate",
      field: "Strategic Human Resource Management",
      startDate: "2016-01-01",
      endDate: "2016-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "HR Plus Solutions",
      position: "Senior HR Business Partner",
      startDate: "2019-03-01",
      endDate: "Present",
      description:
        "• Partnered with C-suite and department heads to design and implement talent strategies supporting 1,000+ employees.\n" +
        "• Launched employee wellness and engagement programs, increasing retention by 12% and employee satisfaction by 20%.\n" +
        "• Led performance management, succession planning, and leadership development initiatives.\n" +
        "• Advised on complex employee relations issues, ensuring compliance with EEO, ADA, and labor laws.\n" +
        "• Championed DEI programs, resulting in a 30% increase in diverse hires.",
      current: true,
    },
    {
      id: "exp-2",
      company: "TechNova",
      position: "HR Generalist",
      startDate: "2014-07-01",
      endDate: "2019-02-28",
      description:
        "• Managed full-cycle recruitment for technical and non-technical roles, filling 200+ positions annually.\n" +
        "• Developed onboarding and training programs, reducing new hire ramp-up time by 25%.\n" +
        "• Supported HRIS implementation and process automation.",
      current: false,
    },
    {
      id: "exp-3",
      company: "PeopleFirst Consulting",
      position: "HR Intern",
      startDate: "2013-06-01",
      endDate: "2014-05-31",
      description:
        "• Assisted in benefits administration, employee engagement surveys, and compliance audits.",
      current: false,
    },
  ],
  skills: [
    {
      category: "HR Skills",
      items: [
        "Talent Acquisition",
        "Employee Relations",
        "Onboarding",
        "Performance Management",
        "Succession Planning",
        "Organizational Development",
        "HR Analytics",
        "Compensation & Benefits",
        "Training & Development",
        "Change Management"
      ],
    },
    {
      category: "Compliance",
      items: [
        "EEO",
        "ADA",
        "Labor Law",
        "Conflict Resolution",
        "HRIS",
        "Diversity, Equity & Inclusion"
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Coaching",
        "Consulting",
        "Communication",
        "Stakeholder Management"
      ],
    },
  ],
  certifications: [
    "SHRM-CP",
    "HRCI PHR",
    "Certified Diversity Professional (CDP)",
    "LinkedIn Learning: HR Analytics"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Vietnamese", proficiency: "Conversational" },
    { language: "Spanish", proficiency: "Basic" },
  ],
  hobbies: [
    "Yoga",
    "Volunteering",
    "People Analytics",
    "Travel",
    "HR Conferences"
  ],
};

export const financialAnalystCV: CVData = {
  personalInfo: {
    fullName: "Jason Miller",
    email: "j.miller@finlytics.com",
    phone: "+1 (213) 321-9999",
    address: "660 W 6th St, Los Angeles, CA",
    jobTitle: "Senior Financial Analyst",
    summary:
      "Analytical and detail-oriented Senior Financial Analyst with 9+ years of experience in corporate finance, investment analysis, and financial modeling for multinational corporations. Expert in budgeting, forecasting, and providing actionable insights to executive leadership. Adept at building complex models, managing large data sets, and supporting M&A activities. Recognized for accuracy, business acumen, and the ability to communicate complex financial concepts to non-financial stakeholders.",
  },
  education: [
    {
      id: "edu-1",
      institution: "UCLA",
      degree: "Bachelor of Science",
      field: "Finance",
      startDate: "2011-09-01",
      endDate: "2015-06-01",
      gpa: "3.85",
    },
    {
      id: "edu-2",
      institution: "CFA Institute",
      degree: "CFA Level II Candidate",
      field: "Chartered Financial Analyst Program",
      startDate: "2016-01-01",
      endDate: "2017-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "FinLytics",
      position: "Senior Financial Analyst",
      startDate: "2017-01-01",
      endDate: "Present",
      description:
        "• Developed and maintained financial models and forecasts to support $50M+ in annual budget planning and strategic decision-making.\n" +
        "• Led quarterly financial reviews and variance analysis, identifying cost-saving opportunities totaling $3M.\n" +
        "• Supported M&A due diligence, including valuation, scenario analysis, and integration planning.\n" +
        "• Automated reporting processes using Tableau and Power BI, reducing manual effort by 40%.\n" +
        "• Collaborated with business units to develop KPIs and dashboards for performance tracking.",
      current: true,
    },
    {
      id: "exp-2",
      company: "West Coast Capital",
      position: "Financial Analyst",
      startDate: "2015-07-01",
      endDate: "2016-12-31",
      description:
        "• Conducted investment analysis and prepared pitch books for private equity deals.\n" +
        "• Built DCF, LBO, and comparable company models for valuation purposes.\n" +
        "• Presented findings to senior partners and external clients.",
      current: false,
    },
    {
      id: "exp-3",
      company: "UCLA Investment Society",
      position: "Equity Research Intern",
      startDate: "2014-06-01",
      endDate: "2015-05-31",
      description:
        "• Researched and analyzed public companies, producing investment memos and recommendations.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Finance",
      items: [
        "Financial Modeling",
        "Budgeting",
        "Forecasting",
        "Valuation",
        "Variance Analysis",
        "M&A Analysis",
        "KPI Development",
        "Scenario Analysis",
        "Cost Optimization",
        "Investment Analysis"
      ],
    },
    {
      category: "Tools",
      items: [
        "Excel (Advanced)",
        "QuickBooks",
        "Tableau",
        "Power BI",
        "Bloomberg Terminal",
        "SQL",
        "Python (Pandas, NumPy)"
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Analytical Thinking",
        "Attention to Detail",
        "Presentation Skills",
        "Cross-functional Collaboration"
      ],
    },
  ],
  certifications: [
    "CFA Level II",
    "Financial Modeling & Valuation Analyst (FMVA)",
    "Tableau Desktop Specialist",
    "Bloomberg Market Concepts"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Mandarin", proficiency: "Conversational" }
  ],
  hobbies: [
    "Stock Trading",
    "Basketball",
    "Reading Financial Reports",
    "Chess",
    "Finance Podcasts"
  ],
};

export const projectManagerCV: CVData = {
  personalInfo: {
    fullName: "Rachel Adams",
    email: "rachel.adams@projectix.com",
    phone: "+1 (206) 555-8822",
    address: "901 Pine St, Seattle, WA",
    jobTitle: "Senior Project Manager",
    summary:
      "Certified Senior Project Manager with 10+ years of experience leading complex business and IT projects for global organizations. Expert in Agile, Scrum, and Waterfall methodologies, with a proven record of delivering projects on time and under budget. Skilled in stakeholder management, risk mitigation, and building high-performing teams. Adept at managing multimillion-dollar budgets, driving process improvements, and fostering a culture of continuous delivery and innovation.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of Washington",
      degree: "Bachelor of Business Administration",
      field: "Project Management",
      startDate: "2009-09-01",
      endDate: "2013-06-01",
      gpa: "3.6",
    },
    {
      id: "edu-2",
      institution: "PMI Institute",
      degree: "PMP Certification",
      field: "Project Management",
      startDate: "2014-01-01",
      endDate: "2014-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Projectix",
      position: "Senior Project Manager",
      startDate: "2016-04-01",
      endDate: "Present",
      description:
        "• Delivered 25+ business and IT projects valued at $500K–$5M, achieving a 98% on-time and on-budget delivery rate.\n" +
        "• Implemented Agile and Scrum methodologies, reducing project cycle time by 20% and increasing team productivity.\n" +
        "• Managed cross-functional teams of up to 20 members, including developers, designers, and business analysts.\n" +
        "• Developed project charters, schedules, budgets, and risk management plans.\n" +
        "• Led stakeholder communications, status reporting, and executive presentations.",
      current: true,
    },
    {
      id: "exp-2",
      company: "TechBridge Solutions",
      position: "Project Coordinator",
      startDate: "2013-07-01",
      endDate: "2016-03-31",
      description:
        "• Supported project managers in planning, scheduling, and resource allocation for software development projects.\n" +
        "• Tracked project milestones, deliverables, and budgets, ensuring alignment with client expectations.\n" +
        "• Facilitated daily stand-ups, sprint planning, and retrospectives.",
      current: false,
    },
    {
      id: "exp-3",
      company: "University of Washington",
      position: "Research Assistant (Project Management)",
      startDate: "2011-09-01",
      endDate: "2013-06-01",
      description:
        "• Assisted in research on project management best practices and process improvement methodologies.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Project Management",
      items: [
        "Agile",
        "Scrum",
        "Waterfall",
        "Budgeting",
        "Risk Management",
        "Gantt Charts",
        "Stakeholder Management",
        "Process Improvement",
        "Resource Allocation",
        "Change Management"
      ],
    },
    {
      category: "Tools",
      items: [
        "Jira",
        "Trello",
        "Asana",
        "MS Project",
        "Smartsheet",
        "Confluence",
        "Slack"
      ],
    },
    {
      category: "Leadership",
      items: [
        "Team Building",
        "Mentoring",
        "Conflict Resolution",
        "Executive Communication"
      ],
    },
  ],
  certifications: [
    "PMP",
    "Certified ScrumMaster (CSM)",
    "Agile Certified Practitioner (PMI-ACP)",
    "Lean Six Sigma Green Belt"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "German", proficiency: "Basic" }
  ],
  hobbies: [
    "Hiking",
    "Workflow Automation",
    "Scrum Meetups",
    "Travel",
    "Project Management Podcasts"
  ],
};
