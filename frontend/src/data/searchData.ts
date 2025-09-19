export interface SearchableStory {
  id: number;
  name: string;
  title: string;
  location: string;
  income: string;
  tags: string[];
  image: string;
  quote: string;
  duration: string;
  category: string;
}

export const searchableStories: SearchableStory[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    title: "Street Food Vendor",
    location: "Surat, Gujarat",
    income: "₹30K–₹80K/month",
    tags: ["food", "business", "vendor", "entrepreneur", "street food", "cooking"],
    image: "/src/assets/vendor-story.jpg",
    quote: "Started with ₹5000, now I employ 3 people and my cart is the most popular in the area.",
    duration: "4:32",
    category: "Food & Hospitality"
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Content Creator",
    location: "Mumbai, Maharashtra",
    income: "₹40K–₹2L/month",
    tags: ["youtube", "instagram", "content", "creator", "social media", "influencer", "video"],
    image: "/src/assets/creator-story.jpg",
    quote: "What started as making videos for fun became my full-time career in 2 years.",
    duration: "6:15",
    category: "Digital Media"
  },
  {
    id: 3,
    name: "Arjun Patel",
    title: "Software Developer",
    location: "Bangalore, Karnataka",
    income: "₹60K–₹3L/month",
    tags: ["programming", "coding", "software", "developer", "tech", "computer", "website", "app"],
    image: "/src/assets/developer-story.jpg",
    quote: "Self-taught coding during lockdown, got my first job within 8 months.",
    duration: "5:48",
    category: "Technology"
  },
  {
    id: 4,
    name: "Meera Singh",
    title: "Wedding Photographer",
    location: "Jaipur, Rajasthan",
    income: "₹50K–₹1.5L/month",
    tags: ["photography", "wedding", "photographer", "camera", "photos", "creative"],
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866",
    quote: "Turned my passion for photography into a thriving wedding photography business.",
    duration: "7:20",
    category: "Creative Arts"
  },
  {
    id: 5,
    name: "Vikram Rao",
    title: "Digital Marketing Specialist",
    location: "Pune, Maharashtra",
    income: "₹35K–₹1.2L/month",
    tags: ["digital marketing", "marketing", "social media", "advertising", "online", "campaigns"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    quote: "Helped 100+ local businesses grow online. Started with just ₹10K investment.",
    duration: "5:30",
    category: "Marketing"
  },
  {
    id: 6,
    name: "Anita Verma",
    title: "Home Chef & Catering",
    location: "Delhi",
    income: "₹25K–₹90K/month",
    tags: ["chef", "cooking", "catering", "food", "home chef", "kitchen", "recipes"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
    quote: "Started cooking for neighbors, now I cater for 20+ events monthly.",
    duration: "4:45",
    category: "Food & Hospitality"
  },
  {
    id: 7,
    name: "Rohit Gupta",
    title: "Freelance Graphic Designer",
    location: "Hyderabad, Telangana",
    income: "₹30K–₹1L/month",
    tags: ["graphic design", "designer", "freelance", "creative", "logo", "branding", "visual"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    quote: "Design logos and branding for startups. Work from home with global clients.",
    duration: "6:10",
    category: "Creative Arts"
  },
  {
    id: 8,
    name: "Sneha Joshi",
    title: "Online Tutor",
    location: "Nashik, Maharashtra",
    income: "₹20K–₹70K/month",
    tags: ["tutor", "teaching", "online", "education", "teacher", "math", "science"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    quote: "Teach math to 50+ students online. Flexible schedule and great income.",
    duration: "5:00",
    category: "Education"
  }
];

export const searchStories = (query: string): SearchableStory[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return searchableStories.filter(story => {
    // Search in title, tags, and category
    const searchFields = [
      story.title.toLowerCase(),
      story.category.toLowerCase(),
      ...story.tags.map(tag => tag.toLowerCase())
    ];
    
    return searchFields.some(field => field.includes(lowercaseQuery));
  }).slice(0, 6); // Limit to 6 results
};