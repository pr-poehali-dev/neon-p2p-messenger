import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Icon from "@/components/ui/icon";
import AuthPage from "@/pages/AuthPage";
import ChatsPage from "@/pages/ChatsPage";
import CallsPage from "@/pages/CallsPage";
import ContactsPage from "@/pages/ContactsPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";

type Tab = "chats" | "calls" | "contacts" | "profile" | "settings";

const TABS: { id: Tab; icon: string; badge?: number }[] = [
  { id: "chats", icon: "MessageCircle", badge: 9 },
  { id: "calls", icon: "Phone", badge: 3 },
  { id: "contacts", icon: "Users" },
  { id: "profile", icon: "User" },
  { id: "settings", icon: "Settings" },
];

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("chats");

  if (!authed) {
    return (
      <>
        <Toaster />
        <AuthPage onAuth={() => setAuthed(true)} />
      </>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-dark)' }}>
      <Toaster />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}>
            <Icon name="Zap" size={14} style={{ color: 'var(--neon-blue)' }} />
          </div>
          <span className="font-black text-base neon-text tracking-tight">NeonChat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="online-dot" />
          <span className="text-xs" style={{ color: '#00ff88' }}>В сети</span>
          <button className="ml-2 p-1.5 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
            <Icon name="Edit" size={16} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {tab === "chats" && <ChatsPage />}
        {tab === "calls" && <CallsPage />}
        {tab === "contacts" && <ContactsPage />}
        {tab === "profile" && <ProfilePage />}
        {tab === "settings" && <SettingsPage />}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center border-t flex-shrink-0"
        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)', backdropFilter: 'blur(12px)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 flex flex-col items-center justify-center py-3 relative transition-all"
          >
            <div className="relative transition-all"
              style={{
                color: tab === t.id ? 'var(--neon-blue)' : 'var(--text-secondary)',
                filter: tab === t.id ? 'drop-shadow(0 0 8px rgba(0,212,255,0.7))' : 'none',
                transform: tab === t.id ? 'scale(1.15)' : 'scale(1)',
              }}>
              <Icon name={t.icon as "MessageCircle"} size={22} />
              {t.badge && tab !== t.id && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  style={{ background: 'var(--neon-blue)', color: '#050c14', fontSize: '9px' }}>
                  {t.badge > 9 ? '9+' : t.badge}
                </span>
              )}
            </div>
            {tab === t.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: 'var(--neon-blue)', boxShadow: '0 0 8px var(--neon-blue)' }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
