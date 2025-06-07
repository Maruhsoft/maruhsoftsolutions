export interface ServiceTopic {
  title: string;
  subtopics: string[];
  description: string;
  price: string;
  category?: string;
}

export interface ServiceItem {
  category: string;
  image: string;
  topics: ServiceTopic[];
}

export interface OrderData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'paystack' | 'manual';
  notes?: string;
  urgency: 'standard' | 'urgent' | 'express';
}