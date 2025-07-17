import { CVData } from "@/types/cv-types";

export const registeredNurseCV: CVData = {
  personalInfo: {
    fullName: "Emily Foster",
    email: "emily.foster@nursingcare.org",
    phone: "+1 (312) 555-9988",
    address: "1340 W Fullerton Ave, Chicago, IL",
    jobTitle: "Senior Registered Nurse (RN), Critical Care",
    summary:
      "Advanced, board-certified Registered Nurse with 9+ years of progressive experience in critical care, emergency medicine, and clinical leadership. Expert in trauma response, patient/family education, and interdisciplinary collaboration. Recognized for implementing evidence-based protocols that improved patient outcomes and reduced hospital-acquired infections by 18%. Adept at mentoring new nurses and leading quality improvement initiatives in high-acuity settings.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of Illinois at Chicago",
      degree: "Bachelor of Science",
      field: "Nursing (BSN)",
      startDate: "2012-08-01",
      endDate: "2016-05-01",
      gpa: "3.8",
    },
    {
      id: "edu-2",
      institution: "Rush University",
      degree: "Master of Science",
      field: "Nursing Leadership",
      startDate: "2017-09-01",
      endDate: "2019-06-01",
      gpa: "3.9",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Northwestern Memorial Hospital",
      position: "Senior Registered Nurse, ICU",
      startDate: "2019-07-01",
      endDate: "Present",
      description:
        "Lead RN in a 24-bed ICU, managing complex cases including multi-organ failure, sepsis, and trauma. Developed and implemented a sepsis protocol that reduced mortality rates by 12%. Precepted 15+ new nurses and coordinated interdisciplinary rounds. Spearheaded a hand hygiene campaign, resulting in a measurable decrease in hospital-acquired infections.",
      current: true,
    },
    {
      id: "exp-2",
      company: "Northwestern Memorial Hospital",
      position: "Registered Nurse, Emergency Department",
      startDate: "2017-02-01",
      endDate: "2019-06-30",
      description:
        "Provided rapid assessment and triage for high-acuity patients in a Level I Trauma Center. Administered advanced cardiac life support and managed mass casualty incidents. Collaborated with physicians and social workers to ensure holistic patient care.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Nursing",
      items: [
        "Advanced Cardiac Life Support (ACLS)",
        "Critical Care & Trauma Management",
        "Patient & Family Education",
        "Evidence-Based Practice Implementation",
        "Interdisciplinary Team Leadership"
      ],
    },
    {
      category: "Tools",
      items: [
        "Epic EHR (Super User)",
        "Meditech",
        "Syringe & Infusion Pumps",
        "Defibrillators & Ventilators",
        "Point-of-Care Ultrasound"
      ],
    },
  ],
  certifications: [
    "NCLEX-RN",
    "BLS (Basic Life Support)",
    "ACLS (Advanced Cardiac Life Support)",
    "CCRN (Critical Care Registered Nurse)",
    "PALS (Pediatric Advanced Life Support)"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Conversational" }
  ],
  hobbies: [
    "Medical Volunteering (Doctors Without Borders)",
    "Nursing Research Journals",
    "Yoga & Mindfulness",
    "Disaster Response Training",
    "Mentoring Nursing Students"
  ],
};

export const medicalAssistantCV: CVData = {
  personalInfo: {
    fullName: "Jasmine Rivera",
    email: "j.rivera@cliniccare.com",
    phone: "+1 (213) 666-3344",
    address: "700 Sunset Blvd, Los Angeles, CA",
    jobTitle: "Lead Medical Assistant",
    summary:
      "Highly skilled Certified Medical Assistant with 7 years of experience in multi-specialty outpatient clinics. Proficient in advanced clinical procedures, EHR management, and patient flow optimization. Recognized for training new staff, streamlining administrative workflows, and ensuring compliance with HIPAA and OSHA standards. Passionate about patient advocacy and quality improvement.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Los Angeles City College",
      degree: "Associate Degree",
      field: "Medical Assisting",
      startDate: "2015-08-01",
      endDate: "2017-05-01",
      gpa: "3.6",
    },
    {
      id: "edu-2",
      institution: "American Association of Medical Assistants",
      degree: "Certified Medical Assistant (CMA)",
      field: "Medical Assisting",
      startDate: "2017-06-01",
      endDate: "2017-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "CarePlus Clinic",
      position: "Lead Medical Assistant",
      startDate: "2021-01-01",
      endDate: "Present",
      description:
        "Supervise a team of 6 medical assistants in a high-volume family practice. Implemented a digital check-in system, reducing patient wait times by 30%. Conduct advanced clinical procedures including EKGs, phlebotomy, and wound care. Developed training materials for onboarding new staff.",
      current: true,
    },
    {
      id: "exp-2",
      company: "CarePlus Clinic",
      position: "Medical Assistant",
      startDate: "2019-01-01",
      endDate: "2020-12-31",
      description:
        "Assisted physicians with minor surgical procedures, managed patient documentation in EHR, and coordinated insurance verification. Recognized for exceptional patient communication and attention to detail.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Clinical Skills",
      items: [
        "Phlebotomy & Specimen Collection",
        "EKG & Vital Signs Monitoring",
        "Wound Care & Dressing Changes",
        "Immunization Administration",
        "Patient Triage & Prep"
      ],
    },
    {
      category: "Administrative",
      items: [
        "EHR Management (Epic, Athenahealth)",
        "Insurance Verification & Billing",
        "Appointment Scheduling Optimization",
        "HIPAA & OSHA Compliance",
        "Patient Flow Coordination"
      ],
    },
  ],
  certifications: [
    "CMA (AAMA)",
    "HIPAA Certified",
    "OSHA Bloodborne Pathogens",
    "CPR & First Aid",
    "Certified Phlebotomy Technician"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Fluent" },
  ],
  hobbies: [
    "Health & Wellness Podcasting",
    "Community Health Fairs",
    "Meal Prep & Nutrition Planning",
    "Fitness Challenges",
    "Medical Assisting Workshops"
  ],
};

export const pharmacistCV: CVData = {
  personalInfo: {
    fullName: "Dr. Ryan O'Connell",
    email: "ryan.oconnell@pharmahub.com",
    phone: "+1 (646) 555-8822",
    address: "290 Broadway, New York, NY",
    jobTitle: "Clinical Pharmacist, Medication Therapy Management",
    summary:
      "Board-certified Clinical Pharmacist with 10+ years of experience in hospital and community pharmacy settings. Expert in medication therapy management, pharmacovigilance, and patient counseling. Led interdisciplinary teams to optimize drug regimens, reduce adverse drug events by 22%, and implement antimicrobial stewardship programs. Experienced in regulatory compliance, staff training, and public health education.",
  },
  education: [
    {
      id: "edu-1",
      institution: "St. John's University",
      degree: "Doctor of Pharmacy (Pharm.D)",
      field: "Pharmacy",
      startDate: "2008-08-01",
      endDate: "2014-05-01",
      gpa: "3.9",
    },
    {
      id: "edu-2",
      institution: "American Society of Health-System Pharmacists",
      degree: "PGY1 Pharmacy Residency",
      field: "Clinical Pharmacy",
      startDate: "2014-07-01",
      endDate: "2015-06-30",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "PharmaHub NY",
      position: "Clinical Pharmacist, MTM Lead",
      startDate: "2018-01-01",
      endDate: "Present",
      description:
        "Lead MTM pharmacist overseeing medication reviews for chronic disease patients. Developed a medication adherence program that improved outcomes by 20%. Conducted drug utilization reviews, managed high-risk medication protocols, and provided in-depth patient counseling. Trained pharmacy interns and led continuing education workshops.",
      current: true,
    },
    {
      id: "exp-2",
      company: "NYC Health + Hospitals",
      position: "Staff Pharmacist",
      startDate: "2015-07-01",
      endDate: "2017-12-31",
      description:
        "Reviewed prescriptions for accuracy, managed inventory, and collaborated with physicians on complex cases. Participated in hospital-wide antimicrobial stewardship and patient safety initiatives.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Pharmacy",
      items: [
        "Medication Therapy Management (MTM)",
        "Pharmacovigilance & Drug Safety",
        "Antimicrobial Stewardship",
        "Patient Counseling & Education",
        "Regulatory Compliance (FDA, NYS)"
      ],
    },
    {
      category: "Tools",
      items: [
        "QS/1 & PioneerRx",
        "ScriptPro Automation",
        "Pharmacy Benefit Systems",
        "Clinical Decision Support (CDS)",
        "Inventory Management Software"
      ],
    },
  ],
  certifications: [
    "NY State Pharmacist License",
    "Board Certified Pharmacotherapy Specialist (BCPS)",
    "Immunization Certification",
    "Medication Therapy Management Certification",
    "CPR Certified"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "French", proficiency: "Conversational" }
  ],
  hobbies: [
    "Health Awareness Campaigns",
    "Pharmacy Research & Publications",
    "Public Speaking at Health Seminars",
    "Mentoring Pharmacy Students",
    "Reading Prescriber Journals"
  ],
};

export const radiologicTechnologistCV: CVData = {
  personalInfo: {
    fullName: "Brandon Lee",
    email: "brandon.lee@medscan.org",
    phone: "+1 (305) 123-4567",
    address: "950 NW 20th St, Miami, FL",
    jobTitle: "Senior Radiologic Technologist, Diagnostic Imaging",
    summary:
      "Advanced Radiologic Technologist with 8+ years of experience in diagnostic imaging, CT, and interventional radiology. Expert in radiation safety, image quality optimization, and patient-centered care. Led process improvements that reduced scan times by 25% and enhanced diagnostic accuracy. Experienced in training junior technologists and collaborating with radiologists for complex cases.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Florida International University",
      degree: "Associate of Science",
      field: "Radiologic Technology",
      startDate: "2013-08-01",
      endDate: "2015-05-01",
      gpa: "3.7",
    },
    {
      id: "edu-2",
      institution: "American Registry of Radiologic Technologists",
      degree: "Advanced Certification",
      field: "CT Imaging",
      startDate: "2016-01-01",
      endDate: "2016-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "MedScan Imaging Center",
      position: "Senior Radiologic Technologist",
      startDate: "2020-01-01",
      endDate: "Present",
      description:
        "Perform and oversee advanced diagnostic imaging procedures (X-ray, CT, fluoroscopy) for diverse patient populations. Implemented a quality assurance program that improved image clarity and reduced repeat scans. Train and mentor new technologists, and collaborate with radiologists for complex diagnostic cases.",
      current: true,
    },
    {
      id: "exp-2",
      company: "MedScan Imaging Center",
      position: "Radiologic Technologist",
      startDate: "2017-06-01",
      endDate: "2019-12-31",
      description:
        "Conducted over 8,000 X-rays and CT scans, ensuring patient safety and comfort. Assisted in the development of new imaging protocols and participated in equipment calibration and maintenance.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Imaging",
      items: [
        "Advanced X-Ray & CT Imaging",
        "Fluoroscopy & Interventional Procedures",
        "Radiation Safety & Dose Optimization",
        "Image Quality Assurance",
        "Patient Positioning & Comfort"
      ],
    },
    {
      category: "Tools",
      items: [
        "GE & Siemens Imaging Systems",
        "PACS & RIS",
        "EPIC EHR Integration",
        "CT Contrast Injector Systems",
        "Digital Radiography Workstations"
      ],
    },
  ],
  certifications: [
    "ARRT Certification (R)(CT)",
    "Florida Radiology License",
    "CPR Certified",
    "Radiation Safety Officer (RSO)",
    "Advanced CT Imaging Certification"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Portuguese", proficiency: "Conversational" }
  ],
  hobbies: [
    "Fitness & Wellness Coaching",
    "Radiology Research Journals",
    "Patient Advocacy Initiatives",
    "Medical Imaging Workshops",
    "Community Health Screenings"
  ],
};

export const physicalTherapistCV: CVData = {
  personalInfo: {
    fullName: "Nina Watson",
    email: "nina.watson@mobilitycare.com",
    phone: "+1 (720) 654-7890",
    address: "300 Grant St, Denver, CO",
    jobTitle: "Lead Physical Therapist, Orthopedic & Sports Rehab",
    summary:
      "Doctor of Physical Therapy with 11 years of experience specializing in orthopedic, neurological, and sports rehabilitation. Expert in evidence-based manual therapy, post-surgical recovery, and patient-centered care. Led a team of therapists to achieve a 95% patient satisfaction rate and reduced average recovery time by 20%. Experienced in EMR documentation, outcome tracking, and staff development.",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of Colorado",
      degree: "Doctor of Physical Therapy (DPT)",
      field: "Physical Therapy",
      startDate: "2010-08-01",
      endDate: "2013-06-01",
      gpa: "3.85",
    },
    {
      id: "edu-2",
      institution: "American Board of Physical Therapy Specialties",
      degree: "Orthopedic Clinical Specialist (OCS)",
      field: "Orthopedics",
      startDate: "2015-01-01",
      endDate: "2015-12-01",
      gpa: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "MobilityCare",
      position: "Lead Physical Therapist",
      startDate: "2018-01-01",
      endDate: "Present",
      description:
        "Supervise a team of 5 therapists in a multidisciplinary clinic. Design and implement individualized rehabilitation programs for orthopedic, sports, and neurological patients. Developed a telehealth PT program, increasing patient access by 40%. Conduct outcome tracking and present at regional PT conferences.",
      current: true,
    },
    {
      id: "exp-2",
      company: "MobilityCare",
      position: "Physical Therapist",
      startDate: "2015-02-01",
      endDate: "2017-12-31",
      description:
        "Provided manual therapy, post-op rehab, and pain management for 250+ patients annually. Achieved a 92% patient satisfaction rate and contributed to clinical research on mobility outcomes.",
      current: false,
    },
  ],
  skills: [
    {
      category: "Rehabilitation",
      items: [
        "Manual Therapy & Myofascial Release",
        "Post-Op & Sports Rehab",
        "Neurological Rehabilitation",
        "Pain Management Strategies",
        "Patient Progress Tracking"
      ],
    },
    {
      category: "Tools",
      items: [
        "Goniometers & Dynamometers",
        "TheraBands & Exercise Equipment",
        "EMR & Outcome Tracking Software",
        "Ultrasound & Electrical Stimulation",
        "Telehealth Platforms"
      ],
    },
  ],
  certifications: [
    "PT License – CO",
    "CPR & AED",
    "Orthopedic Clinical Specialist (OCS)",
    "Certified Manual Therapist (MTC)",
    "Dry Needling Certification"
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "German", proficiency: "Conversational" }
  ],
  hobbies: [
    "Running & Marathon Training",
    "Injury Prevention Workshops",
    "Sports Medicine Research",
    "Community Mobility Clinics",
    "Mentoring PT Students"
  ],
};
