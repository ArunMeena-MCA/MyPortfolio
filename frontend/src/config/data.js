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
  avatar: "../public/Avatar.jpeg", // place an image at frontend/public/avatar.png
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
    degree: "Bachelor of Computer Application (BCA)",
    institution: "School of Computer Science and IT, DAVV, Indore",
    duration: "2020 — 2023",
    score: "CGPA: 7.29/10",
    highlight: "",
    description: "Built a strong foundation in data structures, algorithms, and software engineering fundamentals.",
  },
];

export const professional = [
  {
    id: "exp1",
    role: "Engineering Trainee - Internship",
    company: "OLA Electric — Battery Innovation Center",
    duration: "Jan 2026 — Aug 2026",
    location: "Bengaluru, India",
    description:
      "Worked on data automation pipelines, web applications, Machine learning models and multi-agent system to reduce manual efforts and errors in battery R&D operations.",
    highlights: [
      "Built an automated data ingestion and monitoring pipeline, reduced processing time by 75%.",
      "Developed a YOLO-based defect detection system for battery cell CT scans, achieving 87–92% accuracy.",
      "Built multi-agent system to analyze R&D reports and assess patentability scope.",
    ],
    tech: ["Python", "Django", "Node.js", "React.js", "PostgreSQL", "Machine Learning", "Redis", "Celery", "YOLO", "LLMs", ],
  },
];

// -----------------------------------------------------------------------------
// PROJECTS
// Sourced from Arun's resumes and de-duplicated (the same project appeared
// across multiple resume versions in some cases). github/liveLink are left
// blank where no confirmed URL was available in the resumes — add real links
// any time; the Live Demo / View Code buttons appear automatically once a
// non-empty URL is set.
// -----------------------------------------------------------------------------
export const projects = [
  {
    id: "proj1",
    title: "Patent Scope Analyzer (In Progress)",
    thumbnail: "/projects/patent-analyzer.png",
    shortDescription:
      "Multi-agent system that analyzes R&D reports and assesses patentability against existing filings.",
    fullDescription:
      "A multi-agent system, currently in progress, that analyzes R&D reports to assess patentability scope — identifying novel, already-filed, and improvement-ready candidates. A summarization agent condenses lengthy R&D reports before downstream analysis, backed by a structured prior-art dataset scraped and cleaned from four major patent databases including USPTO and Lens. A planned vector-embedding similarity search will retrieve relevant prior art as context, feeding a final LLM agent that synthesizes the report summary, extracted patentable elements, and similar patents into a patentability readiness score.",
    tech: ["Python", "LLM Agents", "Vector Embeddings", "NLP"],
    github: "",
    liveLink: "",
    images: ["/projects/patent-analyzer.png"],
  },
  {
    id: "proj2",
    title: "Cell Defect Detection — CT Scan Defect Analysis System",
    thumbnail: "/projects/defect-detection.png",
    shortDescription: "YOLO-based pipeline that detects manufacturing defects in battery cell CT scans in real time.",
    fullDescription:
      "An automated defect-detection pipeline that processes CT-scan videos by breaking them into frames and analyzing each with custom-trained YOLO models. Trained on 2,000+ defect images with synthetic data augmentation, reaching 87–92% detection accuracy across defect types. Region segmentation with intersection-based filtering eliminates false positives outside inspection zones, a WebSocket-based streaming system surfaces only unique defects per frame in real time, and a React interface backed by a Django API visualizes live defect streams and per-frame results.",
    tech: ["Python", "Django", "React.js", "YOLO", "WebSockets", "Computer Vision"],
    github: "",
    liveLink: "",
    images: ["/projects/defect-detection.png"],
  },
  {
    id: "proj3",
    title: "Cell Test Pipeline — Lab Data Processing & Monitoring System",
    thumbnail: "/projects/CTP_1.png",
    shortDescription: "Distributed pipeline automating ingestion and monitoring of lithium-ion cell testing data at scale.",
    fullDescription:
      "An end-to-end pipeline that scans Google Drive (mounted via rclone), matches directories using regex, and extracts multi-job testing data from Excel files for lithium-ion cell testing teams. Eight job-specific processor functions parse the raw data, compute key parameters, and persist plot-ready data as Parquet files, with a five-state job tracker (Success, In Progress, Failed, Warning, Pending Retry) for full pipeline observability. Scaled to 10,000+ jobs by integrating Celery with Redis-backed queues for parallel worker execution across job types, cutting overall processing time by more than 75%. A React dashboard lets the testing team monitor job metrics and statuses, filterable by type, status, and date, in real time.",
    tech: ["Django", "Celery", "Redis", "React.js"],
    github: "",
    liveLink: "",
    images: ["/projects/CTP_1.png", "/projects/CTP_2.png", "/projects/CTP_3.png","/projects/CTP_4.png","/projects/CTP_5.png"],
  },
  {
    id: "proj4",
    title: "Coating Parameter Optimization using Machine Learning",
    thumbnail: "/projects/coating-optimization.png",
    shortDescription: "ML system that predicts optimal electrode-coating parameters to cut material wastage.",
    fullDescription:
      "A machine-learning optimization system that predicts optimal pump speed and gap height for electrode coating from slurry properties and target mass loading. Random Forest and XGBoost regression models were trained and compared, with XGBoost selected for its superior predictive accuracy and generalization. Pairing the trained model with Differential Evolution optimization minimized operator trial iterations, achieving nearly a 3x reduction in electrode wastage and meaningfully improving coating process efficiency.",
    tech: ["Python", "Scikit-learn", "XGBoost", "Random Forest"],
    github: "",
    liveLink: "",
    images: ["/projects/coating-optimization.png"],
  },
  {
    id: "proj5",
    title: "EduVerse — Full-Stack Digital Learning Platform",
    thumbnail: "/projects/EduVerse_1.png",
    shortDescription: "MERN-stack platform for structured video lectures with secure uploads and student discussions.",
    fullDescription:
      "A digital learning platform built around structured video lectures — supporting secure uploads, student discussions and subscriptions, and an ad-free, distraction-free viewing experience. The backend is a modular Express.js + MongoDB service with REST APIs, Mongoose models, Multer for video metadata handling, and JWT + Bcrypt authentication. The frontend is a responsive React/Redux app styled with Tailwind CSS for seamless state management across devices.",
    tech: ["React.js", "Redux", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    github: "https://github.com/ArunMeena-MCA/EduVerse",
    liveLink: "https://eduverse-learn.vercel.app/",
    images: ["/projects/EduVerse_1.png", "/projects/EduVerse_2.png", "/projects/EduVerse_3.png", "/projects/EduVerse_4.png", "/projects/EduVerse_5.png", "/projects/EduVerse_6.png", "/projects/EduVerse_7.png"],
  },
  {
    id: "proj6",
    title: "Campus Trade",
    thumbnail: "/projects/CampusTrade_1.png",
    shortDescription: "MERN platform for students to buy, sell, and exchange items on campus.",
    fullDescription:
      "A full-stack web platform for buying, selling, and exchanging used goods within a college campus. Features secure authentication for registration and login with personalized profiles and transaction history, real-time messaging between buyers and sellers, and search/filter by category, title, and description — all backed by REST APIs built with Node.js, Express.js, and MongoDB/Mongoose.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/ArunMeena-MCA/Campus-Trade",
    liveLink: "https://campustrade-frontend.onrender.com/",
    images: ["/projects/CampusTrade_1.png", "/projects/CampusTrade_2.png", "/projects/CampusTrade_3.png", "/projects/CampusTrade_4.png", "/projects/CampusTrade_5.png", "/projects/CampusTrade_6.png"],
  },
  {
    id: "proj7",
    title: "Duplicate Question Detector",
    thumbnail: "/projects/duplicate-question-detector.png",
    shortDescription: "NLP system that detects duplicate question pairs using engineered similarity features.",
    fullDescription:
      "An NLP-based duplicate-question detection system built on the Quora Question Pairs dataset. Engineered 20+ linguistic and semantic features — token overlap, fuzzy string matching, longest common substring, and bag-of-words — to capture question-pair similarity, then trained and tuned Random Forest, XGBoost, and Logistic Regression models with RandomizedSearchCV, reaching 79% accuracy on unseen question pairs. Deployed on Render with a scalable data-processing and model-training pipeline.",
    tech: ["Python", "Scikit-learn", "XGBoost", "NLP"],
    github: "https://github.com/ArunMeena-MCA/Duplicate-Question-Detector",
    liveLink: "",
    images: ["/projects/duplicate-question-detector.png"],
  },
  {
    id: "proj8",
    title: "Forest Fire Prediction App",
    thumbnail: "/projects/FFP_1.png",
    shortDescription: "Full-stack ML app predicting the Fire Weather Index from meteorological data.",
    fullDescription:
      "A full-stack machine learning web app that predicts the Fire Weather Index (FWI) from meteorological data. Data was preprocessed and analyzed with NumPy and Pandas, and multiple regression algorithms (Linear, Ridge, Lasso, ElasticNet) were compared via cross-validation — Ridge Regression performed best at 98.26% accuracy and was integrated into the production pipeline. Deployed with a Flask backend (joblib-serialized model) on Render and a React frontend on Vercel.",
    tech: ["Python", "NumPy", "Pandas", "Scikit-learn", "Flask", "React.js"],
    github: "https://github.com/ArunMeena-MCA/Forest-Fire-Prediction-App",
    liveLink: "https://algerian-fire-prediction-app.vercel.app/",
    images: ["/projects/FFP_1.png"],
  },
];

export const leetcode_manual_stats = {
  totalSolved: 535, // TODO: fill in your real total from https://leetcode.com/u/Arun_Meena/
  totalQuestions: 4000, // TODO: total questions available on LeetCode at time of update
  ranking: null,
  easy: { solved: 213, total: 1000 },
  medium: { solved: 289, total: 2000 },
  hard: { solved: 33, total: 1000 },
};

export const gfg_profile_url = "https://www.geeksforgeeks.org/profile/arunmee7ucl?tab=activity"; // TODO: your real GFG profile URL

export const gfg_manual_stats = {
  totalSolved: 155, // TODO: fill in your real total
  codingScore: 504,
  // instituteRank: 488,
  // school: 0,
  basic: 17,
  easy: 45,
  medium: 74,
  hard: 19,
};

export const site_meta = {
  analyticsPasswordHint:
    "Default analytics password is '1' — change it from the analytics dashboard after first login.",
};
