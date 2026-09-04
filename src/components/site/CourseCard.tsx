import { Link } from 'react-router-dom';
import { Clock, PlayCircle, Star, Users, BookOpen } from 'lucide-react';
import type { Course } from '@/lib/courses';

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to="/courses"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 start-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary">
          {course.category}
        </span>
        <span className="absolute bottom-3 end-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          {course.grade}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold text-muted-foreground">
          {course.level} · {course.instructor}
        </span>
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-7 group-hover:text-primary">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">
          {course.description}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-4" /> {course.hours} ساعة
          </span>
          <span className="flex items-center gap-1">
            <PlayCircle className="size-4" /> {course.lectures} درس
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-4" /> {course.students.toLocaleString('ar')}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="flex items-center gap-1 text-sm font-bold text-warm-foreground">
            <Star className="size-4 fill-warm text-warm" />
            {course.rating}
            <span className="text-xs font-normal text-muted-foreground">
              ({course.reviews})
            </span>
          </span>
          <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
            <BookOpen className="size-3.5" /> مجاني
          </span>
        </div>
      </div>
    </Link>
  );
}
