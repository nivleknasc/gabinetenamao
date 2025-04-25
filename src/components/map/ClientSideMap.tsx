'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase/client';

export default function ClientSideMap({ leads }: { leads: Lead[] }) {
  const [isClient, setIsClient] = useState(false);
  const [Map, setMap] = useState<any>(null);
  const [LeafletMap, setLeafletMap] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Só executar no cliente
    setIsClient(true);

    // Importar os componentes do Leaflet dinamicamente
    const importLeaflet = async () => {
      try {
        const leaflet = await import('leaflet');
        const reactLeaflet = await import('react-leaflet');
        
        // Importar o CSS do Leaflet
        await import('leaflet/dist/leaflet.css');
        
        setL(leaflet.default);
        setLeafletMap(reactLeaflet.MapContainer);
        setTileLayer(reactLeaflet.TileLayer);
        setMarker(reactLeaflet.Marker);
        setPopup(reactLeaflet.Popup);
        
        // Corrigir o problema dos ícones do Leaflet
        delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
        leaflet.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
      } catch (error) {
        console.error('Erro ao carregar o Leaflet:', error);
      }
    };

    importLeaflet();
  }, []);

  // Coordenadas do centro do Brasil
  const defaultCenter = [-15.77972, -47.92972];

  // Criar um ícone personalizado para os marcadores
  const icon = L ? L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }) : null;

  if (!isClient || !LeafletMap || !TileLayer || !Marker || !Popup) {
    return (
      <div className="h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div className="h-[500px]">
      <LeafletMap
        center={defaultCenter}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {leads
          .filter((lead) => lead.latitude && lead.longitude)
          .map((lead) => (
            <Marker
              key={lead.id}
              position={[lead.latitude!, lead.longitude!]}
              icon={icon}
            >
              <Popup className="leaflet-popup-custom">
                <div className="p-2">
                  <h3 className="font-bold text-lg text-indigo-700 mb-2">{lead.nome}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Email:</span> {lead.email}
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Telefone:</span> {lead.telefone}
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Localização:</span> {lead.cidade}, {lead.estado}
                    </p>
                    <p className="flex items-center text-xs text-gray-500 mt-2">
                      Captado em: {new Date(lead.data_captacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </LeafletMap>
    </div>
  );
}
