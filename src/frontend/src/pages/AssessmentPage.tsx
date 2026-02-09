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
import { Loader2, AlertCircle, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import { useCalculateRisk } from '@/hooks/useQueries';
import Disclaimer from '@/components/Disclaimer';
import type { AssessmentInput, AssessmentResult } from '@/backend';
import { Variant_female_male, Variant_none_current_former } from '@/backend';

interface FormData {
  age: string;
  gender: 'male' | 'female';
  smoking: 'none' | 'former' | 'current';
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
}

export default function AssessmentPage() {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: 'male',
    smoking: 'none',
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const input: AssessmentInput = {
      age: BigInt(parseInt(formData.age)),
      gender: formData.gender === 'male' ? Variant_female_male.male : Variant_female_male.female,
      smoking:
        formData.smoking === 'none'
          ? Variant_none_current_former.none
          : formData.smoking === 'former'
            ? Variant_none_current_former.former
            : Variant_none_current_former.current,
      symptomsFactor: {
        cough: formData.cough,
        wheezing: formData.wheezing,
        shortnessOfBreath: formData.shortnessOfBreath,
        stridor: formData.stridor,
        difficultySwallowing: formData.difficultySwallowing,
        unexplainedWeightLoss: formData.unexplainedWeightLoss,
        bloodInSputum: formData.bloodInSputum,
      },
    };

    calculateRisk(input, {
      onSuccess: (data) => {
        setResult(data);
      },
    });
  };

  const handleStartOver = () => {
    setFormData({
      age: '',
      gender: 'male',
      smoking: 'none',
      cough: false,
      wheezing: false,
      shortnessOfBreath: false,
      stridor: false,
      difficultySwallowing: false,
      unexplainedWeightLoss: false,
      bloodInSputum: false,
    });
    setErrors({});
    setResult(null);
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'text-green-600 dark:text-green-400';
      case 'moderate':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'high':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (level: string): 'default' | 'secondary' | 'destructive' => {
    switch (level.toLowerCase()) {
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

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case 'moderate':
        return <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />;
      case 'high':
        return <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  if (result) {
    const riskScore = Number(result.riskScore);
    const riskLevelText = result.riskLevel.toString().charAt(0).toUpperCase() + result.riskLevel.toString().slice(1);

    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Your Assessment Results</h1>
            <p className="text-muted-foreground">Based on the information you provided</p>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">{getRiskIcon(riskLevelText)}</div>
              <CardTitle className="text-2xl">
                Risk Level:{' '}
                <span className={getRiskColor(riskLevelText)}>{riskLevelText}</span>
              </CardTitle>
              <CardDescription className="text-base">
                Your risk score is <strong>{riskScore}</strong> out of 100
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Score</span>
                  <Badge variant={getRiskBadgeVariant(riskLevelText)}>{riskScore}/100</Badge>
                </div>
                <Progress value={riskScore} className="h-3" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contributing Factors</h3>
                {result.explanation.length > 0 ? (
                  <div className="space-y-3">
                    {result.explanation.map((factor, index) => (
                      <Alert key={index}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="text-sm font-semibold">{factor.category}</AlertTitle>
                        <AlertDescription className="text-sm">{factor.detail}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No significant risk factors identified based on your inputs.
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-center">
                <Button onClick={handleStartOver} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>

          <Disclaimer />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Health Risk Assessment</h1>
          <p className="text-muted-foreground">
            Complete the form below to receive your personalized risk assessment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Demographics</CardTitle>
              <CardDescription>Basic information about you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">
                  Age <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className={errors.age ? 'border-destructive' : ''}
                />
                {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
              </div>

              <div className="space-y-3">
                <Label>
                  Gender <span className="text-destructive">*</span>
                </Label>
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
            </CardContent>
          </Card>

          {/* Lifestyle Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Factors</CardTitle>
              <CardDescription>Information about your lifestyle choices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label>
                Smoking Status <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.smoking}
                onValueChange={(value) =>
                  setFormData({ ...formData, smoking: value as 'none' | 'former' | 'current' })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="font-normal">
                    Never smoked
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="former" />
                  <Label htmlFor="former" className="font-normal">
                    Former smoker
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="current" />
                  <Label htmlFor="current" className="font-normal">
                    Current smoker
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle>Symptoms</CardTitle>
              <CardDescription>Check any symptoms you are currently experiencing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cough"
                    checked={formData.cough}
                    onCheckedChange={(checked) => setFormData({ ...formData, cough: checked as boolean })}
                  />
                  <Label htmlFor="cough" className="font-normal">
                    Persistent cough
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
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, shortnessOfBreath: checked as boolean })
                    }
                  />
                  <Label htmlFor="shortnessOfBreath" className="font-normal">
                    Shortness of breath
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stridor"
                    checked={formData.stridor}
                    onCheckedChange={(checked) => setFormData({ ...formData, stridor: checked as boolean })}
                  />
                  <Label htmlFor="stridor" className="font-normal">
                    Stridor (high-pitched breathing sound)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="difficultySwallowing"
                    checked={formData.difficultySwallowing}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, difficultySwallowing: checked as boolean })
                    }
                  />
                  <Label htmlFor="difficultySwallowing" className="font-normal">
                    Difficulty swallowing
                  </Label>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <p className="text-sm font-medium text-destructive">High-Risk Symptoms</p>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unexplainedWeightLoss"
                      checked={formData.unexplainedWeightLoss}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, unexplainedWeightLoss: checked as boolean })
                      }
                    />
                    <Label htmlFor="unexplainedWeightLoss" className="font-normal">
                      Unexplained weight loss
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bloodInSputum"
                      checked={formData.bloodInSputum}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, bloodInSputum: checked as boolean })
                      }
                    />
                    <Label htmlFor="bloodInSputum" className="font-normal">
                      Blood in sputum (coughing up blood)
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button type="submit" size="lg" disabled={isPending} className="min-w-[200px]">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Calculating...
                </>
              ) : (
                'Calculate Risk'
              )}
            </Button>
          </div>
        </form>

        <Disclaimer />
      </div>
    </div>
  );
}
