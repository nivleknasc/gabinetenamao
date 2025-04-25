'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  onClick?: () => void;
}

export default function StatCard({ title, value, icon, change, trend, onClick }: StatCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-all hover:shadow-md cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-gray-800 dark:bg-gray-700 rounded-md p-3">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {change && (
        <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
          <div className="text-sm flex justify-between items-center">
            <span
              className={`font-medium ${
                trend === 'up'
                  ? 'text-green-600 dark:text-green-400'
                  : trend === 'down'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Ver detalhes</span>
          </div>
        </div>
      )}
      {!change && (
        <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
          <div className="text-sm flex justify-end">
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Ver detalhes</span>
          </div>
        </div>
      )}
    </div>
  );
}
