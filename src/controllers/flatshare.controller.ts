import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { FlatshareService } from "../services/flatshare.service";
import { FlatshareToCreateDTO } from "../types/flatshare/dtos";
import { FlatsharePresenter } from "../types/flatshare/presenters";

const flatshareService = new FlatshareService();

export const createFlatshare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const flatshareToCreateDTO = plainToInstance(FlatshareToCreateDTO, req.body, { excludeExtraneousValues: true });

        const userId = (req as any).decoded.userId; // Get the userId from the token
        flatshareToCreateDTO.chief = userId; // Set the chief as the user who initiated the request

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