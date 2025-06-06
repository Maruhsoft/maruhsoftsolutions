'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Code, Braces, Laptop, Database, Server, Globe, Star, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const techIcons = [
  { icon: Code, x: '10%', y: '20%', delay: 0, color: 'text-blue-500' },
  { icon: Braces, x: '75%', y: '15%', delay: 0.5, color: 'text-green-500' },
  { icon: Laptop, x: '25%', y: '80%', delay: 1, color: 'text-purple-500' },
  { icon: Database, x: '85%', y: '70%', delay: 1.5, color: 'text-orange-500' },
  { icon: Server, x: '50%', y: '30%', delay: 2, color: 'text-red-500' },
  { icon: Globe, x: '15%', y: '60%', delay: 2.5, color: 'text-cyan-500' },
  { icon: Star, x: '90%', y: '40%', delay: 3, color: 'text-yellow-500' },
  { icon: Zap, x: '5%', y: '45%', delay: 3.5, color: 'text-pink-500' },
  { icon: Rocket, x: '70%', y: '85%', delay: 4, color: 'text-indigo-500' },
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
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 dark:from-primary/10 dark:via-secondary/5 dark:to-accent/10 z-0" />
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
      </div>
      
      {/* Enhanced floating tech icons */}
      <div className="absolute inset-0 z-10">
        {techIcons.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color} dark:opacity-60`}
            initial={{ x: item.x, y: item.y, opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{
              opacity: [0, 0.8, 0.5],
              scale: [0.5, 1.2, 1],
              rotate: [0, 360, 0],
              y: [`${parseFloat(item.y) - 3}%`, `${parseFloat(item.y) + 3}%`, `${parseFloat(item.y) - 3}%`]
            }}
            transition={{
              opacity: { delay: item.delay, duration: 2 },
              scale: { delay: item.delay, duration: 2 },
              rotate: { delay: item.delay, duration: 8, repeat: Infinity, ease: "linear" },
              y: { 
                delay: item.delay, 
                duration: 6, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }
            }}
          >
            <item.icon size={i % 3 === 0 ? 64 : i % 2 === 0 ? 56 : 48} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 pt-16 pb-32 md:pt-24 md:pb-40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Available for New Projects
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Transforming Ideas Into</span>
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional software development and technology services
              tailored to your specific needs. From concept to deployment,
              I deliver exceptional results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg group">
              <Link href="/services">
                Explore My Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link href="/#projects">
                View My Work
              </Link>
            </Button>
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}