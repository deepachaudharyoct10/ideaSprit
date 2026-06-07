export interface Developer {
  _id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  experience: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  education: { degree: string; institution: string; year: string }[];
  achievements: string[];
  projects: string[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  demoLink?: string;
  githubLink?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  review: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  description: string;
  status: "new" | "in_progress" | "done";
  createdAt: string;
}
