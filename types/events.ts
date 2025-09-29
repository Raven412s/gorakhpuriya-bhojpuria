export interface Event {
  id: number;
  title: string;
  description: string;
  type: "jutan" | "baithaki";
  date: string;
  location?: string;
  locations?: string[];
  photos: string[];
  attendees: string[];
  totalPhotos: number;
}

export interface EventsData {
  jutan: Event[];
  baithaki: Event[];
}
