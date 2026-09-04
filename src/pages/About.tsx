import { Target, Eye, Users, Award, BookOpen, Heart } from 'lucide-react';
import { Header } from '../components/site/Header';
import { Footer } from '../components/site/Footer';

const About = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-muted/30 py-16">
        <div className="container-page text-center">
          <h1 className="text-4xl font-extrabold">من نحن</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-9 text-muted-foreground">
            منصة تعليمية عربية بدأت بفكرة بسيطة: إتاحة تعليم عالي الجودة لكل طلاب
            المرحلة الثانوية مجاناً. نعمل مع نخبة من المدرسين لبناء محتوى تعليمي
            يركز على الفهم والتفوق في الثانوية العامة.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Target, t: 'رسالتنا', d: 'تعليم مجاني عالي الجودة لكل طالب ثانوي، أينما كان.' },
            { icon: BookOpen, t: 'منهجنا', d: 'شرح مبسط لمناهج الثانوية العامة مع امتحانات ومراجعات نهائية.' },
            { icon: Users, t: 'مجتمعنا', d: 'أكثر من ٢٤ ألف طالب يتعلمون ويتشاركون الخبرات يومياً.' },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <c.icon className="size-6" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{c.t}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/60 py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, value: '+١٥', label: 'مادة دراسية' },
            { icon: Users, value: '+٨٠', label: 'مدرس خبير' },
            { icon: Award, value: '+٢٠٠٠', label: 'درس مرئي' },
            { icon: Heart, value: 'مجاني', label: 'بالكامل' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="size-7" />
              </span>
              <p className="mt-3 text-2xl font-extrabold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
