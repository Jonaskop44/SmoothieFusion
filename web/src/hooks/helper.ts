import { useCallback } from "react";

const useFormattedDate = () => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }, []);

  return formatDate;
};

export default useFormattedDate;
