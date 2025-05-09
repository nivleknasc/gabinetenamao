'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  DocumentPlusIcon,
  MapIcon,
  SparklesIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Leads', href: '/dashboard/leads', icon: ChartBarIcon },
  { name: 'Formulários', href: '/formularios', icon: DocumentPlusIcon },
  { name: 'Mapa', href: '/dashboard/mapa', icon: MapIcon },
  { name: 'Análise IA', href: '/dashboard/analise-ia', icon: SparklesIcon },
  { name: 'Político', href: '/dashboard/politico', icon: UserIcon },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

export default function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar para desktop (fixo) */}
      <div 
        className={`
          ${isMobile ? 'hidden' : 'flex'} 
          flex-col h-full bg-gray-900 dark:bg-gray-950 text-white w-64 fixed inset-y-0 left-0 shadow-xl 
          transition-colors duration-200 z-30
        `}
      >
        <SidebarContent pathname={pathname} />
      </div>

      {/* Sidebar para mobile (retrátil) */}
      <div 
        className={`
          ${isMobile ? 'flex' : 'hidden'} 
          flex-col h-full bg-gray-900 dark:bg-gray-950 text-white w-64 fixed inset-y-0 left-0 shadow-xl 
          transition-all duration-300 transform z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="absolute top-0 right-0 p-1 -mr-12">
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 text-white
              focus:outline-none focus:ring-2 focus:ring-white shadow-lg hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Fechar menu</span>
          </button>
        </div>
        <SidebarContent pathname={pathname} />
      </div>
    </>
  );
}

// Componente para o conteúdo do sidebar (usado tanto na versão mobile quanto desktop)
function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800 dark:border-gray-700 bg-gray-800 dark:bg-gray-900">
        <h1 className="text-xl font-bold">GABINETE NA MÃO</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                isActive
                  ? 'bg-gray-700 dark:bg-gray-800 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800 dark:border-gray-700 bg-gray-800 dark:bg-gray-900">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-white">GABINETE NA MÃO</p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
