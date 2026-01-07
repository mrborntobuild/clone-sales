
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, Info } from 'lucide-react';
import { generateResearch } from '../services/geminiService';
import { ChatMessage } from '../types';

const ClaygentView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi there! I\'m Claygent. I can help you research companies, find lead signals, or draft personalized emails. What can I do for you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await generateResearch(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Claygent</h1>
            <p className="text-xs text-gray-500 font-medium">Your AI-powered sales researcher</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
            </div>
            <button className="text-gray-400 hover:text-gray-600">
                <Info size={18} />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-4`}>
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center shadow-sm border ${
                msg.role === 'user' ? 'bg-white border-gray-100 ml-4' : 'bg-indigo-600 border-indigo-700'
              }`}>
                {msg.role === 'user' ? <User size={14} className="text-gray-600" /> : <Bot size={14} className="text-white" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-gray-900 text-white rounded-tr-none' 
                  : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-lg shrink-0 bg-indigo-600 flex items-center justify-center text-white border border-indigo-700">
                <Bot size={14} />
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100 flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-indigo-600" />
                <span className="text-xs font-medium text-gray-500 italic">Claygent is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="E.g., 'Research recent funding news for Stripe' or 'Draft an email to a CTO at a Series B SaaS company'"
            className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-400 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
              input.trim() && !isLoading 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' 
                : 'text-gray-300'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
        <p className="text-[10px] text-center mt-3 text-gray-400 font-medium">
            Claygent can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default ClaygentView;
