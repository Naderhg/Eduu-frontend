import { Link } from 'react-router-dom';
import {
  Award,
  BadgeCheck,
  BookOpen,
  Check,
  GraduationCap,
  Users,
  PlayCircle,
  Quote,
  Star,
  Calculator,
  Atom,
  FlaskConical,
  Languages,
  Globe,
  Brain,
  Laptop,
  ArrowLeft,
  Trophy,
  Target,
  Sparkles,
} from 'lucide-react';
import heroStudent from '../assets/hero-student.png';
import { Header } from '../components/site/Header';
import { Footer } from '../components/site/Footer';
import { CourseCard } from '../components/site/CourseCard';
import { courses } from '../lib/courses';

const stats = [
  { icon: BookOpen, value: '+١٥', label: 'مادة دراسية', bg: 'bg-soft-yellow' },
  { icon: Users, value: '+٨٠', label: 'مدرس خبير', bg: 'bg-muted' },
  { icon: GraduationCap, value: '+٢٤ ألف', label: 'طالب', bg: 'bg-soft-purple' },
  { icon: BadgeCheck, value: '+٢٠٠٠', label: 'درس مرئي', bg: 'bg-soft-blue' },
];

const features = [
  {
    icon: BookOpen,
    title: 'مناهج كاملة',
    text: 'شرح كامل لمناهج المرحلة الثانوية بأسلوب مبسط ومنظم.',
  },
  {
    icon: Users,
    title: 'مدرسون خبراء',
    text: 'نخبة من المدرسين بخبرة طويلة في تدريس الثانوية العامة.',
  },
  {
    icon: Award,
    title: 'امتحانات ومراجعات',
    text: 'امتحانات حقيقية ومراجعات نهائية لكل مادة وصف دراسي.',
  },
  {
    icon: PlayCircle,
    title: 'تعلم في أي وقت',
    text: 'وصول مجاني لكل الدروس على الموبايل والكمبيوتر.',
  },
];

const subjects = [
  { icon: Calculator, name: 'رياضيات', color: 'bg-blue-500/10 text-blue-600' },
  { icon: Atom, name: 'فيزياء', color: 'bg-purple-500/10 text-purple-600' },
  { icon: FlaskConical, name: 'كيمياء', color: 'bg-green-500/10 text-green-600' },
  { icon: BookOpen, name: 'أحياء', color: 'bg-emerald-500/10 text-emerald-600' },
  { icon: Languages, name: 'لغات', color: 'bg-orange-500/10 text-orange-600' },
  { icon: Globe, name: 'تاريخ وجغرافيا', color: 'bg-amber-500/10 text-amber-600' },
  { icon: Brain, name: 'فلسفة ومنطق', color: 'bg-rose-500/10 text-rose-600' },
  { icon: Laptop, name: 'علوم حاسب', color: 'bg-cyan-500/10 text-cyan-600' },
];

const testimonials = [
  {
    name: 'مريم حسن',
    role: 'طالبة ثانوية عامة',
    text: 'المنصة ساعدتني أذاكر الرياضيات بطريقة مختلفة تماماً، درجتي اتعدلت من ٦٠٪ لـ ٩٠٪ في نصف الترم.',
  },
  {
    name: 'يوسف عادل',
    role: 'طالب صف ثالث ثانوي',
    text: 'شرح الفيزياء هنا أحسن من أي حصة خصوصي، المدرس بيرد على كل أسئلتي وبيفهم المشكلة بسرعة.',
  },
  {
    name: 'والدة عمر طارق',
    role: 'ولية أمر',
    text: 'ابني بقى بيذاكر لوحده من غير ما أضغط عليه، المنصة سهلت عليه المذاكرة ووفرت علينا مصاريف الدروس.',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/30">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
              <Sparkles className="size-4" /> منصة تعليمية للثانوية العامة
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.25] sm:text-5xl lg:text-6xl">
              تعلُّم بلا حدود، <span className="marker-underline">تفوق</span> بلا حدود
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              منصة تعليمية متكاملة لطلاب المرحلة الثانوية، شرح كامل لكل المواد،
              امتحانات ومراجعات، بإشراف نخبة من المدرسين — كله مجاناً.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              {['كل المواد مجاناً', 'مدرسون خبراء', 'امتحانات ومراجعات'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 text-success" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
              >
                ابدأ التعلم الآن
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-muted"
              >
                سجّل مجاناً <ArrowLeft className="size-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-6 bottom-0 top-8 rounded-[3rem] bg-navy" />
            <img
              src={heroStudent}
              alt="طالب يحمل كتبه ويبتسم"
              width={1024}
              height={1024}
              className="relative mx-auto w-full max-w-md"
            />
            <div className="absolute bottom-6 start-0 hidden rounded-2xl bg-card p-4 shadow-card sm:block">
              <p className="text-sm font-bold">مبروك 🎉</p>
              <p className="text-xs text-muted-foreground">تم تأكيد التحاقك بالكورس</p>
            </div>
            <div className="absolute top-10 end-0 hidden rounded-2xl bg-success px-4 py-3 text-success-foreground shadow-card sm:block">
              <p className="text-xs">طلاب جدد اليوم</p>
              <p className="text-lg font-extrabold">+١٢٠٠</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`flex items-center gap-4 rounded-2xl p-6 ${s.bg}`}>
            <s.icon className="size-9 text-primary" />
            <div>
              <p className="text-xl font-extrabold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Subjects */}
      <section className="container-page mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">المواد الدراسية</h2>
          <p className="mt-3 text-muted-foreground">
            اختر مادتك وابدأ التعلم على يد أفضل المدرسين
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {subjects.map((s) => (
            <Link
              key={s.name}
              to="/courses"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-primary"
            >
              <span className={`flex size-14 items-center justify-center rounded-2xl ${s.color} transition-transform group-hover:scale-110`}>
                <s.icon className="size-7" />
              </span>
              <span className="text-sm font-bold">{s.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular courses */}
      <section className="container-page mt-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">الكورسات الأكثر رواجًا</h2>
            <p className="mt-3 text-muted-foreground">
              اختر من بين أفضل الكورسات تقييمًا من طلابنا
            </p>
          </div>
          <Link
            to="/courses"
            className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:flex"
          >
            عرض الكل <ArrowLeft className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/courses"
            className="inline-flex rounded-xl border border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-accent"
          >
            تصفح كل الكورسات
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-24 bg-muted/60 py-20">
        <div className="container-page">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">ليه تختار منصتنا؟</h2>
            <p className="mt-3 text-muted-foreground">
              كل ما تحتاجه للتفوق في الثانوية العامة في مكان واحد
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 shadow-soft">
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <f.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">إزاي تبدأ؟</h2>
          <p className="mt-3 text-muted-foreground">٣ خطوات بسيطة وتبدأ رحلتك التعليمية</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: GraduationCap, step: '١', title: 'سجّل حساب', text: 'أنشئ حسابك مجاناً في دقيقة واحدة' },
            { icon: BookOpen, step: '٢', title: 'اختر مادتك', text: 'تصفح المواد والكورسات واختر اللي يناسبك' },
            { icon: Trophy, step: '٣', title: 'ابدأ التعلم', text: 'شاهد الدروس، حل الامتحانات، وحقق التفوق' },
          ].map((s) => (
            <div key={s.step} className="relative rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="absolute -top-4 right-6 flex size-10 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground shadow-soft">
                {s.step}
              </span>
              <span className="mx-auto mt-2 flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <s.icon className="size-7" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">آراء طلابنا</h2>
          <p className="mt-3 text-muted-foreground">قصص نجاح حقيقية من طلابنا وأولياء الأمور</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border p-6 shadow-soft">
              <Quote className="size-8 text-primary" />
              <p className="mt-4 leading-8 text-muted-foreground">{t.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 text-center text-navy-foreground">
          <Target className="mx-auto size-12 text-primary" />
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            جاهز تبدأ رحلتك نحو التفوق؟
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/70">
            انضم لآلاف الطلاب وابدأ أول كورس مجاناً اليوم. كل المواد، كل الصفوف، كله مجاني.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            سجّل مجاناً الآن
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
