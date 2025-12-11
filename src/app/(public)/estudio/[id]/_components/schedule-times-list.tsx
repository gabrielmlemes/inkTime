'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { isSlotInThePast, isToday } from '../utils/slot-in-the-past';
import { TimeSlot } from './schedule-form';

interface ScheduleTimesListProps {
  selectedDate: Date;
  selectedTime: string | null;
  requiredSlots: number;
  blockedTimes: string[];
  availableTimes: TimeSlot[];
  studioTimes: string[];
  onTimeSelect: (time: string) => void;
}

export function ScheduleTimesList({
  selectedDate,
  selectedTime,
  requiredSlots,
  blockedTimes,
  availableTimes,
  studioTimes,
  onTimeSelect,
}: ScheduleTimesListProps) {
  const dateIsToday = isToday(selectedDate);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {availableTimes.map((timeSlot) => {
        const slotIsPast = dateIsToday && isSlotInThePast(timeSlot.time);

        return (
          <Button
            key={timeSlot.time}
            variant="outline"
            className={cn(
              'select-none',
              selectedTime === timeSlot.time && 'border-2 border-red-500 '
            )}
            onClick={() => onTimeSelect(timeSlot.time)}
            disabled={slotIsPast}
          >
            {timeSlot.time}
          </Button>
        );
      })}
    </div>
  );
}
