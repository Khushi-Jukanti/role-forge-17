
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/store/hooks';
import { addChild } from '@/store/slices/childrenSlice';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AddChildDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddChildDialog({ open, onOpenChange }: AddChildDialogProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !age) {
      toast.error('Please fill in all fields');
      return;
    }

    const newChild = {
      id: `child-${Date.now()}`,
      name: name.trim(),
      age: parseInt(age),
      parentId: user?.id || '',
      createdAt: new Date().toISOString(),
    };

    dispatch(addChild(newChild));
    toast.success(`${name}'s profile created successfully!`);
    setName('');
    setAge('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Child Profile</DialogTitle>
          <DialogDescription>
            Create a new profile for your child to track their development progress
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Child's Name</Label>
              <Input
                id="name"
                placeholder="Enter child's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="18"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Profile</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
