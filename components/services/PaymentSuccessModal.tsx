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
import { CheckCircle, Calendar, Clock, Mail } from 'lucide-react';
import { ServiceTopic } from '@/types/services';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  service: ServiceTopic;
  finalAmount: number;
}

export default function PaymentSuccessModal({ 
  isOpen, 
  onClose, 
  reference,
  service,
  finalAmount
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
        
        <div className="flex flex-col items-center text-center p-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-primary mb-6"
          >
            <CheckCircle className="h-20 w-20" strokeWidth={1.5} />
          </motion.div>
          
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-4">
              🎉 Payment Successful!
            </DialogTitle>
          </DialogHeader>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full space-y-4"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border">
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-bold text-primary">₦{finalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">Reference:</span>
                <span className="font-mono text-xs">{reference}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-left">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Confirmation Email Sent</p>
                  <p className="text-xs text-muted-foreground">
                    Check your inbox for order details and next steps
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Project Kickoff Call</p>
                  <p className="text-xs text-muted-foreground">
                    I'll contact you within 24 hours to schedule our first meeting
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Development Timeline</p>
                  <p className="text-xs text-muted-foreground">
                    Regular updates and milestones will be shared throughout the project
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <p className="font-medium mb-1">📞 Need immediate assistance?</p>
              <p>WhatsApp: +234 813 788 1985</p>
              <p>Email: maruhsoft@gmail.com</p>
            </div>
          </motion.div>
          
          <Button onClick={onClose} className="mt-6 min-w-32" size="lg">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}