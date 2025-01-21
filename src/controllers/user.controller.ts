import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(userToCreateDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const user = await userService.registerUser(req.body);
    // appeler le logger service pour enregistrer QUI a créer un utilisateur (peut être un admin ou l'utilisateur lui même (?)  )

    const createdUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(201).json(createdUser); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const tokens = await userService.loginUser(email, password);
    res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await userService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10); // Use userId from request params
    const user = await userService.getUserProfile(userId);
    const userProfile = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};