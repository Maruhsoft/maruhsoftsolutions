'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ServicesGrid from '@/components/services/ServicesGrid';
import ServiceOrderModal from '@/components/services/ServiceOrderModal';
import { ServiceItem, ServiceTopic } from '@/types/services';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceTopic | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOrderService = (service: ServiceTopic, parentCategory: string) => {
    setSelectedService({
      ...service,
      category: parentCategory
    });
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-24 bg-gradient-to-b from-muted/30 to-background"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Professional <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Explore my range of professional services designed to help you achieve your technology goals
            with excellence and precision.
          </p>
          
          <ServicesGrid onOrderService={handleOrderService} />
        </div>
      </motion.div>

      {selectedService && (
        <ServiceOrderModal 
          isOpen={isOrderModalOpen} 
          onClose={closeOrderModal} 
          service={selectedService} 
        />
      )}
    </div>
  );
}