export class EmailService {
  async sendAccountCreationEmail(email: string): Promise<void> {
    // Logique pour envoyer un email de création de compte
    console.log(`Email de création de compte envoyé à ${email}`);
  }
}
