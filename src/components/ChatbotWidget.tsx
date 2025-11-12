import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I\'m here to help you navigate the CDC Platform. How can I assist you today?', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const quickActions = [
    'Take an assessment',
    'View my children',
    'Book consultation',
    'View results',
  ];

  const handleSend = (message: string) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let response = 'I can help you with that! ';
      
      if (message.toLowerCase().includes('assessment')) {
        response += 'Go to your dashboard and click on "Start Assessment" after selecting your child.';
      } else if (message.toLowerCase().includes('child')) {
        response += 'You can add a new child profile from your dashboard using the "Add Child" button.';
      } else if (message.toLowerCase().includes('consultation') || message.toLowerCase().includes('book')) {
        response += 'After completing an assessment, if consultation is recommended, you\'ll see a "Book Now" option.';
      } else if (message.toLowerCase().includes('result')) {
        response += 'View all your child\'s assessment results in the "Results" tab on your dashboard.';
      } else {
        response += 'You can explore various features from your parent dashboard including assessments, results, and bookings.';
      }

      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex-shrink-0 flex-row items-center justify-between space-y-0 pb-4 bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg">CDC Assistant</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isBot
                    ? 'bg-muted text-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="flex-shrink-0 space-y-2">
            <p className="text-xs text-muted-foreground">Quick actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSend(action)}
                  className="text-xs h-auto py-2"
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex-shrink-0 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button size="icon" onClick={() => handleSend(input)}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}