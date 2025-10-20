import AITipsSidebar from '../AITipsSidebar';

export default function AITipsSidebarExample() {
  const tips = [
    {
      icon: "sparkles" as const,
      title: "Define Your Vision",
      description: "Start with a clear mission statement that defines your purpose and long-term goals. This will guide all strategic decisions.",
    },
    {
      icon: "lightbulb" as const,
      title: "Competitive Analysis",
      description: "Research your top 3-5 competitors to identify market gaps and differentiation opportunities.",
    },
    {
      icon: "trending" as const,
      title: "Set SMART Goals",
      description: "Establish Specific, Measurable, Achievable, Relevant, and Time-bound objectives for the next 12 months.",
    },
  ];

  return (
    <div className="w-96 h-[600px]">
      <AITipsSidebar selectedSection="strategy" tips={tips} />
    </div>
  );
}
