import React, { useState } from 'react';

export default function POC3_Assistant({ language }) {
  const [messages, setMessages] = useState([
    { id: 1, text: language === 'fr' ? 'Bonjour ! Je suis votre assistant cybersécurité. Comment puis-je vous aider ?' : 'Hello! I\'m your cybersecurity assistant. How can I help?', sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const text = {
    fr: {
      title: '💬 Assistant IA Cybersécurité',
      subtitle: 'Posez vos questions et obtenez des recommandations intelligentes',
      messagePlaceholder: 'Tapez votre question...',
      send: 'Envoyer',
      askExample: 'Par exemple : "Comment améliorer mon score ISO 27001 ?"'
    },
    en: {
      title: '💬 Cybersecurity AI Assistant',
      subtitle: 'Ask your questions and get intelligent recommendations',
      messagePlaceholder: 'Type your question...',
      send: 'Send',
      askExample: 'For example: "How to improve my ISO 27001 score?"'
    }
  };

  const t = text[language] || text.fr;

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: language === 'fr' 
          ? 'C\'est une excellente question ! Basé sur votre audit actuel, je recommande de : 1) Implémenter l\'authentification multi-facteurs 2) Renforcer la gestion des accès 3) Documenter vos politiques de sécurité.'
          : 'Great question! Based on your current audit, I recommend: 1) Implement multi-factor authentication 2) Strengthen access management 3) Document your security policies.',
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);

    setInput('');
  };

  return (
    <div className="space-y-8 fade-in h-screen flex flex-col">
      {/* Header */}
      <div className="card p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Chat Container */}
      <div className="card flex-grow flex flex-col p-0 overflow-hidden">
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.messagePlaceholder}
              className="flex-1"
            />
            <button onClick={handleSend} className="btn btn-primary">
              {t.send}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t.askExample}</p>
        </div>
      </div>
    </div>
  );
}