import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  profile: {
    name: "Dr. Apurvanand Sahay",
    title: "Assistant Professor & Researcher",
    tagline: "Leveraging Model-Driven Engineering & Machine Learning to solve complex problems.",
    email: "a_sahay@bitmesra.ac.in",
    phone: "+91-8957436943",
    location: "Jasidih, Deoghar, Jharkhand, India",
    linkedin: "https://www.linkedin.com/in/apurvanand-sahay-7b564939/",
    scholar: "https://scholar.google.it/citations?hl=en&user=r9PtMIcAAAAJ",
    // Updated with the real profile picture matching the attachment
    image: "https://scholar.googleusercontent.com/citations?view_op=view_photo&user=r9PtMIcAAAAJ&citpid=2", 
    about: "I am a dedicated researcher and educator with a Ph.D. from the University of L'Aquila, Italy. My research interests lie at the intersection of Model-Driven Engineering (MDE), Machine Learning, AI, and Big Data. I have extensive experience in teaching core computer science subjects and conducting high-impact research.",
    skills: ["Model-Driven Engineering", "Machine Learning", "Artificial Intelligence", "Data Structures", "Algorithms", "Java", "Python", "Eclipse Modeling Framework"]
  },
  settings: {
    themeMode: 'light',
    primaryColor: '#0f172a',
    fontFamily: 'sans',
    seoTitle: "Dr. Apurvanand Sahay - Academic Portfolio",
    seoDescription: "Portfolio of Dr. Apurvanand Sahay, Assistant Professor specializing in AI, ML, and Model-Driven Engineering.",
    seoKeywords: "Apurvanand Sahay, MDE, Machine Learning, Professor, Research, BIT Mesra"
  },
  education: [
    {
      id: "1",
      degree: "Ph.D.",
      institution: "University of L’Aquila, Italy",
      year: "2019-2023",
      grade: "-"
    },
    {
      id: "2",
      degree: "M.S. (Software Architecture)",
      institution: "University of L’Aquila, Italy",
      year: "2017–2018",
      grade: "110/110"
    },
    {
      id: "3",
      degree: "M.Tech (Computer Science & Engg)",
      institution: "Amrita Vishwa Vidyapeetham, India",
      year: "2016–2018",
      grade: "8.75/10 (CGPA)"
    },
    {
      id: "4",
      degree: "MCA",
      institution: "University of Lucknow, India",
      year: "2012-2015",
      grade: "74.69%"
    },
    {
      id: "5",
      degree: "B.Sc. (H) Computer Science",
      institution: "University of Delhi, India",
      year: "2009-2012",
      grade: "63.40%"
    }
  ],
  experience: [
    {
      id: "1",
      role: "Assistant Professor",
      organization: "Birla Institute of Technology Mesra, Offcampus - Deoghar",
      duration: "November 2025 – Present",
      type: "academic",
      description: [
        "Teaching and Research work.",
        "Subjects: Design and Analysis of Algorithms, AI, Machine Learning.",
        "Submitted 2 conference proceedings and 1 journal paper."
      ]
    },
    {
      id: "2",
      role: "Assistant Professor",
      organization: "Amity University Uttar Pradesh, Noida, India",
      duration: "January 2025 – October 2025",
      type: "academic",
      description: [
        "Subjects: Essential of Machine Learning, Analysis of Algorithms, Data Structures.",
        "Published a conference paper in NLP.",
        "Working on AI techniques to identify diseases such as Hypercardiomyopathy."
      ]
    },
    {
      id: "3",
      role: "Assistant Professor",
      organization: "Amrita Vishwa Vidyapeetham, Bengaluru, India",
      duration: "March 2023 – December 2024",
      type: "academic",
      description: [
        "Subjects: Data Structures, Algorithms, UI Design, Mining Massive Datasets.",
        "Completed research papers on Model Transformation Composition in MDE.",
        "Research in Bioinformatics and intelligent algorithms (Genetic Algorithms, ACO)."
      ]
    },
    {
      id: "4",
      role: "Ph.D. Student & Early Stage Researcher",
      organization: "University of L’Aquila, Italy",
      duration: "September 2019 – July 2023",
      type: "research",
      description: [
        "Thesis: Cloud-Based Low-Code Model Transformations Composition and Execution.",
        "Project: Lowcomote Project (EU Horizon 2020).",
        "Tech: Eclipse, Java, Epsilon Languages, MOMoT framework."
      ]
    },
    {
      id: "5",
      role: "Project Assistant - III (Senior Research Fellow)",
      organization: "CSIR - CEERI, Pilani, India",
      duration: "April 2019 – August 2019",
      type: "research",
      description: [
        "Project: Intelligent Systems: Intelligent Technologies and Solutions.",
        "Experimentation with pre-trained deep learning models using Neural Compute Stick (NCS).",
        "Used Python and OpenVINO."
      ]
    }
  ],
  publications: [
    {
      id: "1",
      title: "Multi-objective model transformation chain exploration with MOMoT",
      authors: "Eisenberg, Martin, Apurvanand Sahay, et al.",
      venue: "Information and Software Technology",
      year: 2024
    },
    {
      id: "2",
      title: "Analyzing business process management capabilities of low-code development platforms",
      authors: "Sahay, Apurvanand, et al.",
      venue: "Software: Practice and Experience",
      year: 2023
    },
    {
      id: "3",
      title: "Supporting the understanding and comparison of low-code development platforms",
      authors: "Sahay, Apurvanand, et al.",
      venue: "Euromicro Conference on Software Engineering and Advanced Applications (SEAA)",
      year: 2020
    },
    {
      id: "4",
      title: "Integration of prophet model and convolution neural network on wikipedia trend data",
      authors: "Sahay, Apurvanand, and J. Amudha",
      venue: "Journal of Computational and Theoretical Nanoscience",
      year: 2020
    },
    {
      id: "5",
      title: "Hybrid Metaheuristic Optimisation for Lung Cancer Image Classification",
      authors: "Thambi, S. V., et al.",
      venue: "Procedia Computer Science",
      year: 2025
    }
  ],
  posts: [
    {
      id: "1",
      title: "The Future of Model-Driven Engineering",
      excerpt: "Exploring how MDE is evolving with the advent of cloud-computing and low-code platforms.",
      date: "2024-03-15",
      content: "Model-Driven Engineering (MDE) focuses on creating and exploiting domain models... (This is a placeholder post)",
      coverImage: "https://picsum.photos/800/400",
      tags: ["MDE", "Research"],
      author: "Dr. Apurvanand Sahay"
    },
    {
      id: "2",
      title: "Getting Started with Machine Learning in Healthcare",
      excerpt: "How AI is revolutionizing early disease detection and diagnosis.",
      date: "2024-02-10",
      content: "Machine learning algorithms are increasingly being used to diagnose diseases at earlier stages...",
      coverImage: "https://picsum.photos/800/401",
      tags: ["AI", "Healthcare"],
      author: "Dr. Apurvanand Sahay"
    }
  ]
};