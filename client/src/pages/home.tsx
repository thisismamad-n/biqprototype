import { useState, useMemo } from "react";
import PetalDiagram, { type SectionType, type SectionData } from "@/components/PetalDiagram";
import SectionDetailModal from "@/components/SectionDetailModal";
import BusinessHealthMeter from "@/components/BusinessHealthMeter";
import AITipsSidebar from "@/components/AITipsSidebar";
import type { SubsectionData } from "@/components/SubsectionCard";
import { Sparkles, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// todo: remove mock functionality
const SUBSECTIONS_DATA: Record<SectionType, SubsectionData[]> = {
  strategy: [
    { id: "mission", label: "بیانیه مأموریت", description: "هدف اصلی و ارزش‌های شرکت خود را تعریف کنید", progress: 0, value: "" },
    { id: "vision", label: "چشم‌انداز", description: "شرکت خود را در ۵ سال آینده کجا می‌بینید؟", progress: 0, value: "" },
    { id: "values", label: "ارزش‌های اصلی", description: "چه اصولی تصمیمات کسب‌وکار شما را هدایت می‌کنند؟", progress: 0, value: "" },
    { id: "goals", label: "اهداف استراتژیک", description: "اهداف اصلی کسب‌وکار خود را تعیین کنید", progress: 0, value: "" },
    { id: "swot", label: "تحلیل SWOT", description: "نقاط قوت، ضعف، فرصت‌ها و تهدیدات را شناسایی کنید", progress: 0, value: "" },
    { id: "competitive", label: "مزیت رقابتی", description: "چه چیزی شما را در بازار منحصر به فرد می‌کند؟", progress: 0, value: "" },
  ],
  operations: [
    { id: "processes", label: "فرآیندهای اصلی", description: "گردش کارهای عملیاتی کلیدی خود را مستند کنید", progress: 0, value: "" },
    { id: "suppliers", label: "تأمین‌کنندگان", description: "تأمین‌کنندگان و شرکای اصلی خود را فهرست کنید", progress: 0, value: "" },
    { id: "quality", label: "استانداردهای کیفیت", description: "اقدامات کنترل کیفیت خود را تعریف کنید", progress: 0, value: "" },
    { id: "inventory", label: "مدیریت موجودی", description: "چگونه موجودی و منابع را مدیریت می‌کنید؟", progress: 0, value: "" },
  ],
  hr: [
    { id: "team", label: "ساختار تیم", description: "سلسله مراتب سازمانی خود را ترسیم کنید", progress: 0, value: "" },
    { id: "hiring", label: "فرآیند استخدام", description: "استراتژی استخدام خود را تعریف کنید", progress: 0, value: "" },
    { id: "culture", label: "فرهنگ سازمانی", description: "ارزش‌ها و محیط کاری خود را شرح دهید", progress: 0, value: "" },
    { id: "benefits", label: "بسته مزایا", description: "چه مزایایی به کارکنان ارائه می‌دهید؟", progress: 0, value: "" },
    { id: "training", label: "برنامه‌های آموزشی", description: "چگونه مهارت‌های تیم خود را توسعه می‌دهید؟", progress: 0, value: "" },
  ],
  branding: [
    { id: "logo", label: "لوگو و هویت", description: "عناصر بصری برند خود را تعریف کنید", progress: 0, value: "" },
    { id: "voice", label: "لحن برند", description: "برند شما چگونه ارتباط برقرار می‌کند؟", progress: 0, value: "" },
    { id: "positioning", label: "جایگاه‌یابی برند", description: "چگونه می‌خواهید درک شوید؟", progress: 0, value: "" },
    { id: "guidelines", label: "راهنمای برند", description: "استانداردهای برند خود را مستند کنید", progress: 0, value: "" },
  ],
  finance: [
    { id: "budget", label: "برنامه بودجه", description: "تخصیص مالی خود را مشخص کنید", progress: 0, value: "" },
    { id: "pricing", label: "استراتژی قیمت‌گذاری", description: "محصولات/خدمات خود را چگونه قیمت‌گذاری می‌کنید؟", progress: 0, value: "" },
    { id: "revenue", label: "جریان‌های درآمد", description: "منابع درآمد خود را شناسایی کنید", progress: 0, value: "" },
    { id: "expenses", label: "هزینه‌های ثابت", description: "هزینه‌های تکرارشونده خود را فهرست کنید", progress: 0, value: "" },
    { id: "projections", label: "پیش‌بینی‌های مالی", description: "مالی ۱۲ ماهه خود را پیش‌بینی کنید", progress: 0, value: "" },
  ],
  product: [
    { id: "roadmap", label: "نقشه راه محصول", description: "جدول زمانی توسعه محصول را برنامه‌ریزی کنید", progress: 0, value: "" },
    { id: "features", label: "ویژگی‌های کلیدی", description: "ویژگی‌های اصلی محصول شما چیست؟", progress: 0, value: "" },
    { id: "market", label: "بازار هدف", description: "مشتری ایده‌آل شما کیست؟", progress: 0, value: "" },
    { id: "feedback", label: "بازخورد کاربران", description: "چگونه بینش مشتری جمع‌آوری می‌کنید؟", progress: 0, value: "" },
  ],
  sales: [
    { id: "funnel", label: "قیف فروش", description: "سفر مشتری را ترسیم کنید", progress: 0, value: "" },
    { id: "channels", label: "کانال‌های فروش", description: "محصولات خود را کجا می‌فروشید؟", progress: 0, value: "" },
    { id: "targets", label: "اهداف فروش", description: "اهداف درآمدی خود را تعیین کنید", progress: 0, value: "" },
    { id: "crm", label: "سیستم CRM", description: "روابط با مشتریان را چگونه مدیریت می‌کنید؟", progress: 0, value: "" },
  ],
  technology: [
    { id: "infrastructure", label: "زیرساخت فناوری", description: "از چه سیستم‌ها و ابزارهایی استفاده می‌کنید؟", progress: 0, value: "" },
    { id: "security", label: "اقدامات امنیتی", description: "چگونه از داده‌های خود محافظت می‌کنید؟", progress: 0, value: "" },
    { id: "website", label: "وب‌سایت و اپلیکیشن‌ها", description: "حضور دیجیتال خود را شرح دهید", progress: 0, value: "" },
    { id: "automation", label: "ابزارهای اتوماسیون", description: "چه فرآیندهایی خودکار شده‌اند؟", progress: 0, value: "" },
  ],
  legal: [
    { id: "structure", label: "ساختار کسب‌وکار", description: "شرکت با مسئولیت محدود، سهامی و غیره", progress: 0, value: "" },
    { id: "licenses", label: "مجوزها و پروانه‌ها", description: "به چه مجوزهایی نیاز دارید؟", progress: 0, value: "" },
    { id: "contracts", label: "قراردادهای کلیدی", description: "توافقات مهم را مستند کنید", progress: 0, value: "" },
    { id: "compliance", label: "انطباق", description: "باید از چه مقرراتی پیروی کنید؟", progress: 0, value: "" },
  ],
};

// todo: remove mock functionality
const AI_TIPS: Record<SectionType, Array<{ icon: "sparkles" | "lightbulb" | "trending" | "alert"; title: string; description: string }>> = {
  strategy: [
    { icon: "sparkles", title: "چشم‌انداز خود را تعریف کنید", description: "با یک بیانیه مأموریت واضح که هدف و اهداف بلندمدت شما را تعریف می‌کند، شروع کنید. این همه تصمیمات استراتژیک را هدایت خواهد کرد." },
    { icon: "lightbulb", title: "تحلیل رقابتی", description: "۳ تا ۵ رقیب اصلی خود را تحقیق کنید تا شکاف‌های بازار و فرصت‌های تمایز را شناسایی کنید." },
    { icon: "trending", title: "اهداف SMART تعیین کنید", description: "اهداف خاص، قابل اندازه‌گیری، قابل دستیابی، مرتبط و زمان‌دار را برای ۱۲ ماه آینده تعیین کنید." },
  ],
  operations: [
    { icon: "sparkles", title: "همه چیز را مستند کنید", description: "رویه‌های عملیاتی استاندارد (SOP) را برای تمام فرآیندهای کلیدی ایجاد کنید تا از ثبات و مقیاس‌پذیری اطمینان حاصل شود." },
    { icon: "alert", title: "گلوگاه‌ها را شناسایی کنید", description: "گردش کارهای خود را ترسیم کنید تا ناکارآمدی‌ها و مناطقی که فرآیندها کند می‌شوند را پیدا کنید." },
    { icon: "trending", title: "کارهای تکراری را خودکار کنید", description: "به دنبال فرصت‌هایی برای استفاده از ابزارهای نرم‌افزاری باشید تا کار دستی و خطاها را کاهش دهید." },
  ],
  hr: [
    { icon: "lightbulb", title: "فرهنگ قوی بسازید", description: "ارزش‌های خود را زود تعریف کنید و افرادی را استخدام کنید که با آن‌ها همسو هستند. تناسب فرهنگی به اندازه مهارت‌ها مهم است." },
    { icon: "sparkles", title: "در توسعه سرمایه‌گذاری کنید", description: "آموزش منظم و فرصت‌های رشد، حفظ را بهبود می‌بخشد و تیم قوی‌تری می‌سازد." },
    { icon: "trending", title: "ارتباط شفاف", description: "بررسی‌های منظم و کانال‌های بازخورد شفاف برقرار کنید تا همه همسو باشند." },
  ],
  branding: [
    { icon: "sparkles", title: "ثبات کلید است", description: "از رنگ‌ها، فونت‌ها و لحن یکسان در تمام پلتفرم‌ها استفاده کنید تا شناخت برند را ایجاد کنید." },
    { icon: "lightbulb", title: "داستان خود را بگویید", description: "داستان منشأ و ارزش‌های خود را به اشتراک بگذارید تا ارتباطات احساسی با مشتریان ایجاد کنید." },
    { icon: "trending", title: "متمایز باشید", description: "آنچه را که شما را متفاوت می‌کند شناسایی کنید و آن را در تمام مواد برندینگ تقویت کنید." },
  ],
  finance: [
    { icon: "alert", title: "جریان نقدی را پیگیری کنید", description: "جریان نقدی خود را هفتگی نظارت کنید تا از غافلگیری‌ها جلوگیری کنید و اطمینان حاصل کنید که می‌توانید هزینه‌ها را پوشش دهید." },
    { icon: "sparkles", title: "درآمد را متنوع کنید", description: "جریان‌های درآمدی متعدد ثبات فراهم می‌کنند و ریسک را کاهش می‌دهند اگر یک کانال کمتر عمل کند." },
    { icon: "trending", title: "برای رشد برنامه‌ریزی کنید", description: "بودجه را برای بازاریابی و توسعه کنار بگذارید تا گسترش پایدار را تغذیه کنید." },
  ],
  product: [
    { icon: "lightbulb", title: "با MVP شروع کنید", description: "یک محصول حداقلی قابل استفاده را راه‌اندازی کنید تا فرضیات خود را آزمایش کنید و بازخورد واقعی کاربر جمع‌آوری کنید." },
    { icon: "sparkles", title: "به کاربران گوش دهید", description: "مصاحبه‌های منظم کاربر و جلسات بازخورد به شما کمک می‌کنند آنچه مردم واقعاً می‌خواهند بسازید." },
    { icon: "trending", title: "سریع تکرار کنید", description: "از چرخه‌های توسعه کوتاه استفاده کنید تا ایده‌ها را آزمایش کنید، سریع یاد بگیرید و با نیازهای بازار سازگار شوید." },
  ],
  sales: [
    { icon: "sparkles", title: "مشتری خود را بشناسید", description: "پرسونای خریدار دقیق ایجاد کنید تا نقاط درد و انگیزه‌های خرید آن‌ها را درک کنید." },
    { icon: "trending", title: "قیف خود را بهینه کنید", description: "معیارها را در هر مرحله پیگیری کنید تا شناسایی کنید کجا مشتریان بالقوه افت می‌کنند و تبدیل را بهبود بخشید." },
    { icon: "lightbulb", title: "روابط بسازید", description: "بر حل مشکلات و افزودن ارزش تمرکز کنید، نه فقط بستن معاملات." },
  ],
  technology: [
    { icon: "alert", title: "امنیت را اولویت قرار دهید", description: "رمزهای عبور قوی، احراز هویت دو مرحله‌ای و پشتیبان‌گیری منظم را پیاده‌سازی کنید تا از داده‌های کسب‌وکار خود محافظت کنید." },
    { icon: "sparkles", title: "ابزارهای مقیاس‌پذیر انتخاب کنید", description: "نرم‌افزاری را انتخاب کنید که می‌تواند با کسب‌وکار شما رشد کند تا از مهاجرت‌های پرهزینه بعداً جلوگیری کنید." },
    { icon: "trending", title: "به‌روز بمانید", description: "سیستم‌ها و نرم‌افزار را به‌روز نگه دارید تا امنیت را حفظ کنید و به ویژگی‌های جدید دسترسی داشته باشید." },
  ],
  legal: [
    { icon: "alert", title: "کمک حرفه‌ای بگیرید", description: "با یک وکیل مشورت کنید تا مطمئن شوید به درستی ساختار یافته و با مقررات مطابقت دارید." },
    { icon: "sparkles", title: "از مالکیت معنوی خود محافظت کنید", description: "نام و لوگوی برند خود را زود ثبت کنید تا از استفاده دیگران از آن‌ها جلوگیری کنید." },
    { icon: "lightbulb", title: "از توافقات کتبی استفاده کنید", description: "همیشه قراردادها را کتبی دریافت کنید تا از سوءتفاهم‌ها و اختلافات جلوگیری کنید." },
  ],
};

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subsectionsState, setSubsectionsState] = useState(SUBSECTIONS_DATA);

  const sections: SectionData[] = useMemo(() => {
    const sectionTypes: SectionType[] = [
      "strategy", "operations", "hr", "branding", 
      "finance", "product", "sales", "technology", "legal"
    ];
    
    const labels: Record<SectionType, string> = {
      strategy: "استراتژی",
      operations: "عملیات",
      hr: "منابع انسانی",
      branding: "برندینگ",
      finance: "مالی",
      product: "محصول",
      sales: "فروش",
      technology: "فناوری",
      legal: "حقوقی"
    };
    
    return sectionTypes.map(type => {
      const subsections = subsectionsState[type];
      const totalProgress = subsections.reduce((sum, sub) => sum + sub.progress, 0);
      const avgProgress = Math.round(totalProgress / subsections.length);
      
      return {
        id: type,
        label: labels[type],
        progress: avgProgress,
      };
    });
  }, [subsectionsState]);

  const overallProgress = useMemo(() => {
    const total = sections.reduce((sum, s) => sum + s.progress, 0);
    return Math.round(total / sections.length);
  }, [sections]);

  const handleSectionClick = (sectionId: SectionType) => {
    setSelectedSection(sectionId);
    setIsModalOpen(true);
  };

  const handleSubsectionUpdate = (subsectionId: string, value: string) => {
    if (!selectedSection) return;
    
    setSubsectionsState(prev => {
      const updated = { ...prev };
      const sectionSubsections = [...updated[selectedSection]];
      const subsectionIndex = sectionSubsections.findIndex(s => s.id === subsectionId);
      
      if (subsectionIndex >= 0) {
        const subsection = { ...sectionSubsections[subsectionIndex] };
        subsection.value = value;
        subsection.progress = value.trim().length > 0 ? 100 : 0;
        sectionSubsections[subsectionIndex] = subsection;
        updated[selectedSection] = sectionSubsections;
      }
      
      return updated;
    });
  };

  const currentSubsections = selectedSection ? subsectionsState[selectedSection] : [];
  const currentTips = selectedSection ? AI_TIPS[selectedSection] : [];
  
  const sectionLabels: Record<SectionType, string> = {
    strategy: "استراتژی",
    operations: "عملیات",
    hr: "منابع انسانی",
    branding: "برندینگ",
    finance: "مالی",
    product: "محصول",
    sales: "فروش",
    technology: "فناوری",
    legal: "حقوقی"
  };

  const scrollToDetails = () => {
    document.getElementById('details-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section - Full Viewport */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Floating Header */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute top-6 left-6 z-20"
        >
          <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-2xl border border-white/20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75 animate-pulse"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                طرح جامع رشد کسب‌وکار
              </h1>
              <p className="text-xs text-muted-foreground">برنامه کسب‌وکار کامل خود را بسازید</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Badge */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="absolute top-6 right-6 z-20"
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                پیشرفت کلی
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                ٪{overallProgress}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="text-center mb-12 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              پلتفرم هوشمند مدیریت کسب‌وکار
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              اکوسیستم کسب‌وکار شما
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
            با کلیک بر هر بخش، سفر توسعه کسب‌وکار خود را آغاز کنید
          </p>
        </motion.div>

        {/* Diagram Container with Glow Effect */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          className="relative w-full max-w-6xl aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <PetalDiagram sections={sections} onSectionClick={handleSectionClick} />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToDetails}
            className="mt-12 gap-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full px-8 group"
            data-testid="button-scroll-details"
          >
            <span className="text-base font-semibold">مشاهده جزئیات و تحلیل‌ها</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 group-hover:text-primary" />
            </motion.div>
          </Button>
        </motion.div>
      </section>

      {/* Details Section */}
      <section id="details-section" className="min-h-screen bg-gradient-to-br from-white/60 via-blue-50/60 to-purple-50/60 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl border-t border-white/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              تحلیل جامع و پیشنهادات هوشمند
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              وضعیت هر بخش از کسب‌وکار خود را به صورت دقیق پیگیری کنید
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-7 xl:col-span-8"
            >
              <BusinessHealthMeter sections={sections} overallProgress={overallProgress} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-5 xl:col-span-4"
            >
              <AITipsSidebar selectedSection={selectedSection} tips={currentTips} />
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sectionId={selectedSection}
        sectionLabel={selectedSection ? sectionLabels[selectedSection] : ""}
        subsections={currentSubsections}
        onSubsectionUpdate={handleSubsectionUpdate}
      />
    </div>
  );
}
