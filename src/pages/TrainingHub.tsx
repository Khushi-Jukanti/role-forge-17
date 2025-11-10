import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Award, Play, Clock } from 'lucide-react';

export default function TrainingHub() {
  const courses = [
    {
      id: 1,
      title: 'Autism Spectrum Disorder Basics',
      category: 'Foundational',
      progress: 75,
      duration: '4 hours',
      enrolled: true,
    },
    {
      id: 2,
      title: 'ADHD Management Strategies',
      category: 'Advanced',
      progress: 30,
      duration: '6 hours',
      enrolled: true,
    },
    {
      id: 3,
      title: 'Speech Therapy Techniques',
      category: 'Specialized',
      progress: 0,
      duration: '5 hours',
      enrolled: false,
    },
    {
      id: 4,
      title: 'Parent Counseling Skills',
      category: 'Professional',
      progress: 100,
      duration: '3 hours',
      enrolled: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">Training Hub</CardTitle>
                <CardDescription>Enhance your skills with professional courses</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Learning Hours</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Badge variant="secondary">{course.category}</Badge>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </CardDescription>
                  </div>
                  {course.progress === 100 && (
                    <Award className="w-8 h-8 text-yellow-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {course.enrolled ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    <Button className="w-full" variant={course.progress === 100 ? 'secondary' : 'default'}>
                      <Play className="w-4 h-4 mr-2" />
                      {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" variant="outline">
                    Enroll Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
