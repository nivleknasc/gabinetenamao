'use client';

import { useState, useRef } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface FormularioImageUploadProps {
  imageUrl: string;
  onChange: (imageUrl: string) => void;
}

export default function FormularioImageUpload({ imageUrl, onChange }: FormularioImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Em um ambiente real, você faria upload da imagem para o Supabase Storage
      // e obteria a URL da imagem
      
      // Para demonstração, vamos apenas criar uma URL local
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setPreviewUrl(imageUrl);
        onChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Imagem de Cabeçalho
      </label>
      <div 
        onClick={handleImageClick}
        className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
      >
        {previewUrl ? (
          <div className="relative w-full h-48">
            <img 
              src={previewUrl} 
              alt="Cabeçalho do formulário" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-sm font-medium">Clique para alterar</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-6">
            <PhotoIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              Clique para adicionar uma imagem de cabeçalho
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 text-center">
              Recomendado: 1200 x 300 pixels
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
