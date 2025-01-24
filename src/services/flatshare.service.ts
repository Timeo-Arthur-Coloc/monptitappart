import dotenv from 'dotenv';
import { FlatshareEntity } from "../databases/mysql/flatshare.entity";
import { FlatshareRepository } from "../repositories/flatshare.repository";
import { EmailService } from "../services/email.service";
import { FlatshareToCreateDTO } from "../types/flatshare/dtos";
import { AppError } from "../utils/error.utils";
import { UserRepository } from "../repositories/user.repository";

dotenv.config();

export class FlatshareService {
  private flatshareRepository = new FlatshareRepository();
  private emailService = new EmailService();
  private userRepository = new UserRepository();

  async createFlatshare(flatshareToCreate: FlatshareToCreateDTO): Promise<FlatshareEntity> {
    // Find the user by ID
    const chiefUser = await this.userRepository.findById(flatshareToCreate.chief);
    if (!chiefUser) {
      throw new AppError(404, 'USER_NOT_FOUND', 'Chief user not found');
    }

    // Set the chief email
    flatshareToCreate.chief = chiefUser.id;

    // ON CRÉE LA COLLOC
    const createdFlatshare = this.flatshareRepository.create(flatshareToCreate);

    // ON SAUVEGARDE LA COLLOC
    const savedFlatshare = await this.flatshareRepository.save(createdFlatshare);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE DU CHEF DE LA COLLOC
    await this.emailService.sendEmail(chiefUser.email, "New flatshare!", `You are the chief of the new flatshare ${savedFlatshare.agency}`); // C'est juste pour le teste qu'on passe l'agence mdr

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
    flatshare.isActive = false;
    await this.flatshareRepository.save(flatshare);

    // Send email to the chief
    await this.emailService.sendEmail(flatshare.chief.email, "Flatshare Deleted", `The flatshare ${flatshare.agency} has been deleted.`);
  }

  async changeChief(flatshare: FlatshareEntity, newChiefId: number): Promise<FlatshareEntity> {
    if (!flatshare) {
      throw new AppError(404, 'FLATSHARE_NOT_FOUND', 'Flatshare not found');
    }

    if (flatshare.chief.id === newChiefId) {
      throw new AppError(400, 'SAME_CHIEF', 'The new chief is the same as the current chief');
    }

    const newChief = await this.userRepository.findById(newChiefId);
    if (!newChief) {
      throw new AppError(404, 'USER_NOT_FOUND', 'New chief user not found');
    }

    flatshare.chief = newChief;
    const updatedFlatshare = await this.flatshareRepository.save(flatshare);

    // Send email to the new chief
    await this.emailService.sendEmail(newChief.email, "You are the new chief!", `You are now the chief of the flatshare ${updatedFlatshare.agency}.`);

    return updatedFlatshare;
  }

  async getAllFlatshares(): Promise<FlatshareEntity[]> {
    return this.flatshareRepository.findAll();
  }
}