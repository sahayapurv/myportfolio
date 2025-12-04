export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string[];
  type: 'academic' | 'research' | 'industry';
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  link?: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage: string;
  tags: string[];
  author: string;
}

export interface SiteSettings {
  themeMode: 'light' | 'dark';
  primaryColor: string;
  fontFamily: 'sans' | 'serif';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  linkedin: string;
  scholar: string;
  image: string;
  skills: string[];
}

export interface AppState {
  profile: ProfileData;
  education: Education[];
  experience: Experience[];
  publications: Publication[];
  posts: Post[];
  settings: SiteSettings;
}