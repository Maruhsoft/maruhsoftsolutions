'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BriefcaseBusiness, Calendar, MapPin, Award } from 'lucide-react';
import experienceData from '@/data/experience.json';

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="max-w-5xl mx-auto">
      <div className="relative">
        {/* Enhanced vertical line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 rounded-full" />

        {experienceData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative mb-16 md:mb-20 ${
              index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0 md:mr-auto' : 'md:pl-12 md:ml-auto md:mr-0'
            } ml-12 md:w-1/2`}
          >
            {/* Enhanced circle indicator */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
              className="absolute top-0 left-0 md:left-auto md:right-0 w-6 h-6 rounded-full bg-primary shadow-lg -translate-x-1/2 md:translate-x-1/2 border-4 border-background z-10"
            />

            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              className={`glass-effect rounded-2xl p-8 shadow-lg card-hover group ${index % 2 === 0 ? '' : ''}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <BriefcaseBusiness className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.position}
                  </h3>
                  <h4 className="text-lg font-semibold text-primary mb-3">{item.company}</h4>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground glass-effect px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>{item.period}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground glass-effect px-3 py-2 rounded-lg">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{item.location}</span>
                </div>
              </div>
              
              <p className="text-foreground/80 mb-6 leading-relaxed">{item.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-primary" />
                  <h5 className="font-semibold text-foreground">Key Achievements:</h5>
                </div>
                <ul className="space-y-3">
                  {item.highlights.map((highlight, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
                      className="flex items-start text-sm group-hover:text-foreground transition-colors duration-300"
                    >
                      <div className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}