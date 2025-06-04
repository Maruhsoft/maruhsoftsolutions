'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Copy, Check, Send, Loader2 } from 'lucide-react';
import { ServiceTopic } from '@/types/services';

interface ManualPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceTopic;
  customerEmail: string;
}

export default function ManualPaymentModal({ 
  isOpen, 
  onClose, 
  service,
  customerEmail 
}: ManualPaymentModalProps) {
  const [activeTab, setActiveTab] = useState('btc');
  const [isSending, setIsSending] = useState(false);
  const [isCopied, setIsCopied] = useState<Record<string, boolean>>({
    btc: false,
    usdt: false,
    bank: false,
  });
  
  const paymentOptions = {
    btc: {
      address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      name: 'Bitcoin (BTC)',
      qrCode: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    usdt: {
      address: 'TKrJ32UvbUxpwuTdLQcEjw9cLxcCQgEZL2',
      name: 'Tether (USDT - TRC20)',
      qrCode: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    bank: {
      accountNumber: '0123456789',
      accountName: 'Maruh Akporowho',
      bankName: 'First Bank',
      name: 'Bank Transfer',
    },
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied({ ...isCopied, [type]: true });
    
    setTimeout(() => {
      setIsCopied({ ...isCopied, [type]: false });
    }, 2000);
    
    toast.success('Copied to clipboard!');
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    
    try {
      // EmailJS would be configured with actual service, template, and public key
      // This is a simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual EmailJS call:
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   {
      //     user_email: customerEmail,
      //     service_name: service.title,
      //     service_category: service.category,
      //     price: service.price,
      //     payment_method: `Manual - ${paymentOptions[activeTab as keyof typeof paymentOptions].name}`,
      //     payment_address: paymentOptions[activeTab as keyof typeof paymentOptions].address || 
      //                      paymentOptions[activeTab as keyof typeof paymentOptions].accountNumber,
      //   },
      //   'YOUR_PUBLIC_KEY'
      // );
      
      toast.success("I've been notified about your payment! I'll confirm and get back to you soon.");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to send notification. Please email me directly at maruhsoft@gmail.com');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Manual Payment</DialogTitle>
          <DialogDescription>
            Send payment using one of the following methods and then notify me.
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
        
        <Tabs defaultValue="btc" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="btc">Bitcoin</TabsTrigger>
            <TabsTrigger value="usdt">USDT</TabsTrigger>
            <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="btc" className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative h-48 w-48 bg-muted rounded-md overflow-hidden">
                <Image
                  src={paymentOptions.btc.qrCode}
                  alt="Bitcoin QR Code"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="truncate mr-2">
                <p className="text-sm font-medium">BTC Address:</p>
                <p className="text-xs text-muted-foreground truncate">
                  {paymentOptions.btc.address}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(paymentOptions.btc.address, 'btc')}
              >
                {isCopied.btc ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="usdt" className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative h-48 w-48 bg-muted rounded-md overflow-hidden">
                <Image
                  src={paymentOptions.usdt.qrCode}
                  alt="USDT QR Code"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="truncate mr-2">
                <p className="text-sm font-medium">USDT Address (TRC20):</p>
                <p className="text-xs text-muted-foreground truncate">
                  {paymentOptions.usdt.address}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(paymentOptions.usdt.address, 'usdt')}
              >
                {isCopied.usdt ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="bank" className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Bank Name:</p>
                  <p className="text-muted-foreground">{paymentOptions.bank.bankName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Account Name:</p>
                  <p className="text-muted-foreground">{paymentOptions.bank.accountName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Account Number:</p>
                    <p className="text-muted-foreground">{paymentOptions.bank.accountNumber}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(paymentOptions.bank.accountNumber, 'bank')}
                  >
                    {isCopied.bank ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-2 p-4 bg-primary/10 rounded-md text-sm">
          <p className="font-medium mb-1">Important:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Send the exact amount for the service.</li>
            <li>After payment, click the button below to notify me.</li>
            <li>You can also email payment proof to maruhsoft@gmail.com</li>
            <li>I'll verify your payment and contact you to begin work.</li>
          </ol>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button onClick={handleSendEmail} disabled={isSending}>
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                I've Made the Payment
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}