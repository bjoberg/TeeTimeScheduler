import { convert12HourToMinutes } from "../../src/utils/TimeUtils";

describe("TimeUtils", () => {
  describe("convert12HourToMinutes", () => {
    it.each([
      ["12:00 am", 0],
      ["12:00 PM", 720],
      ["1:00 AM", 60],
      ["1:00 pm", 780],
      ["11:59 am", 719],
      ["11:59 PM", 1439],
      ["12:30 AM", 30],
      ["12:30 PM", 750],
    ])("should convert %p time to %p", (input, expected) => {
      const actual = convert12HourToMinutes(input);
      expect(actual).toBe(expected);
    });
  });
});
