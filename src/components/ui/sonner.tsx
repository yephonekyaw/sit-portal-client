import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { CheckCircle, XCircle, AlertCircle, Info, Loader2 } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <>
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        richColors={true}
        position="top-center"
        closeButton={true}
        icons={{
          success: <CheckCircle className="w-5 h-5 text-green-600" />,
          error: <XCircle className="w-5 h-5 text-red-600" />,
          warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
          info: <Info className="w-5 h-5 text-blue-600" />,
          loading: <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />,
        }}
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
          } as React.CSSProperties
        }
        toastOptions={{
          style: {
            backgroundColor: "var(--popover)",
            fontFamily: "var(--default-font-family)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "16px",
            paddingLeft: "20px",
            color: "var(--popover-foreground)",
            gap: "12px",
          },
        }}
        {...props}
      />
    </>
  );
};

export { Toaster };
