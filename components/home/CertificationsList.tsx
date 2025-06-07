'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import certificationsData from '@/data/certifications.json';

export default function CertificationsList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {certificationsData.map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <Link href={cert.url} target="_blank" rel="noopener noreferrer">
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                    <p className="text-xs font-medium inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {cert.year}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}