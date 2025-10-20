import { useState, useMemo } from "react";
import PetalDiagram, { type SectionType, type SectionData } from "@/components/PetalDiagram";
import SectionDetailModal from "@/components/SectionDetailModal";
import BusinessHealthMeter from "@/components/BusinessHealthMeter";
import AITipsSidebar from "@/components/AITipsSidebar";
import type { SubsectionData } from "@/components/SubsectionCard";

// todo: remove mock functionality
const SUBSECTIONS_DATA: Record<SectionType, SubsectionData[]> = {
  strategy: [
    { id: "mission", label: "Mission Statement", description: "Define your company's core purpose and values", progress: 0, value: "" },
    { id: "vision", label: "Vision", description: "Where do you see your company in 5 years?", progress: 0, value: "" },
    { id: "values", label: "Core Values", description: "What principles guide your business decisions?", progress: 0, value: "" },
    { id: "goals", label: "Strategic Goals", description: "Set your primary business objectives", progress: 0, value: "" },
    { id: "swot", label: "SWOT Analysis", description: "Identify strengths, weaknesses, opportunities, and threats", progress: 0, value: "" },
    { id: "competitive", label: "Competitive Advantage", description: "What makes you unique in the market?", progress: 0, value: "" },
  ],
  operations: [
    { id: "processes", label: "Core Processes", description: "Document your key operational workflows", progress: 0, value: "" },
    { id: "suppliers", label: "Suppliers", description: "List your main suppliers and partners", progress: 0, value: "" },
    { id: "quality", label: "Quality Standards", description: "Define your quality control measures", progress: 0, value: "" },
    { id: "inventory", label: "Inventory Management", description: "How do you manage stock and resources?", progress: 0, value: "" },
  ],
  hr: [
    { id: "team", label: "Team Structure", description: "Outline your organizational hierarchy", progress: 0, value: "" },
    { id: "hiring", label: "Hiring Process", description: "Define your recruitment strategy", progress: 0, value: "" },
    { id: "culture", label: "Company Culture", description: "Describe your workplace values and environment", progress: 0, value: "" },
    { id: "benefits", label: "Benefits Package", description: "What benefits do you offer employees?", progress: 0, value: "" },
    { id: "training", label: "Training Programs", description: "How do you develop your team's skills?", progress: 0, value: "" },
  ],
  branding: [
    { id: "logo", label: "Logo & Identity", description: "Define your visual brand elements", progress: 0, value: "" },
    { id: "voice", label: "Brand Voice", description: "How does your brand communicate?", progress: 0, value: "" },
    { id: "positioning", label: "Brand Positioning", description: "How do you want to be perceived?", progress: 0, value: "" },
    { id: "guidelines", label: "Brand Guidelines", description: "Document your brand standards", progress: 0, value: "" },
  ],
  finance: [
    { id: "budget", label: "Budget Plan", description: "Outline your financial allocation", progress: 0, value: "" },
    { id: "pricing", label: "Pricing Strategy", description: "How do you price your products/services?", progress: 0, value: "" },
    { id: "revenue", label: "Revenue Streams", description: "Identify your income sources", progress: 0, value: "" },
    { id: "expenses", label: "Fixed Expenses", description: "List your recurring costs", progress: 0, value: "" },
    { id: "projections", label: "Financial Projections", description: "Forecast your 12-month financials", progress: 0, value: "" },
  ],
  product: [
    { id: "roadmap", label: "Product Roadmap", description: "Plan your product development timeline", progress: 0, value: "" },
    { id: "features", label: "Key Features", description: "What are your core product features?", progress: 0, value: "" },
    { id: "market", label: "Target Market", description: "Who is your ideal customer?", progress: 0, value: "" },
    { id: "feedback", label: "User Feedback", description: "How do you gather customer insights?", progress: 0, value: "" },
  ],
  sales: [
    { id: "funnel", label: "Sales Funnel", description: "Map your customer journey", progress: 0, value: "" },
    { id: "channels", label: "Sales Channels", description: "Where do you sell your products?", progress: 0, value: "" },
    { id: "targets", label: "Sales Targets", description: "Set your revenue goals", progress: 0, value: "" },
    { id: "crm", label: "CRM System", description: "How do you manage customer relationships?", progress: 0, value: "" },
  ],
  technology: [
    { id: "infrastructure", label: "Tech Infrastructure", description: "What systems and tools do you use?", progress: 0, value: "" },
    { id: "security", label: "Security Measures", description: "How do you protect your data?", progress: 0, value: "" },
    { id: "website", label: "Website & Apps", description: "Describe your digital presence", progress: 0, value: "" },
    { id: "automation", label: "Automation Tools", description: "What processes are automated?", progress: 0, value: "" },
  ],
  legal: [
    { id: "structure", label: "Business Structure", description: "LLC, Corporation, Sole Proprietorship, etc.", progress: 0, value: "" },
    { id: "licenses", label: "Licenses & Permits", description: "What licenses do you need?", progress: 0, value: "" },
    { id: "contracts", label: "Key Contracts", description: "Document important agreements", progress: 0, value: "" },
    { id: "compliance", label: "Compliance", description: "What regulations must you follow?", progress: 0, value: "" },
  ],
};

// todo: remove mock functionality
const AI_TIPS: Record<SectionType, Array<{ icon: "sparkles" | "lightbulb" | "trending" | "alert"; title: string; description: string }>> = {
  strategy: [
    { icon: "sparkles", title: "Define Your Vision", description: "Start with a clear mission statement that defines your purpose and long-term goals. This will guide all strategic decisions." },
    { icon: "lightbulb", title: "Competitive Analysis", description: "Research your top 3-5 competitors to identify market gaps and differentiation opportunities." },
    { icon: "trending", title: "Set SMART Goals", description: "Establish Specific, Measurable, Achievable, Relevant, and Time-bound objectives for the next 12 months." },
  ],
  operations: [
    { icon: "sparkles", title: "Document Everything", description: "Create standard operating procedures (SOPs) for all key processes to ensure consistency and scalability." },
    { icon: "alert", title: "Identify Bottlenecks", description: "Map your workflows to find inefficiencies and areas where processes slow down." },
    { icon: "trending", title: "Automate Repetitive Tasks", description: "Look for opportunities to use software tools to reduce manual work and errors." },
  ],
  hr: [
    { icon: "lightbulb", title: "Build a Strong Culture", description: "Define your values early and hire people who align with them. Culture fit is as important as skills." },
    { icon: "sparkles", title: "Invest in Development", description: "Regular training and growth opportunities improve retention and build a stronger team." },
    { icon: "trending", title: "Clear Communication", description: "Establish regular check-ins and transparent feedback channels to keep everyone aligned." },
  ],
  branding: [
    { icon: "sparkles", title: "Consistency is Key", description: "Use the same colors, fonts, and voice across all platforms to build brand recognition." },
    { icon: "lightbulb", title: "Tell Your Story", description: "Share your origin story and values to create emotional connections with customers." },
    { icon: "trending", title: "Stand Out", description: "Identify what makes you different and amplify it in all your branding materials." },
  ],
  finance: [
    { icon: "alert", title: "Track Cash Flow", description: "Monitor your cash flow weekly to avoid surprises and ensure you can cover expenses." },
    { icon: "sparkles", title: "Diversify Revenue", description: "Multiple income streams provide stability and reduce risk if one channel underperforms." },
    { icon: "trending", title: "Plan for Growth", description: "Set aside budget for marketing and development to fuel sustainable expansion." },
  ],
  product: [
    { icon: "lightbulb", title: "Start with MVP", description: "Launch a minimum viable product to test your assumptions and gather real user feedback." },
    { icon: "sparkles", title: "Listen to Users", description: "Regular user interviews and feedback sessions help you build what people actually want." },
    { icon: "trending", title: "Iterate Quickly", description: "Use short development cycles to test ideas, learn fast, and adapt to market needs." },
  ],
  sales: [
    { icon: "sparkles", title: "Know Your Customer", description: "Create detailed buyer personas to understand their pain points and buying motivations." },
    { icon: "trending", title: "Optimize Your Funnel", description: "Track metrics at each stage to identify where prospects drop off and improve conversion." },
    { icon: "lightbulb", title: "Build Relationships", description: "Focus on solving problems and adding value, not just closing deals." },
  ],
  technology: [
    { icon: "alert", title: "Prioritize Security", description: "Implement strong passwords, 2FA, and regular backups to protect your business data." },
    { icon: "sparkles", title: "Choose Scalable Tools", description: "Select software that can grow with your business to avoid costly migrations later." },
    { icon: "trending", title: "Stay Updated", description: "Keep systems and software current to maintain security and access new features." },
  ],
  legal: [
    { icon: "alert", title: "Get Professional Help", description: "Consult with a lawyer to ensure you're properly structured and compliant with regulations." },
    { icon: "sparkles", title: "Protect Your IP", description: "Trademark your brand name and logo early to prevent others from using them." },
    { icon: "lightbulb", title: "Use Written Agreements", description: "Always get contracts in writing to avoid misunderstandings and disputes." },
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
    
    return sectionTypes.map(type => {
      const subsections = subsectionsState[type];
      const totalProgress = subsections.reduce((sum, sub) => sum + sub.progress, 0);
      const avgProgress = Math.round(totalProgress / subsections.length);
      
      return {
        id: type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Business Growth Blueprint</h1>
              <p className="text-sm text-muted-foreground">
                Build and visualize your complete business plan
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Overall Progress</div>
              <div className="text-2xl font-bold">{overallProgress}%</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="w-full min-h-[600px] flex items-center justify-center p-4">
              <div className="w-full max-w-2xl aspect-square">
                <PetalDiagram sections={sections} onSectionClick={handleSectionClick} />
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
        sectionLabel={selectedSection ? selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1) : ""}
        subsections={currentSubsections}
        onSubsectionUpdate={handleSubsectionUpdate}
      />
    </div>
  );
}
