import { useState } from 'react';
import { Assessment, Question } from '@/store/slices/assessmentsSlice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResponse, clearResponses } from '@/store/slices/assessmentsSlice';
import { addResult } from '@/store/slices/resultsSlice';
import { toast } from 'sonner';

interface AssessmentQuestionsProps {
  assessment: Assessment;
  childId: string;
  childName: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function AssessmentQuestions({ 
  assessment, 
  childId, 
  childName, 
  onComplete,
  onBack 
}: AssessmentQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dispatch = useAppDispatch();
  const responses = useAppSelector(state => state.assessments.responses);
  
  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;

  const handleAnswer = (answer: string) => {
    dispatch(setResponse({ questionId: currentQuestion.id, answer }));
  };

  const handleNext = () => {
    if (!responses[currentQuestion.id]) {
      toast.error('Please answer the question before proceeding');
      return;
    }
    
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate results
    const totalQuestions = assessment.questions.length;
    const noAnswers = Object.values(responses).filter(answer => answer === 'no').length;
    const negativePercentage = (noAnswers / totalQuestions) * 100;
    const needsConsultation = negativePercentage >= 30;

    const result = {
      id: `result-${Date.now()}`,
      childId,
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      completedAt: new Date().toISOString(),
      responses,
      negativePercentage,
      recommendation: needsConsultation 
        ? 'Based on the assessment results, we recommend consulting with a healthcare professional for further evaluation and possible therapy.'
        : 'Your child appears to be developing well. Continue monitoring their progress and maintain regular check-ups.',
      needsConsultation,
    };

    dispatch(addResult(result));
    dispatch(clearResponses());
    toast.success('Assessment completed successfully!');
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{assessment.title}</h2>
          <p className="text-sm text-muted-foreground">For: {childName}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={responses[currentQuestion.id] || ''}
            onValueChange={handleAnswer}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="flex-1 cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="flex-1 cursor-pointer">
                  No
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            {isLastQuestion ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
