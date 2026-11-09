import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '💼 What services do you offer?',
  '💰 How much does a website or app cost?',
  '🛠️ What is Kaveen’s tech stack?',
  '💬 How can I contact Kaveen directly?'
];

export function ChatbotWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! 👋 I'm Kaveen's AI Assistant. How can I help you today? Ask me anything about Kaveen's web & mobile projects, pricing, technologies, or how to start working together!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (userQuery?: string) => {
    const textToSend = (userQuery || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I'm here to assist you! For custom pricing or specific inquiries, feel free to contact Kaveen on WhatsApp at +94 71 094 7871.";

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn("Chatbot request note:", err);
      // Helpful fallback in case of network issue
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: "Kaveen specializes in full-stack web development (React, TypeScript, Tailwind), Android apps (Kotlin), and UI/UX design. You can submit your project inquiry directly in the Contact section or chat with him on WhatsApp at +94 71 094 7871!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Chat cleared! How else can I help you regarding Kaveen's projects or services?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render markdown-like bullets and bold text cleanly
  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          
          // Bold parsing
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          return (
            <div key={idx} className="leading-relaxed">
              {formattedLine}
            </div>
          );
        })}
      </div>
    );
  };

  if (location.pathname.startsWith('/kajja')) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button (Widget Trigger) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Subtle tooltip / teaser badge when closed */}
        {!isOpen && hasUnread && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-card text-xs font-bold text-slate-800 dark:text-white shadow-lg cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Ask Kaveen's AI</span>
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl ${
            isOpen
              ? 'neu-btn text-rose-500 hover:rotate-90'
              : 'neu-btn-primary text-white hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-white" />
              {/* Online Pulsing Indicator */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Popup Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[390px] h-[520px] max-h-[82vh] rounded-3xl neu-card flex flex-col overflow-hidden shadow-2xl border border-white/40 dark:border-white/10"
          >
            {/* Window Header */}
            <div className="p-4 sm:p-4.5 border-b border-slate-300/40 dark:border-white/10 flex items-center justify-between bg-slate-100/50 dark:bg-slate-900/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-blue-500">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Kaveen's AI Studio</span>
                    <Sparkles className="w-3 h-3 text-blue-500" />
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • Instant Answers
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="w-8 h-8 rounded-full neu-circle-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="w-8 h-8 rounded-full neu-circle-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => {
                const isBot = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl ${
                        isBot
                          ? 'neu-inset text-slate-800 dark:text-slate-200'
                          : 'neu-btn-primary text-white font-medium rounded-br-sm'
                      }`}
                    >
                      {renderMessageText(msg.text)}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl neu-inset w-fit text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] text-slate-500 font-medium ml-1">Kaveen's AI is typing...</span>
                </div>
              )}

              {/* Quick Suggestion Pills (Shown when conversation is short) */}
              {messages.length <= 2 && (
                <div className="pt-2 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                    Suggested Questions
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-left px-3 py-2 rounded-xl neu-btn text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <span>{prompt}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Direct WhatsApp Strip */}
            <div className="px-4 py-2 border-t border-slate-300/30 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-light">Prefer direct WhatsApp?</span>
              <a
                href="https://wa.me/94710947871"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
              >
                <MessageCircle className="w-3 h-3" />
                <span>+94 71 094 7871</span>
              </a>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-100/60 dark:bg-slate-900/80 border-t border-slate-300/40 dark:border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in Sinhala or English..."
                className="flex-1 px-3.5 py-2.5 rounded-xl neu-inset outline-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-blue-500/40 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-xl neu-btn-primary flex items-center justify-center text-white disabled:opacity-40 transition-opacity cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
