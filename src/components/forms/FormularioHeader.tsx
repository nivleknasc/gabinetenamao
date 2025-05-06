'use client';

import { useState, useRef } from 'react';
import { Formulario } from '@/lib/supabase/client';
import { LinkIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface FormularioHeaderProps {
  formulario: Formulario;
  onImageChange: (imageUrl: string) => void;
}

export default function FormularioHeader({ formulario, onImageChange }: FormularioHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(formulario.imagemUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL para visualização do formulário
  const formUrl = formulario.publicUrl || `/f/${formulario.id}`;

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
        onImageChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-xl overflow-hidden">
      {/* Cabeçalho com imagem */}
      <div className="relative">
        {previewUrl ? (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 relative">
            <img
              src={previewUrl}
              alt={formulario.nome}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleImageClick}
              className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              title="Alterar imagem"
            >
              <PencilIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        ) : (
          <div
            className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            <div className="text-center">
              <PhotoIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Clique para adicionar uma imagem
              </p>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Informações do formulário */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {formulario.nome}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {formulario.descricao}
            </p>
          </div>

          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <LinkIcon className="h-4 w-4 mr-1" />
            Ver formulário
          </a>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="mr-4">
            {formulario.campos.length} campos
          </span>
          <span>
            Criado em {new Date(formulario.created_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  );
}
