import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const DEMO_CHATS = [
  { id: 1, name: "Алексей Волков", lastMsg: "Привет! Как дела?", time: "14:22", unread: 3, online: true, avatar: "АВ" },
  { id: 2, name: "Мария Соколова", lastMsg: "Отправила файл", time: "13:05", unread: 0, online: true, avatar: "МС" },
  { id: 3, name: "Дмитрий Ким", lastMsg: "Увидимся завтра", time: "11:30", unread: 1, online: false, avatar: "ДК" },
  { id: 4, name: "Анна Белова", lastMsg: "👍 Отлично!", time: "Вчера", unread: 0, online: false, avatar: "АБ" },
  { id: 5, name: "Команда проекта", lastMsg: "Иван: Готово к релизу", time: "Вчера", unread: 5, online: true, avatar: "КП" },
];

const DEMO_MESSAGES = [
  { id: 1, from: "them", text: "Привет! Как дела?", time: "14:20", read: true, views: 1 },
  { id: 2, from: "me", text: "Всё отлично! Работаю над новым проектом 🚀", time: "14:21", read: true, views: 2 },
  { id: 3, from: "them", text: "Круто! Расскажи подробнее", time: "14:22", read: true, views: 1 },
  { id: 4, from: "me", text: "P2P мессенджер с видеозвонками. Скоро покажу!", time: "14:22", read: false, views: 0 },
];

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const chat = DEMO_CHATS.find(c => c.id === activeChat);
  const filtered = DEMO_CHATS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), from: "me", text: inputText, time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }), read: false, views: 0
    }]);
    setInputText("");
  };

  return (
    <div className="flex h-full" style={{ background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <div
        className={`flex flex-col border-r transition-all duration-300 ${activeChat ? 'hidden md:flex md:w-80' : 'flex w-full md:w-80'}`}
        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}
      >
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-lg font-bold mb-3 neon-text">Чаты</h2>
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск чатов..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className="flex items-center gap-3 p-4 cursor-pointer glass-card-hover border-b"
              style={{ borderColor: 'rgba(0,212,255,0.06)', background: activeChat === c.id ? 'rgba(0,212,255,0.08)' : 'transparent' }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,100,180,0.3))', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--neon-blue)' }}>
                  {c.avatar}
                </div>
                {c.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{c.name}</span>
                  <span className="text-xs flex-shrink-0 ml-2" style={{ color: 'var(--text-secondary)' }}>{c.time}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{c.lastMsg}</span>
                  {c.unread > 0 && (
                    <span className="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'var(--neon-blue)', color: '#050c14' }}>{c.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {activeChat && chat ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
            <button onClick={() => setActiveChat(null)} className="md:hidden mr-1" style={{ color: 'var(--neon-blue)' }}>
              <Icon name="ArrowLeft" size={20} />
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,100,180,0.3))', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--neon-blue)' }}>
                {chat.avatar}
              </div>
              {chat.online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{chat.name}</div>
              <div className="text-xs" style={{ color: chat.online ? '#00ff88' : 'var(--text-secondary)' }}>
                {chat.online ? 'В сети' : 'Не в сети'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg neon-glow-btn">
                <Icon name="Phone" size={18} />
              </button>
              <button className="p-2 rounded-lg neon-glow-btn">
                <Icon name="Video" size={18} />
              </button>
              <button className="p-2 rounded-lg glass-card-hover rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                <Icon name="MoreVertical" size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 grid-bg">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2.5 ${msg.from === 'me' ? 'msg-bubble-out' : 'msg-bubble-in'}`}>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{msg.time}</span>
                    {msg.from === 'me' && (
                      <Icon name={msg.read ? "CheckCheck" : "Check"} size={12}
                        style={{ color: msg.read ? 'var(--neon-blue)' : 'var(--text-secondary)' }} />
                    )}
                    {msg.views > 0 && (
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Icon name="Eye" size={10} className="inline mr-0.5" />{msg.views}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
            <div className="flex items-center gap-2">
              <input type="file" ref={fileRef} className="hidden" multiple />
              <button onClick={() => fileRef.current?.click()} className="p-2 rounded-lg flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                <Icon name="Paperclip" size={20} />
              </button>
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Сообщение..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
              <button onClick={sendMessage} className="p-2.5 rounded-xl flex-shrink-0 neon-glow-btn-solid">
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center grid-bg" style={{ color: 'var(--text-secondary)' }}>
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-neon-pulse"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
              <Icon name="MessageCircle" size={36} style={{ color: 'var(--neon-blue)' }} />
            </div>
            <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Выберите чат</p>
            <p className="text-sm mt-1">Начните общение или создайте новый чат</p>
          </div>
        </div>
      )}
    </div>
  );
}
