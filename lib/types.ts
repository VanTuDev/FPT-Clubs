export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  members: string;
  frequency: string;
  benefits: string[];
  location: string;
  facebookUrl: string;
  icon: string;
  // Extended fields
  founded?: string;
  highlights?: string[];
  activities?: string[];
  contact?: string;
  memberCount?: number;
  themeGradient?: string;
}
