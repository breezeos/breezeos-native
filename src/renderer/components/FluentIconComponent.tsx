import * as FluentIcons from "@fluentui/react-icons";
import { type FluentIconName } from "@/renderer/types";

interface FluentIconComponentProps extends FluentIcons.FluentIconsProps {
  fluentIcon: FluentIconName | undefined;
}

export default function FluentIconComponent({
  fluentIcon,
  className,
}: FluentIconComponentProps) {
  if (!fluentIcon) return null;

  const FluentIcon = FluentIcons[fluentIcon];
  return <FluentIcon className={className} />;
}
