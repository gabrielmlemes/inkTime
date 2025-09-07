interface DividerProps extends React.ComponentProps<'div'> {
  flexItem?: boolean;
  height?: string;
  orientation?: 'horizontal' | 'vertical';
  text?: string;
  width?: string;
}
import clsx from 'clsx';

export function Divider({
  flexItem,
  height,
  orientation = 'horizontal',
  text,
  width = 'w-full',
  className,
  ...props
}: Readonly<DividerProps>) {
  if (orientation === 'vertical') {
    return (
      <div
        data-testid="separator"
        className={clsx('bg-muted w-px', flexItem && 'self-stretch', height, className)}
        {...props}
      />
    );
  }

  return (
    <>
      {text ? (
        <div
          className={clsx('relative flex items-center justify-center', width, className)}
          {...props}
        >
          <p className="bg-background text-foreground-soft z-10 px-3 text-sm">{text}</p>
          <div data-testid="separator" className="bg-muted absolute h-px w-full" />
        </div>
      ) : (
        <div
          data-testid="separator"
          className={clsx('bg-muted h-px', width, className)}
          {...props}
        />
      )}
    </>
  );
}
