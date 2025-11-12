import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { parentAPI, Child, Assessment, AssessmentResult as APIAssessmentResult } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, UserPlus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import ChildProfileCard from '@/components/parent/ChildProfileCard';
import AssessmentCard from '@/components/parent/AssessmentCard';
import AssessmentQuestions from '@/components/parent/AssessmentQuestions';
import ResultsView from '@/components/parent/ResultsView';
import AddChildDialog from '@/components/parent/AddChildDialog';
import BookingModal from '@/components/BookingModal';

type ViewMode = 'dashboard' | 'assessment' | 'results';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [results, setResults] = useState<APIAssessmentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addChildOpen, setAddChildOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<APIAssessmentResult | null>(null);

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      loadAssessments(selectedChild.ageInMonths);
      loadResults(selectedChild._id);
    }
  }, [selectedChild]);

  const loadChildren = async () => {
    try {
      const response = await parentAPI.getChildren();
      const childrenData = Array.isArray(response.data?.children) ? response.data.children : [];
      setChildren(childrenData);
      if (childrenData.length > 0 && !selectedChild) {
        setSelectedChild(childrenData[0]);
      }
    } catch (error: any) {
      toast.error('Failed to load children');
      setChildren([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAssessments = async (ageInMonths: number) => {
    if (!ageInMonths) return;
    try {
      const response = await parentAPI.getAssessmentsByAge(ageInMonths);
      const data = response.data?.assessments || [];
      setAssessments(Array.isArray(data) ? data : []);
    } catch (error: any) {
      setAssessments([]);
    }
  };

  const loadResults = async (childId: string) => {
    try {
      const response = await parentAPI.getChildResults(childId);
      const data = response.data?.results || [];
      setResults(Array.isArray(data) ? data : []);
    } catch (error: any) {
      setResults([]);
    }
  };

  const handleChildAdded = async (child: Child) => {
    setChildren([...children, child]);
    setSelectedChild(child);
    await loadAssessments(child.ageInMonths);
    await loadResults(child._id);
  };

  const handleStartAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setViewMode('assessment');
  };

  const handleAssessmentComplete = async () => {
    if (selectedChild) {
      await loadResults(selectedChild._id);
    }
    setViewMode('results');
  };

  const handleBackToDashboard = () => {
    setViewMode('dashboard');
    setCurrentAssessment(null);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Assessment View - Full Page
  if (viewMode === 'assessment' && currentAssessment && selectedChild) {
    return (
      <DashboardLayout>
        <AssessmentQuestions
          assessment={{
            id: currentAssessment._id,
            title: currentAssessment.title,
            description: currentAssessment.description,
            ageGroup: currentAssessment.ageGroup,
            minAge: 0,
            maxAge: 999,
            questions: currentAssessment.questions.map(q => ({
              id: q._id,
              text: q.text,
              category: q.category,
              type: 'yes-no'
            }))
          }}
          childId={selectedChild._id}
          childName={`${selectedChild.firstName} ${selectedChild.lastName || ''}`}
          onComplete={handleAssessmentComplete}
          onBack={handleBackToDashboard}
        />
      </DashboardLayout>
    );
  }

  // Results View - Full Page
  if (viewMode === 'results' && selectedChild) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBackToDashboard}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-semibold">Assessment Results</h2>
              <p className="text-muted-foreground">For: {selectedChild.firstName} {selectedChild.lastName}</p>
            </div>
          </div>
          <ResultsView 
            results={results.map(r => ({
              id: r._id,
              childId: r.childId,
              assessmentId: r.assessmentId,
              assessmentTitle: 'Assessment',
              completedAt: r.createdAt,
              responses: {},
              negativePercentage: r.redPercent,
              recommendation: '',
              needsConsultation: r.needsConsultation
            }))} 
            childName={`${selectedChild.firstName} ${selectedChild.lastName || ''}`} 
          />
        </div>
      </DashboardLayout>
    );
  }

  // Dashboard View
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Card with Gradient */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 overflow-hidden relative">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-accent-blue rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Welcome, {user?.name}!</CardTitle>
                <CardDescription className="text-base">
                  Track your child's developmental progress with assessments
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Child Profiles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Child Profiles</h2>
            <Button onClick={() => setAddChildOpen(true)} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </div>

          {children.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="py-12 text-center">
                <UserPlus className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No child profiles yet</h3>
                <p className="text-muted-foreground mb-6">Add your first child to get started with assessments</p>
                <Button onClick={() => setAddChildOpen(true)} className="bg-gradient-to-r from-primary to-accent">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Your First Child
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map(child => (
                <ChildProfileCard
                  key={child._id}
                  child={{
                    id: child._id,
                    name: `${child.firstName} ${child.lastName || ''}`,
                    age: Math.floor(child.ageInMonths / 12),
                    parentId: '',
                    createdAt: ''
                  }}
                  onSelect={() => setSelectedChild(child)}
                  isSelected={selectedChild?._id === child._id}
                />
              ))}
            </div>
          )}
        </div>

        {/* Assessments and Results */}
        {selectedChild && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Assessments */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Available Assessments</CardTitle>
                <CardDescription>
                  Complete assessments for {selectedChild.firstName} ({selectedChild.ageInMonths} months old)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No assessments available for this age group
                  </p>
                ) : (
                  <div className="space-y-4">
                    {assessments.map(assessment => (
                      <AssessmentCard
                        key={assessment._id}
                        assessment={{
                          id: assessment._id,
                          title: assessment.title,
                          description: assessment.description,
                          ageGroup: assessment.ageGroup,
                          minAge: assessment.minAgeMonths,
                          maxAge: assessment.maxAgeMonths,
                          questions: assessment.questions.map(q => ({
                            id: q._id,
                            text: q.text,
                            category: q.category,
                            type: 'yes-no' as const
                          }))
                        }}
                        onStart={() => handleStartAssessment(assessment)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Results */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Recent Results</CardTitle>
                    <CardDescription>Assessment history for {selectedChild.firstName}</CardDescription>
                  </div>
                  {results.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setViewMode('results')}>
                      View All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No assessments completed yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {results.slice(0, 3).map(result => (
                      <Card key={result._id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Assessment Completed</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(result.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            result.needsConsultation 
                              ? 'bg-destructive/10 text-destructive' 
                              : 'bg-success/10 text-success'
                          }`}>
                            {result.needsConsultation ? 'Needs Attention' : 'Good Progress'}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {selectedResult && selectedChild && (
          <BookingModal
            open={bookingModalOpen}
            onOpenChange={setBookingModalOpen}
            result={selectedResult}
            childId={selectedChild._id}
            childName={`${selectedChild.firstName} ${selectedChild.lastName || ''}`}
          />
        )}
      </div>
    </DashboardLayout>
  );
}