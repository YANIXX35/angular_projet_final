export interface Project {
  id: number;
  title: string;
  description: string;
  description_en?: string;
  shortDescription: string;
  shortDescription_en?: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  image?: string;
  featured?: boolean;
}
