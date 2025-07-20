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
import BaseLayout from "@/pages/base-layout";

interface BaseErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const BaseErrorFallback: React.FC<BaseErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <BaseLayout includeNavbar={false}>
      <div className="w-full h-screen flex items-center justify-center">
        <Card className="relative z-10 w-[400px] bg-white/80 border-0">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-600 text-base font-normal">
                Something Went Wrong
              </p>
            </CardTitle>
            <CardDescription className="mt-2">
              <div className="h-px w-full bg-gray-200 mb-4" />
              <p className="text-gray-600">
                An unexpected error occurred while loading the application.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            {/* Error Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
              <p className="text-center text-red-700 text-sm leading-relaxed">
                {error.message || "An unknown error occurred"}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {/* Recovery Action */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 shadow-lg"
              onClick={resetErrorBoundary}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            {/* Additional Help Text */}
            <p className="text-sm text-gray-600 text-center">
              If the problem persists, please contact our{" "}
              <button className="text-blue-600 hover:text-blue-700 underline transition-colors">
                IT support team
              </button>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </BaseLayout>
  );
};
