import { useState, useMemo } from "react";
import PetalDiagram, { type SectionType, type SectionData } from "@/components/PetalDiagram";
import SectionDetailModal from "@/components/SectionDetailModal";
import BusinessHealthMeter from "@/components/BusinessHealthMeter";
import AITipsSidebar from "@/components/AITipsSidebar";
import type { SubsectionData } from "@/components/SubsectionCard";
import { Sparkles } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  طرح جامع رشد کسب‌وکار
                </h1>
                <p className="text-sm text-muted-foreground">
                  برنامه کسب‌وکار کامل خود را بسازید و تجسم کنید
                </p>
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                پیشرفت کلی
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ٪{overallProgress}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">اکوسیستم کسب‌وکار شما</h2>
                <p className="text-sm text-muted-foreground">
                  برای شروع ساخت طرح خود، هر بخشی را کلیک کنید
                </p>
              </div>
              <div className="w-full min-h-[600px] flex items-center justify-center">
                <div className="w-full max-w-2xl aspect-square">
                  <PetalDiagram sections={sections} onSectionClick={handleSectionClick} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <BusinessHealthMeter sections={sections} overallProgress={overallProgress} />
            <div className="min-h-[400px]">
              <AITipsSidebar selectedSection={selectedSection} tips={currentTips} />
            </div>
          </div>
        </div>
      </main>

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
