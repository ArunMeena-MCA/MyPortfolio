// =============================================================================
// PORTFOLIO CONFIG
// Edit everything here. No component code needs to change when you update
// your info — just edit these objects/arrays and rebuild.
// =============================================================================

export const personal_details = {
  name: "John Doe",
  handle: "@johndoe",
  title: "Software Engineer",
  tagline: "Building scalable software and intelligent systems.",
  bio: "Passionate software engineer with experience in backend development, cloud technologies, and machine learning. Always eager to learn new technologies and solve challenging problems.",
  location: "Your City, Country",
  email: "johndoe@example.com",
  phone: "+1 234 567 8900",
  avatar: "/avatar.jpg",
  resumeAvailable: true,
};

export const social_accounts = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/yourusername",
    icon: "FaGithub",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/yourusername",
    icon: "FaLinkedin",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    url: "https://leetcode.com/u/yourusername",
    icon: "SiLeetcode",
  },
  {
    id: "twitter",
    label: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "FaTwitter",
  },
];

export const educational_details = [
  {
    id: "edu1",
    degree: "Master of Computer Science",
    institution: "Example University",
    duration: "2022 — 2024",
    score: "CGPA: 8.5/10",
    highlight: "Dean's List",
    description:
      "Focused on software engineering, machine learning, and distributed systems.",
  },
  {
    id: "edu2",
    degree: "Bachelor of Computer Science",
    institution: "Sample College",
    duration: "2018 — 2022",
    score: "CGPA: 8.0/10",
    highlight: "",
    description:
      "Built a strong foundation in programming, algorithms, databases, and operating systems.",
  },
];

export const professional = [
  {
    id: "exp1",
    role: "Software Engineering Intern",
    company: "Example Tech Company",
    duration: "Jan 2024 — Jun 2024",
    location: "Remote",
    description:
      "Worked on backend services, automation pipelines, and cloud-native applications.",
    highlights: [
      "Developed scalable REST APIs",
      "Automated data processing workflows",
      "Improved system performance and reliability",
    ],
    tech: [
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Redis",
    ],
  },
];

export const projects = [
  {
    id: "proj1",
    title: "Computer Vision Detection System",
    thumbnail: "/projects/project-1.jpg",
    shortDescription:
      "AI-powered object detection system using deep learning.",
    fullDescription:
      "A computer vision application that detects and classifies objects in images and video streams using deep learning techniques.",
    tech: ["Python", "OpenCV", "PyTorch", "FastAPI", "React"],
    github: "https://github.com/yourusername/project-1",
    liveLink: "https://project-1-demo.com",
    images: ["/projects/project-1.jpg"],
    role: "Solo Project",
    duration: "3 months",
  },
  {
    id: "proj2",
    title: "Data Processing Pipeline",
    thumbnail: "/projects/project-2.jpg",
    shortDescription:
      "Automated ETL pipeline for data ingestion and reporting.",
    fullDescription:
      "A distributed ETL system that collects data from multiple sources, processes it, and generates reporting-ready outputs.",
    tech: ["Python", "Celery", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/yourusername/project-2",
    liveLink: "",
    images: ["/projects/project-2.jpg"],
    role: "Solo Project",
    duration: "2 months",
  },
  {
    id: "proj3",
    title: "AI Research Assistant",
    thumbnail: "/projects/project-3.jpg",
    shortDescription:
      "Multi-agent AI system for document analysis and summarization.",
    fullDescription:
      "An AI-powered platform that analyzes large documents, extracts insights, and generates concise summaries using multiple specialized agents.",
    tech: ["Python", "LangChain", "React", "MySQL", "Tailwind CSS"],
    github: "https://github.com/yourusername/project-3",
    liveLink: "https://demo.example.com",
    images: ["/projects/project-3.jpg"],
    role: "Team Project",
    duration: "4 months",
  },
];

export const site_meta = {
  analyticsPasswordHint:
    "Replace this with your own analytics dashboard password hint.",
};