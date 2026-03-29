import { useState } from "react";
import Icon from "@/components/ui/icon";

type AuthMode = "login" | "register" | "forgot";

interface AuthPageProps {
  onAuth: () => void;
}

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-bg relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,100,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 animate-neon-pulse"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,80,160,0.3))', border: '2px solid rgba(0,212,255,0.5)' }}>
            <Icon name="Zap" size={30} style={{ color: 'var(--neon-blue)' }} />
          </div>
          <h1 className="text-3xl font-black neon-text tracking-tight">NeonChat</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Защищённый P2P мессенджер</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 neon-border">
          <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'rgba(0,212,255,0.05)' }}>
            {([["login", "Вход"], ["register", "Регистрация"]] as const).map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={mode === m
                  ? { background: 'var(--neon-blue)', color: '#050c14', boxShadow: '0 0 15px rgba(0,212,255,0.4)' }
                  : { color: 'var(--text-secondary)' }}>
                {label}
              </button>
            ))}
          </div>

          {mode === "forgot" && (
            <button onClick={() => setMode("login")} className="flex items-center gap-2 mb-4 text-sm" style={{ color: 'var(--neon-blue)' }}>
              <Icon name="ArrowLeft" size={16} /> Назад к входу
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Имя</label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                {mode === "forgot" ? "Ваш логин" : "Логин (ID)"}
              </label>
              <div className="relative">
                <Icon name="AtSign" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input value={login} onChange={e => setLogin(e.target.value)} placeholder="@username" required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
            </div>

            {mode !== "forgot" && (
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Пароль</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                  <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder="••••••••" required
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
                  </button>
                </div>
              </div>
            )}

            {mode === "register" && (
              <>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Email (для уведомлений)</label>
                  <div className="relative">
                    <Icon name="Mail" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Контрольный вопрос</label>
                  <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Например: Имя первого питомца?"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-2"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Ответ на вопрос"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>
              </>
            )}

            {mode === "forgot" && (
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Контрольный вопрос</label>
                <p className="text-sm px-3 py-2 rounded-lg mb-2" style={{ background: 'rgba(0,212,255,0.08)', color: 'var(--text-primary)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  Имя вашего первого питомца?
                </p>
                <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Ваш ответ" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
            )}

            <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold neon-glow-btn-solid mt-2">
              {mode === "login" ? "Войти" : mode === "register" ? "Создать аккаунт" : "Сбросить пароль"}
            </button>
          </form>

          {mode === "login" && (
            <button onClick={() => setMode("forgot")} className="w-full text-center text-xs mt-4" style={{ color: 'var(--text-secondary)' }}>
              Забыли пароль?
            </button>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(127,168,192,0.4)' }}>
          NeonChat · Защищённое P2P соединение
        </p>
      </div>
    </div>
  );
}
