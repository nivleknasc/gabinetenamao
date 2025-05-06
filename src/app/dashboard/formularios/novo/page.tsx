'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormularioCampo, FormularioAparencia as FormularioAparenciaTipo } from '@/lib/supabase/client';
import FormularioCampoEditor from '@/components/forms/FormularioCampoEditor';
import FormularioImageUpload from '@/components/forms/FormularioImageUpload';
import CamposPadraoSelector from '@/components/forms/CamposPadraoSelector';
import FormularioAparenciaEditor from '@/components/forms/FormularioAparenciaEditor';
import { createFormulario } from '@/lib/supabase/formularioService';

export default function NovoFormularioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagemUrl: '',
  });
  const [campos, setCampos] = useState<FormularioCampo[]>([]);
  const [camposPadrao, setCamposPadrao] = useState<FormularioCampo[]>([]);
  const [aparencia, setAparencia] = useState<FormularioAparenciaTipo>({
    mostrarCabecalho: true,
    mostrarDescricaoInicio: true,
    mostrarDescricaoFim: false,
    corFundo: '#ffffff',
    corTexto: '#000000',
    corBotao: '#22c55e', // verde
    fundoEscuro: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro quando o usuário digita
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      imagemUrl: imageUrl
    }));
  };

  const handleCamposChange = (newCampos: FormularioCampo[]) => {
    setCampos(newCampos);

    // Limpar erro de campos quando o usuário adiciona campos
    if (errors.campos && newCampos.length > 0) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.campos;
        return newErrors;
      });
    }
  };

  const handleCamposPadraoChange = (newCamposPadrao: FormularioCampo[]) => {
    setCamposPadrao(newCamposPadrao);
  };

  const handleAparenciaChange = (newAparencia: FormularioAparenciaTipo) => {
    setAparencia(newAparencia);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.nome.trim()) {
        newErrors.nome = 'O nome do formulário é obrigatório';
      }
      if (!formData.descricao.trim()) {
        newErrors.descricao = 'A descrição do formulário é obrigatória';
      }
    } else if (step === 2) {
      const todosCampos = [...camposPadrao, ...campos];
      if (todosCampos.length === 0) {
        newErrors.campos = 'Adicione pelo menos um campo ao formulário';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Criar o objeto de formulário
      const novoFormulario = {
        nome: formData.nome,
        descricao: formData.descricao,
        campos: [...camposPadrao, ...campos],
        imagemUrl: formData.imagemUrl || undefined,
        // A URL pública será gerada pelo serviço
        aparencia: aparencia,
      };

      // Salvar o formulário no Supabase
      const formularioCriado = await createFormulario(novoFormulario);

      if (!formularioCriado) {
        throw new Error('Erro ao criar formulário no Supabase');
      }

      console.log('Formulário criado:', formularioCriado);

      // Redirecionar para a página de formulários
      router.push('/dashboard/formularios');
    } catch (error) {
      console.error('Erro ao criar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Novo Formulário</h1>
        <Link
          href="/dashboard/formularios"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Voltar
        </Link>
      </div>

      {/* Indicador de passos */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
              currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
              currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}>
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
              currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="text-center">Informações Básicas</div>
            <div className="text-center">Campos e Aparência</div>
            <div className="text-center">Revisão e Finalização</div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Passo 1: Informações Básicas */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome do Formulário
                  </label>
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm ${
                      errors.nome ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Ex: Formulário de Contato"
                  />
                  {errors.nome && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nome}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Descrição
                  </label>
                  <textarea
                    name="descricao"
                    id="descricao"
                    rows={3}
                    value={formData.descricao}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm ${
                      errors.descricao ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Descreva o propósito deste formulário"
                  />
                  {errors.descricao && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.descricao}</p>
                  )}
                </div>

                <FormularioImageUpload
                  imageUrl={formData.imagemUrl}
                  onChange={handleImageChange}
                />
              </div>
            )}

            {/* Passo 2: Campos e Aparência do Formulário */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Campos Padrão</h3>
                    <CamposPadraoSelector
                      camposSelecionados={camposPadrao}
                      onChange={handleCamposPadraoChange}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Aparência</h3>
                    <FormularioAparenciaEditor
                      aparencia={aparencia}
                      onChange={handleAparenciaChange}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Campos Personalizados</h3>
                  <FormularioCampoEditor
                    campos={campos}
                    onChange={handleCamposChange}
                  />
                </div>

                {errors.campos && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.campos}</p>
                )}
              </div>
            )}

            {/* Passo 3: Revisão e Finalização */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resumo do Formulário</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</h4>
                      <p className="text-base text-gray-900 dark:text-white">{formData.nome}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</h4>
                      <p className="text-base text-gray-900 dark:text-white">{formData.descricao}</p>
                    </div>
                  </div>

                  {formData.imagemUrl && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Imagem de Cabeçalho</h4>
                      <img
                        src={formData.imagemUrl}
                        alt="Cabeçalho do formulário"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Campos ({camposPadrao.length + campos.length})</h4>
                    {camposPadrao.length > 0 || campos.length > 0 ? (
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {camposPadrao.length > 0 && (
                          <li className="py-2">
                            <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Campos Padrão</h5>
                            <ul className="space-y-2 pl-2">
                              {camposPadrao.map((campo) => (
                                <li key={campo.id} className="py-1">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-md">
                                      <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">{campo.tipo.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div className="ml-2">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}

                        {campos.length > 0 && (
                          <li className="py-2">
                            <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Campos Personalizados</h5>
                            <ul className="space-y-2 pl-2">
                              {campos.map((campo) => (
                                <li key={campo.id} className="py-1">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-md">
                                      <span className="text-xs font-medium text-green-700 dark:text-green-300">{campo.tipo.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div className="ml-2">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {campo.nome} {campo.obrigatorio && <span className="text-red-500">*</span>}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum campo adicionado.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Aparência</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Mostrar cabeçalho: {aparencia.mostrarCabecalho ? 'Sim' : 'Não'}</li>
                      <li>Descrição no início: {aparencia.mostrarDescricaoInicio ? 'Sim' : 'Não'}</li>
                      <li>Descrição no final: {aparencia.mostrarDescricaoFim ? 'Sim' : 'Não'}</li>
                      <li>Tema escuro: {aparencia.fundoEscuro ? 'Sim' : 'Não'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-5 flex justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Voltar
                  </button>
                )}
              </div>
              <div className="flex space-x-3">
                <Link
                  href="/dashboard/formularios"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancelar
                </Link>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Criando...' : 'Criar Formulário'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
