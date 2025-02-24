import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/type/option";

interface BasicSelectProps {
  placeholder?: string;
  options: Option<string>[];
  onValueChange: (value: string) => void;
  value: string;
  defaultValue?: string;
}

const BasicSelect = ({
  placeholder = "請選擇",
  options,
  onValueChange,
  value,
  defaultValue,
}: BasicSelectProps) => {
  return (
    <Select
      onValueChange={(value) => onValueChange(value)}
      defaultValue={defaultValue as string}
      value={value}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value as string}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BasicSelect;
