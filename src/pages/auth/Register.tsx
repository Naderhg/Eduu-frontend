import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../context/AuthContext';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../hooks/useToast';
import { GraduationCap, Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, CheckCircle2, BookOpen, Briefcase } from 'lucide-react';
import './Auth.css';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [parentPhone, setParentPhone] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('من فضلك املأ كل الحقول المطلوبة');
      return;
    }

    if (role === 'STUDENT' && !parentPhone.trim()) {
      setError('رقم هاتف ولي الأمر مطلوب للطلاب');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    try {
      await register({ name, email, password, role, ...(role === 'STUDENT' && { parentPhone }) });
      showToast('تم إنشاء الحساب بنجاح', 'success');
      navigate(role === 'TEACHER' ? '/teacher' : '/student', { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'فشل إنشاء الحساب';
      setError(msg);
      showToast(msg, 'error');
    }
  };

  return (
    <div className="auth-page" dir="rtl">
      <div className="auth-split">
        {/* Brand panel */}
        <div className="auth-brand-panel">
          <Link to="/" className="auth-brand-logo">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-6" />
            </span>
            <span className="text-2xl font-extrabold">
              منصة <span className="text-primary">التفوق</span>
            </span>
          </Link>

          <h2 className="auth-brand-title">
            تعلُّم بلا حدود<br />
            <span className="marker-underline">تفوق</span> بلا حدود
          </h2>
          <p className="auth-brand-text">
            منصة تعليمية متكاملة لطلاب المرحلة الثانوية، شرح كامل لكل المواد،
            امتحانات ومراجعات، بإشراف نخبة من المدرسين — كله مجاناً.
          </p>

          <ul className="auth-brand-features">
            {['كل المواد مجاناً', 'مدرسون خبراء', 'امتحانات ومراجعات نهائية'].map((t) => (
              <li key={t}>
                <CheckCircle2 className="size-5 text-primary" /> {t}
              </li>
            ))}
          </ul>

          <div className="auth-brand-stats">
            <div><span className="text-2xl font-extrabold">+٢٤ ألف</span><span>طالب</span></div>
            <div><span className="text-2xl font-extrabold">+٨٠</span><span>مدرس</span></div>
            <div><span className="text-2xl font-extrabold">+٢٠٠٠</span><span>درس</span></div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-form-panel">
          <Link to="/" className="auth-back-link">
            <ArrowLeft className="size-4" /> العودة للرئيسية
          </Link>

          <div className="auth-card">
            <div className="auth-header">
              <h1 className="auth-title">أنشئ حسابك 👋</h1>
              <p className="auth-subtitle">انضم لآلاف الطلاب وابدأ رحلتك التعليمية مجاناً</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="auth-error">{error}</div>}

              {/* Role selector */}
              <div className="auth-field">
                <label className="auth-label">أنا</label>
                <div className="auth-role-selector">
                  <button
                    type="button"
                    className={`auth-role-option ${role === 'STUDENT' ? 'active' : ''}`}
                    onClick={() => setRole('STUDENT')}
                  >
                    <BookOpen className="size-5" />
                    <span>طالب</span>
                  </button>
                  <button
                    type="button"
                    className={`auth-role-option ${role === 'TEACHER' ? 'active' : ''}`}
                    onClick={() => setRole('TEACHER')}
                  >
                    <Briefcase className="size-5" />
                    <span>مدرس</span>
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="name">الاسم الكامل</label>
                <div className="auth-input-wrap">
                  <User className="auth-input-icon" />
                  <input
                    type="text"
                    id="name"
                    className="auth-input"
                    placeholder="أدخل اسمك الكامل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="email">البريد الإلكتروني</label>
                <div className="auth-input-wrap">
                  <Mail className="auth-input-icon" />
                  <input
                    type="email"
                    id="email"
                    className="auth-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {role === 'STUDENT' && (
                <div className="auth-field">
                  <label className="auth-label" htmlFor="parentPhone">رقم هاتف ولي الأمر</label>
                  <div className="auth-input-wrap">
                    <Phone className="auth-input-icon" />
                    <input
                      type="tel"
                      id="parentPhone"
                      className="auth-input"
                      placeholder="01xxxxxxxxx"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label" htmlFor="password">كلمة المرور</label>
                <div className="auth-input-wrap">
                  <Lock className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-input-action"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'إخفاء' : 'إظهار'}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                <div className="auth-input-wrap">
                  <Lock className="auth-input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className="auth-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-input-action"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? 'إخفاء' : 'إظهار'}
                  >
                    {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? <Loader size="small" /> : 'إنشاء الحساب'}
              </button>
            </form>

            <div className="auth-info">
              <p>لديك حساب بالفعل؟ <Link to="/login">سجّل دخولك</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
