import { Link } from 'react-router-dom';
import { Facebook, GraduationCap, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { categories } from '../../lib/courses';

export function Footer() {
  const subjects = categories.filter(c => c !== 'الكل').slice(0, 6);

  return (
    <footer className="mt-24 bg-navy text-navy-foreground" dir="rtl">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-xl font-extrabold">
              منصة <span className="text-primary">التفوق</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-navy-foreground/70">
            منصة تعليمية لطلاب المرحلة الثانوية، شرح كامل لكل المواد، امتحانات ومراجعات، مجاناً بالكامل.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <span
                key={i}
                className="flex size-9 items-center justify-center rounded-lg bg-navy-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">المنصة</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
            <li><Link to="/courses" className="hover:text-primary">كل الكورسات</Link></li>
            <li><Link to="/about" className="hover:text-primary">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-primary">تواصل معنا</Link></li>
            <li><Link to="/register" className="hover:text-primary">سجّل مجاناً</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">المواد الدراسية</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
            {subjects.map((s) => (
              <li key={s}><Link to="/courses" className="hover:text-primary">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold">تواصل معنا</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> support@tafuq.edu
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +20 1208349801
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> القاهرة، مصر
            </li>
          </ul>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="بريدك الإلكتروني"
              className="w-full rounded-xl bg-navy-foreground/10 px-3 py-2 text-sm outline-none placeholder:text-navy-foreground/50"
            />
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
              اشترك
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-5 text-center text-xs text-navy-foreground/60">
        © {new Date().getFullYear()} منصة التفوق. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
