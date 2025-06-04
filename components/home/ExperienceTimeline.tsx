'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BriefcaseBusiness, Calendar, MapPin } from 'lucide-react';
import experienceData from '@/data/experience.json';

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border" />

        {experienceData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative mb-12 md:mb-16 ${
              index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-0 md:mr-auto' : 'md:pl-8 md:ml-auto md:mr-0'
            } ml-8 md:w-1/2`}
          >
            {/* Circle indicator */}
            <div className="absolute top-0 left-0 md:left-auto md:right-0 w-4 h-4 rounded-full bg-primary -translate-x-1/2 md:translate-x-1/2" />

            <div className={`bg-card rounded-lg p-6 shadow-md ${index % 2 === 0 ? '' : ''}`}>
              <h3 className="text-xl font-bold mb-1">{item.position}</h3>
              <h4 className="text-lg font-medium text-primary mb-3">{item.company}</h4>
              
              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{item.period}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{item.location}</span>
                </div>
              </div>
              
              <p className="text-foreground/80 mb-4">{item.description}</p>
              
              <h5 className="font-medium mb-2">Key Achievements:</h5>
              <ul className="space-y-2">
                {item.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}