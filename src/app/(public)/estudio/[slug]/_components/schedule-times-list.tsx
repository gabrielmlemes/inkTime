'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { isSlotInThePast, isSlotSequenceAvailable, isToday } from '../utils/schedule';
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
      {availableTimes.map((availableTimesSlot) => {
        const sequenceOk = isSlotSequenceAvailable(
          availableTimesSlot.time,
          requiredSlots,
          studioTimes,
          blockedTimes
        );

        const slotIsPast = dateIsToday && isSlotInThePast(availableTimesSlot.time);

        const slotEnabled = availableTimesSlot.available && sequenceOk && !slotIsPast;

        return (
          <Button
            key={availableTimesSlot.time}
            variant="outline"
            className={cn(
              'select-none',
              selectedTime === availableTimesSlot.time && 'border-2 border-primary',
              !slotEnabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => slotEnabled && onTimeSelect(availableTimesSlot.time)}
            disabled={!slotEnabled}
            type="button"
          >
            {availableTimesSlot.time}
          </Button>
        );
      })}
    </div>
  );
}
