export const getSectionTitle = (key: string): string => {
  switch (key) {
    case "student":
      return "Student Portal";
    case "staff":
      return "Staff Portal";
    case "help":
      return "Help & Support";
    default:
      return key.charAt(0).toUpperCase() + key.slice(1);
  }
};

export const getSectionDescription = (key: string): string => {
  switch (key) {
    case "student":
      return "Manage your certificates and submissions";
    case "staff":
      return "Administrative tools and management";
    case "help":
      return "Get assistance and information";
    default:
      return "";
  }
};
