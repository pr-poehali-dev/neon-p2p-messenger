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
  const [section, setSection] = useState<string | null>(null);

  const Toggle = ({ val, set }: { val: boolean; set: (v: boolean) => void }) => (
    <button
      onClick={() => set(!val)}
      className="w-12 h-6 rounded-full transition-all flex-shrink-0 relative"
      style={{ background: val ? 'var(--neon-blue)' : 'rgba(0,212,255,0.15)', boxShadow: val ? '0 0 10px rgba(0,212,255,0.4)' : 'none' }}>
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
        { label: "Изменить пароль", sub: "Обновить пароль аккаунта", el: <Icon name="ChevronRight" size={16} style={{ color: 'var(--text-secondary)' }} /> },
        { label: "Контрольный вопрос", sub: "На случай, если забудете пароль", el: <Icon name="ChevronRight" size={16} style={{ color: 'var(--text-secondary)' }} /> },
        { label: "Удалить аккаунт", sub: "Безвозвратное удаление", el: <Icon name="ChevronRight" size={16} style={{ color: '#ff4466' }} /> },
      ]
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'var(--bg-dark)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <h2 className="text-lg font-bold neon-text">Настройки</h2>
      </div>

      <div className="p-4 space-y-6">
        {SECTIONS.map(section => (
          <div key={section.title}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: 'var(--neon-blue)' }}>
              {section.title}
            </p>
            <div className="glass-card rounded-xl overflow-hidden">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border-b glass-card-hover"
                  style={{ borderColor: 'rgba(0,212,255,0.06)' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.sub}</p>
                  </div>
                  {item.el}
                </div>
              ))}
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
