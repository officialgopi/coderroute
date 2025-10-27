import { Loader2, Play, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CenterSection = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isRunLoading, setIsRunLoading] = useState<boolean>(false);

  const handleRun = async () => {
    setIsRunLoading(true);
    setTimeout(() => {
      setIsRunLoading(false);
    }, 3000);
  };
  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    setTimeout(() => {
      setIsSubmitLoading(false);
    }, 3000);
  };

  return (
    <div className="flex items-center  flex-1 justify-center">
      <Button
        variant="outline"
        className=" rounded-md text-sm font-medium flex items-center gap-2 px-3 rounded-r-none"
        disabled={isRunLoading || isSubmitLoading}
        onClick={handleRun}
      >
        {!isRunLoading ? (
          <Play className="w-4 h-4" />
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </Button>
      <Button
        variant="outline"
        className="transition-colors   rounded-md  rounded-l-none text-sm font-medium flex items-center gap-2 px-3"
        onClick={handleSubmit}
        disabled={isRunLoading || isSubmitLoading}
      >
        {!isSubmitLoading ? (
          <Upload className="w-4 h-4" />
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        Submit
      </Button>
    </div>
  );
};

export default CenterSection;
