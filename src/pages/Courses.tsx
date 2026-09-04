import { Search, BookOpen, GraduationCap, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Header } from '../components/site/Header';
import { Footer } from '../components/site/Footer';
import { CourseCard } from '../components/site/CourseCard';
import { categories, courses, grades } from '../lib/courses';

const Courses = () => {
  const [category, setCategory] = useState('الكل');
  const [grade, setGrade] = useState('الكل');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (category === 'الكل' || c.category === category) &&
          (grade === 'الكل' || c.grade === grade) &&
          (query.trim() === '' ||
            c.title.includes(query.trim()) ||
            c.instructor.includes(query.trim()) ||
            c.category.includes(query.trim())),
      ),
    [category, grade, query],
  );

  const hasActiveFilters = category !== 'الكل' || grade !== 'الكل' || query.trim() !== '';

  const clearFilters = () => {
    setCategory('الكل');
    setGrade('الكل');
    setQuery('');
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/40 py-14">
        <div className="container-page text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
            <GraduationCap className="size-4" /> مواد المرحلة الثانوية
          </span>
          <h1 className="mt-5 text-4xl font-extrabold">كل الكورسات</h1>
          <p className="mt-3 text-muted-foreground">
            {courses.length} كورس متاح — اختر مادتك وصفك الدراسي وابدأ التعلم مجاناً
          </p>
          <div className="mx-auto mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-soft">
            <Search className="size-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم الكورس أو المادة أو المدرس..."
              className="w-full bg-transparent text-sm outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        {/* Grade filter */}
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <GraduationCap className="size-4" /> الصف الدراسي
          </h3>
          <div className="flex flex-wrap gap-2">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  grade === g
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Subject filter */}
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <BookOpen className="size-4" /> المادة الدراسية
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  category === c
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results count + clear */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            عرض <span className="font-bold text-foreground">{filtered.length}</span> كورس
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
            >
              <X className="size-4" /> مسح الفلاتر
            </button>
          )}
        </div>

        {/* Courses grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
              <BookOpen className="size-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">لا توجد كورسات مطابقة</h3>
            <p className="mt-1 text-sm text-muted-foreground">جرّب تغيير الفلاتر أو البحث بكلمة أخرى</p>
            <button
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              عرض كل الكورسات
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
