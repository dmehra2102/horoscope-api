import { UserHoroscopeLogModel, UserModel } from "@/models";
import { createError, getHoroscopeForToday } from "@/utils";
import { Request, NextFunction, Response } from "express";

export class HoroscopeController {
  public getTodaysHoroscope = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user;
      const userZodiacSign = await UserModel.findById(userId)
        .select("zodiac_sign")
        .lean()
        .exec();

      if (!userZodiacSign) {
        return next(createError(401, "User not found"));
      }

      const horoscope_exist = await UserHoroscopeLogModel.findOne({ userId })
        .lean()
        .exec();
      if (horoscope_exist) {
        return res.status(200).json({ data: horoscope_exist });
      }

      const horoscope_text = getHoroscopeForToday(userZodiacSign.zodiac_sign);
      if (!horoscope_text) {
        return next(
          createError(
            500,
            `Today's horoscope for ${userZodiacSign.zodiac_sign} zodiac sign not found.`
          )
        );
      }

      const newUserHoroscopeLog = await UserHoroscopeLogModel.create({
        userId,
        horoscopeText: horoscope_text,
        zodiac_sign: userZodiacSign.zodiac_sign,
      });

      return res.status(201).json({ data: newUserHoroscopeLog });
    } catch (error) {
      return next(error);
    }
  };

  public getHoroscopeHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {
      return next(error);
    }
  };
}
