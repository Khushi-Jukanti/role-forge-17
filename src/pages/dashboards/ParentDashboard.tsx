import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userAPI, DashboardResponse } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, UserPlus, ClipboardList, BarChart3 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectChild } from '@/store/slices/childrenSlice';
import { selectAssessment } from '@/store/slices/assessmentsSlice';
import ChildProfileCard from '@/components/parent/ChildProfileCard';
import AddChildDialog from '@/components/parent/AddChildDialog';
import AssessmentCard from '@/components/parent/AssessmentCard';
import AssessmentQuestions from '@/components/parent/AssessmentQuestions';
import ResultsView from '@/components/parent/ResultsView';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [addChildOpen, setAddChildOpen] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState<'select' | 'questions' | 'results'>('select');
  
  const dispatch = useAppDispatch();
  const children = useAppSelector(state => state.children.profiles);
  const selectedChildId = useAppSelector(state => state.children.selectedChildId);
  const assessments = useAppSelector(state => state.assessments.available);
  const currentAssessment = useAppSelector(state => state.assessments.currentAssessment);
  const allResults = useAppSelector(state => state.results.results);

  const selectedChild = children.find(c => c.id === selectedChildId);
  const availableAssessments = selectedChild 
    ? assessments.filter(a => selectedChild.age >= a.minAge && selectedChild.age <= a.maxAge)
    : [];
  const childResults = allResults.filter(r => r.childId === selectedChildId);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await userAPI.getDashboard();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      }
    };
    fetchDashboard();
  }, []);

  const handleStartAssessment = (assessmentId: string) => {
    dispatch(selectAssessment(assessmentId));
    setAssessmentMode('questions');
  };

  const handleAssessmentComplete = () => {
    setAssessmentMode('results');
  };

  const handleBackToSelect = () => {
    setAssessmentMode('select');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Welcome, {user?.name}!</CardTitle>
                <CardDescription className="text-base">
                  Track your child's developmental progress
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Child Profiles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Child Profiles</h2>
            <Button onClick={() => setAddChildOpen(true)} size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </div>

          {children.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <UserPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No child profiles yet</p>
                <Button onClick={() => setAddChildOpen(true)}>
                  Add Your First Child
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map(child => (
                <ChildProfileCard
                  key={child.id}
                  child={child}
                  onSelect={() => dispatch(selectChild(child.id))}
                  isSelected={child.id === selectedChildId}
                />
              ))}
            </div>
          )}
        </div>

        {/* Assessment Module */}
        {selectedChild && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Assessment Module - {selectedChild.name}
              </CardTitle>
              <CardDescription>
                Complete developmental assessments to track progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={assessmentMode} onValueChange={(v) => setAssessmentMode(v as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="select">Assessments</TabsTrigger>
                  <TabsTrigger value="results">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Results
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="select" className="space-y-4 mt-4">
                  {assessmentMode === 'questions' && currentAssessment ? (
                    <AssessmentQuestions
                      assessment={currentAssessment}
                      childId={selectedChild.id}
                      childName={selectedChild.name}
                      onComplete={handleAssessmentComplete}
                      onBack={handleBackToSelect}
                    />
                  ) : (
                    <>
                      {availableAssessments.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No assessments available for this age group
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {availableAssessments.map(assessment => (
                            <AssessmentCard
                              key={assessment.id}
                              assessment={assessment}
                              onStart={() => handleStartAssessment(assessment.id)}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                <TabsContent value="results" className="mt-4">
                  <ResultsView results={childResults} childName={selectedChild.name} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      <AddChildDialog open={addChildOpen} onOpenChange={setAddChildOpen} />
    </DashboardLayout>
  );
}
