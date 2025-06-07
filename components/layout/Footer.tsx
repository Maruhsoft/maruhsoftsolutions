import Link from 'next/link';
import { Braces, Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Braces className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MaruhSoft</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Delivering exceptional software solutions and technology services with expertise and precision.
            </p>
            <div className="flex space-x-3">
              <Link href="https://github.com" className="text-foreground/70 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" className="text-foreground/70 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://twitter.com" className="text-foreground/70 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="mailto:maruhsoft@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#skills" className="text-foreground/70 hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-foreground/70 hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-foreground/70 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#web-development" className="text-foreground/70 hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services#mobile-apps" className="text-foreground/70 hover:text-primary transition-colors">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link href="/services#consulting" className="text-foreground/70 hover:text-primary transition-colors">
                  Tech Consulting
                </Link>
              </li>
              <li>
                <Link href="/services#ui-ux" className="text-foreground/70 hover:text-primary transition-colors">
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <a 
                  href="mailto:maruhsoft@gmail.com"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  maruhsoft@gmail.com
                </a>
              </li>
              <li>
                <div className="border border-border rounded-md p-3 mt-4">
                  <p className="text-sm font-medium mb-2">Need a project done?</p>
                  <Link 
                    href="/services" 
                    className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View my services
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} MaruhSoft. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}