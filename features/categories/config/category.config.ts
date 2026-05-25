import {
  Smartphone,
  Database,
  Brain,
  Palette,
  Briefcase,
  TrendingUp,
  Camera,
  Code,
} from 'lucide-react';

export const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  'Web Development': Code,
  'Mobile Development': Smartphone,
  'Data Science': Database,
  'Machine Learning': Brain,
  Design: Palette,
  Business: Briefcase,
  Marketing: TrendingUp,
  Photography: Camera,
};

export const categoryDescriptions: Record<string, string> = {
  'Web Development':
    'Build modern websites and web applications with HTML, CSS, JavaScript, and popular frameworks.',
  'Mobile Development':
    'Create native and cross-platform mobile apps for iOS and Android devices.',
  'Data Science':
    'Analyze data, create visualizations, and extract insights using Python and R.',
  'Machine Learning':
    'Build intelligent systems that learn from data using cutting-edge AI techniques.',
  Design:
    'Master UI/UX design, graphic design, and create stunning visual experiences.',
  Business:
    'Learn entrepreneurship, management, and strategies to grow your business.',
  Marketing:
    'Master digital marketing, SEO, social media, and growth strategies.',
  Photography:
    'Capture stunning images with professional photography techniques and editing.',
};

export const categoryColors: Record<string, string> = {
  'Web Development': 'from-blue-500/20 to-cyan-500/20',
  'Mobile Development': 'from-green-500/20 to-emerald-500/20',
  'Data Science': 'from-orange-500/20 to-amber-500/20',
  'Machine Learning': 'from-purple-500/20 to-violet-500/20',
  Design: 'from-pink-500/20 to-rose-500/20',
  Business: 'from-slate-500/20 to-gray-500/20',
  Marketing: 'from-red-500/20 to-orange-500/20',
  Photography: 'from-teal-500/20 to-cyan-500/20',
};

export const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];
