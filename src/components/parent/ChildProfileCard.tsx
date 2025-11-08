import { Child } from '@/store/slices/childrenSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar } from 'lucide-react';

interface ChildProfileCardProps {
  child: Child;
  onSelect: () => void;
  isSelected: boolean;
}

export default function ChildProfileCard({ child, onSelect, isSelected }: ChildProfileCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{child.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {child.age} years old
            </p>
          </div>
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
