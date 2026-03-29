// All searchable content across the website
const searchData = [
  // === Services ===
  {
    title: 'قانون جنائي',
    content: 'التمثيل القانوني الشامل في القضايا الجنائية مع دفاع قوي وفعال',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'قانون تجاري',
    content: 'استشارات متخصصة في العقود والشراكات والقضايا التجارية المعقدة',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'قانون الأسرة',
    content: 'خدمات قانونية في قضايا الزواج والطلاق والحضانة والميراث',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'قانون العقارات',
    content: 'استشارات شاملة في شراء وبيع وتأجير العقارات والملكيات',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'قانون العمل',
    content: 'حماية حقوق العمال والموظفين والشركات في النزاعات العمالية',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'قانون الضرائب',
    content: 'استشارات ضريبية متخصصة وتمثيل أمام السلطات الضريبية',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'صياغة المذكرات القانونية والعقود',
    content: 'صياغة المذكرات القانونية والعقود بدقة واحترافية عالية',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'إدارة القضايا والمنازعات',
    content: 'إدارة القضايا والمنازعات القانونية بكفاءة واحترافية',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'الاستشارات القانونية',
    content: 'تقديم الاستشارات القانونية المتخصصة في مختلف المجالات',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'صياغة العقود باللغة الإنجليزية',
    content: 'صياغة العقود والمستندات القانونية باللغة الإنجليزية',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'قضايا الأحوال الشخصية (قضايا الأسرة)',
    content: 'التمثيل القانوني في قضايا الأحوال الشخصية والأسرة والزواج والطلاق والحضانة والنفقة',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'قضايا الجنايات والجنح والمخالفات',
    content: 'الدفاع في قضايا الجنايات والجنح والمخالفات أمام المحاكم',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'القضايا المدنية والتجارية',
    content: 'التمثيل القانوني في القضايا المدنية والتجارية والنزاعات',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'تأسيس الشركات',
    content: 'خدمات تأسيس الشركات والمؤسسات التجارية وتسجيلها قانونياً',
    category: 'خدمات',
    path: '/services',
  },
  {
    title: 'دعاوى القضاء الإداري والقضايا العمالية',
    content: 'دعاوى القضاء الإداري مجلس الدولة والقضايا العمالية',
    category: 'خدمات',
    path: '/services',
  },

  // === Articles ===
  {
    title: 'حقوقك القانونية عند توقيع عقد عمل',
    content: 'موضوع شامل عن الحقوق الأساسية للموظف عند التوقيع على عقد عمل جديد والبنود الواجب الانتباه لها. قانون العمل. د. محمد الدعيج',
    category: 'مقالات',
    path: '/articles',
  },
  {
    title: 'الدليل الشامل للعقود الإلكترونية',
    content: 'شرح مفصل عن صحة العقود المبرمة إلكترونياً والآثار القانونية وكيفية حماية حقوقك. قانون رقمي. أ. فاطمة الخاطر',
    category: 'مقالات',
    path: '/articles',
  },
  {
    title: 'الضرائب على الشركات: ما تحتاج معرفته',
    content: 'استعراض شامل للالتزامات الضريبية للشركات وكيفية تحضير الإقرارات الضريبية بشكل صحيح. القانون الضريبي. م. أحمد السعيد',
    category: 'مقالات',
    path: '/articles',
  },
  {
    title: 'الحماية القانونية للملكية الفكرية',
    content: 'شرح تفصيلي لقوانين حماية براءات الاختراع والعلامات التجارية والنماذج الصناعية. الملكية الفكرية. د. سارة النومان',
    category: 'مقالات',
    path: '/articles',
  },

  // === News ===
  {
    title: 'تعديلات جديدة في قانون العمل الكويتي',
    content: 'دخلت التعديلات الجديدة على قانون العمل حيز التنفيذ الشهر الماضي',
    category: 'أخبار',
    path: '/news',
  },
  {
    title: 'فوز بقضية تاريخية في القطاع القانوني',
    content: 'حققنا نجاحاً كبيراً في الدفاع عن عميلنا في قضية تجارية معقدة',
    category: 'أخبار',
    path: '/news',
  },
  {
    title: 'الندوة القانونية الربع سنوية - القانون التجاري',
    content: 'ستقام الندوة القادمة لمناقشة أحدث التطورات في القانون التجاري',
    category: 'أخبار',
    path: '/news',
  },

  // === Library ===
  {
    title: 'قانون العمل الكويتي',
    content: 'قانون العمل الكويتي مستند PDF للتحميل',
    category: 'مكتبة',
    path: '/library',
  },
  {
    title: 'نماذج العقود الأساسية',
    content: 'نماذج العقود الأساسية مستند Word للتحميل',
    category: 'مكتبة',
    path: '/library',
  },
  {
    title: 'أحكام محكمة التمييز المهمة',
    content: 'أحكام محكمة التمييز المهمة مستند PDF للتحميل',
    category: 'مكتبة',
    path: '/library',
  },
  {
    title: 'دليل الإجراءات المدنية',
    content: 'دليل الإجراءات المدنية مستند PDF',
    category: 'مكتبة',
    path: '/library',
  },
  {
    title: 'نماذج شكاوى جنائية',
    content: 'نماذج شكاوى جنائية مستند Word للتحميل',
    category: 'مكتبة',
    path: '/library',
  },
  {
    title: 'قضايا عملية محلولة',
    content: 'قضايا عملية محلولة مستند PDF للتحميل',
    category: 'مكتبة',
    path: '/library',
  },

  // === About ===
  {
    title: 'نبذة عني',
    content: 'محمد سامي — مستشار قانوني متخصص. يقدم حلولاً قانونية شاملة وعالية الجودة للأفراد والشركات بخبرة عميقة والتزام كامل بحماية حقوق العملاء. خبرة أكثر من 15 سنة في المجال. تمثيل قانوني شامل. استشارات قانونية فورية. حلول مخصصة لكل عميل. معدل نجاح عالي جداً.',
    category: 'نبذة عني',
    path: '/about',
  },

  // === Contact ===
  {
    title: 'اتصل بنا',
    content: 'تواصل معنا هاتف بريد إلكتروني موقع العنوان ساعات العمل استشارة قانونية',
    category: 'تواصل',
    path: '/contact',
  },
]

export function searchSite(query) {
  if (!query || !query.trim()) return []

  const normalizedQuery = query.trim().toLowerCase()
  const words = normalizedQuery.split(/\s+/)

  return searchData
    .map((item) => {
      const text = `${item.title} ${item.content}`.toLowerCase()
      let score = 0

      // Exact phrase match in title = highest score
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 10
      }
      // Exact phrase match in content
      if (item.content.toLowerCase().includes(normalizedQuery)) {
        score += 5
      }
      // Individual word matches
      for (const word of words) {
        if (word.length < 2) continue
        if (item.title.toLowerCase().includes(word)) score += 3
        if (item.content.toLowerCase().includes(word)) score += 1
      }

      return { ...item, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
}

export default searchData
