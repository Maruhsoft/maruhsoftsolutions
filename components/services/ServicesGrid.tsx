'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Clock, CheckCircle, Star } from 'lucide-react';
import { ServiceTopic } from '@/types/services';
import servicesData from '@/data/services.json';

interface ServicesGridProps {
  onOrderService: (service: ServiceTopic, parentCategory: string) => void;
}

export default function ServicesGrid({ onOrderService }: ServicesGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getDeliveryTime = (category: string) => {
    switch (category) {
      case 'Web Development': return '7-14 days';
      case 'Mobile Development': return '14-21 days';
      case 'Consulting & Training': return '1-7 days';
      case 'UI/UX Design': return '5-10 days';
      default: return '7-14 days';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development': return '🌐';
      case 'Mobile Development': return '📱';
      case 'Consulting & Training': return '🎓';
      case 'UI/UX Design': return '🎨';
      default: return '💼';
    }
  };

  return (
    <div ref={ref} className="space-y-20">
      {servicesData.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          id={category.category.toLowerCase().replace(/\s+/g, '-')}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          className="scroll-mt-24"
        >
          <div className="mb-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 + 0.2 }}
              className="text-6xl mb-4"
            >
              {getCategoryIcon(category.category)}
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">{category.category}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional {category.category.toLowerCase()} services with modern technologies and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.topics.map((service, serviceIndex) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.2 + serviceIndex * 0.1 }}
                onHoverStart={() => setHoveredService(service.title)}
                onHoverEnd={() => setHoveredService(null)}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 leading-tight">{service.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {getDeliveryTime(category.category)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Premium Quality
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ 
                          scale: hoveredService === service.title ? 1.1 : 1,
                          rotate: hoveredService === service.title ? 5 : 0
                        }}
                        className="text-3xl"
                      >
                        💎
                      </motion.div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    
                    <Accordion type="single" collapsible className="mb-6">
                      <AccordionItem value="details" className="border-none">
                        <AccordionTrigger className="text-sm font-medium hover:no-underline py-3 px-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            What's Included ({service.subtopics.length} services)
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                          <div className="grid grid-cols-1 gap-2">
                            {service.subtopics.map((subtopic, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors"
                              >
                                <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-sm">{subtopic}</span>
                              </motion.div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Starting from</div>
                        <div className="text-2xl font-bold text-primary">
                          {service.price}
                        </div>
                      </div>
                      <Button 
                        onClick={() => onOrderService(service, category.category)}
                        size="lg"
                        className="px-6 py-3 group"
                      >
                        Order Now
                        <ShoppingCart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}