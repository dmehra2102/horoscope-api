import { UserModel } from "@/models";
import { UserRegisterInput } from "@/interfaces";
import { Request, NextFunction, Response } from "express";
import { createError, getZediacSignByDateOfBirth } from "@/utils";

export class AuthController {
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, birthDate, password }: UserRegisterInput = req.body;
      const exisitingUser = await UserModel.findOne({ email }).lean().exec();
      if (exisitingUser) {
        next(createError(400, "user already exists with provided email"));
      }

      const [day, month, year] = birthDate.split("-").map(Number);
      const parsedDate = new Date(Date.UTC(year, month - 1, day));

      if (isNaN(parsedDate.getTime())) {
        next(
          createError(400, "Invalid birthDate format. Please use DD-MM-YYYY.")
        );
      }

      const zodiac_sign = getZediacSignByDateOfBirth(parsedDate);
      console.log("zodiac_sign", zodiac_sign);
      const newUser = new UserModel({
        name,
        email,
        password,
        birthDate: parsedDate,
        zodiac_sign,
      });
      await newUser.save();
      return res.status(200).send({
        message: "User registered successfully.",
        data: { _id: newUser._id },
      });
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
