import { useState, useEffect } from "react";

const TURN_CONFIG_URL = "https://functions.poehali.dev/dee6f4c5-0013-498a-9fd3-e38e9d2c7eaf";

const FALLBACK_ICE: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  {
    urls: [
      "turn:openrelay.metered.ca:80",
      "turn:openrelay.metered.ca:443",
      "turns:openrelay.metered.ca:443",
    ],
    username: "openrelayproject",
    credential: "openrelayproject",
  },
];

export interface IceConfig {
  iceServers: RTCIceServer[];
  iceTransportPolicy: RTCIceTransportPolicy;
  loaded: boolean;
  ipProtected: boolean;
}

export function useIceServers(relayOnly = true): IceConfig {
  const [config, setConfig] = useState<IceConfig>({
    iceServers: FALLBACK_ICE,
    iceTransportPolicy: relayOnly ? "relay" : "all",
    loaded: false,
    ipProtected: false,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(TURN_CONFIG_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const servers: RTCIceServer[] = data.iceServers ?? FALLBACK_ICE;
        setConfig({
          iceServers: servers,
          iceTransportPolicy: relayOnly ? "relay" : "all",
          loaded: true,
          ipProtected: data.ipProtection === true,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setConfig(prev => ({ ...prev, loaded: true, ipProtected: false }));
      });
    return () => { cancelled = true; };
  }, [relayOnly]);

  return config;
}
