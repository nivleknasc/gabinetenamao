'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getFormularioById } from '@/lib/supabase/formularioService';
import { Formulario, FormularioCampo } from '@/lib/supabase/client';
import { saveFormSubmission } from '@/lib/supabase/submissionService';
import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Adicionar interface para o Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
  }
}

export default function FormularioPublicoPage() {
  const params = useParams();
  const id = params.id as string;

  const [formulario, setFormulario] = useState<Formulario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchFormulario = async () => {
      try {
        setIsLoading(true);
        const data = await getFormularioById(id);

        if (!data) {
          setError('Formulário não encontrado');
        } else {
          setFormulario(data);
        }
      } catch (err) {
        console.error('Erro ao buscar formulário:', err);
        setError('Ocorreu um erro ao carregar o formulário');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormulario();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpar erro de validação quando o usuário digita
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    const errors: Record<string, string> = {};

    if (formulario) {
      formulario.campos.forEach(campo => {
        if (campo.obrigatorio && (!formData[campo.id] || formData[campo.id] === '')) {
          errors[campo.id] = 'Este campo é obrigatório';
        }
      });
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Coletar informações adicionais
      const userAgent = navigator.userAgent;
      let ipAddress = '';

      // Tentar obter o IP do usuário (opcional)
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } catch (ipErr) {
        console.warn('Não foi possível obter o IP do usuário:', ipErr);
      }

      // Salvar a submissão no Supabase
      const submission = await saveFormSubmission({
        formulario_id: id,
        dados: formData,
        ip_address: ipAddress,
        user_agent: userAgent
      });

      if (!submission) {
        throw new Error('Não foi possível salvar o formulário');
      }

      console.log('Dados enviados com sucesso:', submission);

      // Registrar evento de conversão (para análise)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          'event_category': 'forms',
          'event_label': formulario?.nome || id,
          'value': 1
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      setError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex justify-center">
            <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
          <p className="text-center mt-4 text-gray-600">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl font-semibold text-red-600 mb-4">Erro</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!formulario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Formulário não encontrado</h1>
          <p className="text-gray-600">O formulário solicitado não existe ou foi removido.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Formulário enviado com sucesso!</h1>
          <p className="text-gray-600 text-center mb-6">
            Obrigado por preencher o formulário. Suas informações foram recebidas.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Preencher novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Aplicar estilos com base nas configurações de aparência
  const aparencia = formulario.aparencia || {
    mostrarCabecalho: true,
    mostrarDescricaoInicio: true,
    mostrarDescricaoFim: false,
    corFundo: '#ffffff',
    corTexto: '#000000',
    corBotao: '#3b82f6',
    fundoEscuro: false,
  };

  const bgColor = aparencia.fundoEscuro ? 'bg-gray-900' : 'bg-gray-100';
  const cardBgColor = aparencia.fundoEscuro ? 'bg-gray-800' : 'bg-white';
  const textColor = aparencia.fundoEscuro ? 'text-white' : 'text-gray-900';
  const labelColor = aparencia.fundoEscuro ? 'text-gray-300' : 'text-gray-700';
  const inputBgColor = aparencia.fundoEscuro ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300';
  const inputTextColor = aparencia.fundoEscuro ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor}`} style={{ backgroundColor: aparencia.corFundo }}>
      <div className={`p-8 rounded-lg shadow-md max-w-2xl w-full my-8 ${cardBgColor}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {aparencia.mostrarCabecalho && (
            <div className="text-center mb-6">
              {formulario.imagemUrl && (
                <div className="mb-4">
                  <img
                    src={formulario.imagemUrl}
                    alt={formulario.nome}
                    className="mx-auto h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <h1
                className={`text-2xl font-bold ${textColor} mb-2`}
                style={{ color: aparencia.corTexto }}
              >
                {formulario.nome}
              </h1>
              {aparencia.mostrarDescricaoInicio && formulario.descricao && (
                <p
                  className={`${aparencia.fundoEscuro ? 'text-gray-300' : 'text-gray-600'}`}
                  style={{ color: aparencia.corTexto }}
                >
                  {formulario.descricao}
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            {formulario.campos.map((campo) => (
              <div key={campo.id}>
                <label
                  htmlFor={campo.id}
                  className={`block text-sm font-medium ${labelColor} mb-1`}
                  style={{ color: aparencia.corTexto }}
                >
                  {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                </label>

                {renderCampo(campo, formData, handleInputChange, inputBgColor, inputTextColor)}

                {validationErrors[campo.id] && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors[campo.id]}</p>
                )}
              </div>
            ))}
          </div>

          {aparencia.mostrarDescricaoFim && formulario.descricao && (
            <div className="mt-6">
              <p
                className={`${aparencia.fundoEscuro ? 'text-gray-300' : 'text-gray-600'} text-sm`}
                style={{ color: aparencia.corTexto }}
              >
                {formulario.descricao}
              </p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-white rounded-md transition-colors"
              style={{ backgroundColor: aparencia.corBotao }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function renderCampo(
  campo: FormularioCampo,
  formData: Record<string, any>,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
  inputBgColor: string,
  inputTextColor: string
) {
  switch (campo.tipo) {
    case 'texto':
      return (
        <input
          type="text"
          id={campo.id}
          name={campo.id}
          value={formData[campo.id] || ''}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${inputBgColor} ${inputTextColor}`}
        />
      );
    case 'email':
      return (
        <input
          type="email"
          id={campo.id}
          name={campo.id}
          value={formData[campo.id] || ''}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${inputBgColor} ${inputTextColor}`}
        />
      );
    case 'telefone':
      return (
        <input
          type="tel"
          id={campo.id}
          name={campo.id}
          value={formData[campo.id] || ''}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${inputBgColor} ${inputTextColor}`}
        />
      );
    case 'select':
      return (
        <select
          id={campo.id}
          name={campo.id}
          value={formData[campo.id] || ''}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${inputBgColor} ${inputTextColor}`}
        >
          <option value="">Selecione uma opção</option>
          {campo.opcoes?.map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      );
    case 'checkbox':
      return (
        <div className="mt-1">
          <input
            type="checkbox"
            id={campo.id}
            name={campo.id}
            checked={formData[campo.id] || false}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={campo.id} className="ml-2 text-sm text-gray-600">
            {campo.nome}
          </label>
        </div>
      );
    case 'radio':
      return (
        <div className="mt-1 space-y-2">
          {campo.opcoes?.map((opcao) => (
            <div key={opcao} className="flex items-center">
              <input
                type="radio"
                id={`${campo.id}_${opcao}`}
                name={campo.id}
                value={opcao}
                checked={formData[campo.id] === opcao}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={`${campo.id}_${opcao}`} className={`ml-2 text-sm ${inputTextColor}`}>
                {opcao}
              </label>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <input
          type="text"
          id={campo.id}
          name={campo.id}
          value={formData[campo.id] || ''}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${inputBgColor} ${inputTextColor}`}
        />
      );
  }
}
