import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@r/lib/utils";
import { CheckmarkFilled } from "@fluentui/react-icons";

interface CheckBoxProps extends CheckboxPrimitive.CheckboxProps {
  label?: string;
}

type CheckBox = React.ForwardRefExoticComponent<
  CheckBoxProps & React.RefAttributes<HTMLButtonElement>
>;

const Checkbox = React.forwardRef<
  React.ElementRef<CheckBox>,
  React.ComponentPropsWithoutRef<CheckBox>
>(({ className, label, disabled, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "[&:active>button]:scale-80 flex items-center space-x-2 [&[data-state=checked]>button]:bg-blue-500 [&[data-state=checked]>button]:ring-blue-500",
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      <button
        className="pointer-events-none flex h-4 w-4 shrink-0 items-center space-x-2 rounded-[4px] ring-1 ring-zinc-200 transition-all duration-200 disabled:opacity-50"
        disabled={disabled}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-zinc-50">
          <CheckmarkFilled className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </button>
      {label && <p className="font-inherit text-sm">{label}</p>}
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
