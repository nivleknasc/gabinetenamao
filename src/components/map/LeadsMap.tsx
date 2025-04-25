'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Lead } from '@/lib/supabase/client';
import L from 'leaflet';

// Corrigir o problema dos ícones do Leaflet no Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LeadsMapProps {
  leads: Lead[];
  filteredLeads?: Lead[];
}

export default function LeadsMap({ leads, filteredLeads }: LeadsMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const displayLeads = filteredLeads || leads;

  // Coordenadas do centro do Brasil
  const defaultCenter = [-15.77972, -47.92972];

  useEffect(() => {
    setIsMounted(true);

    // Corrigir o problema dos ícones do Leaflet no Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  if (!isMounted) {
    return <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Carregando mapa...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Mapa de Leads</h2>
        <p className="text-sm text-gray-500 mt-1">
          Mostrando {displayLeads.filter(lead => lead.latitude && lead.longitude).length} leads no mapa
        </p>
      </div>
      <div className="h-[500px]">
        <MapContainer
          center={defaultCenter}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {displayLeads
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
        </MapContainer>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="inline-block w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>
            Localização dos leads
          </div>
          <div className="text-sm text-gray-500">
            Clique nos marcadores para ver detalhes
          </div>
        </div>
      </div>
    </div>
  );
}
