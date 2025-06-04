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