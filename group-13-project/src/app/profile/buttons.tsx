import clsx from 'clsx';
import { Button } from "@/app/ui/button";


export function SubmitBtn({ label = "Submit", variant = "text" }: { label?: string; variant?: "icon" | "text" }) {
  return (
    <Button
      type="submit"
      className={clsx(
        "relative inline-flex items-center rounded-md transition-all duration-300 px-4 py-2 text-white bg-green-500 hover:bg-green-700 hover:scale-105",
        { "px-4 py-4": variant === "icon" }
      )}
    >
      {variant === "icon" ? "✔️" : `🚀 ${label}`}
    </Button>
  );
}
