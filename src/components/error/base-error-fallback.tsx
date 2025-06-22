import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BaseErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const BaseErrorFallback: React.FC<BaseErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-slate-950">
      {/* Light mode overlay for consistency with login page */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 opacity-100 dark:opacity-0 transition-opacity duration-500"></div>

      <Card className="relative z-10 w-[400px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-red-600 dark:text-red-400 text-base font-normal">
              Something Went Wrong
            </p>
          </CardTitle>
          <CardDescription className="mt-2">
            <div className="h-px w-full bg-gray-200 dark:bg-gray-700 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              An unexpected error occurred while loading the application.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          {/* Error Message */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 w-full">
            <p className="text-center text-red-700 dark:text-red-300 text-sm leading-relaxed">
              {error.message || "An unknown error occurred"}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {/* Recovery Action */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white transition-all duration-300 shadow-lg"
            onClick={resetErrorBoundary}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          {/* Additional Help Text */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            If the problem persists, please contact our{" "}
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors">
              IT support team
            </button>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
