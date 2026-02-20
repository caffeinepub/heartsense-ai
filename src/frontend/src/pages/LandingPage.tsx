import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Shield, BarChart3 } from 'lucide-react';
import Disclaimer from '@/components/Disclaimer';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          HeartSense AI
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Advanced health risk assessment powered by intelligent algorithms. 
          Get personalized insights about your health risk factors in minutes.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={() => navigate({ to: '/assessment' })}>
            <Activity className="mr-2 h-5 w-5" />
            Start Assessment
          </Button>
          <Button size="lg" variant="outline" onClick={() => {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Why Choose HeartSense AI?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Shield className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Comprehensive Analysis</CardTitle>
              <CardDescription>
                Evaluate multiple health factors including age, lifestyle, and symptoms
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Intelligent Scoring</CardTitle>
              <CardDescription>
                Advanced algorithms calculate your personalized risk score
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Activity className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Actionable Insights</CardTitle>
              <CardDescription>
                Receive personalized recommendations based on your risk level
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <CardTitle className="text-lg">Enter Information</CardTitle>
              <CardDescription>
                Provide your health data and symptoms
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <CardTitle className="text-lg">AI Analysis</CardTitle>
              <CardDescription>
                Our algorithm processes your data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <CardTitle className="text-lg">Review Results</CardTitle>
              <CardDescription>
                See your risk level and explanations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                4
              </div>
              <CardTitle className="text-lg">Get Recommendations</CardTitle>
              <CardDescription>
                Receive personalized health advice
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-8">
        <Disclaimer />
      </section>
    </div>
  );
}
