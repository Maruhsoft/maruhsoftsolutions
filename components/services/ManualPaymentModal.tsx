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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Copy, Check, Send, Loader2, Upload, FileImage, X } from 'lucide-react';
import { ServiceTopic } from '@/types/services';

interface ManualPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceTopic;
  orderData: any;
  finalAmount: number;
  onEmailSent: () => void;
}

export default function ManualPaymentModal({ 
  isOpen, 
  onClose, 
  service,
  orderData,
  finalAmount,
  onEmailSent
}: ManualPaymentModalProps) {
  const [activeTab, setActiveTab] = useState('btc');
  const [isSending, setIsSending] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<Record<string, boolean>>({
    btc: false,
    usdt: false,
    bank: false,
  });
  
  const paymentOptions = {
    btc: {
      address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      name: 'Bitcoin (BTC)',
      qrCode: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      network: 'Bitcoin Network',
    },
    usdt: {
      address: 'TKrJ32UvbUxpwuTdLQcEjw9cLxcCQgEZL2',
      name: 'Tether (USDT)',
      qrCode: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      network: 'TRC20 (Tron)',
    },
    bank: {
      accountNumber: '0123456789',
      accountName: 'Maruh Akporowho',
      bankName: 'First Bank of Nigeria',
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setPaymentProof(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProofPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setProofPreview(null);
      }
    }
  };

  const removeFile = () => {
    setPaymentProof(null);
    setProofPreview(null);
  };

  const handleSendProof = async () => {
    if (!paymentProof) {
      toast.error('Please upload proof of payment');
      return;
    }

    setIsSending(true);
    
    try {
      // Convert file to base64 for email attachment
      const reader = new FileReader();
      reader.readAsDataURL(paymentProof);
      
      reader.onload = async () => {
        const base64File = reader.result as string;
        
        try {
          // This would be replaced with actual EmailJS implementation
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Call the parent's email function
          onEmailSent();
          
          toast.success("Payment proof sent! I'll verify and contact you within 1 hour.");
          onClose();
        } catch (error) {
          console.error(error);
          toast.error('Failed to send payment proof. Please email directly to maruhsoft@gmail.com');
        }
      };
    } catch (error) {
      console.error(error);
      toast.error('Failed to process file. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const currentOption = paymentOptions[activeTab as keyof typeof paymentOptions];

  return (
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
                💳
              </motion.div>
              Manual Payment
            </DialogTitle>
            <DialogDescription>
              Send payment using one of the methods below, then upload proof of payment.
            </DialogDescription>
          </DialogHeader>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.category}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Customer: {orderData.name}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Amount to Pay</div>
                <div className="text-xl font-bold text-primary">₦{finalAmount.toLocaleString()}</div>
              </div>
            </div>
          </motion.div>
          
          <Tabs defaultValue="btc" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="btc" className="text-xs">Bitcoin</TabsTrigger>
              <TabsTrigger value="usdt" className="text-xs">USDT</TabsTrigger>
              <TabsTrigger value="bank" className="text-xs">Bank</TabsTrigger>
            </TabsList>
            
            <TabsContent value="btc" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="relative h-48 w-48 mx-auto mb-4 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={paymentOptions.btc.qrCode}
                    alt="Bitcoin QR Code"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm font-medium">Network:</p>
                      <p className="text-xs text-muted-foreground">{paymentOptions.btc.network}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1 mr-2">
                      <p className="text-sm font-medium">BTC Address:</p>
                      <p className="text-xs text-muted-foreground font-mono break-all">
                        {paymentOptions.btc.address}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(paymentOptions.btc.address, 'btc')}
                    >
                      {isCopied.btc ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="usdt" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="relative h-48 w-48 mx-auto mb-4 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={paymentOptions.usdt.qrCode}
                    alt="USDT QR Code"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm font-medium">Network:</p>
                      <p className="text-xs text-muted-foreground">{paymentOptions.usdt.network}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1 mr-2">
                      <p className="text-sm font-medium">USDT Address:</p>
                      <p className="text-xs text-muted-foreground font-mono break-all">
                        {paymentOptions.usdt.address}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(paymentOptions.usdt.address, 'usdt')}
                    >
                      {isCopied.usdt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="bank" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-muted/50 rounded-lg p-4 space-y-3"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Bank Name:</p>
                    <p className="text-muted-foreground">{paymentOptions.bank.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Account Name:</p>
                    <p className="text-muted-foreground">{paymentOptions.bank.accountName}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Account Number:</p>
                    <p className="text-muted-foreground font-mono">{paymentOptions.bank.accountNumber}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(paymentOptions.bank.accountNumber, 'bank')}
                  >
                    {isCopied.bank ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="payment-proof" className="text-sm font-medium">
                Upload Proof of Payment *
              </Label>
              <div className="mt-2">
                {!paymentProof ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, PDF up to 5MB
                    </p>
                    <Input
                      id="payment-proof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {proofPreview ? (
                          <div className="relative h-12 w-12 rounded overflow-hidden">
                            <Image
                              src={proofPreview}
                              alt="Payment proof preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <FileImage className="h-8 w-8 text-muted-foreground" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{paymentProof.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(paymentProof.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">📋 Payment Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Send exactly ₦{finalAmount.toLocaleString()} to the {currentOption.name} details above</li>
                <li>Take a screenshot or photo of the transaction</li>
                <li>Upload the proof of payment using the form above</li>
                <li>Click "Submit Payment Proof" to notify me</li>
                <li>I'll verify and contact you within 1 hour</li>
              </ol>
            </div>
            
            <Button 
              onClick={handleSendProof} 
              disabled={isSending || !paymentProof}
              className="w-full"
              size="lg"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Proof...
                </>
              ) : (
                <>
                  Submit Payment Proof
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}