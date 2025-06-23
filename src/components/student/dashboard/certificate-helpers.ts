export const getStatusColor = (status: string) => {
  switch (status) {
    case "verified":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400";
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Cloud Computing":
      return "☁️";
    case "Digital Marketing":
      return "📊";
    default:
      return "🏆";
  }
};

export const formatProgress = (progress: number) => {
  if (progress === 100) return "Completed";
  if (progress >= 75) return "Almost done";
  if (progress >= 50) return "In progress";
  if (progress >= 25) return "Just started";
  return "Initializing";
};
