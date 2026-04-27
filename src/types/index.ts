export interface Project {
  id: string;
  title: string;
  year: string;
  category: "Residencial" | "Comercial" | "Conceptual";
  description: string;
  coverImage: string;
  images: string[];
  tags?: string[];
}

export interface Skill {
  name: string;
  level: number;
}
