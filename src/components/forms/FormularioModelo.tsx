'use client';

import { useState, useEffect } from 'react';
import { buscarEnderecoPorCEP, Endereco } from '@/lib/cep/cepService';
import { estados } from '@/lib/estados/estados';
import { buscarCidadesPorEstado, Cidade } from '@/lib/cidades/cidadesService';

interface FormularioModeloProps {
  onSubmit: (data: FormData) => void;
  isSubmitting?: boolean;
}

interface FormData {
  nome: string;
  email: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
  whatsapp: string;
  aceitaTermos: boolean;
  aceitaPolitica: boolean;
}

export default function FormularioModelo({ onSubmit, isSubmitting = false }: FormularioModeloProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    endereco: '',
    numero: '',
    complemento: '',
    whatsapp: '',
    aceitaTermos: false,
    aceitaPolitica: false
  });

  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isBuscandoCEP, setIsBuscandoCEP] = useState(false);

  // Buscar cidades quando o estado mudar
  useEffect(() => {
    if (formData.estado) {
      const fetchCidades = async () => {
        const cidadesDoEstado = await buscarCidadesPorEstado(formData.estado);
        setCidades(cidadesDoEstado);
        
        // Se a cidade atual não estiver na lista, limpar o campo
        if (formData.cidade && !cidadesDoEstado.some(c => c.nome === formData.cidade)) {
          setFormData(prev => ({ ...prev, cidade: '' }));
        }
      };
      
      fetchCidades();
    } else {
      setCidades([]);
      setFormData(prev => ({ ...prev, cidade: '' }));
    }
  }, [formData.estado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro quando o usuário digita
    if (errors[name as keyof FormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    setFormData(prev => ({ ...prev, cep }));
    
    // Buscar endereço quando o CEP tiver 8 dígitos
    if (cep.replace(/\D/g, '').length === 8) {
      setIsBuscandoCEP(true);
      
      try {
        const endereco = await buscarEnderecoPorCEP(cep);
        
        if (endereco) {
          setFormData(prev => ({
            ...prev,
            estado: endereco.estado,
            cidade: endereco.cidade,
            bairro: endereco.bairro,
            endereco: endereco.logradouro,
            complemento: endereco.complemento || prev.complemento
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setIsBuscandoCEP(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulário
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    }
    
    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }
    
    if (!formData.cidade) {
      newErrors.cidade = 'Cidade é obrigatória';
    }
    
    if (!formData.bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório';
    }
    
    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }
    
    if (!formData.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    }
    
    if (!formData.aceitaTermos) {
      newErrors.aceitaTermos = 'Você precisa aceitar os termos de uso';
    }
    
    if (!formData.aceitaPolitica) {
      newErrors.aceitaPolitica = 'Você precisa aceitar a política de uso de dados';
    }
    
    setErrors(newErrors);
    
    // Se não houver erros, enviar o formulário
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-white mb-1">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
            errors.nome ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nome"
        />
        {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* CEP */}
      <div>
        <label htmlFor="cep" className="block text-sm font-medium text-white mb-1">
          CEP
        </label>
        <div className="relative">
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleCEPChange}
            className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
              errors.cep ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: 03570040"
            maxLength={9}
          />
          {isBuscandoCEP && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        {errors.cep && <p className="mt-1 text-sm text-red-500">{errors.cep}</p>}
      </div>

      {/* Estado */}
      <div>
        <label htmlFor="estado" className="block text-sm font-medium text-white mb-1">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
            errors.estado ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Selecione um estado</option>
          {estados.map(estado => (
            <option key={estado.sigla} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>
        {errors.estado && <p className="mt-1 text-sm text-red-500">{errors.estado}</p>}
      </div>

      {/* Cidade */}
      <div>
        <label htmlFor="cidade" className="block text-sm font-medium text-white mb-1">
          Cidade
        </label>
        <select
          id="cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          disabled={!formData.estado || cidades.length === 0}
          className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
            errors.cidade ? 'border-red-500' : 'border-gray-300'
          } ${(!formData.estado || cidades.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <option value="">Selecione uma cidade</option>
          {cidades.map(cidade => (
            <option key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>
        {errors.cidade && <p className="mt-1 text-sm text-red-500">{errors.cidade}</p>}
      </div>

      {/* Bairro */}
      <div>
        <label htmlFor="bairro" className="block text-sm font-medium text-white mb-1">
          Bairro
        </label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
            errors.bairro ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.bairro && <p className="mt-1 text-sm text-red-500">{errors.bairro}</p>}
      </div>

      {/* Endereço e Número */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="endereco" className="block text-sm font-medium text-white mb-1">
            Endereço
          </label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
              errors.endereco ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.endereco && <p className="mt-1 text-sm text-red-500">{errors.endereco}</p>}
        </div>
        <div>
          <label htmlFor="numero" className="block text-sm font-medium text-white mb-1">
            Número
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
              errors.numero ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.numero && <p className="mt-1 text-sm text-red-500">{errors.numero}</p>}
        </div>
      </div>

      {/* Complemento */}
      <div>
        <label htmlFor="complemento" className="block text-sm font-medium text-white mb-1">
          Complemento
        </label>
        <input
          type="text"
          id="complemento"
          name="complemento"
          value={formData.complemento}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-white text-gray-900 rounded-md border-gray-300"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-white mb-1">
          DDD + WhatsApp
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-white text-gray-900 rounded-md ${
            errors.whatsapp ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="WhatsApp"
        />
        {errors.whatsapp && <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>}
      </div>

      {/* Termos e Política */}
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="aceitaTermos"
              name="aceitaTermos"
              type="checkbox"
              checked={formData.aceitaTermos}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="aceitaTermos" className="text-white">
              Aceito os <a href="#" className="text-blue-400 hover:underline">Termos de Uso</a>
            </label>
            {errors.aceitaTermos && <p className="mt-1 text-sm text-red-500">{errors.aceitaTermos}</p>}
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="aceitaPolitica"
              name="aceitaPolitica"
              type="checkbox"
              checked={formData.aceitaPolitica}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="aceitaPolitica" className="text-white">
              Aceito a <a href="#" className="text-blue-400 hover:underline">Política de uso de dados</a>
            </label>
            {errors.aceitaPolitica && <p className="mt-1 text-sm text-red-500">{errors.aceitaPolitica}</p>}
          </div>
        </div>
      </div>

      {/* Botão de Envio */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition-colors duration-200 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Assinar'}
        </button>
      </div>
    </form>
  );
}
