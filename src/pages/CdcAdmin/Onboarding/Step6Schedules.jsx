import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Step6Schedules({ data, onUpdate, onNext, onBack }) {
  const [schedules, setSchedules] = useState(data.schedules || []);
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const therapists = data.therapists || [];

  const addSchedule = () => {
    if (selectedTherapist && selectedDay && startTime && endTime) {
      const therapist = therapists.find(t => t.id.toString() === selectedTherapist);
      setSchedules([
        ...schedules,
        {
          id: Date.now(),
          therapistId: selectedTherapist,
          therapistName: therapist?.fullName || 'Unknown',
          day: selectedDay,
          startTime,
          endTime,
          status: Math.random() > 0.5 ? 'Available' : 'Booked'
        }
      ]);
    }
  };

  const removeSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const handleNext = () => {
    onUpdate({ schedules });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedules</CardTitle>
        <p className="text-sm text-muted-foreground">Set up therapist availability schedules</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Schedule Form */}
        <div className="p-4 border rounded-lg space-y-4 bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Select Therapist</Label>
              <Select value={selectedTherapist} onValueChange={setSelectedTherapist}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose therapist" />
                </SelectTrigger>
                <SelectContent>
                  {therapists.map(therapist => (
                    <SelectItem key={therapist.id} value={therapist.id.toString()}>
                      {therapist.fullName} - {therapist.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Day</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div>
              <Label>End Time</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={addSchedule} className="w-full" disabled={!selectedTherapist}>
            <Plus className="w-4 h-4 mr-2" />
            Add Time Slot
          </Button>
        </div>

        {/* Schedule Display */}
        <div className="space-y-4">
          <h3 className="font-semibold">Added Schedules</h3>
          {schedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-lg">
              No schedules added yet. Add time slots above.
            </div>
          ) : (
            <div className="space-y-2">
              {daysOfWeek.map(day => {
                const daySchedules = schedules.filter(s => s.day === day);
                if (daySchedules.length === 0) return null;

                return (
                  <div key={day} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{day}</h4>
                    <div className="space-y-2">
                      {daySchedules.map(schedule => (
                        <div
                          key={schedule.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded"
                        >
                          <div className="flex items-center gap-4">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{schedule.therapistName}</p>
                              <p className="text-xs text-muted-foreground">
                                {schedule.startTime} - {schedule.endTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={schedule.status === 'Available' ? 'default' : 'secondary'}>
                              {schedule.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSchedule(schedule.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Previous
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
