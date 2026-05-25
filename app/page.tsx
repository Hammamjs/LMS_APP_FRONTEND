import {
  HeroSection,
  CTASection,
  CourseGrid,
  StatsSection,
  CategoriesSection,
} from '@/features/home';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CourseGrid />
      <StatsSection />
      <CategoriesSection />
      <CTASection />
    </>
  );
}
