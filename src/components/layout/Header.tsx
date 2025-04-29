'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-md h-16 flex items-center px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="flex-1 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        <div className="ml-4 flex items-center space-x-4 md:ml-6">
          <ThemeToggle />
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            <span className="sr-only">Ver notificações</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="ml-3 relative">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">U</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Usuário</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
