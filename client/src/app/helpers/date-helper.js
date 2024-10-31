import { format, parseISO } from "date-fns";

const formatDateHelper = (timeString) => {
  if (!timeString) {
    console.warn("Time string is undefined or empty");
    return "Invalid time";
  }

  console.log(timeString, "TIME STRING");

  try {
    const date = parseISO(timeString);

    return format(date, "h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid time format";
  }
};

export default formatDateHelper;
