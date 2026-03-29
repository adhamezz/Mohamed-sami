import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Search, Download, ArrowRight, Eye, Tag } from 'lucide-react'
import { downloadDocument } from '../../utils/downloadHelper'

const forms = [
  { id: 1, title: 'صحيفة دعوى مدنية أمام المحكمة الابتدائية', category: 'دعاوى مدنية', court: 'المحكمة الابتدائية', description: 'نموذج صحيفة افتتاح دعوى مدنية أمام المحاكم الابتدائية مع البيانات الجوهرية المطلوبة', format: 'Word', popular: true, content: [{ heading: 'صحيفة دعوى مدنية أمام المحكمة الابتدائية' }, { text: 'إنه في يوم ........ الموافق ..../../.... م' }, { text: 'بناءً على طلب السيد / ........ المقيم في ........ ومحله المختار مكتب الأستاذ / ........ المحامي الكائن ........' }, { text: 'أنا ........ محضر محكمة ........ الابتدائية قد انتقلت إلى حيث إقامة:' }, { text: 'السيد / ........ المقيم في ........ مخاطبًا مع / ........' }, { heading: 'الموضوع' }, { text: '........ (يذكر وقائع الدعوى تفصيلاً) ........' }, { heading: 'الطلبات' }, { text: 'بناءً عليه أنا المحضر سالف الذكر قد انتقلت إلى حيث إقامة المعلن إليه وسلمته صورة من هذه الصحيفة وكلفته بالحضور أمام محكمة ........ الابتدائية الدائرة ........ بجلسة ........ الموافق ../../.... من الساعة ........ وما بعدها ليسمع الحكم عليه بـ:' }, { list: ['أولاً: ........', 'ثانياً: ........', 'ثالثاً: إلزام المدعى عليه بالمصاريف ومقابل أتعاب المحاماة'] }] },
  { id: 2, title: 'صحيفة دعوى تعويض عن فعل ضار', category: 'دعاوى مدنية', court: 'المحكمة الابتدائية', description: 'نموذج دعوى تعويض عن الأضرار المادية والأدبية الناتجة عن فعل ضار', format: 'Word', content: [{ heading: 'صحيفة دعوى تعويض عن فعل ضار' }, { text: 'إنه في يوم ........ الموافق ..../../.... م' }, { text: 'بناءً على طلب السيد / ........ المقيم ........ ومحله المختار مكتب الأستاذ / ........ المحامي' }, { heading: 'الوقائع' }, { text: 'بتاريخ ../../.... قام المعلن إليه بـ ........ مما ألحق بالطالب أضرارًا مادية وأدبية جسيمة تتمثل في ........' }, { heading: 'الأساس القانوني' }, { text: 'المادة 163 من القانون المدني: كل خطأ سبب ضررًا للغير يلزم من ارتكبه بالتعويض.' }, { heading: 'الطلبات' }, { list: ['أولاً: إلزام المدعى عليه بأن يؤدي للمدعي مبلغ ........ جنيه تعويضًا عن الأضرار المادية', 'ثانياً: إلزام المدعى عليه بأن يؤدي للمدعي مبلغ ........ جنيه تعويضًا عن الأضرار الأدبية', 'ثالثاً: إلزام المدعى عليه بالمصاريف ومقابل أتعاب المحاماة'] }] },
  { id: 3, title: 'صحيفة طعن بالاستئناف', category: 'طعون', court: 'محكمة الاستئناف', description: 'نموذج صحيفة استئناف حكم صادر من محكمة أول درجة', format: 'Word', popular: true, content: [{ heading: 'صحيفة استئناف حكم مدني' }, { text: 'إنه في يوم ........ الموافق ..../../....' }, { text: 'بناءً على طلب السيد / ........ (المستأنف) المقيم ........' }, { text: 'أنا ........ محضر محكمة ........ قد انتقلت إلى:' }, { text: 'السيد / ........ (المستأنف ضده) المقيم ........' }, { heading: 'الحكم المستأنف' }, { text: 'حكم محكمة ........ الابتدائية الصادر في الدعوى رقم ........ لسنة ........ بجلسة ../../.... والقاضي منطوقه: ........' }, { heading: 'أسباب الاستئناف' }, { list: ['أولاً: مخالفة الحكم للقانون ........', 'ثانياً: الفساد في الاستدلال ........', 'ثالثاً: القصور في التسبيب ........'] }] },
  { id: 4, title: 'صحيفة طعن بالنقض', category: 'طعون', court: 'محكمة النقض', description: 'نموذج صحيفة طعن بالنقض في الأحكام الاستئنافية', format: 'Word', content: [{ heading: 'صحيفة طعن بالنقض' }, { text: 'إلى السيد المستشار رئيس محكمة النقض' }, { text: 'مقدم من السيد / ........ (الطاعن) بصفته ........ ومحله المختار مكتب الأستاذ / ........ المحامي بالنقض' }, { text: 'ضد السيد / ........ (المطعون ضده)' }, { heading: 'الحكم المطعون فيه' }, { text: 'حكم محكمة استئناف ........ الصادر في الاستئناف رقم ........ لسنة ........ بجلسة ../../....' }, { heading: 'أسباب الطعن' }, { list: ['السبب الأول: مخالفة القانون والخطأ في تطبيقه', 'السبب الثاني: القصور في التسبيب والفساد في الاستدلال', 'السبب الثالث: الإخلال بحق الدفاع'] }] },
  { id: 5, title: 'صحيفة دعوى إخلاء لعدم سداد الأجرة', category: 'دعاوى إيجارات', court: 'المحكمة الابتدائية', description: 'نموذج دعوى فسخ عقد الإيجار وإخلاء العين المؤجرة لعدم سداد الأجرة', format: 'Word', content: [{ heading: 'صحيفة دعوى إخلاء لعدم سداد الأجرة' }, { text: 'بناءً على طلب السيد / ........ (المؤجر)' }, { heading: 'الوقائع' }, { text: 'بموجب عقد إيجار مؤرخ ../../.... استأجر المدعى عليه العين الكائنة في ........ بأجرة شهرية قدرها ........ جنيه.' }, { text: 'وحيث أن المدعى عليه امتنع عن سداد الأجرة عن المدة من ../../.... حتى ../../.... رغم إنذاره رسمياً على يد محضر.' }, { heading: 'الطلبات' }, { list: ['فسخ عقد الإيجار المؤرخ ../../....', 'إخلاء العين المؤجرة وتسليمها خالية', 'إلزام المدعى عليه بسداد متأخرات الأجرة'] }] },
  { id: 6, title: 'صحيفة دعوى نفقة زوجية', category: 'دعاوى أسرة', court: 'محكمة الأسرة', description: 'نموذج صحيفة دعوى فرض نفقة زوجية على الزوج', format: 'Word', popular: true, content: [{ heading: 'صحيفة دعوى نفقة زوجية' }, { text: 'السيد الأستاذ المستشار / رئيس محكمة الأسرة بـ ........' }, { text: 'مقدمة من السيدة / ........ (المدعية - الزوجة)' }, { text: 'ضد السيد / ........ (المدعى عليه - الزوج)' }, { heading: 'الموضوع' }, { text: 'المدعية زوجة للمدعى عليه بموجب عقد الزواج الرسمي المؤرخ ../../.... وتقيم معه في ........' }, { text: 'والمدعى عليه امتنع عن الإنفاق على المدعية رغم يساره وقدرته على ذلك.' }, { heading: 'الطلبات' }, { list: ['فرض نفقة زوجية شاملة (مأكل ومشرب وملبس ومسكن)', 'فرض نفقة شهرية لا تقل عن ........ جنيه', 'إلزام المدعى عليه بالمصاريف'] }] },
  { id: 7, title: 'صحيفة دعوى خلع', category: 'دعاوى أسرة', court: 'محكمة الأسرة', description: 'نموذج صحيفة دعوى خلع مع إشهار الزوجة تنازلها عن حقوقها المالية', format: 'Word', content: [{ heading: 'صحيفة دعوى خلع' }, { text: 'مقدمة من السيدة / ........ ضد السيد / ........' }, { heading: 'الموضوع' }, { text: 'المدعية زوجة للمدعى عليه وتبغض الحياة الزوجية معه وتخشى ألا تقيم حدود الله بسبب هذا البغض.' }, { text: 'وتشهد المدعية بأنها ترد للمدعى عليه مقدم الصداق البالغ ........ جنيه وتتنازل عن جميع حقوقها المالية الشرعية.' }, { heading: 'الطلبات' }, { list: ['تطليق المدعية من المدعى عليه خلعاً', 'إثبات تنازل المدعية عن حقوقها المالية الشرعية'] }] },
  { id: 8, title: 'صحيفة جنحة مباشرة', category: 'دعاوى جنائية', court: 'محكمة الجنح', description: 'نموذج صحيفة ادعاء مباشر في جنحة جنائية مع التعويض', format: 'Word', content: [{ heading: 'صحيفة جنحة مباشرة (ادعاء مباشر)' }, { text: 'بناءً على طلب السيد / ........ (المدعي بالحق المدني)' }, { heading: 'الوقائع' }, { text: 'بتاريخ ../../.... قام المتهم / ........ بارتكاب جريمة ........ ضد المدعي بالحق المدني.' }, { heading: 'القيد والوصف' }, { text: 'الواقعة تشكل جنحة ........ المعاقب عليها بالمادة ........ من قانون العقوبات.' }, { heading: 'الطلبات' }, { list: ['معاقبة المتهم بالعقوبة المقررة قانوناً', 'إلزام المتهم بأن يؤدي مبلغ ........ تعويضاً مؤقتاً', 'إلزامه بالمصاريف'] }] },
  { id: 9, title: 'صحيفة دعوى إلغاء قرار إداري', category: 'دعاوى إدارية', court: 'محاكم مجلس الدولة', description: 'نموذج صحيفة طعن بإلغاء قرار إداري أمام محاكم مجلس الدولة', format: 'Word', content: [{ heading: 'صحيفة دعوى إلغاء قرار إداري' }, { text: 'إلى السيد المستشار / رئيس محكمة القضاء الإداري' }, { text: 'مقدمة من السيد / ........ ضد السيد / ........ بصفته' }, { heading: 'القرار المطعون فيه' }, { text: 'القرار رقم ........ لسنة ........ الصادر بتاريخ ../../.... المتضمن ........' }, { heading: 'أسباب الطعن' }, { list: ['عيب عدم الاختصاص', 'مخالفة القانون', 'إساءة استعمال السلطة', 'عيب الشكل والإجراءات'] }] },
  { id: 10, title: 'صحيفة إشكال في تنفيذ حكم', category: 'دعاوى تنفيذ', court: 'قاضي التنفيذ', description: 'نموذج إشكال وقتي في تنفيذ حكم مدني', format: 'Word', content: [{ heading: 'صحيفة إشكال في تنفيذ حكم' }, { text: 'بناءً على طلب السيد / ........ (المستشكل)' }, { text: 'ضد السيد / ........ (المستشكل ضده)' }, { heading: 'الحكم المستشكل في تنفيذه' }, { text: 'الحكم الصادر في الدعوى رقم ........ لسنة ........ بجلسة ../../....' }, { heading: 'أسباب الإشكال' }, { text: 'يستند المستشكل في إشكاله إلى ........ مما يستوجب وقف تنفيذ الحكم مؤقتاً.' }, { heading: 'الطلبات' }, { list: ['وقف تنفيذ الحكم المستشكل فيه مؤقتاً', 'إلزام المستشكل ضده بالمصاريف'] }] },
  { id: 11, title: 'صحيفة أمر أداء', category: 'دعاوى تجارية', court: 'المحكمة الابتدائية', description: 'نموذج طلب استصدار أمر أداء لدين ثابت بالكتابة حال الأداء ومعين المقدار', format: 'Word', content: [{ heading: 'عريضة طلب أمر أداء' }, { text: 'إلى السيد المستشار / رئيس محكمة ........ الابتدائية' }, { text: 'مقدم من السيد / ........ (الدائن)' }, { heading: 'الموضوع' }, { text: 'يداين الطالب المدين بمبلغ ........ جنيه بموجب ........ (سند إذني / كمبيالة / شيك) وهو دين ثابت بالكتابة حال الأداء ومعين المقدار.' }, { heading: 'الطلبات' }, { list: ['إصدار أمر أداء بإلزام المدين بأن يؤدي للدائن مبلغ ........', 'إلزامه بالفوائد القانونية من تاريخ المطالبة', 'إلزامه بالمصاريف'] }] },
  { id: 12, title: 'صحيفة دعوى فصل تعسفي', category: 'دعاوى عمالية', court: 'محكمة العمال', description: 'نموذج دعوى تعويض عن الفصل التعسفي وحقوق العامل', format: 'Word', content: [{ heading: 'صحيفة دعوى فصل تعسفي' }, { text: 'مقدمة من السيد / ........ (العامل المفصول) ضد السيد / ........ (صاحب العمل)' }, { heading: 'الوقائع' }, { text: 'التحق المدعي بالعمل لدى المدعى عليه بتاريخ ../../.... بموجب عقد عمل ........ براتب شهري قدره ........' }, { text: 'وبتاريخ ../../.... قام المدعى عليه بفصل المدعي تعسفياً دون سبب مشروع ودون إنذار مسبق.' }, { heading: 'الطلبات' }, { list: ['تعويض عن الفصل التعسفي', 'مهلة الإنذار أو بدلها', 'مكافأة نهاية الخدمة', 'رصيد الإجازات غير المستنفدة', 'شهادة خبرة'] }] },
  { id: 13, title: 'صحيفة دعوى صحة ونفاذ عقد بيع', category: 'دعاوى مدنية', court: 'المحكمة الابتدائية', description: 'نموذج دعوى صحة ونفاذ عقد بيع عقار لنقل الملكية رسمياً', format: 'Word', content: [{ heading: 'صحيفة دعوى صحة ونفاذ عقد بيع' }, { text: 'بناءً على طلب السيد / ........ (المشتري)' }, { heading: 'الموضوع' }, { text: 'بموجب عقد البيع الابتدائي المؤرخ ../../.... باع المدعى عليه للمدعي العقار الكائن في ........ نظير ثمن قدره ........ جنيه تم سداده بالكامل.' }, { heading: 'الطلبات' }, { list: ['الحكم بصحة ونفاذ عقد البيع الابتدائي', 'التأشير بمنطوق الحكم على هامش تسجيل العقار', 'إلزام المدعى عليه بالمصاريف'] }] },
  { id: 14, title: 'صحيفة دعوى حضانة', category: 'دعاوى أسرة', court: 'محكمة الأسرة', description: 'نموذج دعوى ضم حضانة صغير أو صغيرة إلى الأم أو الأب', format: 'Word', popular: true, content: [{ heading: 'صحيفة دعوى حضانة' }, { text: 'مقدمة من السيدة / ........ ضد السيد / ........' }, { heading: 'الموضوع' }, { text: 'المدعية أم للصغير/ة ........ المولود/ة بتاريخ ../../.... من المدعى عليه بموجب عقد الزواج الرسمي.' }, { text: 'وحيث أن المدعى عليه يحتجز الصغير/ة بدون وجه حق رغم أن المدعية هي الأحق بالحضانة شرعاً وقانوناً.' }, { heading: 'الطلبات' }, { list: ['ضم حضانة الصغير/ة ........ للمدعية', 'تمكين المدعية من استلام الصغير/ة', 'النفاذ المعجل بلا كفالة'] }] },
  { id: 15, title: 'صحيفة دعوى مطالبة مالية', category: 'دعاوى تجارية', court: 'المحكمة الابتدائية', description: 'نموذج دعوى مطالبة بمبلغ مالي ناشئ عن علاقة تعاقدية', format: 'Word', content: [{ heading: 'صحيفة دعوى مطالبة مالية' }, { text: 'بناءً على طلب السيد / ........ (الدائن) ضد السيد / ........ (المدين)' }, { heading: 'الموضوع' }, { text: 'بموجب العلاقة التعاقدية القائمة بين الطرفين والثابتة بـ ........ يداين المدعي المدعى عليه بمبلغ ........ جنيه.' }, { heading: 'الطلبات' }, { list: ['إلزام المدعى عليه بأن يؤدي للمدعي مبلغ ........', 'الفوائد القانونية من تاريخ المطالبة القضائية', 'المصاريف ومقابل أتعاب المحاماة'] }] },
  { id: 16, title: 'صحيفة دعوى رؤية صغير', category: 'دعاوى أسرة', court: 'محكمة الأسرة', description: 'نموذج دعوى تمكين من رؤية الصغير أو الاستضافة', format: 'Word', content: [{ heading: 'صحيفة دعوى رؤية صغير' }, { text: 'مقدمة من السيد / ........ (الأب) ضد السيدة / ........ (الأم الحاضنة)' }, { heading: 'الموضوع' }, { text: 'المدعي أب للصغير/ة ........ والمحضون/ة لدى المدعى عليها الحاضنة. والمدعى عليها تمتنع عن تمكين المدعي من رؤية الصغير/ة.' }, { heading: 'الطلبات' }, { list: ['تنظيم رؤية أسبوعية للصغير/ة يوم ........ من الساعة ........ إلى الساعة ........', 'تحديد مكان الرؤية بـ ........', 'النفاذ المعجل'] }] },
]

const categories = ['الكل', 'دعاوى مدنية', 'طعون', 'دعاوى أسرة', 'دعاوى جنائية', 'دعاوى إدارية', 'دعاوى إيجارات', 'دعاوى تجارية', 'دعاوى عمالية', 'دعاوى تنفيذ']

export default function LawsuitFormsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filtered = forms.filter(f => {
    const matchSearch = !search || f.title.includes(search) || f.description.includes(search)
    const matchCat = activeCategory === 'الكل' || f.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><FileText size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">صيغ الدعاوي</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">مجموعة شاملة من صيغ الدعاوي القانونية الجاهزة للاستخدام أمام مختلف المحاكم</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن صيغة دعوى..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.slice(0, 6).map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-cairo font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(f => (
              <div key={f.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 group relative overflow-hidden">
                {f.popular && <span className="absolute top-0 left-0 bg-gold-500 text-white text-[10px] font-cairo font-bold px-3 py-1 rounded-br-lg">الأكثر طلباً</span>}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold-50 transition-colors">
                    <FileText size={22} className="text-navy-700 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[11px] font-cairo bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{f.category}</span>
                      <span className="text-[11px] font-cairo text-gray-400 flex items-center gap-1"><Tag size={9} />{f.court}</span>
                    </div>
                    <h3 className="text-base font-tajawal font-bold text-navy-900 mb-1.5 group-hover:text-gold-500 transition-colors">{f.title}</h3>
                    <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-3">{f.description}</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => downloadDocument(f.title, f.content, 'form')} className="flex items-center gap-1.5 text-gold-500 hover:text-gold-600 font-cairo text-xs font-bold transition-colors"><Download size={13} /> تحميل</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><FileText size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج صياغة دعوى مخصصة؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني يقدم خدمة صياغة الدعاوي المتخصصة وفقاً لظروف قضيتك</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
