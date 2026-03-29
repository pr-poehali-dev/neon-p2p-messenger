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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateLogin = () => {
    if (!login.trim()) return "Введите логин";
    if (login.length < 3) return "Логин минимум 3 символа";
    return null;
  };

  const validatePassword = () => {
    if (!password) return "Введите пароль";
    if (password.length < 6) return "Пароль минимум 6 символов";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "login") {
      const loginErr = validateLogin();
      if (loginErr) { setError(loginErr); return; }
      const passErr = validatePassword();
      if (passErr) { setError(passErr); return; }
      onAuth();
      return;
    }

    if (mode === "register") {
      if (!name.trim()) { setError("Введите имя"); return; }
      const loginErr = validateLogin();
      if (loginErr) { setError(loginErr); return; }
      const passErr = validatePassword();
      if (passErr) { setError(passErr); return; }
      if (!email.trim()) { setError("Введите email"); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Введите корректный email"); return; }
      if (!question.trim()) { setError("Введите контрольный вопрос"); return; }
      if (!answer.trim()) { setError("Введите ответ на контрольный вопрос"); return; }
      onAuth();
      return;
    }

    if (mode === "forgot") {
      const loginErr = validateLogin();
      if (loginErr) { setError(loginErr); return; }
      if (!answer.trim()) { setError("Введите ответ на контрольный вопрос"); return; }
      setSuccess("Инструкции отправлены на email");
      setAnswer("");
    }
  };

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-bg relative overflow-hidden"
      style={{ background: 'var(--bg-dark)' }}>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,100,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="w-full max-w-sm animate-slide-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 animate-neon-pulse"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,80,160,0.3))', border: '2px solid rgba(0,212,255,0.5)' }}>
            <Icon name="Zap" size={30} style={{ color: 'var(--neon-blue)' }} />
          </div>
          <h1 className="text-3xl font-black neon-text tracking-tight">NeonChat</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Защищённый P2P мессенджер</p>
        </div>

        <div className="glass-card rounded-2xl p-6 neon-border">
          {/* Mode tabs */}
          {mode !== "forgot" && (
            <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'rgba(0,212,255,0.05)' }}>
              {([["login", "Вход"], ["register", "Регистрация"]] as const).map(([m, label]) => (
                <button key={m} onClick={() => switchMode(m)}
                  className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                  style={mode === m
                    ? { background: 'var(--neon-blue)', color: '#050c14', boxShadow: '0 0 15px rgba(0,212,255,0.4)' }
                    : { color: 'var(--text-secondary)' }}>
                  {label}
                </button>
              ))}
            </div>
          )}

          {mode === "forgot" && (
            <button onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
              className="flex items-center gap-2 mb-4 text-sm" style={{ color: 'var(--neon-blue)' }}>
              <Icon name="ArrowLeft" size={16} /> Назад к входу
            </button>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl text-sm"
              style={{ background: 'rgba(255,68,102,0.1)', border: '1px solid rgba(255,68,102,0.3)', color: '#ff4466' }}>
              <Icon name="AlertCircle" size={15} />
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl text-sm"
              style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }}>
              <Icon name="CheckCircle" size={15} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === "register" && (
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Имя *</label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Логин (ID) *</label>
              <div className="relative">
                <Icon name="AtSign" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input value={login} onChange={e => setLogin(e.target.value)} placeholder="@username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
            </div>

            {mode !== "forgot" && (
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Пароль *</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                  <input value={password} onChange={e => setPassword(e.target.value)}
                    type={showPass ? "text" : "password"} placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
                  </button>
                </div>
              </div>
            )}

            {mode === "register" && (
              <>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Email (для уведомлений) *</label>
                  <div className="relative">
                    <Icon name="Mail" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Контрольный вопрос *</label>
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
                <p className="text-sm px-3 py-2 rounded-lg mb-2"
                  style={{ background: 'rgba(0,212,255,0.08)', color: 'var(--text-primary)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  Имя вашего первого питомца?
                </p>
                <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Ваш ответ"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
            )}

            <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold neon-glow-btn-solid mt-2">
              {mode === "login" ? "Войти" : mode === "register" ? "Создать аккаунт" : "Сбросить пароль"}
            </button>
          </form>

          {mode === "login" && (
            <button onClick={() => { setMode("forgot"); setError(null); }}
              className="w-full text-center text-xs mt-4" style={{ color: 'var(--text-secondary)' }}>
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
