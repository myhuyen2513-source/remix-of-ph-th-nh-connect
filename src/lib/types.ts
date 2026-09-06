export interface SystemSettings {
  id: number;
  org_name: string;
  org_name_2: string;
  slogan: string;
  hotline: string;
  hotline_note: string;
  email: string;
  website: string;
  address: string;
  address_2: string;
  facebook_url: string;
  zalo_url: string;
  dvc_url: string;
  ubnd_url: string;
  alert_text: string;
  is_alert_active: boolean;
  welcome_text: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  color_var: string;
  bullets: string[];
  image: string;
}

export interface Attachment {
  name: string;
  type: "PDF" | "Word";
  size: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  audience: string;
  date: string;
  image: string;
  location: string;
  attachments: Attachment[];
  featured: boolean;
  created_at?: string;
  categoryColor?: string;
}

export interface EventItem {
  id: number;
  day: number;
  month: number;
  title: string;
  time: string;
  place: string;
}

export interface HonorSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface PublicService {
  id: number;
  slug: string;
  name: string;
  desc: string;
}

export interface Thematic {
  id: number;
  slug: string;
  name: string;
  desc: string;
  image: string;
}

export interface MediaImage {
  id: number;
  title: string;
  image: string;
  date: string;
}

export interface MediaVideo {
  id: number;
  title: string;
  source: string;
  embed_url: string;
  date: string;
}

export interface MediaDocument {
  id: number;
  title: string;
  type: string;
  size: string;
  date: string;
}

export interface PollOption {
  id: number;
  label: string;
  value: number;
  color: string;
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  created_at?: string;
}
