export const getInitialsTwoInputs = (
  firstName: string,
  lastName: string
): string => {
  return (
    firstName.charAt(0).toUpperCase() + (lastName.charAt(0).toUpperCase() || "")
  );
};

export const getInitialsOneInput = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const formatDate = (
  dateString: string,
  {
    year = "2-digit",
    month = "short",
    day = "numeric",
    hour = "2-digit",
    minute = "2-digit",
  }: {
    year?: "numeric" | "2-digit";
    month?: "short" | "long";
    day?: "numeric";
    hour?: "2-digit";
    minute?: "2-digit";
  }
): string => {
  return new Date(dateString).toLocaleDateString("en-UK", {
    year,
    month,
    day,
    hour,
    minute,
  });
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  );
};

/**
 * Deep equality comparison utility for complex objects
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== "object" || typeof b !== "object") return a === b;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (
      !keysB.includes(key) ||
      !isEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    ) {
      return false;
    }
  }

  return true;
};
