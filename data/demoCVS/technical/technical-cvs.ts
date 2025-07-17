import { CVData } from "@/types/cv-types";

export const qaEngineerCV: CVData = {
  personalInfo: {
    fullName: "Kevin Parker",
    email: "kevin.parker@qaworks.com",
    phone: "+1 (469) 888-4455",
    address: "200 Elm St, Dallas, TX",
    jobTitle: "QA Engineer",
    summary:
      "Detail-focused QA Engineer with 5+ years of experience in manual and automated testing. Skilled in test planning, bug tracking, and Agile processes.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Texas A&M University",
      degree: "Bachelor of Science",
      field: "Information Systems",
      startDate: "2012-09-01",
      endDate: "2016-06-01",
      gpa: "3.5",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "QAWORKS",
      position: "QA Engineer",
      startDate: "2018-02-01",
      endDate: "Present",
      description:
        "Created automated test scripts that cut testing time by 40%. Worked closely with dev teams to identify and resolve 500+ bugs.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Testing",
      items: ["Manual Testing", "Selenium", "Test Cases", "Bug Reporting", "Regression Testing"],
    },
    {
      category: "Tools",
      items: ["Jira", "TestRail", "Postman", "Git", "Cypress"],
    },
  ],
  certifications: ["ISTQB Certified Tester", "Selenium WebDriver – Udemy"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Puzzle Solving", "Bug Bounty Forums", "UI/UX Testing Demos"],
};

export const systemAdministratorCV: CVData = {
  personalInfo: {
    fullName: "Michael Reyes",
    email: "michael.reyes@itops.org",
    phone: "+1 (312) 444-7799",
    address: "2500 S Michigan Ave, Chicago, IL",
    jobTitle: "System Administrator",
    summary:
      "Experienced SysAdmin with 8+ years managing Linux/Windows servers, system backups, and network configurations. Strong background in IT security and uptime optimization.",
  },
  education: [
    {
      id: "edu-1",
      institution: "DePaul University",
      degree: "Bachelor of Science",
      field: "Computer Networking",
      startDate: "2010-08-01",
      endDate: "2014-05-01",
      gpa: "3.6",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "IT Ops Group",
      position: "System Administrator",
      startDate: "2015-01-01",
      endDate: "Present",
      description:
        "Maintained 99.9% system uptime. Configured firewall rules and automated routine server tasks with PowerShell and Bash scripts.",
      current: true,
    },
  ],
  skills: [
    {
      category: "SysAdmin",
      items: ["Server Maintenance", "Network Config", "Backup Systems", "Virtualization", "Scripting"],
    },
    {
      category: "Tools",
      items: ["VMware", "Linux", "Windows Server", "PowerShell", "Nagios"],
    },
  ],
  certifications: ["CompTIA Server+", "Red Hat Certified System Administrator"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["PC Building", "Linux Forums", "SysAdmin Podcasts"],
};

export const networkEngineerCV: CVData = {
  personalInfo: {
    fullName: "Liam Cooper",
    email: "liam.cooper@netlinkers.com",
    phone: "+1 (213) 777-6565",
    address: "1100 Wilshire Blvd, Los Angeles, CA",
    jobTitle: "Network Engineer",
    summary:
      "Certified Network Engineer with 6+ years of experience in configuring routers, maintaining LAN/WAN, and troubleshooting complex network issues.",
  },
  education: [
    {
      id: "edu-1",
      institution: "UCLA",
      degree: "Bachelor of Engineering",
      field: "Computer Engineering",
      startDate: "2011-09-01",
      endDate: "2015-06-01",
      gpa: "3.7",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "NetLinkers",
      position: "Network Engineer",
      startDate: "2017-03-01",
      endDate: "Present",
      description:
        "Installed and configured Cisco hardware across 4 branch offices. Reduced downtime incidents by 30% through proactive monitoring and auditing.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Networking",
      items: ["TCP/IP", "Routing", "Switching", "Firewall Config", "LAN/WAN"],
    },
    {
      category: "Tools",
      items: ["Cisco IOS", "Wireshark", "SolarWinds", "Nagios", "GNS3"],
    },
  ],
  certifications: ["CCNA", "CompTIA Network+"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["LAN Gaming", "Packet Tracing", "Networking Meetups"],
};

export const dataEngineerCV: CVData = {
  personalInfo: {
    fullName: "Sophia Lin",
    email: "sophia.lin@datatech.ai",
    phone: "+1 (718) 888-3210",
    address: "45 Wall Street, New York, NY",
    jobTitle: "Data Engineer",
    summary:
      "Efficient Data Engineer skilled in designing scalable pipelines and ETL processes. Proficient in Python, SQL, and BigQuery with a strong data modeling background.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Cornell University",
      degree: "Bachelor of Science",
      field: "Data Science",
      startDate: "2013-08-01",
      endDate: "2017-06-01",
      gpa: "3.85",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "DataTech AI",
      position: "Data Engineer",
      startDate: "2018-04-01",
      endDate: "Present",
      description:
        "Built data pipelines that processed 100M+ records daily. Optimized data queries to improve dashboard performance by 50%.",
      current: true,
    },
  ],
  skills: [
    {
      category: "Data Engineering",
      items: ["ETL", "Data Modeling", "SQL Optimization", "Data Warehousing"],
    },
    {
      category: "Tools",
      items: ["Airflow", "BigQuery", "Snowflake", "Python", "Spark"],
    },
  ],
  certifications: ["Google Cloud Data Engineer", "Snowflake Certified Developer"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Hackathons", "Data Viz", "Kaggle Competitions"],
};

export const devOpsEngineerCV: CVData = {
  personalInfo: {
    fullName: "Aaron Blake",
    email: "aaron.blake@deployhub.com",
    phone: "+1 (503) 888-0000",
    address: "800 SW 6th Ave, Portland, OR",
    jobTitle: "DevOps Engineer",
    summary:
      "Cloud-focused DevOps Engineer with deep experience in CI/CD, container orchestration, and infrastructure automation. Passionate about efficient and secure deployment pipelines.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Oregon State University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012-08-01",
      endDate: "2016-06-01",
      gpa: "3.7",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "DeployHub",
      position: "DevOps Engineer",
      startDate: "2017-01-01",
      endDate: "Present",
      description:
        "Deployed containerized applications using Kubernetes. Automated CI/CD workflows using Jenkins and GitHub Actions for faster release cycles.",
      current: true,
    },
  ],
  skills: [
    {
      category: "DevOps",
      items: ["CI/CD", "Kubernetes", "Docker", "Terraform", "Monitoring"],
    },
    {
      category: "Tools",
      items: ["Jenkins", "GitHub Actions", "Prometheus", "Grafana", "AWS"],
    },
  ],
  certifications: ["AWS DevOps Engineer – Pro", "CKA (Kubernetes Administrator)"],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Cloud Labs", "DevOps Podcasts", "Shell Scripting"],
};
