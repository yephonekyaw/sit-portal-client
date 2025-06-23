interface WelcomeBannerProps {
  studentName: string;
}

export default function WelcomeBanner({ studentName }: WelcomeBannerProps) {
  // Extract initials from the name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:via-violet-500/20 dark:to-indigo-500/20 rounded-2xl p-8 border border-purple-200/30 dark:border-purple-700/30">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {getInitials(studentName)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-1">
              Welcome {studentName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage and verify your certificates securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
