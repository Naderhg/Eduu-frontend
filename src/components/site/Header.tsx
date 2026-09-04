import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, Search, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { categories } from '../../lib/courses';

const nav = [
  { to: '/', label: 'الرئيسية' },
  { to: '/courses', label: 'الكورسات' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSubjectsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur" dir="rtl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            منصة <span className="text-primary">التفوق</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted hover:text-foreground ${
                isActive(item.to) ? 'bg-accent text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Subjects dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setSubjectsOpen(v => !v)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted hover:text-foreground ${
                subjectsOpen ? 'bg-accent text-primary' : 'text-muted-foreground'
              }`}
            >
              المواد
              <ChevronDown className={`size-4 transition-transform ${subjectsOpen ? 'rotate-180' : ''}`} />
            </button>
            {subjectsOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl border border-border bg-card p-2 shadow-card">
                <div className="grid grid-cols-2 gap-1">
                  {categories.filter(c => c !== 'الكل').map((c) => (
                    <Link
                      key={c}
                      to="/courses"
                      onClick={() => setSubjectsOpen(false)}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 md:flex">
            <Search className="size-4 text-muted-foreground" />
            <input
              placeholder="ابحث عن كورس..."
              className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate('/courses');
              }}
            />
          </div>
          <Link
            to="/login"
            className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            ابدأ الآن
          </Link>
          <button
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border p-2 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-page flex flex-col gap-1 border-t border-border py-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted ${
                isActive(item.to) ? 'bg-accent text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile subjects */}
          <div className="mt-2 border-t border-border pt-2">
            <p className="px-3 py-1 text-xs font-bold text-muted-foreground">المواد الدراسية</p>
            <div className="grid grid-cols-2 gap-1">
              {categories.filter(c => c !== 'الكل').map((c) => (
                <Link
                  key={c}
                  to="/courses"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-primary"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
