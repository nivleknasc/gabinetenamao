import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mt-20 mb-6 text-gray-900">
          GABINETE NA MÃO
        </h1>
        <p className="text-xl mb-12 text-gray-600">
          Visualize, gerencie e crie formulários para captação de leads
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-4xl justify-center">
          <Link
            href="/dashboard"
            className="py-4 px-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out flex-1 flex items-center justify-center"
          >
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            Acessar Dashboard
          </Link>

          <Link
            href="/formularios/novo"
            className="py-4 px-8 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition duration-300 ease-in-out border border-indigo-200 flex-1 flex items-center justify-center"
          >
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            Criar Novo Formulário
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visualização de Leads</h3>
            <p className="text-gray-600">Visualize todos os leads captados com filtros por cidade e estado.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mapa Interativo</h3>
            <p className="text-gray-600">Visualize a distribuição geográfica dos leads em um mapa interativo.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Criação de Formulários</h3>
            <p className="text-gray-600">Crie formulários personalizados para captação de leads em tempo real.</p>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 flex justify-center border-t border-gray-200 mt-12">
        <p className="text-gray-500 text-sm">
          GABINETE NA MÃO © {new Date().getFullYear()} - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
