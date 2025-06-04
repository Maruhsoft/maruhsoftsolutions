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
import { ShoppingCart } from 'lucide-react';
import { ServiceTopic } from '@/types/services';
import servicesData from '@/data/services.json';

interface ServicesGridProps {
  onOrderService: (service: ServiceTopic, parentCategory: string) => void;
}

export default function ServicesGrid({ onOrderService }: ServicesGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="space-y-16">
      {servicesData.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          id={category.category.toLowerCase().replace(/\s+/g, '-')}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
          className="scroll-mt-24"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{category.category}</h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.topics.map((service, serviceIndex) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.2 + serviceIndex * 0.1 }}
              >
                <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <Accordion type="single" collapsible className="mb-4">
                      <AccordionItem value="details">
                        <AccordionTrigger className="text-sm font-medium">
                          View Details
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2 pb-1">
                            <h4 className="text-sm font-medium mb-2">Included Services:</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {service.subtopics.map((subtopic, i) => (
                                <Badge key={i} variant="secondary">
                                  {subtopic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-primary">
                        {service.price}
                      </div>
                      <Button 
                        onClick={() => onOrderService(service, category.category)}
                        size="sm"
                      >
                        Order Service
                        <ShoppingCart className="ml-2 h-4 w-4" />
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