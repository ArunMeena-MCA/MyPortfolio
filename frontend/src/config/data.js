// =============================================================================
// PORTFOLIO CONFIG
// Edit everything here. No component code needs to change when you update
// your info — just edit these objects/arrays and rebuild.
// =============================================================================

export const personal_details = {
  name: "Arun Meena",
  handle: "@yourhandle",
  title: "Software Engineer",
  tagline: "I build systems that see, learn, and scale.",
  bio: "Software/ML engineer who enjoys turning research ideas into production systems — from computer-vision pipelines to distributed backends. Currently exploring opportunities where I can work across the AI/ML + backend stack.",
  location: "Bengaluru, India",
  email: "Arunmeena.code@gmail.com",
  phone: "+91 8719838082",
  avatar: "/avatar.jpg", // place an image at frontend/public/avatar.jpg
  resumeAvailable: true, // set false to hide the "View Resume" button
};

export const social_accounts = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/ArunMeena-MCA",
    icon: "FaGithub",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/arun-meena-nitk/",
    icon: "FaLinkedin",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    url: "https://leetcode.com/u/Arun_Meena/",
    icon: "SiLeetcode",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/arun_meena_2k21/",
    icon: "FaInstagram",
  },
];

export const educational_details = [
  {
    id: "edu1",
    degree: "Master of Computer Applications (MCA)",
    institution: "National Institute of Technology Karnataka (NITK), Surathkal",
    duration: "2023 — 2026",
    score: "CGPA: 8.19/10",
    highlight: "AIR 150 in NIMCET",
    description:
      "Specialized in machine learning and distributed systems. Coursework included deep learning, computer vision, database systems, and algorithms.",
  },
  {
    id: "edu2",
    degree: "Bachelor of Science, Computer Science",
    institution: "Your Undergrad College Name",
    duration: "2020 — 2023",
    highlight: "",
    description: "Built a strong foundation in data structures, algorithms, and software engineering fundamentals.",
  },
];

export const professional = [
  {
    id: "exp1",
    role: "Engineering Trainee - Internship",
    company: "OLA Electric — Battery Innovation Center",
    duration: "May 2024 — Aug 2024",
    location: "Bengaluru, India",
    description:
      "Worked on data pipelines and ML models for battery diagnostics, contributing to defect-detection tooling used by the innovation team.",
    highlights: [
      "Built an automated data ingestion & cleaning pipeline for sensor + CT-scan data",
      "Prototyped a YOLO-based detection model for identifying battery defects",
      "Collaborated with hardware engineers to validate model output against real failures",
    ],
    tech: ["Python", "Django", "Node.js", "React.js", "PostgreSQL", "Machine Learning", "Redis", "Celery", "YOLO", "LLMs", ],
  },
];

export const projects = [
  {
    id: "proj1",
    title: "CT-Scan Defect Detection (YOLO)",
    thumbnail: "/projects/defect-detection.jpg",
    shortDescription: "Real-time defect detection on battery CT scans using a fine-tuned YOLO model.",
    fullDescription:
      "A computer-vision pipeline that ingests CT-scan imagery of battery cells, preprocesses and augments the data, and runs a fine-tuned YOLOv8 model to flag structural defects in real time. Includes an annotation-review dashboard and a confidence-based alerting system for quality engineers.",
    tech: ["Python", "YOLOv8", "OpenCV", "FastAPI", "React"],
    github: "https://github.com/yourusername/ct-defect-detection",
    liveLink: "", // leave empty string if not deployed — the Live Demo button will be hidden automatically
    images: ["/projects/defect-detection.jpg"],
    role: "Solo project",
    duration: "3 months",
  },
  {
    id: "proj2",
    title: "Data Automation Pipeline",
    thumbnail: "/projects/data-pipeline.jpg",
    shortDescription: "Scheduled ETL pipeline that automates ingestion, cleaning, and reporting.",
    fullDescription:
      "An end-to-end automation pipeline that pulls raw data from multiple sources on a schedule, cleans and normalizes it, and produces reporting-ready tables. Built with a Celery-based distributed task queue to parallelize heavy transforms across multiple workers, with Redis as the broker and result backend.",
    tech: ["Python", "Celery", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/yourusername/data-pipeline",
    liveLink: "",
    images: ["/projects/data-pipeline.jpg"],
    role: "Solo project",
    duration: "2 months",
  },
  {
    id: "proj3",
    title: "Patent Scope Analyzer",
    thumbnail: "/projects/patent-analyzer.jpg",
    shortDescription: "Multi-agent system that analyzes patent claims and surfaces prior-art overlap.",
    fullDescription:
      "A multi-agent LLM system where specialized agents parse patent claims, search for related prior art, and summarize scope overlap for a human reviewer. Agents communicate through a shared task graph, with a coordinator agent responsible for merging findings into a final report.",
    tech: ["Python", "LangChain", "MySQL", "React", "Tailwind CSS"],
    github: "https://github.com/yourusername/patent-scope-analyzer",
    liveLink: "https://patent-analyzer-demo.example.com",
    images: ["/projects/patent-analyzer.jpg"],
    role: "Team project (3 members)",
    duration: "4 months",
  },
];

export const site_meta = {
  analyticsPasswordHint:
    "Default analytics password is '1' — change it from the analytics dashboard after first login.",
};
