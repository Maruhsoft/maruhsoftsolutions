'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePaystackPayment } from 'react-paystack';
import emailjs from '@emailjs/browser';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, CreditCard, Wallet } from 'lucide-react';
import { ServiceTopic } from '@/types/services';
import ManualPaymentModal from './ManualPaymentModal';
import PaymentSuccessModal from './PaymentSuccessModal';

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceTopic;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  paymentMethod: z.enum(['paystack', 'manual']),
  notes: z.string().optional(),
  urgency: z.enum(['standard', 'urgent', 'express']),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServiceOrderModal({ isOpen, onClose, service }: ServiceOrderModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [orderData, setOrderData] = useState<FormValues | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      paymentMethod: 'paystack',
      notes: '',
      urgency: 'standard',
    },
  });

  const extractNumericPrice = (priceString: string): number => {
    const numericString = priceString.replace(/[^0-9]/g, '');
    return parseInt(numericString, 10);
  };

  const getUrgencyMultiplier = (urgency: string): number => {
    switch (urgency) {
      case 'urgent': return 1.5;
      case 'express': return 2;
      default: return 1;
    }
  };

  const baseAmount = extractNumericPrice(service.price);
  const urgencyMultiplier = getUrgencyMultiplier(form.watch('urgency'));
  const finalAmount = Math.round(baseAmount * urgencyMultiplier);
  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: form.watch('email') || 'customer@example.com',
    amount: finalAmount * 100,
    publicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  };
  
  const initializePayment = usePaystackPayment(config);

  const sendOrderEmail = async (data: FormValues, paymentReference?: string, paymentMethod?: string) => {
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          user_name: data.name,
          user_email: data.email,
          user_phone: data.phone,
          service_name: service.title,
          service_category: service.category,
          base_price: service.price,
          urgency: data.urgency,
          final_price: `₦${finalAmount.toLocaleString()}`,
          payment_method: paymentMethod || data.paymentMethod,
          payment_reference: paymentReference || 'Manual Payment',
          notes: data.notes || 'No additional notes',
          order_date: new Date().toLocaleDateString(),
        },
        'YOUR_PUBLIC_KEY'
      );
      
      toast.success('Order confirmation sent! I will contact you shortly.');
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send order confirmation. Please contact me directly at maruhsoft@gmail.com');
    }
  };

  const onPaystackSuccess = async (reference: any) => {
    setPaymentRef(reference.reference);
    
    // Send email with payment proof for Paystack
    if (orderData) {
      await sendOrderEmail(orderData, reference.reference, 'Paystack (Credit Card)');
    }
    
    setShowSuccessModal(true);
    form.reset();
    setIsSubmitting(false);
  };

  const onPaystackClose = () => {
    toast.error('Payment cancelled. Please try again.');
    setIsSubmitting(false);
  };

  const handleManualPayment = (data: FormValues) => {
    setOrderData(data);
    setShowManualPayment(true);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setOrderData(data);
    
    try {
      if (data.paymentMethod === 'paystack') {
        initializePayment(onPaystackSuccess, onPaystackClose);
      } else {
        handleManualPayment(data);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to process your order. Please try again later.');
      setIsSubmitting(false);
    }
  };

  const closeManualPayment = () => {
    setShowManualPayment(false);
    onClose();
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const urgencyOptions = [
    { value: 'standard', label: 'Standard (7-14 days)', multiplier: 1 },
    { value: 'urgent', label: 'Urgent (3-7 days)', multiplier: 1.5 },
    { value: 'express', label: 'Express (1-3 days)', multiplier: 2 },
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh]">
          <ScrollArea className="max-h-[80vh] pr-4">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  🛒
                </motion.div>
                Order Service
              </DialogTitle>
              <DialogDescription>
                Complete the form below to order the {service.title} service.
              </DialogDescription>
            </DialogHeader>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="my-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Base Price</div>
                  <div className="text-lg font-bold text-primary">{service.price}</div>
                </div>
              </div>
              
              {form.watch('urgency') !== 'standard' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-3 border-t border-border/50"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Final Price (with urgency):</span>
                    <span className="text-xl font-bold text-primary">₦{finalAmount.toLocaleString()}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 xxx xxx xxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Urgency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {urgencyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex justify-between items-center w-full">
                                <span>{option.label}</span>
                                {option.multiplier > 1 && (
                                  <span className="text-xs text-primary ml-2">
                                    +{Math.round((option.multiplier - 1) * 100)}%
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paystack">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Paystack (Credit/Debit Card)
                            </div>
                          </SelectItem>
                          <SelectItem value="manual">
                            <div className="flex items-center gap-2">
                              <Wallet className="h-4 w-4" />
                              Manual Payment (BTC/USDT/Bank Transfer)
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Requirements & Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your specific requirements, preferred technologies, design preferences, or any other details about your project..."
                          className="min-h-24 resize-y"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 space-y-3">
                  <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
                    <p className="font-medium mb-1">📋 What happens next:</p>
                    <ul className="space-y-1">
                      <li>• Payment confirmation within 1 hour</li>
                      <li>• Project kickoff call within 24 hours</li>
                      <li>• Regular progress updates</li>
                      <li>• Full support during development</li>
                    </ul>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Payment - ₦{finalAmount.toLocaleString()}
                        {form.watch('paymentMethod') === 'paystack' ? (
                          <CreditCard className="ml-2 h-4 w-4" />
                        ) : (
                          <Wallet className="ml-2 h-4 w-4" />
                        )}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {orderData && (
        <ManualPaymentModal 
          isOpen={showManualPayment} 
          onClose={closeManualPayment} 
          service={service}
          orderData={orderData}
          finalAmount={finalAmount}
          onEmailSent={() => sendOrderEmail(orderData, undefined, 'Manual Payment')}
        />
      )}
      
      <PaymentSuccessModal 
        isOpen={showSuccessModal} 
        onClose={closeSuccessModal}
        reference={paymentRef}
        service={service}
        finalAmount={finalAmount}
      />
    </>
  );
}