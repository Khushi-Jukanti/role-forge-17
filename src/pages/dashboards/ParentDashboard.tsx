import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { parentAPI, Child, Assessment, AssessmentResult } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, UserPlus, ClipboardList, BarChart3, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import BookingModal from '@/components/BookingModal';
import ChatbotWidget from '@/components/ChatbotWidget';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>(() => []);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addChildOpen, setAddChildOpen] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState<'select' | 'questions' | 'results'>('select');
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ isPositive: boolean }[]>([]);
  const [latestResult, setLatestResult] = useState<AssessmentResult | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Child form state
  const [childForm, setChildForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Boy' as 'Boy' | 'Girl',
  });

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      loadAssessments(selectedChild.ageInMonths);
      loadResults(selectedChild._id);
    }
  }, [selectedChild]);

  // const loadChildren = async () => {
  //   try {
  //     const response = await parentAPI.getChildren();
  //     setChildren(Array.isArray(response.data.children) ? response.data.children : []);
  //     if (response.data.children.length > 0) {
  //       setSelectedChild(response.data.children[0]);
  //     }
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message || 'Failed to load children');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  // const loadChildren = async () => {
  //   try {
  //     const response = await parentAPI.getChildren({
  //       headers: { 'Cache-Control': 'no-cache' }
  //     });

  //     console.log('Children API:', response.status, response.data); // DEBUG

  //     let childrenData = [];

  //     if (response.status === 200 && Array.isArray(response.data?.children)) {
  //       childrenData = response.data.children;
  //     }

  //     setChildren(childrenData);

  //     if (childrenData.length > 0) {
  //       setSelectedChild(childrenData[0]);
  //     } else {
  //       setSelectedChild(null);
  //     }
  //   } catch (error: any) {
  //     console.error('Load children error:', error);
  //     toast.error('Failed to load children');
  //     setChildren([]);
  //     setSelectedChild(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const loadChildren = async () => {
    try {
      const response = await parentAPI.getChildren({
        headers: { 'Cache-Control': 'no-cache' }
      });

      console.log('API Response Status:', response.status);
      console.log('API Response Data:', response.data);
      console.log('response.data.children:', response.data?.children);

      let childrenData: Child[] = [];

      // CRITICAL: Check if children exists and is array
      if (response.status === 200) {
        const raw = response.data;
        if (raw && Array.isArray(raw.children)) {
          childrenData = raw.children;
        } else if (Array.isArray(raw)) {
          childrenData = raw; // fallback: maybe backend returns array directly
        }
      }

      console.log('Final childrenData:', childrenData);

      setChildren(childrenData);
      setSelectedChild(childrenData.length > 0 ? childrenData[0] : null);

    } catch (error: any) {
      console.error('Load children error:', error);
      toast.error('Failed to load children');
      setChildren([]);
      setSelectedChild(null);
    } finally {
      setIsLoading(false);
    }
  };

  // const loadAssessments = async (ageInMonths: number) => {
  //   try {
  //     const response = await parentAPI.getAssessmentsByAge(ageInMonths);
  //     setAssessments(response.data.assessments);
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message || 'Failed to load assessments');
  //   }
  // };



  // const loadResults = async (childId: string) => {
  //   try {
  //     const response = await parentAPI.getChildResults(childId);
  //     setResults(response.data.results);
  //   } catch (error: any) {
  //     console.error('Failed to load results:', error);
  //   }
  // };

  // const loadAssessments = async (ageInMonths: number) => {
  //   if (!ageInMonths) return;
  //   try {
  //     const response = await parentAPI.getAssessmentsByAge(ageInMonths);
  //     const data = response.data?.assessments;
  //     setAssessments(Array.isArray(data) ? data : []);
  //   } catch (error: any) {
  //     console.error('Failed to load assessments:', error);
  //     toast.error('Failed to load assessments');
  //     setAssessments([]);
  //   }
  // };


  const loadAssessments = async (ageInMonths: number) => {
    if (!ageInMonths) return;

    try {
      const response = await parentAPI.getAssessmentsByAge(ageInMonths, {
        headers: { 'Cache-Control': 'no-cache' }
      });

      console.log('Assessments API:', response.status, response.data); // DEBUG

      let data: Assessment[] = [];

      if (response.status === 200) {
      const raw = response.data;
      if (Array.isArray(raw?.assessments)) {
        data = raw.assessments;
      } else if (Array.isArray(raw)) {
        data = raw; // <-- YOUR CASE: raw array
      }
    }
      // 304 or error → keep empty

      setAssessments(data);

    } catch (error: any) {
      console.error('Failed to load assessments:', error);
      setAssessments([]);
    }
  };

  const loadResults = async (childId: string) => {
    try {
      const response = await parentAPI.getChildResults(childId);
      const data = response.data?.results;
      setResults(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Failed to load results:', error);
      setResults([]);
    }
  };



  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await parentAPI.addChild(childForm);
      toast.success('Child profile added successfully!');
      setChildren([...children, response.data.child]);
      setSelectedChild(response.data.child);
      setAddChildOpen(false);
      setChildForm({ firstName: '', lastName: '', dateOfBirth: '', gender: 'Boy' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add child');
    }
  };

  const handleStartAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setAssessmentMode('questions');
  };

  const handleAnswer = (isPositive: boolean) => {
    const newAnswers = [...answers, { isPositive }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < (currentAssessment?.questions?.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers: { isPositive: boolean }[]) => {
    if (!selectedChild || !currentAssessment) return;

    try {
      const response = await parentAPI.submitAssessment({
        childId: selectedChild._id,
        assessmentId: currentAssessment._id,
        answers: finalAnswers,
      });

      const result = response.data.result;
      setLatestResult(result);
      toast.success('Assessment submitted successfully!');

      // Reload results
      await loadResults(selectedChild._id);

      setAssessmentMode('results');

      // If consultation needed, show booking modal
      if (result.needsConsultation) {
        setTimeout(() => setBookingModalOpen(true), 500);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit assessment');
    }
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
                <Card
                  key={child._id}
                  className={`cursor-pointer transition-all ${selectedChild?._id === child._id
                    ? 'border-primary shadow-md'
                    : 'hover:border-primary/50'
                    }`}
                  onClick={() => setSelectedChild(child)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {child.firstName} {child.lastName}
                    </CardTitle>
                    <CardDescription>
                      {child.gender} • {child.ageInMonths} months old
                    </CardDescription>
                  </CardHeader>
                </Card>
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
                Assessment Module - {selectedChild.firstName}
              </CardTitle>
              <CardDescription>
                Complete developmental assessments to track progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={assessmentMode} onValueChange={(v) => v === 'select' || v === 'results' ? setAssessmentMode(v) : null}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="select">Assessments</TabsTrigger>
                  <TabsTrigger value="results">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Results
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="select" className="space-y-4 mt-4">
                  {assessmentMode === 'questions' && currentAssessment ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={() => setAssessmentMode('select')}>
                          Back
                        </Button>
                        <Badge variant="secondary">
                          Question {currentQuestionIndex + 1} of {currentAssessment?.questions?.length ?? 0}
                        </Badge>
                      </div>

                      <Card className="border-primary/20">
                        <CardContent className="pt-6 space-y-6">
                          <h3 className="text-xl font-semibold">
                            {currentAssessment.questions[currentQuestionIndex].text}
                          </h3>

                          <div className="grid grid-cols-2 gap-4">
                            <Button
                              size="lg"
                              className="bg-green-600 hover:bg-green-700 h-auto py-6"
                              onClick={() => handleAnswer(true)}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-2">✓</div>
                                <div>Yes</div>
                              </div>
                            </Button>
                            <Button
                              size="lg"
                              variant="destructive"
                              className="h-auto py-6"
                              onClick={() => handleAnswer(false)}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-2">✗</div>
                                <div>No</div>
                              </div>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <>
                      {assessments.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No assessments available for this age group
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {assessments.map(assessment => (
                            <Card key={assessment._id} className="hover:shadow-md transition-shadow">
                              <CardHeader>
                                <CardTitle>{assessment.title}</CardTitle>
                                <CardDescription>{assessment.description}</CardDescription>
                                <Badge variant="secondary" className="w-fit mt-2">
                                  {assessment.ageGroup} • {assessment.questions.length} questions
                                </Badge>
                              </CardHeader>
                              <CardContent>
                                <Button
                                  onClick={() => handleStartAssessment(assessment)}
                                  className="w-full"
                                >
                                  Start Assessment
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                <TabsContent value="results" className="mt-4 space-y-4">
                  {results.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No assessment results yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {results.map(result => {
                        const assessment = assessments.find(a => a._id === result.assessmentId);
                        return (
                          <Card key={result._id} className={result.needsConsultation ? 'border-orange-500' : ''}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-lg">
                                    {assessment?.title || 'Assessment'}
                                  </CardTitle>
                                  <CardDescription>
                                    Completed on {new Date(result.createdAt).toLocaleDateString()}
                                  </CardDescription>
                                </div>
                                <Badge variant={result.needsConsultation ? 'destructive' : 'secondary'}>
                                  {result.redPercent.toFixed(0)}% concerns
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {result.needsConsultation && (
                                <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
                                  <div className="flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                                        Consultation Recommended
                                      </h4>
                                      <p className="text-sm text-orange-800 dark:text-orange-200">
                                        Based on this assessment, we recommend consulting with a verified child development specialist.
                                      </p>
                                      <Button
                                        className="mt-3"
                                        size="sm"
                                        onClick={() => {
                                          setLatestResult(result);
                                          setBookingModalOpen(true);
                                        }}
                                      >
                                        Book Consultation - ₹499
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Child Dialog */}
      <Dialog open={addChildOpen} onOpenChange={setAddChildOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Child Profile</DialogTitle>
            <DialogDescription>
              Enter your child's information to get started with assessments
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddChild} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={childForm.firstName}
                  onChange={(e) => setChildForm({ ...childForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={childForm.lastName}
                  onChange={(e) => setChildForm({ ...childForm, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={childForm.dateOfBirth}
                onChange={(e) => setChildForm({ ...childForm, dateOfBirth: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={childForm.gender}
                onValueChange={(value: 'Boy' | 'Girl') => setChildForm({ ...childForm, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boy">Boy</SelectItem>
                  <SelectItem value="Girl">Girl</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setAddChildOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Child
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      {latestResult && selectedChild && (
        <BookingModal
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
          result={latestResult}
          childId={selectedChild._id}
          childName={`${selectedChild.firstName} ${selectedChild.lastName || ''}`.trim()}
        />
      )}

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </DashboardLayout>
  );
}