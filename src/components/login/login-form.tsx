import React, { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LoginFormProps {
  onMicrosoftLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = memo(
  ({ onMicrosoftLogin }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Use your SIT account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={onMicrosoftLogin}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium transition-all duration-300 shadow-lg"
                size="lg"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                </svg>
                Continue with Microsoft
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 dark:bg-slate-800/80 px-2 text-gray-500 dark:text-gray-400">
                  Secure Authentication
                </span>
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Protected by Microsoft
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Your login is secured with enterprise-grade authentication
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

LoginForm.displayName = "LoginForm";
