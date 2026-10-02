export type EventCategory = 'all' | 'casamentos' | 'debutante' | 'formaturas' | 'corporativo' | 'ambientes';

export interface GalleryItem {
  id: string;
  title: string;
  category: EventCategory;
  categoryLabel: string;
  image: string;
  description: string;
  highlight: string;
  span?: string; // grid span for masonry effect
}

export interface EventType {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  inclusions: string[];
  capacity: string;
  popularAddons: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  eventType: string;
  date: string;
  content: string;
  rating: number;
  highlight: string;
}

export interface VenueArea {
  id: string;
  name: string;
  capacity: string;
  description: string;
  features: string[];
  image: string;
}
