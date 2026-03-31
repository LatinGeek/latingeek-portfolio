import PremiumHero from '@/components/sections/PremiumHero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { getBio, getProjects } from '@/lib/content-loader';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const [bio, projects] = await Promise.all([
    getBio(locale),
    getProjects(locale)
  ]);

  return (
    <>
      <PremiumHero />
      <About bio={bio} />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}