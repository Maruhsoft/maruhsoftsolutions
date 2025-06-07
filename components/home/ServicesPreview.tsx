'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';

export default function ServicesPreview() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesData.slice(0, 2).map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-primary/20 to-muted/50">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {category.category}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.topics.length} services available
                  </p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {category.topics.slice(0, 3).map((topic) => (
                    <li key={topic.title} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      <span className="text-sm">{topic.title}</span>
                    </li>
                  ))}
                  {category.topics.length > 3 && (
                    <li className="text-sm text-muted-foreground pl-4">
                      + {category.topics.length - 3} more services
                    </li>
                  )}
                </ul>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/services#${category.category.toLowerCase().replace(/\s+/g, '-')}`}>
                    View All {category.category} Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/services">
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}