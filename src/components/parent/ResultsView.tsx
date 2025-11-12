import { AssessmentResult } from '@/store/slices/resultSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Calendar, FileText } from 'lucide-react';

interface ResultsViewProps {
  results: AssessmentResult[];
  childName: string;
}

export default function ResultsView({ results, childName }: ResultsViewProps) {
  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No assessments completed yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{result.assessmentTitle}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(result.completedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </CardDescription>
              </div>
              <Badge variant={result.needsConsultation ? 'destructive' : 'default'}>
                {result.needsConsultation ? 'Needs Attention' : 'Good Progress'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">Developmental Score</span>
              <span className="text-2xl font-bold">
                {Math.round(100 - result.negativePercentage)}%
              </span>
            </div>

            <Alert variant={result.needsConsultation ? 'destructive' : 'default'}>
              {result.needsConsultation ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <AlertTitle>
                {result.needsConsultation ? 'Consultation Recommended' : 'Positive Results'}
              </AlertTitle>
              <AlertDescription className="mt-2">
                {result.recommendation}
              </AlertDescription>
            </Alert>

            {result.needsConsultation && (
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg">
                <h4 className="font-semibold text-sm text-orange-900 dark:text-orange-100 mb-2">
                  Recommended Next Steps:
                </h4>
                <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                  <li>• Schedule a consultation with a pediatrician</li>
                  <li>• Consider therapy or intervention programs</li>
                  <li>• Contact our CDC centres for specialized care</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}