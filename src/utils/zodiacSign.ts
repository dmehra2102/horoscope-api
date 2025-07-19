import { format } from "date-fns";
import zodiacRanges from "../../zodiac_sign.json";
import horoscopeData from "../../horoscope_data.json";

export const getZediacSignByDateOfBirth = (birthdate: Date): string => {
  const birthMonth = birthdate.getUTCMonth() + 1; // getUTCMonth() is 0-indexed (Jan = 0)
  const birthDay = birthdate.getUTCDate();

  for (const signInfo of zodiacRanges) {
    const startMonth = signInfo.startDate.month;
    const startDay = signInfo.startDate.day;
    const endMonth = signInfo.endDate.month;
    const endDay = signInfo.endDate.day;

    // Handle signs that cross year boundaries (e.g., Capricorn: Dec to Jan)
    if (startMonth > endMonth) {
      if (
        (birthMonth === startMonth && birthDay >= startDay) ||
        (birthMonth === endMonth && birthDay <= endDay)
      ) {
        return signInfo.sign;
      }
    } else {
      if (birthMonth === startMonth) {
        if (birthDay >= startDay) {
          return signInfo.sign;
        }
      } else if (birthMonth === endMonth) {
        if (birthDay <= endDay) {
          return signInfo.sign;
        }
      } else if (birthMonth > startMonth && birthMonth < endMonth) {
        return signInfo.sign;
      }
    }
  }
  return null;
};

export const getHoroscopeForToday = (zodiacSign: string): string => {
  const todayDate = format(new Date(), "dd-MM-yyyy");

  const normalizedSign = zodiacSign.toLowerCase();

  if (horoscopeData[normalizedSign]) {
    const dailyHoroscopes = horoscopeData[normalizedSign];
    if (dailyHoroscopes[todayDate]) {
      return dailyHoroscopes[todayDate];
    } else {
      return `Horoscope for ${
        zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)
      } on ${todayDate} not found.`;
    }
  } else {
    return `Zodiac sign '${zodiacSign}' not found in the horoscope data. 🤔`;
  }
};
