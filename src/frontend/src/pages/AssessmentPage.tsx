import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertCircle } from 'lucide-react';
import { useCalculateRisk } from '@/hooks/useQueries';
import type { AssessmentInput, Gender, Variant_individual_family } from '@/backend';
import Disclaimer from '@/components/Disclaimer';

export default function AssessmentPage() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male' as Gender,
    hypertension: false,
    diabetes: false,
    smoking: false,
    alcohol: false,
    cough: 'individual' as Variant_individual_family,
    shortnessOfBreath: 'individual' as Variant_individual_family,
    wheezing: 'individual' as Variant_individual_family,
    hemoptysis: 'individual' as Variant_individual_family,
    stridorSeverity: 'individual' as Variant_individual_family,
    hasWeightLoss: false,
    weightLossSeverity: '',
    pain: '',
    diet: '',
    exercise: '',
  });

  const calculateRisk = useCalculateRisk();
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input: AssessmentInput = {
      age: BigInt(formData.age),
      gender: formData.gender,
      hypertension: formData.hypertension,
      diabetes: formData.diabetes,
      socialFactors: {
        smoking: formData.smoking,
        alcohol: formData.alcohol,
        diet: formData.diet,
        exercise: formData.exercise,
      },
      respiratorySymptoms: {
        cough: formData.cough,
        shortnessOfBreath: formData.shortnessOfBreath,
        wheezing: formData.wheezing,
        hemoptysis: formData.hemoptysis,
        stridorSeverity: formData.stridorSeverity,
      },
      generalSymptoms: {
        pain: formData.pain,
        weightLoss: formData.hasWeightLoss
          ? {
              hasWeightLoss: true,
              severity: formData.weightLossSeverity,
            }
          : undefined,
      },
    };

    try {
      const response = await calculateRisk.mutateAsync(input);
      setResult(response);
    } catch (error) {
      console.error('Error calculating risk:', error);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      age: '',
      gender: 'male' as Gender,
      hypertension: false,
      diabetes: false,
      smoking: false,
      alcohol: false,
      cough: 'individual' as Variant_individual_family,
      shortnessOfBreath: 'individual' as Variant_individual_family,
      wheezing: 'individual' as Variant_individual_family,
      hemoptysis: 'individual' as Variant_individual_family,
      stridorSeverity: 'individual' as Variant_individual_family,
      hasWeightLoss: false,
      weightLossSeverity: '',
      pain: '',
      diet: '',
      exercise: '',
    });
  };

  if (result) {
    const riskLevel = result.riskLevel;
    const riskScore = Number(result.riskScore);

    return (
      <div className="container py-12">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl">Your Assessment Results</CardTitle>
            <CardDescription>Based on the information you provided</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">{riskScore}</div>
              <Badge
                variant={
                  riskLevel === 'low'
                    ? 'default'
                    : riskLevel === 'moderate'
                    ? 'secondary'
                    : 'destructive'
                }
                className="text-lg"
              >
                {riskLevel.toUpperCase()} RISK
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Explanation</h3>
                <p className="text-sm text-muted-foreground">{result.explanation}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Clinical Impression</h3>
                <p className="text-sm text-muted-foreground">{result.clinicalImpression}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Suggested Tests</h3>
                <p className="text-sm text-muted-foreground">{result.suggestedTests}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Lifestyle Recommendations</h3>
                <p className="text-sm text-muted-foreground">{result.lifestyleRecommendations}</p>
              </div>
            </div>

            <Button onClick={handleReset} className="w-full">
              Start New Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold">Health Risk Assessment</h1>
          <p className="text-muted-foreground">
            Please provide accurate information for the best results
          </p>
        </div>

        <Disclaimer />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="120"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value as Gender })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hypertension"
                  checked={formData.hypertension}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, hypertension: checked as boolean })
                  }
                />
                <Label htmlFor="hypertension">Hypertension (High Blood Pressure)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="diabetes"
                  checked={formData.diabetes}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, diabetes: checked as boolean })
                  }
                />
                <Label htmlFor="diabetes">Diabetes</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="smoking"
                  checked={formData.smoking}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, smoking: checked as boolean })
                  }
                />
                <Label htmlFor="smoking">Smoking</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alcohol"
                  checked={formData.alcohol}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, alcohol: checked as boolean })
                  }
                />
                <Label htmlFor="alcohol">Alcohol Consumption</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diet">Diet Description</Label>
                <Input
                  id="diet"
                  value={formData.diet}
                  onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                  placeholder="e.g., Balanced, High-fat, Vegetarian"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exercise">Exercise Routine</Label>
                <Input
                  id="exercise"
                  value={formData.exercise}
                  onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
                  placeholder="e.g., Daily walks, Gym 3x/week"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Symptoms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasWeightLoss"
                  checked={formData.hasWeightLoss}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, hasWeightLoss: checked as boolean })
                  }
                />
                <Label htmlFor="hasWeightLoss">Unexplained Weight Loss</Label>
              </div>

              {formData.hasWeightLoss && (
                <div className="space-y-2">
                  <Label htmlFor="weightLossSeverity">Weight Loss Severity</Label>
                  <Input
                    id="weightLossSeverity"
                    value={formData.weightLossSeverity}
                    onChange={(e) =>
                      setFormData({ ...formData, weightLossSeverity: e.target.value })
                    }
                    placeholder="e.g., Mild, Moderate, Severe"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="pain">Pain Description</Label>
                <Input
                  id="pain"
                  value={formData.pain}
                  onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
                  placeholder="Describe any pain you're experiencing"
                />
              </div>
            </CardContent>
          </Card>

          {calculateRisk.isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to calculate risk. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={calculateRisk.isPending}>
            {calculateRisk.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Calculate Risk
          </Button>
        </form>
      </div>
    </div>
  );
}
