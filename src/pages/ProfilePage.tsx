import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

type ActionIcon = "Lock" | "HelpCircle" | "Bell" | "Star" | "Music";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Иван Иванов");
  const [login, setLogin] = useState("@ivan_ivanov");
  const [email, setEmail] = useState("ivan@example.com");
  const [bio, setBio] = useState("P2P разработчик | WebRTC энтузиаст 🚀");
  const [status, setStatus] = useState<"online" | "offline">("online");
  const [modal, setModal] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Modal states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secQuestion, setSecQuestion] = useState("Имя первого питомца?");
  const [secAnswer, setSecAnswer] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
    showToast("Аватар обновлён");
  };

  const handleSave = () => {
    setEditing(false);
    showToast("Профиль сохранён");
  };

  const handlePasswordSave = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      showToast("Пароли не совпадают");
      return;
    }
    setModal(null);
    setNewPassword("");
    setConfirmPassword("");
    showToast("Пароль изменён");
  };

  const handleSecSave = () => {
    if (!secQuestion || !secAnswer) {
      showToast("Заполните вопрос и ответ");
      return;
    }
    setModal(null);
    setSecAnswer("");
    showToast("Контрольный вопрос сохранён");
  };

  type FieldIcon = "User" | "AtSign" | "Mail" | "FileText";
  const fields: { label: string; value: string; setter: (v: string) => void; icon: FieldIcon }[] = [
    { label: "Имя", value: name, setter: setName, icon: "User" },
    { label: "Логин (ID)", value: login, setter: setLogin, icon: "AtSign" },
    { label: "Email", value: email, setter: setEmail, icon: "Mail" },
    { label: "О себе", value: bio, setter: setBio, icon: "FileText" },
  ];

  const actions: { icon: ActionIcon; label: string; onAction: () => void; color?: string }[] = [
    { icon: "Lock", label: "Изменить пароль", onAction: () => setModal("password") },
    { icon: "HelpCircle", label: "Контрольный вопрос", onAction: () => setModal("security") },
    { icon: "Bell", label: "Уведомления на email", onAction: () => showToast("Настройки уведомлений") },
    { icon: "Star", label: "Избранные сообщения", onAction: () => showToast("Избранные сообщения"), color: '#FFD700' },
    { icon: "Music", label: "Моя музыка профиля", onAction: () => showToast("Выбор музыки профиля") },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'var(--bg-dark)' }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-sm animate-fade-in"
          style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.4)', color: 'var(--neon-blue)', backdropFilter: 'blur(8px)' }}>
          {toast}
        </div>
      )}

      {/* Change password modal */}
      {modal === "password" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 animate-scale-in" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(0,212,255,0.25)' }}>
            <h3 className="font-bold text-base mb-4 neon-text">Изменить пароль</h3>
            <div className="space-y-3">
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Новый пароль"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Повторите пароль"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>
                Отмена
              </button>
              <button onClick={handlePasswordSave} className="flex-1 py-2.5 rounded-xl text-sm font-semibold neon-glow-btn-solid">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security question modal */}
      {modal === "security" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 animate-scale-in" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(0,212,255,0.25)' }}>
            <h3 className="font-bold text-base mb-4 neon-text">Контрольный вопрос</h3>
            <div className="space-y-3">
              <input value={secQuestion} onChange={e => setSecQuestion(e.target.value)} placeholder="Ваш вопрос"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input value={secAnswer} onChange={e => setSecAnswer(e.target.value)} placeholder="Ответ"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>
                Отмена
              </button>
              <button onClick={handleSecSave} className="flex-1 py-2.5 rounded-xl text-sm font-semibold neon-glow-btn-solid">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm logout */}
      {confirmLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 animate-scale-in" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(0,212,255,0.25)' }}>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>Выйти из аккаунта?</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Вы будете перенаправлены на страницу входа.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmLogout(false)} className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>
                Отмена
              </button>
              <button onClick={() => { setConfirmLogout(false); showToast("Выход..."); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,68,102,0.2)', border: '1px solid rgba(255,68,102,0.4)', color: '#ff4466' }}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 animate-scale-in" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,68,102,0.3)' }}>
            <h3 className="font-bold text-base mb-2" style={{ color: '#ff4466' }}>Удалить аккаунт?</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Это действие необратимо. Все ваши данные, чаты и группы будут удалены.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(false)} className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>
                Отмена
              </button>
              <button onClick={() => { setConfirmDelete(false); showToast("Аккаунт удалён"); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,68,102,0.25)', border: '1px solid rgba(255,68,102,0.5)', color: '#ff4466' }}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <h2 className="text-lg font-bold neon-text">Профиль</h2>
        <button onClick={editing ? handleSave : () => setEditing(true)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium neon-glow-btn">
          {editing ? "Сохранить" : "Изменить"}
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold animate-neon-pulse overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,80,160,0.4))', border: '3px solid rgba(0,212,255,0.5)', color: 'var(--neon-blue)' }}>
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                : "ИИ"
              }
            </div>
            <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
              title="Сменить аватар"
              style={{ background: 'var(--neon-blue)', color: '#050c14' }}>
              <Icon name="Camera" size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: status === 'online' ? '#00ff88' : '#888', boxShadow: status === 'online' ? '0 0 6px #00ff88' : 'none' }} />
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
                <input value={field.value} onChange={e => field.setter(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: 'var(--text-primary)', borderBottom: '1px solid rgba(0,212,255,0.3)' }} />
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{field.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="glass-card rounded-xl overflow-hidden">
            {actions.map((item, i) => (
              <button key={i} onClick={item.onAction}
                className="w-full flex items-center gap-3 p-4 border-b glass-card-hover text-left"
                style={{ borderColor: 'rgba(0,212,255,0.06)' }}>
                <Icon name={item.icon} size={18} style={{ color: item.color ?? 'var(--neon-blue)' }} />
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                <Icon name="ChevronRight" size={14} className="ml-auto" style={{ color: 'var(--text-secondary)' }} />
              </button>
            ))}
          </div>

          <button onClick={() => setConfirmLogout(true)}
            className="w-full p-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.3)', color: '#ff4466' }}>
            <Icon name="LogOut" size={16} />
            Выйти из аккаунта
          </button>

          <button onClick={() => setConfirmDelete(true)}
            className="w-full p-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,68,102,0.05)', border: '1px solid rgba(255,68,102,0.2)', color: 'rgba(255,68,102,0.6)' }}>
            <Icon name="Trash2" size={16} />
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
}
