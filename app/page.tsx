import HeroBanner from '@/components/home/HeroBanner';
import SkillsShowcase from '@/components/home/SkillsShowcase';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import CertificationsList from '@/components/home/CertificationsList';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import ServicesPreview from '@/components/home/ServicesPreview';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroBanner />
      
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My <span className="text-primary">Skills</span>
          </h2>
          <SkillsShowcase />
        </div>
      </section>

      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Work <span className="text-primary">Experience</span>
          </h2>
          <ExperienceTimeline />
        </div>
      </section>

      <section id="certifications" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My <span className="text-primary">Certifications</span>
          </h2>
          <CertificationsList />
        </div>
      </section>

      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <ProjectsGrid />
        </div>
      </section>

      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My <span className="text-primary">Services</span>
          </h2>
          <ServicesPreview />
        </div>
      </section>

      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <ContactSection />
        </div>
      </section>
    </div>
  );
}