import { format, addHours } from "date-fns";

const formatDateHelper = (timeString) => {
  console.log(timeString, "TIME STRING");
  try {
    const match = timeString.match(/^(\d{1,2}):(\d{2}):(\d{2})\..*\+(\d{2})/);
    if (match) {
      const [_, hours, minutes, seconds, tzOffset] = match;

      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      date.setSeconds(parseInt(seconds));

      const serverOffset = parseInt(tzOffset);
      const localOffset = -date.getTimezoneOffset() / 60;
      const diffHours = localOffset - serverOffset;

      const localDate = addHours(date, diffHours);

      return format(localDate, "h:mm a");
    }

    return timeString;
  } catch (error) {
    console.error("Error formatting date:", error);
    return timeString;
  }
};
export default formatDateHelper;
