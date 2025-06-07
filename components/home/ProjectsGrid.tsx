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
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Github, Eye, Code2, Calendar, Filter, X } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  year?: string;
  client?: string;
}

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      {/* Enhanced filter section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter by Technology</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
          <Button
            variant={selectedTag === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="rounded-full px-4 py-1.5 text-sm transition-all duration-300 hover:scale-105"
          >
            All Projects
            <span className="ml-1.5 text-xs bg-muted/50 px-1.5 py-0.5 rounded-full">
              {projectsData.length}
            </span>
          </Button>
          {allTags.map((tag) => {
            const count = projectsData.filter(p => p.tags.includes(tag)).length;
            return (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="rounded-full px-3 py-1.5 text-sm transition-all duration-300 hover:scale-105 relative group"
              >
                {tag}
                <span className="ml-1.5 text-xs bg-muted/50 px-1.5 py-0.5 rounded-full group-hover:bg-primary/20 transition-colors">
                  {count}
                </span>
              </Button>
            );
          })}
        </div>
        
        {selectedTag && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full"
          >
            <span className="text-sm text-muted-foreground">Showing {filteredProjects.length} projects with</span>
            <Badge variant="secondary" className="font-medium text-xs">{selectedTag}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="h-5 w-5 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${selectedTag}-${project.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="h-full group"
            >
              <Card 
                className="overflow-hidden h-full cursor-pointer transition-all duration-500 hover:shadow-lg border border-border/50 bg-card group-hover:border-primary/20"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="text-xs bg-background/90 hover:bg-background">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="secondary" className="text-xs bg-background/90 hover:bg-background">
                        <Code2 className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <Code2 className="h-4 w-4 text-primary flex-shrink-0 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5 hover:bg-primary/10 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5 border-dashed">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      2023
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to explore →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enhanced project modal */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden">
              <ScrollArea className="max-h-[90vh]">
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2 text-white">
                        <Code2 className="h-6 w-6" />
                        {selectedProject.title}
                      </DialogTitle>
                    </DialogHeader>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <DialogDescription className="text-foreground text-base leading-relaxed">
                    {selectedProject.description}
                  </DialogDescription>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-base">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h5 className="font-medium text-sm text-muted-foreground mb-1">Project Type</h5>
                        <p className="font-semibold">Web Application</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-muted-foreground mb-1">Completion</h5>
                        <p className="font-semibold">2023</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild size="lg" className="px-6 py-2.5">
                      <Link href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="mr-2 h-4 w-4" />
                        View Live Demo
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="px-6 py-2.5 bg-card/50">
                      <Link href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}