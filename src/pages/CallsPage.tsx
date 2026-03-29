import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useIceServers } from "@/hooks/useIceServers";

const CALLS = [
  { id: 1, name: "Алексей Волков", type: "incoming", kind: "video", time: "14:22", duration: "12:34", avatar: "АВ", online: true, missed: false },
  { id: 2, name: "Мария Соколова", type: "outgoing", kind: "audio", time: "13:05", duration: "5:20", avatar: "МС", online: true, missed: false },
  { id: 3, name: "Дмитрий Ким", type: "missed", kind: "audio", time: "11:30", duration: null, avatar: "ДК", online: false, missed: true },
  { id: 4, name: "Анна Белова", type: "incoming", kind: "video", time: "Вчера", duration: "32:10", avatar: "АБ", online: false, missed: false },
  { id: 5, name: "Команда проекта", type: "outgoing", kind: "video", time: "Вчера", duration: "1:02:45", avatar: "КП", online: true, missed: false },
];

function CallScreen({ call, callType, onEnd }: {
  call: typeof CALLS[0];
  callType: "audio" | "video";
  onEnd: () => void;
}) {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const iceConfig = useIceServers(true);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pcRef.current) pcRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (!iceConfig.loaded) return;
    if (pcRef.current) pcRef.current.close();
    pcRef.current = new RTCPeerConnection({
      iceServers: iceConfig.iceServers,
      iceTransportPolicy: iceConfig.iceTransportPolicy,
    });
  }, [iceConfig.loaded, iceConfig.iceServers, iceConfig.iceTransportPolicy]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleEnd = () => {
    if (pcRef.current) pcRef.current.close();
    onEnd();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative grid-bg"
      style={{ background: 'var(--bg-dark)', height: '100%' }}>
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-96 h-96 rounded-full border-2 animate-ping" style={{ borderColor: 'var(--neon-blue)' }} />
      </div>

      {/* IP protection badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full animate-fade-in"
        style={{
          background: iceConfig.ipProtected ? 'rgba(0,255,136,0.1)' : 'rgba(255,68,102,0.1)',
          border: `1px solid ${iceConfig.ipProtected ? 'rgba(0,255,136,0.4)' : 'rgba(255,68,102,0.4)'}`,
        }}>
        <Icon
          name={!iceConfig.loaded ? "Shield" : iceConfig.ipProtected ? "ShieldCheck" : "ShieldAlert"}
          size={13}
          style={{ color: iceConfig.ipProtected ? '#00ff88' : '#ff4466' }}
        />
        <span className="text-xs font-medium" style={{ color: iceConfig.ipProtected ? '#00ff88' : '#ff4466' }}>
          {!iceConfig.loaded ? 'Защита...' : iceConfig.ipProtected ? 'IP скрыт' : 'IP не защищён'}
        </span>
      </div>

      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full animate-fade-in"
        style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
        <Icon name="Wifi" size={13} style={{ color: 'var(--neon-blue)' }} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {iceConfig.loaded ? 'TURN ретранслятор' : 'Подключение...'}
        </span>
      </div>

      <div className="text-center z-10 animate-fade-in">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-neon-pulse"
          style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,100,180,0.2))', border: '2px solid rgba(0,212,255,0.5)', fontSize: '2rem', fontWeight: 'bold', color: 'var(--neon-blue)' }}>
          {call.avatar}
        </div>
        <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{call.name}</p>
        <p className="text-base font-mono mb-1" style={{ color: 'var(--neon-blue)' }}>{fmt(seconds)}</p>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          {callType === 'video' ? 'Видеозвонок' : 'Голосовой звонок'} · Через ретранслятор
        </p>

        <div className="flex items-center justify-center gap-6">
          <button onClick={() => setMuted(!muted)}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
            title={muted ? "Включить микрофон" : "Выключить микрофон"}
            style={{
              background: muted ? 'rgba(255,68,102,0.2)' : 'rgba(0,212,255,0.1)',
              border: `1px solid ${muted ? 'rgba(255,68,102,0.5)' : 'rgba(0,212,255,0.3)'}`,
              color: muted ? '#ff4466' : 'var(--neon-blue)',
            }}>
            <Icon name={muted ? "MicOff" : "Mic"} size={22} />
          </button>
          {callType === 'video' && (
            <button onClick={() => setCamOff(!camOff)}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
              title={camOff ? "Включить камеру" : "Выключить камеру"}
              style={{
                background: camOff ? 'rgba(255,68,102,0.2)' : 'rgba(0,212,255,0.1)',
                border: `1px solid ${camOff ? 'rgba(255,68,102,0.5)' : 'rgba(0,212,255,0.3)'}`,
                color: camOff ? '#ff4466' : 'var(--neon-blue)',
              }}>
              <Icon name={camOff ? "VideoOff" : "Video"} size={22} />
            </button>
          )}
          <button onClick={handleEnd}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all"
            title="Завершить звонок"
            style={{ background: 'rgba(255,68,102,0.3)', border: '2px solid #ff4466', color: '#ff4466', boxShadow: '0 0 20px rgba(255,68,102,0.4)' }}>
            <Icon name="PhoneOff" size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CallsPage() {
  const [filter, setFilter] = useState<"all" | "missed">("all");
  const [activeCall, setActiveCall] = useState<null | typeof CALLS[0]>(null);
  const [callType, setCallType] = useState<"audio" | "video">("video");

  const filtered = filter === "missed" ? CALLS.filter(c => c.missed) : CALLS;

  const startCall = (call: typeof CALLS[0], type: "audio" | "video") => {
    setCallType(type);
    setActiveCall(call);
  };

  if (activeCall) {
    return <CallScreen call={activeCall} callType={callType} onEnd={() => setActiveCall(null)} />;
  }

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-dark)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold neon-text">Звонки</h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
            <Icon name="ShieldCheck" size={12} style={{ color: '#00ff88' }} />
            <span className="text-xs" style={{ color: '#00ff88' }}>IP защита включена</span>
          </div>
        </div>
        <div className="flex gap-2">
          {(['all', 'missed'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={filter === f
                ? { background: 'var(--neon-blue)', color: '#050c14' }
                : { background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>
              {f === 'all' ? 'Все' : 'Пропущенные'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-2" style={{ color: 'var(--text-secondary)' }}>
            <Icon name="PhoneMissed" size={32} style={{ color: 'rgba(255,68,102,0.4)' }} />
            <p className="text-sm">Пропущенных звонков нет</p>
          </div>
        )}
        {filtered.map((call, i) => (
          <div key={call.id}
            onClick={() => startCall(call, call.kind as "audio" | "video")}
            className="flex items-center gap-3 p-4 border-b glass-card-hover cursor-pointer animate-fade-in"
            style={{ borderColor: 'rgba(0,212,255,0.06)', animationDelay: `${i * 50}ms` }}>
            <div className="relative">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,100,180,0.2))', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--neon-blue)' }}>
                {call.avatar}
              </div>
              {call.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{call.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon
                  name={call.missed ? "PhoneMissed" : call.type === 'incoming' ? "PhoneIncoming" : "PhoneOutgoing"}
                  size={12}
                  style={{ color: call.missed ? '#ff4466' : call.type === 'incoming' ? '#00ff88' : 'var(--neon-blue)' }}
                />
                <span className="text-xs" style={{ color: call.missed ? '#ff4466' : 'var(--text-secondary)' }}>
                  {call.missed ? 'Пропущен' : call.type === 'incoming' ? 'Входящий' : 'Исходящий'}
                  {call.duration && ` · ${call.duration}`}
                </span>
                <Icon name={call.kind === 'video' ? "Video" : "Phone"} size={11} style={{ color: 'var(--text-secondary)' }} />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{call.time}</span>
              <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => startCall(call, 'audio')}
                  className="p-1.5 rounded-lg neon-glow-btn"
                  title="Аудиозвонок"
                >
                  <Icon name="Phone" size={14} />
                </button>
                <button
                  onClick={() => startCall(call, 'video')}
                  className="p-1.5 rounded-lg neon-glow-btn"
                  title="Видеозвонок"
                >
                  <Icon name="Video" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
