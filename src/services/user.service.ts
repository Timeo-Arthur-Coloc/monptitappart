import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import { EmailService } from "../services/email.service";
import { AppError } from "../utils/error.utils";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class UserService {
  private userRepository = new UserRepository();
  private emailService = new EmailService();

  private jwtSecret = process.env.JWT_SECRET;
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY
    const existingUser = await this.userRepository.findByEmail(userToCreate.email);
    if (existingUser) {
      throw new AppError(409, 'USER_ALREADY_EXISTS', 'User with this email already exists');
    }

    // Validate age > 18
    const birthdate = new Date(userToCreate.birthdate);
    const age = new Date().getFullYear() - birthdate.getFullYear();
    if (age < 18) {
      throw new AppError(400, 'USER_AGE_RESTRICTION', 'User must be at least 18 years old');
    }

    // ON HASH LE MOT DE PASSE
    const password_hash = await bcrypt.hash(userToCreate.password, 10);

    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({ ...userToCreate, password_hash });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ
    await this.emailService.sendAccountCreationEmail(savedUser.email, "Welcome to our platform!", "Your account has been successfully created");

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }

  async loginUser(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const accessToken = jwt.sign({ userId: user.id }, this.jwtSecret!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, this.jwtRefreshSecret!, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = jwt.verify(refreshToken, this.jwtRefreshSecret!) as { userId: number };
      const accessToken = jwt.sign({ userId: payload.userId }, this.jwtRefreshSecret!, { expiresIn: '15m' });
      return accessToken;
    } catch (error) {
      throw new AppError(401, 'INVALID_REFRESH_TOKEN', 'Invalid refresh token');
    }
  }

  async getUserProfile(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
    }
    return user;
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
    }
    await this.userRepository.delete(userId);
  }
}