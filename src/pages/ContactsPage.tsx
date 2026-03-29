import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  { id: 1, name: "Алексей Волков", login: "@alex_v", online: true, avatar: "АВ", desc: "Коллега по работе" },
  { id: 2, name: "Мария Соколова", login: "@maria_s", online: true, avatar: "МС", desc: "Дизайнер" },
  { id: 3, name: "Дмитрий Ким", login: "@dmitry_k", online: false, avatar: "ДК", desc: "" },
  { id: 4, name: "Анна Белова", login: "@anna_b", online: false, avatar: "АБ", desc: "Менеджер проекта" },
  { id: 5, name: "Иван Петров", login: "@ivan_p", online: true, avatar: "ИП", desc: "Backend разработчик" },
  { id: 6, name: "Елена Новикова", login: "@elena_n", online: false, avatar: "ЕН", desc: "" },
];

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<null | typeof CONTACTS[0]>(null);
  const [newSearch, setNewSearch] = useState("");
  const [tab, setTab] = useState<"contacts" | "find">("contacts");

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.login.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <div className="flex flex-col h-full animate-fade-in" style={{ background: 'var(--bg-dark)' }}>
        <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
          <button onClick={() => setSelected(null)} style={{ color: 'var(--neon-blue)' }}>
            <Icon name="ArrowLeft" size={20} />
          </button>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Профиль контакта</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold mb-4 animate-neon-pulse"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,100,180,0.2))', border: '2px solid rgba(0,212,255,0.4)', color: 'var(--neon-blue)' }}>
              {selected.avatar}
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selected.name}</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--neon-blue)' }}>{selected.login}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={selected.online ? "online-dot" : "offline-dot"} style={{ width: 8, height: 8 }} />
              <span className="text-xs" style={{ color: selected.online ? '#00ff88' : 'var(--text-secondary)' }}>
                {selected.online ? 'В сети' : 'Не в сети'}
              </span>
            </div>
          </div>

          {selected.desc && (
            <div className="glass-card rounded-xl p-4 mb-4">
              <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Описание</p>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{selected.desc}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl neon-glow-btn">
              <Icon name="MessageCircle" size={22} />
              <span className="text-xs font-medium">Написать</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl neon-glow-btn">
              <Icon name="Phone" size={22} />
              <span className="text-xs font-medium">Позвонить</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl neon-glow-btn">
              <Icon name="Video" size={22} />
              <span className="text-xs font-medium">Видеозвонок</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl neon-glow-btn">
              <Icon name="Share2" size={22} />
              <span className="text-xs font-medium">Поделиться</span>
            </button>
          </div>

          <button className="w-full p-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.3)', color: '#ff4466' }}>
            Заблокировать
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-dark)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <h2 className="text-lg font-bold mb-3 neon-text">Контакты</h2>
        <div className="flex gap-2 mb-3">
          {(['contacts', 'find'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={tab === t
                ? { background: 'var(--neon-blue)', color: '#050c14' }
                : { background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text-secondary)' }}>
              {t === 'contacts' ? 'Мои контакты' : 'Найти'}
            </button>
          ))}
        </div>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            value={tab === 'contacts' ? search : newSearch}
            onChange={e => tab === 'contacts' ? setSearch(e.target.value) : setNewSearch(e.target.value)}
            placeholder={tab === 'contacts' ? "Поиск контактов..." : "Поиск по логину или ID..."}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'contacts' ? (
          filtered.map((contact, i) => (
            <div key={contact.id} onClick={() => setSelected(contact)}
              className="flex items-center gap-3 p-4 border-b glass-card-hover cursor-pointer animate-fade-in"
              style={{ borderColor: 'rgba(0,212,255,0.06)', animationDelay: `${i * 40}ms` }}>
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,100,180,0.2))', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--neon-blue)' }}>
                  {contact.avatar}
                </div>
                {contact.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{contact.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{contact.login}</p>
              </div>
              <Icon name="ChevronRight" size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
          ))
        ) : (
          <div className="p-6 flex flex-col items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <Icon name="UserSearch" size={28} style={{ color: 'var(--neon-blue)' }} />
            </div>
            <p className="text-sm text-center">Введите логин или ID пользователя для поиска</p>
          </div>
        )}
      </div>
    </div>
  );
}
