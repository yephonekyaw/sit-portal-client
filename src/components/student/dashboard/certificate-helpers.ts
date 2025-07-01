export const getStatusColor = (status: string) => {
  switch (status) {
    case "verified":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
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
