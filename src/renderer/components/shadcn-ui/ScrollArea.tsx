import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@r/utils";

interface ScrollAreaRoot extends ScrollAreaPrimitive.ScrollAreaProps {
  thumbVisibled?: boolean;
}

type ScrollArea = React.ForwardRefExoticComponent<
  ScrollAreaRoot & React.RefAttributes<HTMLDivElement>
>;

const ScrollArea = React.forwardRef<
  React.ElementRef<ScrollArea>,
  React.ComponentPropsWithoutRef<ScrollArea>
>(
  (
    { className, children, thumbVisibled: thumbVisibled = false, ...props },
    ref,
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full pb-1">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar visible={thumbVisibled} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  ),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

interface ScrollAreaScrollbarProps
  extends ScrollAreaPrimitive.ScrollAreaScrollbarProps {
  visible?: boolean;
  thumbColor?: "dark" | "light";
}

type ScrollAreaScrollBar = React.ForwardRefExoticComponent<
  ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>
>;

const ScrollBar = React.forwardRef<
  React.ElementRef<ScrollAreaScrollBar>,
  React.ComponentPropsWithoutRef<ScrollAreaScrollBar>
>(
  (
    {
      className,
      orientation = "vertical",
      visible,
      thumbColor = "dark",
      ...props
    },
    ref,
  ) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-all duration-200",
        !visible && "hidden",
        orientation === "vertical" &&
          "h-full w-1.5 border-l border-l-transparent p-[1px] hover:w-2.5",
        orientation === "horizontal" &&
          "h-1.5 flex-col border-t border-t-transparent p-[1px] hover:h-2.5",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(
          "relative flex-1 rounded-full",
          thumbColor === "dark" && "bg-zinc-900/40",
          thumbColor === "light" && "bg-zinc-100/40",
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea };
