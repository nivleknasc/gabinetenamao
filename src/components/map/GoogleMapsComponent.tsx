'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Lead } from '@/lib/supabase/client';

// Estilo para o mapa
const containerStyle = {
  width: '100%',
  height: '500px'
};

// Centro do mapa (Brasil)
const center = {
  lat: -15.77972,
  lng: -47.92972
};

// Opções do mapa
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7c93a3' }, { lightness: '-10' }]
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#a0a4a5' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ color: '#f1f1f1' }]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [{ color: '#f1f1f1' }]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ saturation: -100 }, { lightness: 45 }]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ visibility: 'simplified' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#c1d8e8' }]
    }
  ]
};

// Definir cores para os pins baseado no formulário
const PIN_COLORS = {
  '1': '#4F46E5', // Indigo para formulário 1
  '2': '#10B981', // Emerald para formulário 2
  '3': '#F59E0B', // Amber para formulário 3
  'default': '#6B7280', // Gray para outros
};

// Função para criar um pin SVG personalizado
const createCustomPin = (color: string) => {
  return {
    path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#FFFFFF',
    scale: 1.5,
    anchor: new google.maps.Point(12, 22),
  };
};

interface GoogleMapsComponentProps {
  leads: Lead[];
}

export default function GoogleMapsComponent({ leads }: GoogleMapsComponentProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Agrupar leads por formulário para legenda
  const leadsByForm = useMemo(() => {
    return leads.reduce((acc, lead) => {
      const formId = lead.formulario_id || 'default';
      if (!acc[formId]) {
        acc[formId] = [];
      }
      acc[formId].push(lead);
      return acc;
    }, {} as Record<string, Lead[]>);
  }, [leads]);

  // Carregar a API do Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  // Callback quando o mapa é carregado
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Callback quando o mapa é desmontado
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filtrar leads com coordenadas válidas
  const validLeads = leads.filter(lead => lead.latitude && lead.longitude);

  // Ajustar o zoom para mostrar todos os marcadores
  useEffect(() => {
    if (map && validLeads.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      validLeads.forEach(lead => {
        if (lead.latitude && lead.longitude) {
          bounds.extend({ lat: lead.latitude, lng: lead.longitude });
        }
      });
      map.fitBounds(bounds);
    }
  }, [map, validLeads]);

  if (!isClient || !isLoaded) {
    return (
      <div className="h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-[500px] relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {validLeads.map(lead => (
            <Marker
              key={lead.id}
              position={{ lat: lead.latitude!, lng: lead.longitude! }}
              onClick={() => setSelectedLead(lead)}
              icon={isLoaded ? createCustomPin(PIN_COLORS[lead.formulario_id as keyof typeof PIN_COLORS] || PIN_COLORS.default) : undefined}
              animation={google.maps.Animation.DROP}
              title={lead.nome}
            />
          ))}

          {selectedLead && (
            <InfoWindow
              position={{ lat: selectedLead.latitude!, lng: selectedLead.longitude! }}
              onCloseClick={() => setSelectedLead(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-lg text-indigo-700 mb-2">{selectedLead.nome}</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Email:</span> {selectedLead.email}
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Telefone:</span> {selectedLead.telefone}
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Localização:</span> {selectedLead.cidade}, {selectedLead.estado}
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Bairro:</span> {selectedLead.bairro}
                  </p>
                  <p className="flex items-center text-xs text-gray-500 mt-2">
                    Captado em: {new Date(selectedLead.data_captacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Legenda dos pins */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Legenda</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(leadsByForm).map(([formId, formLeads]) => (
            <div key={formId} className="flex items-center">
              <span
                className="inline-block w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: PIN_COLORS[formId as keyof typeof PIN_COLORS] || PIN_COLORS.default }}
              ></span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Formulário {formId} ({formLeads.length} leads)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
