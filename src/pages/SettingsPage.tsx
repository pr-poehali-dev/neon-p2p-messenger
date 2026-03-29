import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [proxy, setProxy] = useState("");
  const [dns, setDns] = useState("8.8.8.8");
  const [textColor, setTextColor] = useState("#00D4FF");
  const [lang, setLang] = useState<"ru" | "en">("ru");

  // Privacy & IP settings
  const [hideMyIp, setHideMyIp] = useState(true);
  const [hideContactsIp, setHideContactsIp] = useState(true);
  const [hideDevices, setHideDevices] = useState(true);
  const [hideLastSeen, setHideLastSeen] = useState(false);
  const [p2pMode, setP2pMode] = useState<"nobody" | "contacts" | "all">("contacts");

  // Modals
  const [modal, setModal] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secQuestion, setSecQuestion] = useState("Имя первого питомца?");
  const [secAnswer, setSecAnswer] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handlePasswordSave = () => {
    if (!newPassword || newPassword !== confirmPassword) { showToast("Пароли не совпадают"); return; }
    setModal(null); setNewPassword(""); setConfirmPassword(""); showToast("Пароль изменён");
  };

  const handleSecSave = () => {
    if (!secQuestion || !secAnswer) { showToast("Заполните вопрос и ответ"); return; }
    setModal(null); setSecAnswer(""); showToast("Контрольный вопрос сохранён");
  };

  const Toggle = ({ val, set }: { val: boolean; set: (v: boolean) => void }) => (
    <button
      onClick={() => set(!val)}
      className="w-12 h-6 rounded-full transition-all flex-shrink-0 relative"
      style={{
        background: val ? 'var(--neon-blue)' : 'rgba(0,212,255,0.15)',
        boxShadow: val ? '0 0 10px rgba(0,212,255,0.4)' : 'none'
      }}>
      <span className="absolute top-0.5 transition-all rounded-full w-5 h-5 bg-white"
        style={{ left: val ? '26px' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
    </button>
  );

  const SECTIONS = [
    {
      title: "Уведомления",
      items: [
        { label: "Push-уведомления", sub: "Новые сообщения и звонки", el: <Toggle val={notifications} set={setNotifications} /> },
        { label: "Email уведомления", sub: "Входящие сообщения и звонки", el: <Toggle val={emailNotify} set={setEmailNotify} /> },
        { label: "Звуки", sub: "Звуки сообщений и звонков", el: <Toggle val={sounds} set={setSounds} /> },
      ]
    },
    {
      title: "Внешний вид",
      items: [
        { label: "Цвет текста", sub: "Цвет ваших сообщений в чате", el: (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: textColor }}>{textColor}</span>
            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
          </div>
        )},
        { label: "Язык", sub: "Язык переводчика в чате", el: (
          <select value={lang} onChange={e => setLang(e.target.value as "ru" | "en")}
            className="text-sm rounded-lg px-2 py-1 outline-none"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        )},
      ]
    },
    {
      title: "Сеть",
      items: [
        { label: "Прокси сервер", sub: "Например: socks5://127.0.0.1:1080", el: (
          <input value={proxy} onChange={e => setProxy(e.target.value)} placeholder="Не задан"
            className="text-xs rounded-lg px-2 py-1 outline-none w-36"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
        )},
        { label: "DNS сервер", sub: "Персональный DNS", el: (
          <input value={dns} onChange={e => setDns(e.target.value)}
            className="text-xs rounded-lg px-2 py-1 outline-none w-28"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
        )},
      ]
    },
    {
      title: "Конфиденциальность",
      items: [
        { label: "Изменить пароль", sub: "Обновить пароль аккаунта", el: <Icon name="ChevronRight" size={16} style={{ color: 'var(--text-secondary)' }} />, onClick: () => setModal("password") },
        { label: "Контрольный вопрос", sub: "На случай, если забудете пароль", el: <Icon name="ChevronRight" size={16} style={{ color: 'var(--text-secondary)' }} />, onClick: () => setModal("security") },
        { label: "Скрыть время последнего визита", sub: "Другие не увидят когда вы были онлайн", el: <Toggle val={hideLastSeen} set={setHideLastSeen} /> },
        { label: "Удалить аккаунт", sub: "Безвозвратное удаление", el: <Icon name="ChevronRight" size={16} style={{ color: '#ff4466' }} />, onClick: () => setConfirmDelete(true), danger: true },
      ]
    },
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
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(0,212,255,0.25)' }}>
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
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>Отмена</button>
              <button onClick={handlePasswordSave} className="flex-1 py-2.5 rounded-xl text-sm font-semibold neon-glow-btn-solid">Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* Security question modal */}
      {modal === "security" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(0,212,255,0.25)' }}>
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
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>Отмена</button>
              <button onClick={handleSecSave} className="flex-1 py-2.5 rounded-xl text-sm font-semibold neon-glow-btn-solid">Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,68,102,0.3)' }}>
            <h3 className="font-bold text-base mb-2" style={{ color: '#ff4466' }}>Удалить аккаунт?</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Это действие необратимо. Все данные, чаты и группы будут удалены.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(false)} className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>Отмена</button>
              <button onClick={() => { setConfirmDelete(false); showToast("Аккаунт удалён"); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,68,102,0.2)', border: '1px solid rgba(255,68,102,0.4)', color: '#ff4466' }}>Удалить</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <h2 className="text-lg font-bold neon-text">Настройки</h2>
      </div>

      <div className="p-4 space-y-6">

        {/* IP & Device Privacy Block */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: 'var(--neon-blue)' }}>
            Анонимность и IP
          </p>
          <div className="glass-card rounded-xl overflow-hidden neon-border">

            {/* Hide my IP */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'rgba(0,212,255,0.08)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: hideMyIp ? 'rgba(0,212,255,0.15)' : 'rgba(255,68,102,0.1)', border: `1px solid ${hideMyIp ? 'rgba(0,212,255,0.3)' : 'rgba(255,68,102,0.3)'}` }}>
                <Icon name="EyeOff" size={16} style={{ color: hideMyIp ? 'var(--neon-blue)' : '#ff4466' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Скрыть мой IP адрес</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {hideMyIp ? 'Ваш IP скрыт от собеседников' : 'IP адрес виден участникам звонков'}
                </p>
              </div>
              <Toggle val={hideMyIp} set={setHideMyIp} />
            </div>

            {/* Hide contacts IP */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'rgba(0,212,255,0.08)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: hideContactsIp ? 'rgba(0,212,255,0.15)' : 'rgba(255,68,102,0.1)', border: `1px solid ${hideContactsIp ? 'rgba(0,212,255,0.3)' : 'rgba(255,68,102,0.3)'}` }}>
                <Icon name="Shield" size={16} style={{ color: hideContactsIp ? 'var(--neon-blue)' : '#ff4466' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Скрыть IP контактов</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {hideContactsIp ? 'IP адреса других пользователей скрыты' : 'IP адреса контактов могут быть видны'}
                </p>
              </div>
              <Toggle val={hideContactsIp} set={setHideContactsIp} />
            </div>

            {/* Hide devices */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'rgba(0,212,255,0.08)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: hideDevices ? 'rgba(0,212,255,0.15)' : 'rgba(255,68,102,0.1)', border: `1px solid ${hideDevices ? 'rgba(0,212,255,0.3)' : 'rgba(255,68,102,0.3)'}` }}>
                <Icon name="Smartphone" size={16} style={{ color: hideDevices ? 'var(--neon-blue)' : '#ff4466' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Скрыть устройства входа</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {hideDevices ? 'Тип устройства не передаётся' : 'Устройство видно в деталях сообщений'}
                </p>
              </div>
              <Toggle val={hideDevices} set={setHideDevices} />
            </div>

            {/* P2P WebRTC mode */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}>
                  <Icon name="Wifi" size={16} style={{ color: 'var(--neon-blue)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>P2P звонки через ретранслятор</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Кому разрешено прямое P2P соединение</p>
                </div>
              </div>
              <div className="flex gap-2 ml-12">
                {([
                  { val: 'nobody', label: 'Никому' },
                  { val: 'contacts', label: 'Контакты' },
                  { val: 'all', label: 'Всем' },
                ] as const).map(opt => (
                  <button key={opt.val} onClick={() => setP2pMode(opt.val)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={p2pMode === opt.val
                      ? { background: 'var(--neon-blue)', color: '#050c14' }
                      : { background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)', color: 'var(--text-secondary)' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {p2pMode === 'nobody' && (
                <p className="text-xs mt-2 ml-12 px-2 py-1.5 rounded-lg"
                  style={{ background: 'rgba(0,212,255,0.06)', color: 'var(--text-secondary)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  Все звонки идут через защищённый TURN-сервер. Ваш IP полностью скрыт.
                </p>
              )}
              {p2pMode === 'contacts' && (
                <p className="text-xs mt-2 ml-12 px-2 py-1.5 rounded-lg"
                  style={{ background: 'rgba(0,212,255,0.06)', color: 'var(--text-secondary)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  Прямое соединение только с доверенными контактами.
                </p>
              )}
            </div>
          </div>

          {/* Info card */}
          <div className="mt-3 p-3 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.12)' }}>
            <Icon name="Info" size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--neon-blue)' }} />
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              При включённой защите IP все соединения маршрутизируются через ретранслятор (TURN-сервер),
              что скрывает реальный IP-адрес участников звонков и сообщений. Устройство входа не передаётся в метаданных.
            </p>
          </div>
        </div>

        {SECTIONS.map(sec => (
          <div key={sec.title}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: 'var(--neon-blue)' }}>
              {sec.title}
            </p>
            <div className="glass-card rounded-xl overflow-hidden">
              {sec.items.map((item, i) => {
                const clickable = 'onClick' in item && typeof item.onClick === 'function';
                const isDanger = 'danger' in item && item.danger;
                return (
                  <div key={i}
                    onClick={clickable ? (item as { onClick: () => void }).onClick : undefined}
                    className={`flex items-center gap-3 p-4 border-b glass-card-hover ${clickable ? 'cursor-pointer' : ''}`}
                    style={{ borderColor: 'rgba(0,212,255,0.06)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: isDanger ? '#ff4466' : 'var(--text-primary)' }}>{item.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.sub}</p>
                    </div>
                    {item.el}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: 'var(--neon-blue)' }}>
            О приложении
          </p>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 animate-neon-pulse"
              style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}>
              <Icon name="Zap" size={22} style={{ color: 'var(--neon-blue)' }} />
            </div>
            <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>NeonChat</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Версия 1.0.0 · P2P мессенджер</p>
          </div>
        </div>
      </div>
    </div>
  );
}