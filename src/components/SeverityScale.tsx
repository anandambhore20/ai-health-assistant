import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SeverityScaleProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  lowLabel?: string;
  midLabel?: string;
  highLabel?: string;
  className?: string;
}

const SeverityScale = ({ 
  label, 
  value, 
  onChange, 
  lowLabel = "None", 
  midLabel = "Moderate", 
  highLabel = "Severe",
  className = "" 
}: SeverityScaleProps) => {
  const getScaleColor = (value: number) => {
    if (value <= 3) return "text-green-600";
    if (value <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScaleEmoji = (value: number) => {
    if (value === 0) return "😊";
    if (value <= 2) return "🙂";
    if (value <= 4) return "😐";
    if (value <= 6) return "😟";
    if (value <= 8) return "😰";
    return "😱";
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getScaleEmoji(value)}</span>
          <span className={`text-lg font-bold ${getScaleColor(value)}`}>
            {value}/10
          </span>
        </div>
      </div>
      
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          max={10}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 px-2">
        <span>{lowLabel} (0)</span>
        <span>{midLabel} (5)</span>
        <span>{highLabel} (10)</span>
      </div>
    </div>
  );
};

export default SeverityScale;