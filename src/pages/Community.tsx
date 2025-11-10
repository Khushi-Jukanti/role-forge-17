import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, ThumbsUp, Users, BookOpen } from 'lucide-react';

export default function Community() {
  const discussions = [
    {
      id: 1,
      title: 'Tips for managing sensory overload in toddlers',
      author: 'Priya M.',
      replies: 12,
      likes: 24,
      category: 'Parenting Tips',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Success story: My child\'s progress with speech therapy',
      author: 'Rahul K.',
      replies: 8,
      likes: 45,
      category: 'Success Stories',
      time: '5 hours ago',
    },
    {
      id: 3,
      title: 'Looking for recommendations for ABA therapists in Mumbai',
      author: 'Anjali S.',
      replies: 15,
      likes: 10,
      category: 'Questions',
      time: '1 day ago',
    },
  ];

  const blogs = [
    {
      id: 1,
      title: 'Understanding Early Signs of Developmental Delays',
      excerpt: 'Learn to identify key indicators that may suggest your child needs assessment...',
      author: 'Dr. Meera Sharma',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'The Importance of Routine for Children with ADHD',
      excerpt: 'Structured daily routines can significantly improve focus and behavior...',
      author: 'Dr. Arun Patel',
      readTime: '7 min read',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">Community</CardTitle>
                <CardDescription>Connect, share, and learn together</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="discussions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions">
              <MessageCircle className="w-4 h-4 mr-2" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="qa">
              <MessageCircle className="w-4 h-4 mr-2" />
              Q&A
            </TabsTrigger>
            <TabsTrigger value="blogs">
              <BookOpen className="w-4 h-4 mr-2" />
              Blogs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Discussions</h3>
              <Button>Start Discussion</Button>
            </div>

            <div className="space-y-3">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">
                            {discussion.category}
                          </Badge>
                          <h4 className="font-semibold text-lg mb-1">{discussion.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            by {discussion.author} • {discussion.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {discussion.replies} replies
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {discussion.likes} likes
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qa" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Ask a Question</h3>
              <Button>Ask Question</Button>
            </div>
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                Q&A section coming soon
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-4">
            <h3 className="text-lg font-semibold">Expert Articles</h3>
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <Card key={blog.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription>{blog.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {blog.author}</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
