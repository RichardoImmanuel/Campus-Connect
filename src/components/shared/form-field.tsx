import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, error, children }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}