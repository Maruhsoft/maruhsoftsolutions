'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Code, Braces, Laptop, Database, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const techIcons = [
  { icon: Code, x: '10%', y: '20%', delay: 0 },
  { icon: Braces, x: '75%', y: '15%', delay: 0.5 },
  { icon: Laptop, x: '25%', y: '80%', delay: 1 },
  { icon: Database, x: '85%', y: '70%', delay: 1.5 },
  { icon: Server, x: '50%', y: '30%', delay: 2 },
  { icon: Globe, x: '15%', y: '60%', delay: 2.5 },
];

export default function HeroBanner() {
  const controls = useAnimation();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    controls.start('visible');
  }, [controls]);

  if (!hasMounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/60 to-background dark:from-muted/20 dark:to-background z-0" />
      
      {/* Floating tech icons */}
      <div className="absolute inset-0 z-10">
        {techIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/30 dark:text-primary/10"
            initial={{ x: item.x, y: item.y, opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.8, 0.5],
              scale: [0.5, 1.2, 1],
              y: [`${parseFloat(item.y) - 2}%`, `${parseFloat(item.y) + 2}%`, `${parseFloat(item.y) - 2}%`]
            }}
            transition={{
              opacity: { delay: item.delay, duration: 2 },
              scale: { delay: item.delay, duration: 2 },
              y: { 
                delay: item.delay, 
                duration: 5, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }
            }}
          >
            <item.icon size={i % 2 === 0 ? 56 : 48} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 pt-16 pb-32 md:pt-24 md:pb-40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              <span className="block">Bringing Your</span>
              <span className="text-primary">Tech Ideas</span> to Life
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12">
              Professional software development and technology services
              tailored to your specific needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/services">
                Explore My Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link href="/#projects">
                View My Work
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}