export const convert12HourToMinutes = (time: string): number => {
  const [hourMinute, meridian] = time.split(" ");
  let [hours, minutes] = hourMinute.split(":").map(Number);

  if (meridian.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridian.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
};
