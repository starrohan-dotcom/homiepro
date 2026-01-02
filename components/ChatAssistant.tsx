import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Loader2, Camera, Image as ImageIcon } from 'lucide-react';
import { getShoppingAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m Homie, your personal interior designer. Want to see how a new lamp or bedding set would look in your room? Upload a photo of your space!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        setSelectedImage({
          data: base64Data,
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim() || (selectedImage ? "Analyze my room photo for styling advice." : "");
    const currentImage = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getShoppingAdvice(userMessage, history, currentImage || undefined);
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that. Let's try again!" }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[110] w-[95vw] sm:w-[450px] h-[650px] max-h-[85vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col border border-indigo-100 overflow-hidden ai-glow">
      {/* Header */}
      <div className="bg-slate-900 px-8 py-5 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/30">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight font-serif">Homie AI</h3>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Studio Active</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
              <div className={`flex-shrink-0 p-2 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white ml-3' : 'bg-white text-indigo-600 shadow-sm mr-3 border border-slate-100'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Styling room...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        {selectedImage && (
          <div className="mb-4 relative inline-block">
            <img 
              src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} 
              className="h-20 w-20 object-cover rounded-xl border-2 border-indigo-500 shadow-lg" 
              alt="Room preview"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}
        
        <div className="relative flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            title="Upload room photo"
          >
            <ImageIcon size={20} />
          </button>
          
          <div className="flex-grow relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Homie for design tips..."
              className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-5 pr-12 text-sm focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none text-slate-900"
            />
            <button 
              onClick={handleSend}
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                (input.trim() || selectedImage) && !isLoading ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-300'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 text-center font-medium">Powered by Gemini & Homie Pro Interior Design Engine</p>
      </div>
    </div>
  );
};

export default ChatAssistant;