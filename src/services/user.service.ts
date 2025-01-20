import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import { EmailService } from "../services/email.service";
import { AppError } from "../utils/error.utils";
import * as bcrypt from 'bcryptjs';

export class UserService {
  private userRepository = new UserRepository();
  private emailService = new EmailService();

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY
    const existingUser = await this.userRepository.findByEmail(userToCreate.email);
    if (existingUser) {
      throw new AppError(409, 'USER_ALREADY_EXISTS', 'User with this email already exists');
    }

    // ON HASH LE MOT DE PASSE
    const password_hash = await bcrypt.hash(userToCreate.password, 10);

    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({ ...userToCreate, password_hash });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ
    await this.emailService.sendAccountCreationEmail(savedUser.email);

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }
}