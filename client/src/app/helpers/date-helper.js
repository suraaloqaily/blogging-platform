import { format, addHours } from "date-fns";

const formatDateHelper = (timeString) => {
  if (!timeString) {
    console.warn("Time string is undefined or empty");
    return "Invalid time";
  }

  console.log(timeString, "TIME STRING");

  try {
    const match = timeString.match(/^(\d{1,2}):(\d{2}):(\d{2})\..*\+(\d{2})/);
    if (match) {
      const [_, hours, minutes, seconds, tzOffset] = match;

      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      date.setSeconds(parseInt(seconds, 10));

      const serverOffset = parseInt(tzOffset, 10);
      const localOffset = -date.getTimezoneOffset() / 60;
      const diffHours = localOffset - serverOffset;

      const localDate = addHours(date, diffHours);

      return format(localDate, "h:mm a");
    }

    console.warn("Time string did not match expected format:", timeString);
    return timeString;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid time format";
  }
};

export default formatDateHelper;
