import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertCircle, CheckCircle2, AlertTriangle, RotateCcw, Lightbulb } from 'lucide-react';
import { useCalculateRisk } from '@/hooks/useQueries';
import Disclaimer from '@/components/Disclaimer';
import type { AssessmentInput, AssessmentResult } from '@/backend';
import { Variant_female_male, Variant_none_current_former, BloodPressureType } from '@/backend';

interface FormData {
  age: string;
  gender: 'male' | 'female';
  smoking: 'none' | 'former' | 'current';
  bpType: 'systolic' | 'diastolic' | 'meanArterialPressure' | '';
  bpValue: string;
  cough: boolean;
  wheezing: boolean;
  shortnessOfBreath: boolean;
  stridor: boolean;
  difficultySwallowing: boolean;
  unexplainedWeightLoss: boolean;
  bloodInSputum: boolean;
}

interface FormErrors {
  age?: string;
  bpType?: string;
  bpValue?: string;
}

export default function AssessmentPage() {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: 'male',
    smoking: 'none',
    bpType: '',
    bpValue: '',
    cough: false,
    wheezing: false,
    shortnessOfBreath: false,
    stridor: false,
    difficultySwallowing: false,
    unexplainedWeightLoss: false,
    bloodInSputum: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const { mutate: calculateRisk, isPending } = useCalculateRisk();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age)) {
      newErrors.age = 'Age is required';
    } else if (age < 0 || age > 120) {
      newErrors.age = 'Age must be between 0 and 120';
    }

    // Validate BP if either field is filled
    if (formData.bpType || formData.bpValue) {
      if (!formData.bpType) {
        newErrors.bpType = 'Please select a blood pressure type';
      }
      if (!formData.bpValue) {
        newErrors.bpValue = 'Please enter a blood pressure value';
      } else {
        const bpVal = parseInt(formData.bpValue);
        if (isNaN(bpVal) || bpVal < 40 || bpVal > 250) {
          newErrors.bpValue = 'Blood pressure must be between 40 and 250 mmHg';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const input: AssessmentInput = {
      age: BigInt(formData.age),
      gender: formData.gender === 'male' ? Variant_female_male.male : Variant_female_male.female,
      smoking:
        formData.smoking === 'none'
          ? Variant_none_current_former.none
          : formData.smoking === 'former'
            ? Variant_none_current_former.former
            : Variant_none_current_former.current,
      bloodPressure:
        formData.bpType && formData.bpValue
          ? {
              pressureType: BloodPressureType[formData.bpType as keyof typeof BloodPressureType],
              value: BigInt(formData.bpValue),
            }
          : undefined,
      symptomsFactor: {
        cough: formData.cough,
        wheezing: formData.wheezing,
        shortnessOfBreath: formData.shortnessOfBreath,
        stridor: formData.stridor,
        difficultySwallowing: formData.difficultySwallowing,
        unexplained_weight_loss: formData.unexplainedWeightLoss,
        bloodInSputum: formData.bloodInSputum,
      },
    };

    calculateRisk(input, {
      onSuccess: (data) => {
        setResult(data);
        // Smooth scroll to results
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      },
      onError: (error) => {
        console.error('Assessment failed:', error);
      },
    });
  };

  const handleStartOver = () => {
    setResult(null);
    setFormData({
      age: '',
      gender: 'male',
      smoking: 'none',
      bpType: '',
      bpValue: '',
      cough: false,
      wheezing: false,
      shortnessOfBreath: false,
      stridor: false,
      difficultySwallowing: false,
      unexplainedWeightLoss: false,
      bloodInSputum: false,
    });
    setErrors({});
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-health';
      case 'moderate':
        return 'text-warm';
      case 'high':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskLevelBadgeVariant = (level: string): 'default' | 'secondary' | 'destructive' => {
    switch (level) {
      case 'low':
        return 'secondary';
      case 'moderate':
        return 'default';
      case 'high':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <CheckCircle2 className="h-12 w-12 text-health" />;
      case 'moderate':
        return <AlertTriangle className="h-12 w-12 text-warm" />;
      case 'high':
        return <AlertCircle className="h-12 w-12 text-destructive" />;
      default:
        return null;
    }
  };

  const getQuickTips = (level: string) => {
    switch (level) {
      case 'low':
        return [
          'Maintain a healthy lifestyle with regular exercise',
          'Continue monitoring your health regularly',
          'Keep up with routine medical check-ups',
          'Stay informed about health best practices',
        ];
      case 'moderate':
        return [
          'Schedule a consultation with your healthcare provider',
          'Consider lifestyle modifications to reduce risk factors',
          'Monitor your symptoms and blood pressure regularly',
          'Discuss preventive measures with your doctor',
        ];
      case 'high':
        return [
          'Seek immediate medical attention and consultation',
          'Discuss comprehensive screening options with your doctor',
          'Follow medical advice and treatment plans closely',
          'Consider specialist referral for detailed evaluation',
        ];
      default:
        return [];
    }
  };

  if (result) {
    const riskLevel = result.riskLevel.toString();
    const riskScore = Number(result.riskScore);
    const quickTips = getQuickTips(riskLevel);

    return (
      <div className="container py-12">
        <div id="results" className="mx-auto max-w-3xl space-y-8 motion-safe:animate-fade-in">
          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Your Assessment Results</h1>
            <p className="text-muted-foreground">Based on the information you provided</p>
          </div>

          {/* Risk Score Card */}
          <Card className="border-2 motion-safe:animate-slide-up">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center motion-safe:animate-scale-in motion-safe:[animation-delay:100ms]">
                {getRiskLevelIcon(riskLevel)}
              </div>
              <CardTitle className="text-2xl">
                Risk Level:{' '}
                <span className={getRiskLevelColor(riskLevel)}>
                  {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                Your calculated risk score is <strong>{riskScore}</strong> out of 100
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Score</span>
                  <Badge variant={getRiskLevelBadgeVariant(riskLevel)} className="motion-safe:animate-scale-in motion-safe:[animation-delay:200ms]">
                    {riskScore}/100
                  </Badge>
                </div>
                <Progress value={riskScore} className="h-3 motion-safe:animate-slide-up motion-safe:[animation-delay:300ms]" />
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          {result.explanation.length > 0 && (
            <Card className="border-2 motion-safe:animate-slide-up motion-safe:[animation-delay:200ms]">
              <CardHeader>
                <CardTitle className="text-xl">Contributing Risk Factors</CardTitle>
                <CardDescription>Factors that influenced your risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.explanation.map((factor, index) => (
                    <Alert key={index} className="motion-safe:animate-slide-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>{factor.category}</AlertTitle>
                      <AlertDescription>{factor.detail}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card className="border-2 motion-safe:animate-slide-up motion-safe:[animation-delay:400ms]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-vibrant" />
                <CardTitle className="text-xl">Quick Tips</CardTitle>
              </div>
              <CardDescription>Personalized recommendations based on your risk level</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {quickTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 motion-safe:animate-slide-up" style={{ animationDelay: `${500 + index * 100}ms` }}>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-health" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="motion-safe:animate-fade-in motion-safe:[animation-delay:600ms]">
            <Disclaimer />
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3 motion-safe:animate-fade-in motion-safe:[animation-delay:700ms]">
            <Button onClick={handleStartOver} variant="outline" size="lg" className="gap-2 transition-all duration-200 motion-safe:hover:scale-105">
              <RotateCcw className="h-4 w-4" />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center motion-safe:animate-fade-in">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Health Risk Assessment</h1>
          <p className="text-muted-foreground">
            Complete the form below to receive your personalized health risk assessment
          </p>
        </div>

        <Card className="border-2 motion-safe:animate-slide-up">
          <CardHeader>
            <CardTitle>Assessment Form</CardTitle>
            <CardDescription>All fields marked with * are required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Demographics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Demographics</h3>
                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="age">
                    Age <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={errors.age ? 'border-destructive' : ''}
                  />
                  {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value as 'male' | 'female' })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Lifestyle Factors</h3>
                <Separator />

                <div className="space-y-2">
                  <Label>Smoking Status</Label>
                  <RadioGroup
                    value={formData.smoking}
                    onValueChange={(value) => setFormData({ ...formData, smoking: value as 'none' | 'former' | 'current' })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none" className="font-normal">
                        Never Smoked
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="former" id="former" />
                      <Label htmlFor="former" className="font-normal">
                        Former Smoker
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="current" id="current" />
                      <Label htmlFor="current" className="font-normal">
                        Current Smoker
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Blood Pressure */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Blood Pressure (Optional)</h3>
                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bpType">BP Type</Label>
                    <Select value={formData.bpType} onValueChange={(value) => setFormData({ ...formData, bpType: value as any })}>
                      <SelectTrigger id="bpType" className={errors.bpType ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="systolic">Systolic</SelectItem>
                        <SelectItem value="diastolic">Diastolic</SelectItem>
                        <SelectItem value="meanArterialPressure">Mean Arterial Pressure</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.bpType && <p className="text-sm text-destructive">{errors.bpType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bpValue">BP Value (mmHg)</Label>
                    <Input
                      id="bpValue"
                      type="number"
                      min="40"
                      max="250"
                      value={formData.bpValue}
                      onChange={(e) => setFormData({ ...formData, bpValue: e.target.value })}
                      placeholder="e.g., 120"
                      className={errors.bpValue ? 'border-destructive' : ''}
                    />
                    {errors.bpValue && <p className="text-sm text-destructive">{errors.bpValue}</p>}
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Symptoms</h3>
                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cough"
                      checked={formData.cough}
                      onCheckedChange={(checked) => setFormData({ ...formData, cough: checked as boolean })}
                    />
                    <Label htmlFor="cough" className="font-normal">
                      Persistent Cough
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wheezing"
                      checked={formData.wheezing}
                      onCheckedChange={(checked) => setFormData({ ...formData, wheezing: checked as boolean })}
                    />
                    <Label htmlFor="wheezing" className="font-normal">
                      Wheezing
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shortnessOfBreath"
                      checked={formData.shortnessOfBreath}
                      onCheckedChange={(checked) => setFormData({ ...formData, shortnessOfBreath: checked as boolean })}
                    />
                    <Label htmlFor="shortnessOfBreath" className="font-normal">
                      Shortness of Breath
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stridor"
                      checked={formData.stridor}
                      onCheckedChange={(checked) => setFormData({ ...formData, stridor: checked as boolean })}
                    />
                    <Label htmlFor="stridor" className="font-normal">
                      Stridor (High-pitched breathing sound)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="difficultySwallowing"
                      checked={formData.difficultySwallowing}
                      onCheckedChange={(checked) => setFormData({ ...formData, difficultySwallowing: checked as boolean })}
                    />
                    <Label htmlFor="difficultySwallowing" className="font-normal">
                      Difficulty Swallowing
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unexplainedWeightLoss"
                      checked={formData.unexplainedWeightLoss}
                      onCheckedChange={(checked) => setFormData({ ...formData, unexplainedWeightLoss: checked as boolean })}
                    />
                    <Label htmlFor="unexplainedWeightLoss" className="font-normal">
                      Unexplained Weight Loss
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bloodInSputum"
                      checked={formData.bloodInSputum}
                      onCheckedChange={(checked) => setFormData({ ...formData, bloodInSputum: checked as boolean })}
                    />
                    <Label htmlFor="bloodInSputum" className="font-normal">
                      Blood in Sputum
                    </Label>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Risk'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="motion-safe:animate-fade-in motion-safe:[animation-delay:200ms]">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
