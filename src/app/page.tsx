import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  Star,
  ChevronRight,
  Play,
  Sparkles,
  Target,
  Clock,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description:
      "Our advanced AI extracts requirements, identifies risks, and provides actionable insights in minutes, not days.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: CheckCircle2,
    title: "Smart Compliance",
    description:
      "Automatically generate compliance matrices and track requirement status with real-time accuracy.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Match your past projects and team expertise to RFP requirements with intelligent algorithms.",
    color: "from-orange-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Rapid Proposals",
    description:
      "Generate professional proposal drafts in hours, leveraging your knowledge base and best practices.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Risk Detection",
    description:
      "Identify potential risks and gaps before submission with our comprehensive review system.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team using role-based access, comments, and real-time updates.",
    color: "from-cyan-500 to-teal-500",
  },
];

const stats = [
  { value: "10x", label: "Faster Analysis", icon: Clock },
  { value: "85%", label: "Win Rate Boost", icon: TrendingUp },
  { value: "50k+", label: "RFPs Processed", icon: FileText },
  { value: "500+", label: "Companies Trust Us", icon: Globe },
];

const testimonials = [
  {
    quote: "RFP Intelligence transformed our proposal process. We went from weeks to days for complex government RFPs.",
    author: "Sarah Chen",
    role: "VP of Business Development",
    company: "TechCorp Solutions",
  },
  {
    quote: "The AI-powered compliance tracking alone saved us hundreds of hours. It's a game-changer for our team.",
    author: "Michael Torres",
    role: "Proposal Manager",
    company: "Innovate Industries",
  },
  {
    quote: "We've increased our win rate by 40% since implementing RFP Intelligence. The ROI is incredible.",
    author: "Emily Watson",
    role: "Director of Sales",
    company: "Global Systems Inc",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out RFP Intelligence",
    features: ["3 RFPs per month", "Basic AI analysis", "1 team member", "Email support"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "per month",
    description: "For growing teams and businesses",
    features: [
      "50 RFPs per month",
      "Advanced AI analysis",
      "10 team members",
      "Proposal drafting",
      "Compliance tracking",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited RFPs",
      "Custom AI training",
      "Unlimited team members",
      "API access",
      "SSO & SAML",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-zinc-50 dark:bg-zinc-900 px-6 rounded-[2rem] flex items-center justify-between h-16 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 shadow-xl">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-500">
                <FileText className="w-4.5 h-4.5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tighter ">
                RFP <span className="text-emerald-500">Intelligence</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#features"
                className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                Pricing
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-xs font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-xl h-10 px-6 font-black  shadow-emerald-500/20">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] blob-emerald animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] blob-coral animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fadeInDown opacity-0 mb-8" style={{ animationDelay: '0.1s' }}>
              <Badge variant="premium" className="gap-2 py-2 px-4">
                <Award className="w-4 h-4" />
                <span>Trusted by 500+ Organizations Worldwide</span>
              </Badge>
            </div>

            <h1 className="animate-fadeInUp opacity-0 text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-8 leading-[1.1] tracking-tight" style={{ animationDelay: '0.2s' }}>
              Win More Proposals with{" "}
              <span className="gradient-text">Intelligent</span>{" "}
              RFP Analysis
            </h1>

            <p className="animate-fadeInUp opacity-0 text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.3s' }}>
              Transform your RFP response process with AI-powered document analysis,
              automated compliance tracking, and intelligent proposal generation.
            </p>

            <div className="animate-fadeInUp opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.4s' }}>
              <Link href="/register">
                <Button size="xl" className="group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Play className="w-4 h-4 text-zinc-700 dark:text-zinc-300 ml-0.5" />
                </div>
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="animate-fadeInUp opacity-0 grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-zinc-200 dark:border-zinc-800" style={{ animationDelay: '0.5s' }}>
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                    <stat.icon className="w-6 h-6 text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-zinc-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-zinc-50 dark:bg-zinc-900/50 relative">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="premium" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Everything You Need to{" "}
              <span className="gradient-text">Win</span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              From document parsing to proposal submission, we&apos;ve built the
              complete toolkit for modern proposal teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 card-hover"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] blob-emerald opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="premium" className="mb-6">
              <Target className="w-4 h-4 mr-2" />
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Three Steps to{" "}
              <span className="gradient-text-warm">Success</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload Your RFP",
                description:
                  "Simply drag and drop your RFP document. We support PDF, DOCX, and DOC formats with intelligent OCR.",
                icon: FileText,
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our AI agents extract requirements, generate compliance matrices, and identify potential risks automatically.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Win the Deal",
                description:
                  "Review AI-drafted proposals, collaborate with your team, and submit winning responses faster than ever.",
                icon: Award,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 mb-8 group-hover:from-emerald-100 group-hover:to-teal-100 dark:group-hover:from-emerald-900/30 dark:group-hover:to-teal-900/30 transition-all duration-500 shadow-xl">
                  <span className="text-3xl font-bold text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  {item.description}
                </p>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-10 -right-6 w-8 h-8 text-zinc-300 dark:text-zinc-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-zinc-950 dark:bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-6 bg-zinc-800 text-zinc-300 border-zinc-700">
              <Star className="w-4 h-4 mr-2" />
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Loved by Proposal Teams{" "}
              <span className="gradient-text">Everywhere</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="relative bg-zinc-900 dark:bg-zinc-800/50 rounded-3xl p-8 border border-zinc-800 dark:border-zinc-700 card-hover"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-zinc-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-zinc-50 dark:bg-zinc-900/50 relative">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="premium" className="mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Start free and scale as your team grows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl transition-all duration-300 ${plan.popular
                  ? "ring-2 ring-emerald-500 shadow-emerald-500/10 scale-105"
                  : "border border-zinc-200 dark:border-zinc-800"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-zinc-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 ml-2">
                    / {plan.period}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  {plan.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] blob-emerald opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] blob-coral opacity-20" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Ready to{" "}
            <span className="gradient-text">Transform</span>{" "}
            Your RFP Process?
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Join hundreds of organizations already winning more proposals with
            AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="xl" className="group">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                RFP Intelligence
              </span>
            </div>
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} RFP Intelligence. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/privacy"
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
