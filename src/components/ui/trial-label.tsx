import { CheckSubscriptionProps } from '@/permissions/check-subscription';

interface TrialLabelProps {
  subscription: CheckSubscriptionProps;
}

export function TrialLabel({ subscription }: TrialLabelProps) {
  return (
    <div className="my-2">
      <p className="font-semibold text-lg text-muted-foreground">{subscription.message}</p>
    </div>
  );
}
