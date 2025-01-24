import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { FlatshareRepository } from "../repositories/flatshare.repository";
import { FlatshareService } from "../services/flatshare.service";
import { FlatshareToCreateDTO } from "../types/flatshare/dtos";
import { FlatsharePresenter } from "../types/flatshare/presenters";
import { AppError } from "../utils/error.utils";
import { formatResponse } from "../utils/response.utils";
import { UserRepository } from "../repositories/user.repository";

const flatshareService = new FlatshareService();
const flatshareRepository = new FlatshareRepository();
const userRepository = new UserRepository();

export const createFlatshare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const flatshareToCreateDTO = plainToInstance(FlatshareToCreateDTO, req.body, { excludeExtraneousValues: true });

        const userId = (req as any).decoded.userId; // Get the userId from the token
        flatshareToCreateDTO.chief = userId; // Set the chief as the user who initiated the request

        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        flatshareToCreateDTO.roomates = [user];

        const dtoErrors = await validate(flatshareToCreateDTO);
        if (dtoErrors.length > 0) {
            console.log(dtoErrors);
            throw new Error("Invalid fields");
        }

        const flatshare = await flatshareService.createFlatshare(flatshareToCreateDTO);
        // appeler le logger service pour enregistrer QUI a créer une colloc (peut être un admin ou le chef lui même (?)  )

        const createdFlatshare = plainToInstance(FlatsharePresenter, flatshare, { excludeExtraneousValues: true });
        res.status(201).json(createdFlatshare); // à vous de créer une class pour gérer les success
    } catch (error) {
        next(error);
    }
};

export const getFlatshare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const flatshareId = parseInt(req.params.id, 10);
        const flatshare = await flatshareService.getFlatshare(flatshareId);
        const flatshareData = plainToInstance(FlatsharePresenter, flatshare, { excludeExtraneousValues: true });
        res.status(200).json(flatshareData);
    } catch (error) {
        next(error);
    }
};

export const deleteFlatshare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const flatshareId = parseInt(req.params.id, 10);
        await flatshareService.deleteFlatshare(flatshareId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const changeChief = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const flatshareId = parseInt(req.params.id, 10);
        const flatshare = await flatshareRepository.findById(flatshareId);
        const newChiefId = req.body.newChiefId;
        const chiefId = (req as any).decoded.userId;

        if(flatshare?.chief.id !== chiefId) {
            throw new AppError(403, 'FORBIDDEN', 'You are not allowed to perform this action');
        }

        const updatedFlatshare = await flatshareService.changeChief(flatshare!, newChiefId);
        const updatedFlatshareData = plainToInstance(FlatsharePresenter, updatedFlatshare, { excludeExtraneousValues: true });
        res.status(200).json(updatedFlatshareData);
    } catch (error) {
        next(error);
    }
};

export const getAllFlatshares = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const flatshares = await flatshareService.getAllFlatshares();
        const flatshareData = plainToInstance(FlatsharePresenter, flatshares, { excludeExtraneousValues: true });
        res.status(200).json(formatResponse(req, flatshareData));
    } catch (error) {
        next(error);
    }
};