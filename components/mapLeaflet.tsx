'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

const DefaultIcon = L.icon({
    iconUrl: `${process.env.NEXT_PUBLIC_MINIO_URL}/icons/location_Icon_ember.png`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
    onSelectAddress: (addr: { region: string; dong: string }) => void;
}

async function reverseGeocode(lat: number, lng: number) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    const data = await res.json();
    return data.address;
}

function parseAddress(addr: Record<string, string>) {
    const sido = addr.state || addr.province || addr.city || '';
    const gugun =
        addr.city_district || addr.borough || addr.city || addr.county || '';
    const dong =
        addr.suburb ||
        addr.town ||
        addr.village ||
        addr.quarter ||
        addr.neighbourhood ||
        '';
    const region = `${sido} ${gugun}`.trim();
    return { region, dong };
}

function LocateUser({
    onLocate,
}: {
    onLocate: (lat: number, lng: number) => void;
}) {
    const map = useMap();
    const [located, setLocated] = useState(false);

    useEffect(() => {
        if (located) return;

        map.locate({ setView: true, enableHighAccuracy: true, maxZoom: 16 });

        const handleLocationFound = (e: L.LocationEvent) => {
            console.log('현재 위치:', e);
            onLocate(e.latlng.lat, e.latlng.lng);
            setLocated(true);
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
        };

        const handleLocationError = (e: L.ErrorEvent) => {
            console.log('위치 오류:', e);
            alert(
                '위치 접근이 거부되었습니다. 마커를 드래그하여 위치를 선택하세요.',
            );
            setLocated(true);
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
        };

        map.on('locationfound', handleLocationFound);
        map.on('locationerror', handleLocationError);

        return () => {
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
        };
    }, [map, onLocate, located]);

    return null;
}

function ClickableMarker({
    position,
    onClick,
}: {
    position: L.LatLngExpression;
    onClick: (lat: number, lng: number) => void;
}) {
    const [markerPosition, setMarkerPosition] =
        useState<L.LatLngExpression>(position);

    useEffect(() => {
        setMarkerPosition(position);
    }, [position]);

    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setMarkerPosition([lat, lng]);
            onClick(lat, lng);
        },
    });

    return <Marker position={markerPosition} />;
}

export default function LeafletMap({ onSelectAddress }: LeafletMapProps) {
    const defaultCenter: L.LatLngExpression = [37.5665, 126.978];
    const [markerPosition, setMarkerPosition] =
        useState<L.LatLngExpression>(defaultCenter);

    const updateAddress = useCallback(
        async (lat: number, lng: number) => {
            try {
                const addr = await reverseGeocode(lat, lng);
                console.log('Nominatim 응답:', addr);
                const { region, dong } = parseAddress(addr);
                onSelectAddress({ region, dong });
            } catch (error) {
                console.error('역지오코딩 실패:', error);
            }
        },
        [onSelectAddress],
    );

    const handleLocate = useCallback(
        async (lat: number, lng: number) => {
            setMarkerPosition([lat, lng]);
            await updateAddress(lat, lng);
        },
        [updateAddress],
    );

    const handleClick = useCallback(
        async (lat: number, lng: number) => {
            setMarkerPosition([lat, lng]);
            await updateAddress(lat, lng);
        },
        [updateAddress],
    );

    return (
        <div className="w-full h-[380px] rounded-md overflow-hidden border">
            <MapContainer
                center={defaultCenter}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocateUser onLocate={handleLocate} />

                <ClickableMarker
                    position={markerPosition}
                    onClick={handleClick}
                />
            </MapContainer>

            <p className="text-xs text-gray-500 mt-2">
                📍 지도를 클릭하여 위치를 선택할 수 있습니다.
            </p>
        </div>
    );
}
