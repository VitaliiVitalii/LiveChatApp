import React from 'react';
import { createContext, useContext, useState } from "react";

interface ChatContextType {
  selectedChatId: number | null;
  selectedChatName: { first_name: string; last_name: string } | null;
  setSelectedChatId: (id: number, name: { first_name: string; last_name: string }) => void;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [selectedChatId, setSelectedChatIdState] = useState<number | null>(null);
  const [selectedChatName, setSelectedChatNameState] = useState<{ first_name: string; last_name: string } | null>(null);

  const setSelectedChatId = (id: number, name: { first_name: string; last_name: string }) => {
    setSelectedChatIdState(id);
    setSelectedChatNameState(name);
  };

  return (
    <ChatContext.Provider value={{ selectedChatId, selectedChatName, setSelectedChatId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
