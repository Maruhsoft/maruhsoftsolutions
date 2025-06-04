'use client';

import { WhatsAppWidget as ReactWhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

export default function WhatsAppWidget() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <ReactWhatsAppWidget
        phoneNumber="+2348137881985"
        companyName="MaruhSoft"
        message="Hello! How can I help you today?"
        sendButton="Send message"
        replyTimeText="Typically replies within an hour"
      />
    </div>
  );
}