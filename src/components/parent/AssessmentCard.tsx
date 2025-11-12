import { Assessment } from '@/store/slices/assessmentsSlice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock } from 'lucide-react';
import puzzlePattern from '@/assets/puzzle.jpg';

interface AssessmentCardProps {
  assessment: Assessment;
  onStart: () => void;
  disabled?: boolean;
}

export default function AssessmentCard({ assessment, onStart, disabled }: AssessmentCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Puzzle pattern background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${puzzlePattern})`,
          backgroundSize: '120px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <Badge variant="secondary">{assessment.ageGroup}</Badge>
        </div>
        <CardTitle className="text-lg">{assessment.title}</CardTitle>
        <CardDescription>{assessment.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{assessment.questions.length} questions</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStart} 
          className="w-full"
          disabled={disabled}
        >
          Start Assessment
        </Button>
      </CardFooter>
    </Card>
  );
}