'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const phoneNumber = '+2348137881985';
  const defaultMessage = 'Hello! I found your website and I\'m interested in your services.';

  const handleSendMessage = () => {
    const finalMessage = message || defaultMessage;
    const namePrefix = name ? `Hi, I'm ${name}. ` : '';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(namePrefix + finalMessage)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
    setName('');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 bg-background border border-border rounded-lg shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">MaruhSoft</h3>
                  <p className="text-xs opacity-90">Typically replies within an hour</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div className="bg-[#25D366]/10 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  👋 Hello! How can I help you today?
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm"
                />
                
                <Textarea
                  placeholder={defaultMessage}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-20 text-sm resize-none"
                />
                
                <Button
                  onClick={handleSendMessage}
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                  size="sm"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                <p>We'll respond as soon as possible</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}