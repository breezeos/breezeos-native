import * as FluentIcons from "@fluentui/react-icons";
import { type FluentIconName } from "@/types";

interface FluentIconComponentProps extends FluentIcons.FluentIconsProps {
  fluentIcon: FluentIconName | undefined;
}

export default function FluentIconComponent({
  fluentIcon,
  className,
  ...props
}: FluentIconComponentProps) {
  if (!fluentIcon) return null;

  const FluentIcon = FluentIcons[fluentIcon];
  return <FluentIcon className={className} {...props} />;
}
