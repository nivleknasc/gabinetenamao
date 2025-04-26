'use client';

import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

export default function Header({ sidebarOpen, setSidebarOpen, isMobile }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-md h-16 flex items-center px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="flex-1 flex justify-between items-center">
        {/* Botão de menu para dispositivos móveis */}
        {isMobile && (
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-colors duration-200"
            aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span className="sr-only">{sidebarOpen ? "Fechar menu" : "Abrir menu"}</span>
            <Bars3Icon className="h-7 w-7" aria-hidden="true" />
          </button>
        )}
        
        {/* Título da página */}
        <div className={`flex-1 flex items-center ${isMobile ? 'ml-3' : ''}`}>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white truncate">Dashboard</h1>
        </div>
        
        {/* Ações do cabeçalho */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            <span className="sr-only">Ver notificações</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          
          {/* Perfil do usuário - esconde o nome em telas pequenas */}
          <div className="relative">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">U</span>
              </div>
              <span className="hidden sm:inline-block ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Usuário</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
