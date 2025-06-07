'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Code, Braces, Laptop, Database, Server, Globe, Star, Zap, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const techIcons = [
  { icon: Code, x: '10%', y: '20%', delay: 0, color: 'text-blue-500', size: 'h-8 w-8' },
  { icon: Braces, x: '75%', y: '15%', delay: 0.5, color: 'text-green-500', size: 'h-7 w-7' },
  { icon: Laptop, x: '25%', y: '80%', delay: 1, color: 'text-purple-500', size: 'h-9 w-9' },
  { icon: Database, x: '85%', y: '70%', delay: 1.5, color: 'text-orange-500', size: 'h-8 w-8' },
  { icon: Server, x: '50%', y: '30%', delay: 2, color: 'text-red-500', size: 'h-8 w-8' },
  { icon: Globe, x: '15%', y: '60%', delay: 2.5, color: 'text-cyan-500', size: 'h-8 w-8' },
  { icon: Star, x: '90%', y: '40%', delay: 3, color: 'text-yellow-500', size: 'h-7 w-7' },
  { icon: Zap, x: '5%', y: '45%', delay: 3.5, color: 'text-pink-500', size: 'h-7 w-7' },
  { icon: Rocket, x: '70%', y: '85%', delay: 4, color: 'text-indigo-500', size: 'h-8 w-8' },
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-secondary/5 to-accent/3 dark:from-primary/5 dark:via-secondary/3 dark:to-accent/5" />
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-15">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-500/5 to-pink-500/5 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-l from-green-400/5 via-cyan-500/5 to-blue-500/5 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Enhanced floating tech icons */}
      <div className="absolute inset-0 z-10">
        {techIcons.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color} dark:opacity-60 opacity-50`}
            initial={{ x: item.x, y: item.y, opacity: 0, scale: 0.3, rotate: -180 }}
            animate={{
              opacity: [0, 0.7, 0.5],
              scale: [0.3, 1.1, 1],
              rotate: [0, 360, 0],
              y: [`${parseFloat(item.y) - 3}%`, `${parseFloat(item.y) + 3}%`, `${parseFloat(item.y) - 3}%`]
            }}
            transition={{
              opacity: { delay: item.delay, duration: 2.5 },
              scale: { delay: item.delay, duration: 2.5 },
              rotate: { delay: item.delay, duration: 12, repeat: Infinity, ease: "linear" },
              y: { 
                delay: item.delay, 
                duration: 10, 
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
            <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border/50 text-primary px-5 py-2.5 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>Available for New Projects</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] text-balance">
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
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed text-balance">
              Professional software development and technology services
              tailored to your specific needs. From concept to deployment,
              I deliver exceptional results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button asChild size="lg" className="px-8 py-3 text-base h-auto group shadow-sm hover:shadow-md transition-all duration-300">
              <Link href="/services">
                Explore My Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3 text-base h-auto bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
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
                className="bg-card/50 backdrop-blur-sm border border-border/50 p-5 rounded-xl hover:shadow-sm transition-all duration-300 group"
              >
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">{stat.number}</div>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 border-2 border-primary/30 rounded-full flex justify-center bg-card/30 backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}