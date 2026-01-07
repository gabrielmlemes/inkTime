import { CheckSubscriptionProps } from '@/permissions/check-subscription';

interface TrialLabelProps {
  subscription: CheckSubscriptionProps;
}

export function TrialLabel({ subscription }: TrialLabelProps) {
  return (
    <div className="my-2">
      <h3 className="font-semibold text-lg text-muted-foreground">{subscription.message}</h3>
    </div>
  );
}
