'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ExternalLink, Github, X } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
}

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Extract unique tags from all projects
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags))
  );

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? projectsData.filter((project) => project.tags.includes(selectedTag))
    : projectsData;

  return (
    <div ref={ref} className="space-y-8">
      {/* Filter tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={selectedTag === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedTag(null)}
          className="rounded-full"
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(tag)}
            className="rounded-full"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card 
              className="overflow-hidden h-full cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-md bg-muted mt-4">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <DialogDescription className="text-foreground my-4">
                {selectedProject.description}
              </DialogDescription>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer">
                    GitHub Repo
                    <Github className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}