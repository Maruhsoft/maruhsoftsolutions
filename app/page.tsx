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
      
      <section id="skills" className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              My <span className="text-primary">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              A comprehensive toolkit of modern technologies and frameworks I use to build exceptional digital experiences.
            </p>
          </div>
          <SkillsShowcase />
        </div>
      </section>

      <section id="experience" className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Work <span className="text-primary">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              My professional journey through various roles and companies, building expertise in software development.
            </p>
          </div>
          <ExperienceTimeline />
        </div>
      </section>

      <section id="certifications" className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              My <span className="text-primary">Certifications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Professional certifications that validate my expertise in various technologies and platforms.
            </p>
          </div>
          <CertificationsList />
        </div>
      </section>

      <section id="projects" className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              A showcase of my recent work, demonstrating expertise across different technologies and industries.
            </p>
          </div>
          <ProjectsGrid />
        </div>
      </section>

      <section id="services" className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              My <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Professional development services tailored to help you achieve your technology goals with excellence.
            </p>
          </div>
          <ServicesPreview />
        </div>
      </section>

      <section id="contact" className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Ready to start your next project? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>
          <ContactSection />
        </div>
      </section>
    </div>
  );
}