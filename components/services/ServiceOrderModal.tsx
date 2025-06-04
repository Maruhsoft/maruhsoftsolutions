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
import { Loader2, Upload } from 'lucide-react';
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
  paymentMethod: z.enum(['paystack', 'manual']),
  notes: z.string().optional(),
  paymentProof: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServiceOrderModal({ isOpen, onClose, service }: ServiceOrderModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      paymentMethod: 'paystack',
      notes: '',
    },
  });

  const extractNumericPrice = (priceString: string): number => {
    const numericString = priceString.replace(/[^0-9]/g, '');
    return parseInt(numericString, 10);
  };

  const amount = extractNumericPrice(service.price);
  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: form.watch('email') || 'customer@example.com',
    amount: amount * 100,
    publicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  };
  
  const initializePayment = usePaystackPayment(config);

  const onPaystackSuccess = (reference: string) => {
    setPaymentRef(reference);
    setShowSuccessModal(true);
    form.reset();
  };

  const onPaystackClose = () => {
    toast.error('Payment cancelled. Please try again.');
    setIsSubmitting(false);
  };

  const handleManualPayment = () => {
    setShowManualPayment(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentProofFile(file);
      form.setValue('paymentProof', file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      if (data.paymentMethod === 'paystack') {
        initializePayment(onPaystackSuccess, onPaystackClose);
      } else {
        if (!paymentProofFile) {
          toast.error('Please upload proof of payment');
          setIsSubmitting(false);
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(paymentProofFile);
        
        reader.onload = async () => {
          const base64File = reader.result as string;
          
          try {
            await emailjs.send(
              'YOUR_SERVICE_ID',
              'YOUR_TEMPLATE_ID',
              {
                user_name: data.name,
                user_email: data.email,
                service_name: service.title,
                service_category: service.category,
                price: service.price,
                payment_method: data.paymentMethod,
                notes: data.notes || 'No additional notes',
                payment_proof: base64File,
              },
              'YOUR_PUBLIC_KEY'
            );
            
            handleManualPayment();
          } catch (error) {
            console.error(error);
            toast.error('Failed to send payment proof. Please try again.');
          }
        };
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to process your order. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeManualPayment = () => {
    setShowManualPayment(false);
    setIsSubmitting(false);
    onClose();
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg">
          <ScrollArea className="max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Order Service</DialogTitle>
              <DialogDescription>
                Complete the form below to order the {service.title} service.
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-4 p-4 bg-muted/30 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.category}</p>
                </div>
                <div className="text-lg font-bold text-primary">{service.price}</div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" type="email" {...field} />
                      </FormControl>
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
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paystack">Paystack (Credit Card)</SelectItem>
                          <SelectItem value="manual">Manual Payment (BTC/USDT/Bank Transfer)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('paymentMethod') === 'manual' && (
                  <FormField
                    control={form.control}
                    name="paymentProof"
                    render={() => (
                      <FormItem>
                        <FormLabel>Proof of Payment</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                            <Upload className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific requirements or details about your project?"
                          className="min-h-20 resize-y"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <ManualPaymentModal 
        isOpen={showManualPayment} 
        onClose={closeManualPayment} 
        service={service}
        customerEmail={form.watch('email')}
      />
      
      <PaymentSuccessModal 
        isOpen={showSuccessModal} 
        onClose={closeSuccessModal}
        reference={paymentRef}
        service={service}
      />
    </>
  );
}