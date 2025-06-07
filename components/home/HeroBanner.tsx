'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Code, Braces, Laptop, Database, Server, Globe, Star, Zap, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const techIcons = [
  { icon: Code, x: '10%', y: '20%', delay: 0, color: 'text-blue-500', size: 'h-12 w-12' },
  { icon: Braces, x: '75%', y: '15%', delay: 0.5, color: 'text-green-500', size: 'h-10 w-10' },
  { icon: Laptop, x: '25%', y: '80%', delay: 1, color: 'text-purple-500', size: 'h-14 w-14' },
  { icon: Database, x: '85%', y: '70%', delay: 1.5, color: 'text-orange-500', size: 'h-11 w-11' },
  { icon: Server, x: '50%', y: '30%', delay: 2, color: 'text-red-500', size: 'h-13 w-13' },
  { icon: Globe, x: '15%', y: '60%', delay: 2.5, color: 'text-cyan-500', size: 'h-12 w-12' },
  { icon: Star, x: '90%', y: '40%', delay: 3, color: 'text-yellow-500', size: 'h-10 w-10' },
  { icon: Zap, x: '5%', y: '45%', delay: 3.5, color: 'text-pink-500', size: 'h-11 w-11' },
  { icon: Rocket, x: '70%', y: '85%', delay: 4, color: 'text-indigo-500', size: 'h-12 w-12' },
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 dark:from-primary/10 dark:via-secondary/5 dark:to-accent/10" />
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-500/10 to-pink-500/10 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-l from-green-400/10 via-cyan-500/10 to-blue-500/10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Enhanced floating tech icons */}
      <div className="absolute inset-0 z-10">
        {techIcons.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color} dark:opacity-70 opacity-60`}
            initial={{ x: item.x, y: item.y, opacity: 0, scale: 0.3, rotate: -180 }}
            animate={{
              opacity: [0, 0.8, 0.6],
              scale: [0.3, 1.2, 1],
              rotate: [0, 360, 0],
              y: [`${parseFloat(item.y) - 4}%`, `${parseFloat(item.y) + 4}%`, `${parseFloat(item.y) - 4}%`]
            }}
            transition={{
              opacity: { delay: item.delay, duration: 2.5 },
              scale: { delay: item.delay, duration: 2.5 },
              rotate: { delay: item.delay, duration: 10, repeat: Infinity, ease: "linear" },
              y: { 
                delay: item.delay, 
                duration: 8, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }
            }}
          >
            <item.icon className={item.size} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-20 container-padding section-padding">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 glass-effect text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Sparkles className="h-4 w-4" />
              <span>Available for New Projects</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] text-balance">
              <span className="block mb-2">Transforming Ideas Into</span>
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed text-balance">
              Professional software development and technology services
              tailored to your specific needs. From concept to deployment,
              I deliver exceptional results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Button asChild size="lg" className="px-10 py-6 text-lg h-auto group shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/services">
                Explore My Services
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-10 py-6 text-lg h-auto glass-effect hover:bg-muted/50 transition-all duration-300">
              <Link href="/#projects">
                View My Work
              </Link>
            </Button>
          </motion.div>

          {/* Enhanced stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: "50+", label: "Projects Completed", icon: Rocket },
              { number: "5+", label: "Years Experience", icon: Star },
              { number: "100%", label: "Client Satisfaction", icon: Sparkles }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="glass-effect p-6 rounded-2xl card-hover group"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-12 border-2 border-primary/40 rounded-full flex justify-center glass-effect"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}