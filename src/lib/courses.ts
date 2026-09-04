export type Course = {
  id: string;
  title: string;
  category: string;
  grade: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  rating: number;
  reviews: number;
  students: number;
  hours: number;
  lectures: number;
  instructor: string;
  image: string;
  description: string;
  curriculum: { title: string; duration: string }[];
};

// High school subjects (مواد المرحلة الثانوية)
export const categories = [
  'الكل',
  'رياضيات',
  'فيزياء',
  'كيمياء',
  'أحياء',
  'لغة عربية',
  'لغة إنجليزية',
  'لغة فرنسية',
  'تاريخ وجغرافيا',
  'فلسفة ومنطق',
  'علوم الحاسب',
];

// Grades (الصفوف الدراسية)
export const grades = [
  'الكل',
  'الصف الأول الثانوي',
  'الصف الثاني الثانوي',
  'الصف الثالث الثانوي',
];

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=800&q=60`;

export const courses: Course[] = [
  {
    id: 'math-1st-sec',
    title: 'رياضيات - الصف الأول الثانوي (الجبر والهندسة)',
    category: 'رياضيات',
    grade: 'الصف الأول الثانوي',
    level: 'مبتدئ',
    rating: 4.8,
    reviews: 1240,
    students: 12800,
    hours: 42,
    lectures: 186,
    instructor: 'م. أحمد سمير',
    image: img('1635070041078-e363dbe005cb'),
    description:
      'شرح كامل لمنهج الرياضيات للصف الأول الثانوي: الجبر، الهندسة، الإحصاء، مع أمثلة محلولة وتمارين متنوعة.',
    curriculum: [
      { title: 'المجموعات والعمليات عليها', duration: '3 ساعات' },
      { title: 'الجبر والمعادلات', duration: '8 ساعات' },
      { title: 'الهندسة المستوية', duration: '12 ساعة' },
      { title: 'الإحصاء والاحتمالات', duration: '11 ساعة' },
      { title: 'المراجعة النهائية', duration: '8 ساعات' },
    ],
  },
  {
    id: 'math-2nd-sec',
    title: 'رياضيات - الصف الثاني الثانوي (التفاضل والتكامل)',
    category: 'رياضيات',
    grade: 'الصف الثاني الثانوي',
    level: 'متوسط',
    rating: 4.7,
    reviews: 860,
    students: 7400,
    hours: 38,
    lectures: 160,
    instructor: 'م. أحمد سمير',
    image: img('1509228472599-3fcf75c58037'),
    description:
      'منهج الرياضيات للصف الثاني الثانوي: النهايات، المشتقات، التكامل، مع تطبيقات عملية وحل امتحانات سابقة.',
    curriculum: [
      { title: 'النهايات والاتصال', duration: '6 ساعات' },
      { title: 'التفاضل وتطبيقاته', duration: '12 ساعة' },
      { title: 'التكامل وتطبيقاته', duration: '10 ساعات' },
      { title: 'المراجعة والامتحانات', duration: '10 ساعات' },
    ],
  },
  {
    id: 'math-3rd-sec',
    title: 'رياضيات - الصف الثالث الثانوي (منهج كامل)',
    category: 'رياضيات',
    grade: 'الصف الثالث الثانوي',
    level: 'متقدم',
    rating: 4.9,
    reviews: 2100,
    students: 18500,
    hours: 56,
    lectures: 240,
    instructor: 'م. أحمد سمير',
    image: img('1592496431122-2349250f7290'),
    description:
      'منهج الرياضيات كامل للصف الثالث الثانوي مع مراجعات نهائية وحل امتحانات الثانوية العامة لآخر 10 سنوات.',
    curriculum: [
      { title: 'التفاضل وتطبيقاته', duration: '14 ساعة' },
      { title: 'التكامل وتطبيقاته', duration: '12 ساعة' },
      { title: 'الجبر والمعادلات', duration: '10 ساعات' },
      { title: 'الهندسة التحليلية', duration: '8 ساعات' },
      { title: 'المراجعة النهائية والامتحانات', duration: '12 ساعة' },
    ],
  },
  {
    id: 'physics-2nd-sec',
    title: 'فيزياء - الصف الثاني الثانوي (الميكانيكا والكهرباء)',
    category: 'فيزياء',
    grade: 'الصف الثاني الثانوي',
    level: 'متوسط',
    rating: 4.7,
    reviews: 980,
    students: 8200,
    hours: 34,
    lectures: 140,
    instructor: 'أ. منى خالد',
    image: img('1636466497217-26e8ee0b8957'),
    description:
      'شرح منهج الفيزياء للصف الثاني الثانوي: الميكانيكا، الكهرباء، المغناطيسية، مع تجارب افتراضية.',
    curriculum: [
      { title: 'الحركة والقوى', duration: '8 ساعات' },
      { title: 'قوانين نيوتن', duration: '7 ساعات' },
      { title: 'الكهرباء التيارية', duration: '9 ساعات' },
      { title: 'المغناطيسية', duration: '6 ساعات' },
      { title: 'المراجعة', duration: '4 ساعات' },
    ],
  },
  {
    id: 'physics-3rd-sec',
    title: 'فيزياء - الصف الثالث الثانوي (منهج كامل)',
    category: 'فيزياء',
    grade: 'الصف الثالث الثانوي',
    level: 'متقدم',
    rating: 4.8,
    reviews: 1800,
    students: 15600,
    hours: 48,
    lectures: 200,
    instructor: 'أ. منى خالد',
    image: img('1532094349884-543bc11b234d'),
    description:
      'منهج الفيزياء كامل للصف الثالث الثانوي مع تركيز على فهم المفاهيم وحل المسائل بطريقة منهجية.',
    curriculum: [
      { title: 'الميكانيكا المتقدمة', duration: '12 ساعة' },
      { title: 'الكهرباء والمغناطيسية', duration: '10 ساعات' },
      { title: 'الفيزياء الحديثة', duration: '8 ساعات' },
      { title: 'الموجات والضوء', duration: '8 ساعات' },
      { title: 'المراجعة النهائية', duration: '10 ساعات' },
    ],
  },
  {
    id: 'chemistry-2nd-sec',
    title: 'كيمياء - الصف الثاني الثانوي (الروابط والتفاعلات)',
    category: 'كيمياء',
    grade: 'الصف الثاني الثانوي',
    level: 'متوسط',
    rating: 4.6,
    reviews: 740,
    students: 6100,
    hours: 30,
    lectures: 120,
    instructor: 'د. طارق فؤاد',
    image: img('1532634922-8fe0b757fb3a'),
    description:
      'منهج الكيمياء للصف الثاني الثانوي: التركيب الذري، الروابط الكيميائية، التفاعلات، مع تجارب تفاعلية.',
    curriculum: [
      { title: 'التركيب الذري', duration: '6 ساعات' },
      { title: 'الروابط الكيميائية', duration: '8 ساعات' },
      { title: 'التفاعلات الكيميائية', duration: '8 ساعات' },
      { title: 'الحسابات الكيميائية', duration: '8 ساعات' },
    ],
  },
  {
    id: 'chemistry-3rd-sec',
    title: 'كيمياء - الصف الثالث الثانوي (منهج كامل)',
    category: 'كيمياء',
    grade: 'الصف الثالث الثانوي',
    level: 'متقدم',
    rating: 4.7,
    reviews: 1500,
    students: 13200,
    hours: 44,
    lectures: 180,
    instructor: 'د. طارق فؤاد',
    image: img('1554187791-7b1b8957c8e4'),
    description:
      'منهج الكيمياء كامل للصف الثالث الثانوي مع حل المسائل ومراجعات نهائية شاملة.',
    curriculum: [
      { title: 'الكيمياء التحليلية', duration: '10 ساعات' },
      { title: 'الكيمياء العضوية', duration: '12 ساعة' },
      { title: 'الكيمياء الفيزيائية', duration: '10 ساعات' },
      { title: 'المراجعة والامتحانات', duration: '12 ساعة' },
    ],
  },
  {
    id: 'biology-3rd-sec',
    title: 'أحياء - الصف الثالث الثانوي (منهج كامل)',
    category: 'أحياء',
    grade: 'الصف الثالث الثانوي',
    level: 'متقدم',
    rating: 4.8,
    reviews: 1200,
    students: 9800,
    hours: 36,
    lectures: 150,
    instructor: 'د. سارة محمود',
    image: img('1530026405186-ed1f139313f8'),
    description:
      'منهج الأحياء كامل للصف الثالث الثانوي: الخلية، الوراثة، البيئة، مع رسوم توضيحية تفاعلية.',
    curriculum: [
      { title: 'الخلية ووظائفها', duration: '8 ساعات' },
      { title: 'الوراثة والجينات', duration: '10 ساعات' },
      { title: 'التنوع الحيوي', duration: '8 ساعات' },
      { title: 'البيئة والنظام البيئي', duration: '6 ساعات' },
      { title: 'المراجعة', duration: '4 ساعات' },
    ],
  },
  {
    id: 'arabic-3rd-sec',
    title: 'لغة عربية - الصف الثالث الثانوي (نحو وأدب)',
    category: 'لغة عربية',
    grade: 'الصف الثالث الثانوي',
    level: 'متقدم',
    rating: 4.7,
    reviews: 1600,
    students: 14000,
    hours: 40,
    lectures: 160,
    instructor: 'أ. خالد إبراهيم',
    image: img('1456513080510-7bf3a84b17f8'),
    description:
      'منهج اللغة العربية كامل للصف الثالث الثانوي: النحو، البلاغة، الأدب، النصوص، مع تدريبات وامتحانات.',
    curriculum: [
      { title: 'النحو والصرف', duration: '12 ساعة' },
      { title: 'البلاغة', duration: '8 ساعات' },
      { title: 'الأدب والنصوص', duration: '10 ساعات' },
      { title: 'القراءة والكتابة', duration: '6 ساعات' },
      { title: 'المراجعة', duration: '4 ساعات' },
    ],
  },
  {
    id: 'english-3rd-sec',
    title: 'لغة إنجليزية - الصف الثالث الثانوي (منهج كامل)',
    category: 'لغة إنجليزية',
    grade: 'الصف الثالث الثانوي',
    level: 'متقدم',
    rating: 4.8,
    reviews: 1900,
    students: 16700,
    hours: 46,
    lectures: 190,
    instructor: 'أ. هبة سعيد',
    image: img('1546410531-bb4caa6b424d'),
    description:
      'منهج اللغة الإنجليزية كامل: Grammar, Vocabulary, Reading, Writing, مع تدريبات وامتحانات حقيقية.',
    curriculum: [
      { title: 'Grammar - Complete Review', duration: '12 ساعة' },
      { title: 'Vocabulary & Word Building', duration: '8 ساعات' },
      { title: 'Reading Comprehension', duration: '10 ساعات' },
      { title: 'Writing & Translation', duration: '8 ساعات' },
      { title: 'Final Revision & Exams', duration: '8 ساعات' },
    ],
  },
  {
    id: 'french-2nd-sec',
    title: 'لغة فرنسية - الصف الثاني الثانوي',
    category: 'لغة فرنسية',
    grade: 'الصف الثاني الثانوي',
    level: 'مبتدئ',
    rating: 4.5,
    reviews: 520,
    students: 4200,
    hours: 24,
    lectures: 96,
    instructor: 'أ. سلمى رشاد',
    image: img('1526374965328-7f61d4dc18c5'),
    description:
      'تعلم اللغة الفرنسية من الأساسيات للصف الثاني الثانوي: قواعد، مفردات، قراءة، مع نطق صحيح.',
    curriculum: [
      { title: 'Les Bases - الأساسيات', duration: '6 ساعات' },
      { title: 'Grammaire - القواعد', duration: '8 ساعات' },
      { title: 'Vocabulaire - المفردات', duration: '5 ساعات' },
      { title: 'Lecture - القراءة', duration: '5 ساعات' },
    ],
  },
  {
    id: 'history-3rd-sec',
    title: 'تاريخ وجغرافيا - الصف الثالث الثانوي',
    category: 'تاريخ وجغرافيا',
    grade: 'الصف الثالث الثانوي',
    level: 'متوسط',
    rating: 4.6,
    reviews: 680,
    students: 5400,
    hours: 28,
    lectures: 110,
    instructor: 'أ. محمد عبد الرحمن',
    image: img('1461360370910-7b67c4587729'),
    description:
      'منهج التاريخ والجغرافيا للصف الثالث الثانوي: تاريخ مصر الحديث، الجغرافيا الطبيعية والبشرية.',
    curriculum: [
      { title: 'تاريخ مصر الحديث', duration: '8 ساعات' },
      { title: 'تاريخ الحركة الوطنية', duration: '6 ساعات' },
      { title: 'الجغرافيا الطبيعية', duration: '7 ساعات' },
      { title: 'الجغرافيا البشرية', duration: '7 ساعات' },
    ],
  },
  {
    id: 'philosophy-3rd-sec',
    title: 'فلسفة ومنطق - الصف الثالث الثانوي',
    category: 'فلسفة ومنطق',
    grade: 'الصف الثالث الثانوي',
    level: 'متوسط',
    rating: 4.5,
    reviews: 450,
    students: 3800,
    hours: 22,
    lectures: 88,
    instructor: 'د. منى السيد',
    image: img('1481627834876-b7833e8f5570'),
    description:
      'منهج الفلسفة والمنطق للصف الثالث الثانوي: مدارس الفلسفة، المنطق، فلسفة العلوم، بأسلوب مبسط.',
    curriculum: [
      { title: 'مدخل إلى الفلسفة', duration: '5 ساعات' },
      { title: 'المدارس الفلسفية', duration: '7 ساعات' },
      { title: 'المنطق', duration: '6 ساعات' },
      { title: 'فلسفة العلوم', duration: '4 ساعات' },
    ],
  },
  {
    id: 'cs-1st-sec',
    title: 'علوم الحاسب - الصف الأول الثانوي',
    category: 'علوم الحاسب',
    grade: 'الصف الأول الثانوي',
    level: 'مبتدئ',
    rating: 4.7,
    reviews: 380,
    students: 3100,
    hours: 20,
    lectures: 80,
    instructor: 'م. كريم حسن',
    image: img('1517694712202-14dd9538aa97'),
    description:
      'مقدمة في علوم الحاسب للصف الأول الثانوي: أساسيات البرمجة، الحاسوب، الشبكات، الأمن السيبراني.',
    curriculum: [
      { title: 'مقدمة في الحاسوب', duration: '4 ساعات' },
      { title: 'أساسيات البرمجة', duration: '6 ساعات' },
      { title: 'الشبكات والإنترنت', duration: '5 ساعات' },
      { title: 'الأمن السيبراني', duration: '5 ساعات' },
    ],
  },
  {
    id: 'cs-3rd-sec',
    title: 'علوم الحاسب - الصف الثالث الثانوي (منهج كامل)',
    category: 'علوم الحاسب',
    grade: 'الصف الثالث الثانوي',
    level: 'متقدم',
    rating: 4.9,
    reviews: 720,
    students: 6500,
    hours: 32,
    lectures: 130,
    instructor: 'م. كريم حسن',
    image: img('1573167639802-221e8b8b3b3c'),
    description:
      'منهج علوم الحاسب كامل للصف الثالث الثانوي: قواعد البيانات، البرمجة، تحليل النظم، الشبكات.',
    curriculum: [
      { title: 'قواعد البيانات', duration: '8 ساعات' },
      { title: 'البرمجة المتقدمة', duration: '10 ساعات' },
      { title: 'تحليل وتصميم النظم', duration: '7 ساعات' },
      { title: 'الشبكات والأمن', duration: '7 ساعات' },
    ],
  },
];

export const getCourse = (id: string) => courses.find((c) => c.id === id);
