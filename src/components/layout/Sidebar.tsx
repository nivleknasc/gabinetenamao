'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  DocumentPlusIcon,
  MapIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Leads', href: '/dashboard/leads', icon: ChartBarIcon },
  { name: 'Formulários', href: '/dashboard/formularios', icon: DocumentPlusIcon },
  { name: 'Mapa', href: '/dashboard/mapa', icon: MapIcon },
  { name: 'Análise IA', href: '/dashboard/analise-ia', icon: SparklesIcon },
  { name: 'Político', href: '/dashboard/politico', icon: UserIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gray-900 dark:bg-gray-950 text-white w-64 fixed inset-y-0 left-0 shadow-xl transition-colors duration-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800 dark:border-gray-700 bg-gray-800 dark:bg-gray-900">
        <h1 className="text-xl font-bold">GABINETE NA MÃO</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
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
    </div>
  );
}
