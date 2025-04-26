'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Garantir que o menu esteja sempre fechado inicialmente
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      
      // Não fechamos o menu automaticamente ao mudar para mobile
      // para permitir que o usuário controle quando quer abrir/fechar
    };
    
    // Verificar no carregamento inicial
    checkIfMobile();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkIfMobile);
    
    // Limpar listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fechar sidebar ao clicar fora em dispositivos móveis
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      {/* Overlay para dispositivos móveis quando o sidebar está aberto */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 transition-opacity duration-200"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar - responsivo */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} isMobile={isMobile} />
      
      {/* Conteúdo principal */}
      <div className={`flex-1 flex flex-col ${!isMobile ? 'lg:ml-64' : ''} transition-all duration-200`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
