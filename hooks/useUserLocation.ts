"use client";

import { useEffect, useRef } from "react";

export interface UserAddress {
  dong: string;    
  city: string;     
  borough: string;  
  main: string;      
  full: string;     
}

export function useUserLocation(onDetect: (address: UserAddress) => void) {
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;

    if (!navigator.geolocation) {
      console.log("GPS 지원 안됨");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        console.log("역지오코딩 데이터:", data);

        const dong =
          data.address.suburb ||
          data.address.village ||
          data.address.town ||
          data.address.neighbourhood ||
          "";

        const city =
          data.address.city ||
          data.address.state ||
          data.address.province ||
          "";

        const borough =
          data.address.borough ||
          data.address.county ||
          data.address.district ||
          "";

        const address: UserAddress = {
          dong,
          city,
          borough,
          main: [city, borough].filter(Boolean).join(" "),
          full: [city, borough, dong].filter(Boolean).join(" "),
        };

        onDetect(address);
      },
      (err) => {
        console.log("GPS 오류:", err);
      },
      { enableHighAccuracy: true }
    );
  }, [onDetect]);
}
