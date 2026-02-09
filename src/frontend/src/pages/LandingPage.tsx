import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Activity, BarChart3, CheckCircle2, Shield, Heart, Stethoscope, TrendingUp, Users } from 'lucide-react';
import Disclaimer from '@/components/Disclaimer';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-16 flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left motion-safe:animate-fade-in">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vibrant/10 to-warm/10 px-4 py-2 text-sm font-medium text-vibrant dark:from-vibrant/20 dark:to-warm/20 motion-safe:animate-slide-up">
            <Heart className="h-4 w-4" />
            AI-Powered Health Assessment
          </div>

          <h1 className="bg-gradient-to-r from-vibrant via-warm to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl motion-safe:animate-slide-up motion-safe:[animation-delay:100ms]">
            HeartSense AI
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:mx-0 motion-safe:animate-slide-up motion-safe:[animation-delay:200ms]">
            Advanced health risk assessment powered by intelligent algorithms. Get personalized insights 
            about your health risk factors in minutes with our easy-to-use assessment tool.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start motion-safe:animate-slide-up motion-safe:[animation-delay:300ms]">
            <Button 
              size="lg" 
              onClick={() => navigate({ to: '/assessment' })} 
              className="gap-2 bg-gradient-to-r from-vibrant to-warm hover:from-vibrant/90 hover:to-warm/90 transition-all duration-200 motion-safe:hover:scale-105 motion-safe:hover:shadow-lg"
            >
              <Activity className="h-5 w-5" />
              Start Assessment
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="transition-all duration-200 motion-safe:hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex-1 motion-safe:animate-slide-up motion-safe:[animation-delay:400ms]">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-vibrant/20 via-warm/20 to-accent/20 blur-2xl motion-safe:animate-pulse-soft" />
            <img
              src="/assets/generated/heartsense-hero.dim_1600x900.png"
              alt="HeartSense AI Dashboard"
              className="relative rounded-2xl border-2 border-border/50 shadow-2xl transition-transform duration-300 motion-safe:hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Overview Cards */}
      <section className="mb-16">
        <div className="mb-8 text-center motion-safe:animate-fade-in">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Why Choose HeartSense AI?</h2>
          <p className="text-muted-foreground">
            Comprehensive health assessment with actionable insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="group border-2 transition-all duration-300 hover:border-vibrant/50 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:animate-slide-up motion-safe:[animation-delay:100ms]">
            <CardHeader>
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-vibrant/20 to-vibrant/10 transition-all duration-300 group-hover:from-vibrant/30 group-hover:to-vibrant/20 motion-safe:group-hover:scale-110">
                <Stethoscope className="h-7 w-7 text-vibrant" />
              </div>
              <CardTitle className="text-xl">Comprehensive Analysis</CardTitle>
              <CardDescription className="text-base">
                Evaluate multiple health factors including age, lifestyle, blood pressure, and symptoms for a complete picture
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-2 transition-all duration-300 hover:border-warm/50 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:animate-slide-up motion-safe:[animation-delay:200ms]">
            <CardHeader>
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-warm/20 to-warm/10 transition-all duration-300 group-hover:from-warm/30 group-hover:to-warm/20 motion-safe:group-hover:scale-110">
                <TrendingUp className="h-7 w-7 text-warm" />
              </div>
              <CardTitle className="text-xl">Intelligent Risk Scoring</CardTitle>
              <CardDescription className="text-base">
                Advanced algorithms calculate your personalized risk score with detailed explanations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-2 transition-all duration-300 hover:border-accent/50 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:animate-slide-up motion-safe:[animation-delay:300ms]">
            <CardHeader>
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 transition-all duration-300 group-hover:from-accent/30 group-hover:to-accent/20 motion-safe:group-hover:scale-110">
                <Users className="h-7 w-7 text-accent" />
              </div>
              <CardTitle className="text-xl">Actionable Insights</CardTitle>
              <CardDescription className="text-base">
                Receive personalized recommendations and quick tips based on your risk level
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* How It Works */}
      <section id="how-it-works" className="mb-16">
        <div className="mb-8 text-center motion-safe:animate-fade-in">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground">
            Get your health risk assessment in four simple steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-2 transition-all duration-300 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:animate-slide-up motion-safe:[animation-delay:100ms]">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-vibrant/10 to-transparent" />
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vibrant/10 text-xl font-bold text-vibrant transition-transform duration-300 motion-safe:hover:scale-110">
                1
              </div>
              <CardTitle className="text-lg">Enter Your Information</CardTitle>
              <CardDescription>
                Provide basic demographics, blood pressure, lifestyle factors, and current symptoms
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden border-2 transition-all duration-300 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:animate-slide-up motion-safe:[animation-delay:200ms]">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-warm/10 to-transparent" />
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-warm/10 text-xl font-bold text-warm transition-transform duration-300 motion-safe:hover:scale-110">
                2
              </div>
              <CardTitle className="text-lg">AI Analysis</CardTitle>
              <CardDescription>
                Our intelligent algorithm processes your data and calculates your personalized risk score
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden border-2 transition-all duration-300 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:animate-slide-up motion-safe:[animation-delay:300ms]">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-accent/10 to-transparent" />
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-xl font-bold text-accent transition-transform duration-300 motion-safe:hover:scale-110">
                3
              </div>
              <CardTitle className="text-lg">Review Results</CardTitle>
              <CardDescription>
                See your risk level, contributing factors, and detailed explanations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden border-2 transition-all duration-300 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:animate-slide-up motion-safe:[animation-delay:400ms]">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-health/10 to-transparent" />
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-health/10 text-xl font-bold text-health transition-transform duration-300 motion-safe:hover:scale-110">
                4
              </div>
              <CardTitle className="text-lg">Get Quick Tips</CardTitle>
              <CardDescription>
                Receive personalized advice and recommendations based on your assessment
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-8 text-center motion-safe:animate-fade-in motion-safe:[animation-delay:500ms]">
          <Button 
            size="lg" 
            onClick={() => navigate({ to: '/assessment' })} 
            className="gap-2 bg-gradient-to-r from-vibrant to-warm hover:from-vibrant/90 hover:to-warm/90 transition-all duration-200 motion-safe:hover:scale-105 motion-safe:hover:shadow-lg"
          >
            <Activity className="h-5 w-5" />
            Start Your Assessment Now
          </Button>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Disclaimer Section */}
      <section className="mb-8 motion-safe:animate-fade-in">
        <div className="mb-6 text-center">
          <h2 className="mb-3 text-2xl font-bold tracking-tight">Important Information</h2>
        </div>
        <Disclaimer />
      </section>
    </div>
  );
}
