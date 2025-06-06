'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ShoppingCart, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const fabVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    hover: { scale: 1.05 }
  };

  const optionsVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: 20 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end space-y-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-end space-y-3"
            variants={optionsVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div variants={itemVariants}>
              <Link href="/services">
                <Button 
                  size="icon" 
                  className="h-12 w-12 rounded-full shadow-lg bg-secondary hover:bg-secondary/90"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Services</span>
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link href="/#contact">
                <Button 
                  size="icon" 
                  className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Contact</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        variants={fabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
      >
        <Button
          size="icon"
          onClick={toggleOpen}
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <ChevronUp className="h-6 w-6" />
          )}
          <span className="sr-only">Menu</span>
        </Button>
      </motion.div>
    </div>
  );
}