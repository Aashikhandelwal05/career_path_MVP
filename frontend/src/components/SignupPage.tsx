import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from 'react-router-dom';
import { useSignup } from '@/hooks/useAPI';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    field_of_study: '',
    interests: [] as string[],
    goal: ''
  });
  const navigate = useNavigate();
  const signup = useSignup();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleFieldOfStudyChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      field_of_study: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return {
        ...prev,
        interests
      };
    });
  };

  const handleGoalChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      goal: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit user data to backend
    signup.mutate({
      name: formData.name,
      field_of_study: formData.field_of_study,
      interests: formData.interests.join(', '),
      goal: formData.goal,
      status: formData.status
    }, {
      onSuccess: (data) => {
        // Redirect to homepage
        navigate('/');
      },
      onError: (error) => {
        console.error('Signup error:', error);
      }
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const statusOptions = [
    "School Student",
    "College Student",
    "Recent Graduate",
    "Working Professional"
  ];

  const fieldOfStudyOptions = [
    "High School",
    "B.Tech (Engineering)",
    "B.Com (Commerce)",
    "B.A. (Arts & Humanities)",
    "B.Sc (Science)",
    "Other"
  ];

  const interestOptions = [
    "Technology & Coding",
    "Business & Finance",
    "Creative Arts & Design",
    "Media & Communication",
    "Science & Research"
  ];

  const goalOptions = [
    "Just Exploring & Curious",
    "Find a Clear Career Path",
    "Get Real-World Experience"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Career Nirvana</CardTitle>
          <CardDescription>
            Let's get to know you better to personalize your experience
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Progress indicator */}
            <div className="flex justify-between mb-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-coral text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {num}
                  </div>
                  <div className="text-xs mt-1 text-muted-foreground">
                    Step {num}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Step 1: Name */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg">What's your first name?</Label>
                  <p className="text-sm text-muted-foreground">
                    To personalize the app experience (e.g., "Hi, Aashi!").
                  </p>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Status */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg">What is your current status?</Label>
                  <p className="text-sm text-muted-foreground">
                    To understand your life stage and tailor content accordingly.
                  </p>
                  <RadioGroup 
                    value={formData.status} 
                    onValueChange={handleStatusChange}
                    className="mt-4 space-y-3"
                  >
                    {statusOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`status-${option}`} />
                        <Label htmlFor={`status-${option}`} className="text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Field of Study */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg">What is your primary field of study?</Label>
                  <p className="text-sm text-muted-foreground">
                    This is the core data for our AI Skill Bridge.
                  </p>
                  <RadioGroup 
                    value={formData.field_of_study} 
                    onValueChange={handleFieldOfStudyChange}
                    className="mt-4 space-y-3"
                  >
                    {fieldOfStudyOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`field-${option}`} />
                        <Label htmlFor={`field-${option}`} className="text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 4: Interests */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg">What are a few topics you're curious about?</Label>
                  <p className="text-sm text-muted-foreground">
                    To power our recommendation engine and personalize the Discovery Feed.
                  </p>
                  <div className="mt-4 space-y-3">
                    {interestOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <Checkbox
                          id={`interest-${option}`}
                          checked={formData.interests.includes(option)}
                          onCheckedChange={() => handleInterestChange(option)}
                        />
                        <Label htmlFor={`interest-${option}`} className="text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Goal */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg">What's your main goal right now?</Label>
                  <p className="text-sm text-muted-foreground">
                    To understand your intent and help you achieve your goals faster.
                  </p>
                  <RadioGroup 
                    value={formData.goal} 
                    onValueChange={handleGoalChange}
                    className="mt-4 space-y-3"
                  >
                    {goalOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`goal-${option}`} />
                        <Label htmlFor={`goal-${option}`} className="text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}
            
            {signup.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Error during signup: {signup.error.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
              >
                Back
              </Button>
            ) : (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            )}
            
            {step < 5 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={
                  (step === 1 && !formData.name) ||
                  (step === 2 && !formData.status) ||
                  (step === 3 && !formData.field_of_study) ||
                  (step === 4 && formData.interests.length === 0) ||
                  (step === 5 && !formData.goal)
                }
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={signup.isPending}
              >
                {signup.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing Signup...
                  </>
                ) : (
                  'Complete Signup'
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;