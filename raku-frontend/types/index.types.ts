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

export type feature = {
  id: null | number;
  title: string;
  description: string;
  icon: string;
}

export type Partner = {
  id: null | number;
  name: string;
  logo: string;
}

export type Testimonial = {
  id: null | number;
  body: string;
  reviewer_name: string;
  reviewer_designation: string;
  rating: number;
  image: string;
}

export type ContactPayload = {
  first_name: string;
  last_name: string;
  email: string;
  body: string;
}

export type ContactResponse = {
  data?: string;
  message?: string;
}