export type FAQ = {
  id: null | number;
  question: string;
  answer: string;
};

export type TeamMember = {
  name: string;
  email: string;
  designation: string;
  description: string;
  photo: string;
  linkedin_url: string;
  facebook_url: string;
  github_url: string;
  serial_no: number;
}

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  content: string;
  featured_image: string | null;
  is_featured: number;
  published_at: string;
  author_name: string;
  author_designation: string;
}