'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { ServiceTopic } from '@/types/services';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  service: ServiceTopic;
}

export default function PaymentSuccessModal({ 
  isOpen, 
  onClose, 
  reference,
  service 
}: PaymentSuccessModalProps) {
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {isOpen && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
              gravity={0.15}
            />
          </div>
        )}
        
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-primary mb-4"
          >
            <CheckCircle className="h-16 w-16" strokeWidth={1.5} />
          </motion.div>
          
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-2">Payment Successful!</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 mb-6">
            <p className="text-muted-foreground mb-4">
              Thank you for ordering the <span className="font-medium text-foreground">{service.title}</span> service.
              I've received your payment and will contact you shortly to begin work.
            </p>
            
            <div className="p-3 bg-muted/50 rounded-md text-sm mb-4">
              <p className="text-muted-foreground">
                Payment Reference: <span className="font-mono">{reference}</span>
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address with all the details.
            </p>
          </div>
          
          <Button onClick={onClose} className="min-w-32">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}