import dotenv from 'dotenv';
import { FlatshareEntity } from "../databases/mysql/flatshare.entity";
import { FlatshareRepository } from "../repositories/flatshare.repository";
import { EmailService } from "../services/email.service";
import { FlatshareToCreateDTO } from "../types/flatshare/dtos";
import { AppError } from "../utils/error.utils";

dotenv.config();

export class FlatshareService {
  private flatshareRepository = new FlatshareRepository();
  private emailService = new EmailService();

  async createFlashare(flatshareToCreate: FlatshareToCreateDTO): Promise<FlatshareEntity> {
    // ON CRÉE LA COLLOC
    const createdFlatshare = this.flatshareRepository.create(flatshareToCreate);

    // ON SAUVEGARDE LA COLLOC
    const savedFlatshare = await this.flatshareRepository.save(createdFlatshare);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE DU CHEF DE LA COLLOC
    await this.emailService.sendAccountCreationEmail(savedFlatshare.chief.email, "New flatshare!", `You are the chief of the new flatshare ${savedFlatshare.agency}`); // C'est juste pour le teste qu'on passe l'agence mdr

    // ON RETOURNE LA COLLOC CRÉÉE
    return savedFlatshare;
  }

  async getFlatshare(flatshareId: number): Promise<FlatshareEntity> {
    const flatshare = await this.flatshareRepository.findById(flatshareId);
    if (!flatshare) {
      throw new AppError(404, 'FLATSHARE_NOT_FOUND', 'Flatshare not found');
    }
    return flatshare;
  }

  async deleteFlatshare(flatshareId: number): Promise<void> {
    const flatshare = await this.flatshareRepository.findById(flatshareId);
    if (!flatshare) {
      throw new AppError(404, 'FLATSHARE_NOT_FOUND', 'Flatshare not found');
    }
    await this.flatshareRepository.delete(flatshareId);
  }
}