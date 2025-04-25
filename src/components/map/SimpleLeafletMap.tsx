'use client';

import { useEffect, useState } from 'react';
import { Lead } from '@/lib/supabase/client';

// Componente que carrega o Leaflet apenas no lado do cliente
export default function SimpleLeafletMap({ leads }: { leads: Lead[] }) {
  const [isClient, setIsClient] = useState(false);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Importar Leaflet apenas no lado do cliente
    const initializeMap = async () => {
      try {
        // Importar Leaflet e seus estilos
        await import('leaflet/dist/leaflet.css');
        const L = await import('leaflet');
        
        // Corrigir o problema dos ícones do Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });

        // Verificar se o elemento do mapa existe
        const mapElement = document.getElementById('map');
        if (!mapElement) return;
        
        // Limpar o mapa anterior se existir
        if (map) {
          map.remove();
        }
        
        // Criar o mapa
        const newMap = L.map('map').setView([-15.77972, -47.92972], 4);
        
        // Adicionar o tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(newMap);
        
        // Filtrar leads com coordenadas válidas
        const validLeads = leads.filter(lead => lead.latitude && lead.longitude);
        
        // Adicionar marcadores para cada lead
        if (validLeads.length > 0) {
          const markers = validLeads.map(lead => {
            if (lead.latitude && lead.longitude) {
              const marker = L.marker([lead.latitude, lead.longitude])
                .addTo(newMap)
                .bindPopup(`
                  <div class="p-2">
                    <h3 class="font-bold text-lg">${lead.nome}</h3>
                    <div class="mt-2">
                      <p><strong>Email:</strong> ${lead.email}</p>
                      <p><strong>Telefone:</strong> ${lead.telefone}</p>
                      <p><strong>Localização:</strong> ${lead.cidade}, ${lead.estado}</p>
                      <p><strong>Bairro:</strong> ${lead.bairro || 'N/A'}</p>
                      <p class="text-xs text-gray-500 mt-2">
                        Captado em: ${new Date(lead.data_captacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                `);
              return marker;
            }
            return null;
          }).filter(Boolean);
          
          // Criar um grupo de marcadores e ajustar o zoom para mostrar todos
          if (markers.length > 0) {
            const group = L.featureGroup(markers as any);
            newMap.fitBounds(group.getBounds(), { padding: [50, 50] });
          }
        }
        
        // Salvar a referência do mapa
        setMap(newMap);
      } catch (error) {
        console.error('Erro ao inicializar o mapa:', error);
      }
    };

    if (isClient) {
      initializeMap();
    }

    // Limpar o mapa quando o componente for desmontado
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [isClient, leads]);

  if (!isClient) {
    return (
      <div className="h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div id="map" className="h-[500px] rounded-lg z-0"></div>
      <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md z-10">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-700 dark:text-gray-300">Localização dos leads</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Clique nos marcadores para ver detalhes
        </div>
      </div>
    </div>
  );
}
