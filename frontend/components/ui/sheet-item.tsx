import { LucideIcon } from "lucide-react";

interface SheetItemProps {
  className?: string | null;
  url: string;
  Icon: LucideIcon;
  name: string;
}

const SheetItem: React.FC<SheetItemProps> = ({
  className = "",
  url,
  Icon,
  name,
}) => {
  return (
    <div
      className={`flex flex-row pt-[1vh] pr-[20vh] pb-[1vh] mb-[1vh] rounded-lg cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={() => {
        location.href = url;
      }}
    >
      <Icon />
      <p className="ml-[1vh]">{name}</p>
    </div>
  );
};

export default SheetItem;
