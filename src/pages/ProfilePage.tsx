import { useState } from "react";
import Icon from "@/components/ui/icon";

type FieldIcon = "User" | "AtSign" | "Mail" | "FileText";
type ActionIcon = "Lock" | "HelpCircle" | "Bell" | "Star" | "Music";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Иван Иванов");
  const [login, setLogin] = useState("@ivan_ivanov");
  const [email, setEmail] = useState("ivan@example.com");
  const [bio, setBio] = useState("P2P разработчик | WebRTC энтузиаст 🚀");
  const [status, setStatus] = useState<"online" | "offline">("online");

  const fields: { label: string; value: string; setter: (v: string) => void; icon: FieldIcon }[] = [
    { label: "Имя", value: name, setter: setName, icon: "User" },
    { label: "Логин (ID)", value: login, setter: setLogin, icon: "AtSign" },
    { label: "Email", value: email, setter: setEmail, icon: "Mail" },
    { label: "О себе", value: bio, setter: setBio, icon: "FileText" },
  ];

  const actions: { icon: ActionIcon; label: string; color: string }[] = [
    { icon: "Lock", label: "Изменить пароль", color: 'var(--neon-blue)' },
    { icon: "HelpCircle", label: "Контрольный вопрос", color: 'var(--neon-blue)' },
    { icon: "Bell", label: "Уведомления на email", color: 'var(--neon-blue)' },
    { icon: "Star", label: "Избранные сообщения", color: '#FFD700' },
    { icon: "Music", label: "Моя музыка профиля", color: 'var(--neon-blue)' },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'var(--bg-dark)' }}>
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <h2 className="text-lg font-bold neon-text">Профиль</h2>
        <button onClick={() => setEditing(!editing)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium neon-glow-btn">
          {editing ? "Сохранить" : "Изменить"}
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold animate-neon-pulse"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,80,160,0.4))', border: '3px solid rgba(0,212,255,0.5)', color: 'var(--neon-blue)' }}>
              ИИ
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'var(--neon-blue)', color: '#050c14' }}>
              <Icon name="Camera" size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className={status === "online" ? "online-dot" : "offline-dot"} style={{ width: 8, height: 8 }} />
            <button onClick={() => setStatus(s => s === "online" ? "offline" : "online")}
              className="text-xs" style={{ color: status === "online" ? "#00ff88" : "var(--text-secondary)" }}>
              {status === "online" ? "В сети" : "Не в сети"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.label} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={field.icon} size={14} style={{ color: 'var(--neon-blue)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{field.label}</span>
              </div>
              {editing ? (
                <input
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: 'var(--text-primary)', borderBottom: '1px solid rgba(0,212,255,0.3)' }}
                />
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{field.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="glass-card rounded-xl overflow-hidden">
            {actions.map((item, i) => (
              <button key={i} className="w-full flex items-center gap-3 p-4 border-b glass-card-hover text-left"
                style={{ borderColor: 'rgba(0,212,255,0.06)' }}>
                <Icon name={item.icon} size={18} style={{ color: item.color }} />
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                <Icon name="ChevronRight" size={14} className="ml-auto" style={{ color: 'var(--text-secondary)' }} />
              </button>
            ))}
          </div>

          <button className="w-full p-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.3)', color: '#ff4466' }}>
            <Icon name="LogOut" size={16} />
            Выйти из аккаунта
          </button>

          <button className="w-full p-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,68,102,0.05)', border: '1px solid rgba(255,68,102,0.2)', color: 'rgba(255,68,102,0.6)' }}>
            <Icon name="Trash2" size={16} />
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
}
