import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Activity, BarChart3, CheckCircle2, Shield } from 'lucide-react';
import Disclaimer from '@/components/Disclaimer';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-16 flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              HeartSense AI
            </h1>
            <p className="text-xl text-muted-foreground sm:text-2xl">
              Smart Health Risk Prediction
            </p>
          </div>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground lg:mx-0">
            Advanced health risk assessment powered by intelligent algorithms. Get personalized insights 
            about your health risk factors in minutes with our easy-to-use assessment tool.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" onClick={() => navigate({ to: '/assessment' })} className="gap-2">
              <Activity className="h-5 w-5" />
              Start Assessment
            </Button>
            <Button size="lg" variant="outline" onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/assets/generated/heartsense-hero.dim_1600x900.png"
            alt="HeartSense AI Health Assessment"
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      <Separator className="my-12" />

      {/* Overview Section */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Overview</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            HeartSense AI helps you understand your health risk profile through a comprehensive assessment 
            of key health indicators and symptoms.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-health/20 transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-health/10">
                <Shield className="h-6 w-6 text-health" />
              </div>
              <CardTitle>Comprehensive Analysis</CardTitle>
              <CardDescription>
                Evaluate multiple health factors including age, lifestyle choices, and symptoms to provide 
                a holistic risk assessment.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-health/20 transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-health/10">
                <BarChart3 className="h-6 w-6 text-health" />
              </div>
              <CardTitle>Clear Risk Scoring</CardTitle>
              <CardDescription>
                Receive an easy-to-understand risk score (0-100) categorized as Low, Moderate, or High 
                with detailed explanations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-health/20 transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-health/10">
                <CheckCircle2 className="h-6 w-6 text-health" />
              </div>
              <CardTitle>Actionable Insights</CardTitle>
              <CardDescription>
                Get personalized feedback on which factors contribute most to your risk level and what 
                they mean for your health.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* How It Works Section */}
      <section id="how-it-works" className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our assessment process is simple, fast, and designed to give you meaningful insights.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-health/10 text-2xl font-bold text-health">
              1
            </div>
            <h3 className="mb-2 text-lg font-semibold">Enter Your Information</h3>
            <p className="text-sm text-muted-foreground">
              Provide basic demographic information including age and gender.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-health/10 text-2xl font-bold text-health">
              2
            </div>
            <h3 className="mb-2 text-lg font-semibold">Report Lifestyle Factors</h3>
            <p className="text-sm text-muted-foreground">
              Share information about smoking history and other lifestyle choices.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-health/10 text-2xl font-bold text-health">
              3
            </div>
            <h3 className="mb-2 text-lg font-semibold">Identify Symptoms</h3>
            <p className="text-sm text-muted-foreground">
              Check any relevant symptoms you may be experiencing from our comprehensive list.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-health/10 text-2xl font-bold text-health">
              4
            </div>
            <h3 className="mb-2 text-lg font-semibold">Get Your Results</h3>
            <p className="text-sm text-muted-foreground">
              Receive instant risk assessment with detailed explanations and contributing factors.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button size="lg" onClick={() => navigate({ to: '/assessment' })} className="gap-2">
            <Activity className="h-5 w-5" />
            Begin Your Assessment
          </Button>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Disclaimer Section */}
      <section className="mb-8">
        <div className="mb-6 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Disclaimer</h2>
        </div>
        <Disclaimer />
      </section>
    </div>
  );
}
