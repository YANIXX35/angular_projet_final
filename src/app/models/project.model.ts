export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  image?: string;
  featured?: boolean;
}
