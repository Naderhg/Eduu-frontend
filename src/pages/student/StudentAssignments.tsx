import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { assignmentsApi } from '../../api/assignments.api';
import { Loader } from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { StudentShellWrapper } from './StudentShellWrapper';
import {
  RefreshCw, FileText, Clock, CheckCircle, Award, Play, Calendar,
  AlertTriangle, ListChecks, BookOpen, ChevronDown, Search
} from 'lucide-react';
import './StudentAssignments.css';

type FilterType = 'all' | 'pending' | 'submitted' | 'graded' | 'overdue';
type SortType = 'dueDate' | 'title' | 'status';

export const StudentAssignments: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('dueDate');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAssignments = useCallback(async (showRefreshLoading = false) => {
    if (!user?.id) return;
    try {
      if (showRefreshLoading) setRefreshing(true);
      else setLoading(true);
      const response = await assignmentsApi.getStudentAssignments();
      setAssignments(response || []);
    } catch (error: any) {
      console.error('Failed to fetch assignments:', error);
      toast.error('فشل تحميل الواجبات');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  // Auto-refresh for assignments awaiting grade
  useEffect(() => {
    const awaitingGradeCount = assignments.filter(a => {
      const hasSubmission = a.submissions && a.submissions.length > 0;
      const isGraded = hasSubmission && a.submissions.some((s: any) => s.score !== undefined && s.score !== null);
      return hasSubmission && !isGraded;
    }).length;

    if (awaitingGradeCount > 0) {
      const interval = setInterval(() => fetchAssignments(false), 30000);
      return () => clearInterval(interval);
    }
  }, [assignments, user?.id, fetchAssignments]);

  useEffect(() => { fetchAssignments(); }, [fetchAssignments]);

  // Compute stats
  const stats = useMemo(() => {
    const total = assignments.length;
    const pending = assignments.filter(a => !(a.submissions && a.submissions.length > 0) && new Date(a.dueDate) >= new Date()).length;
    const overdue = assignments.filter(a => !(a.submissions && a.submissions.length > 0) && new Date(a.dueDate) < new Date()).length;
    const submitted = assignments.filter(a => a.submissions && a.submissions.length > 0).length;
    const graded = assignments.filter(a => a.submissions && a.submissions.some((s: any) => s.score !== undefined && s.score !== null)).length;
    return { total, pending, overdue, submitted, graded };
  }, [assignments]);

  // Filter + sort + search
  const filteredAssignments = useMemo(() => {
    let result = [...assignments];

    // Filter
    switch (activeFilter) {
      case 'pending':
        result = result.filter(a => !(a.submissions && a.submissions.length > 0) && new Date(a.dueDate) >= new Date());
        break;
      case 'overdue':
        result = result.filter(a => !(a.submissions && a.submissions.length > 0) && new Date(a.dueDate) < new Date());
        break;
      case 'submitted':
        result = result.filter(a => a.submissions && a.submissions.length > 0 &&
          !a.submissions.some((s: any) => s.score !== undefined && s.score !== null));
        break;
      case 'graded':
        result = result.filter(a => a.submissions && a.submissions.some((s: any) => s.score !== undefined && s.score !== null));
        break;
    }

    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(a =>
        a.title?.toLowerCase().includes(q) ||
        a.course?.title?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title': return (a.title || '').localeCompare(b.title || '');
        case 'status': {
          const sa = a.submissions?.some((s: any) => s.score !== undefined) ? 3 :
                     a.submissions?.length > 0 ? 2 : new Date(a.dueDate) < new Date() ? 0 : 1;
          const sb = b.submissions?.some((s: any) => s.score !== undefined) ? 3 :
                     b.submissions?.length > 0 ? 2 : new Date(b.dueDate) < new Date() ? 0 : 1;
          return sb - sa;
        }
        case 'dueDate':
        default:
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });

    return result;
  }, [assignments, activeFilter, sortBy, searchTerm]);

  if (loading) {
    return (
      <StudentShellWrapper>
        <Loader fullScreen text="جاري التحميل..." />
      </StudentShellWrapper>
    );
  }

  const tabs: { key: FilterType; label: string; count: number; icon: React.ReactNode }[] = [
    { key: 'all', label: 'الكل', count: stats.total, icon: <ListChecks className="size-4" /> },
    { key: 'pending', label: 'بانتظار التسليم', count: stats.pending, icon: <Clock className="size-4" /> },
    { key: 'overdue', label: 'متأخر', count: stats.overdue, icon: <AlertTriangle className="size-4" /> },
    { key: 'submitted', label: 'تم التسليم', count: stats.submitted, icon: <CheckCircle className="size-4" /> },
    { key: 'graded', label: 'تم التصحيح', count: stats.graded, icon: <Award className="size-4" /> },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mcq': return 'اختيار من متعدد';
      case 'essay': return 'سؤال مقالي';
      case 'mixed': return 'مختلط';
      default: return 'واجب';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq': return <ListChecks className="size-3.5" />;
      case 'essay': return <FileText className="size-3.5" />;
      case 'mixed': return <BookOpen className="size-3.5" />;
      default: return <FileText className="size-3.5" />;
    }
  };

  return (
    <StudentShellWrapper>
      <div className="student-assignments" dir="rtl">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">الواجبات</h1>
            <p className="page-subtitle">استعرض واجباتك وسلّم إجاباتك في الوقت المحدد</p>
          </div>
          <button onClick={() => fetchAssignments(true)} disabled={refreshing} className="btn btn-ghost refresh-btn" title="تحديث">
            <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
            <span>{refreshing ? 'جاري التحديث...' : 'تحديث'}</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-mini-card">
            <div className="stat-mini-icon stat-icon-primary"><ListChecks className="size-5" /></div>
            <div className="stat-mini-info">
              <span className="stat-mini-value">{stats.total}</span>
              <span className="stat-mini-label">إجمالي الواجبات</span>
            </div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-icon stat-icon-warning"><Clock className="size-5" /></div>
            <div className="stat-mini-info">
              <span className="stat-mini-value">{stats.pending}</span>
              <span className="stat-mini-label">بانتظار التسليم</span>
            </div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-icon stat-icon-danger"><AlertTriangle className="size-5" /></div>
            <div className="stat-mini-info">
              <span className="stat-mini-value">{stats.overdue}</span>
              <span className="stat-mini-label">متأخرة</span>
            </div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-icon stat-icon-success"><Award className="size-5" /></div>
            <div className="stat-mini-info">
              <span className="stat-mini-value">{stats.graded}</span>
              <span className="stat-mini-label">تم تصحيحها</span>
            </div>
          </div>
        </div>

        {/* Search + Sort */}
        <div className="controls-bar">
          <div className="search-box">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="بحث عن واجب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sort-dropdown">
            <span className="sort-label">ترتيب حسب:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortType)}>
              <option value="dueDate">تاريخ التسليم</option>
              <option value="title">العنوان</option>
              <option value="status">الحالة</option>
            </select>
            <ChevronDown className="size-4 chevron" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-pills">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`filter-pill ${activeFilter === tab.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="pill-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Assignments List */}
        {filteredAssignments.length > 0 ? (
          <div className="assignments-list">
            {filteredAssignments.map((assignment) => {
              const dueDate = new Date(assignment.dueDate);
              const isOverdue = dueDate < new Date();
              const daysLeft = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const hasSubmission = assignment.submissions && assignment.submissions.length > 0;
              const isGraded = hasSubmission && assignment.submissions.some((s: any) => s.score !== undefined && s.score !== null);
              const submission = hasSubmission ? assignment.submissions.find((s: any) => s.score !== undefined && s.score !== null) || assignment.submissions[0] : null;
              const recentlyGraded = isGraded && submission?.gradedAt &&
                (Date.now() - new Date(submission.gradedAt).getTime()) < 5 * 60 * 1000;
              const status = isGraded ? 'graded' : hasSubmission ? 'submitted' : isOverdue ? 'overdue' : 'pending';
              const scorePercentage = isGraded && submission && assignment.maxScore > 0
                ? Math.round((submission.score / assignment.maxScore) * 100) : 0;

              return (
                <div key={assignment._id} className={`assignment-card card status-${status}`}>
                  <div className="assignment-status-indicator" data-status={status}></div>
                  <div className="assignment-content">
                    <div className="assignment-header">
                      <div className="title-section">
                        <div className="title-row">
                          <h3 className="assignment-title">{assignment.title}</h3>
                          {recentlyGraded && <span className="newly-graded-badge">🎉 تم التصحيح حديثاً!</span>}
                        </div>
                        <div className="assignment-subtitle">
                          <span className="course-tag">
                            <BookOpen className="size-3.5" />
                            {assignment.course?.title || 'كورس'}
                          </span>
                          <span className="type-tag">
                            {getTypeIcon(assignment.type)}
                            {getTypeLabel(assignment.type)}
                          </span>
                        </div>
                      </div>
                      <span className={`status-badge status-${status}`}>
                        {isGraded ? 'تم التصحيح' : hasSubmission ? 'تم التسليم' : isOverdue ? 'متأخر' : 'بانتظار التسليم'}
                      </span>
                    </div>

                    <div className="assignment-meta">
                      <span className="meta-item">
                        <Calendar className="size-4" />
                        التسليم: {dueDate.toLocaleDateString('ar')}
                      </span>
                      {!hasSubmission && !isGraded && (
                        <span className={`meta-item ${isOverdue ? 'danger' : daysLeft <= 3 ? 'urgent' : ''}`}>
                          <Clock className="size-4" />
                          {isOverdue ? `متأخر بـ ${Math.abs(daysLeft)} يوم` : daysLeft === 0 ? 'اليوم' : daysLeft === 1 ? 'غداً' : `${daysLeft} يوم متبقي`}
                        </span>
                      )}
                      {isGraded && submission && (
                        <span className="meta-item score">
                          <Award className="size-4" />
                          الدرجة: {submission.score || 0}/{assignment.maxScore}
                        </span>
                      )}
                      {hasSubmission && !isGraded && (
                        <span className="meta-item info">
                          <CheckCircle className="size-4" />
                          بانتظار التصحيح
                        </span>
                      )}
                    </div>

                    {/* Score progress bar for graded assignments */}
                    {isGraded && submission && assignment.maxScore > 0 && (
                      <div className="score-progress">
                        <div className="score-progress-bar">
                          <div
                            className={`score-progress-fill ${scorePercentage >= 90 ? 'excellent' : scorePercentage >= 70 ? 'good' : scorePercentage >= 50 ? 'fair' : 'poor'}`}
                            style={{ width: `${scorePercentage}%` }}
                          />
                        </div>
                        <span className="score-percentage">{scorePercentage}%</span>
                      </div>
                    )}
                  </div>

                  <div className="assignment-actions">
                    {!hasSubmission && !isGraded && (
                      <Link to={`/student/assignments/${assignment._id}`} className="btn btn-primary">
                        <Play className="ml-1 size-4" /> {isOverdue ? 'تسليم متأخر' : 'ابدأ'}
                      </Link>
                    )}
                    {hasSubmission && !isGraded && (
                      <button className="btn btn-secondary" disabled>
                        <Clock className="ml-1 size-4" /> بانتظار التصحيح
                      </button>
                    )}
                    {isGraded && (
                      <Link to={`/student/assignments/${assignment._id}/results`} className="btn btn-secondary">
                        <FileText className="ml-1 size-4" /> عرض النتيجة
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              {activeFilter === 'graded' ? <Award className="size-12" /> :
               activeFilter === 'overdue' ? <AlertTriangle className="size-12" /> :
               <FileText className="size-12" />}
            </div>
            <h3 className="empty-title">
              {searchTerm ? 'لا توجد نتائج مطابقة' :
               activeFilter === 'graded' ? 'لا توجد واجبات مُصححة' :
               activeFilter === 'overdue' ? 'لا توجد واجبات متأخرة' :
               activeFilter === 'pending' ? 'لا توجد واجبات بانتظار التسليم' :
               activeFilter === 'submitted' ? 'لم تسلّم أي واجب بعد' :
               'لا توجد واجبات'}
            </h3>
            <p className="empty-description">
              {searchTerm ? 'جرّب كلمات بحث مختلفة' :
               activeFilter === 'all' ? 'لم يتم تخصيص أي واجبات لك حالياً' :
               'لا توجد واجبات في هذا التصنيف'}
            </p>
          </div>
        )}
      </div>
    </StudentShellWrapper>
  );
};
