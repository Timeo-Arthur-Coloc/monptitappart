import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "timeo.avi47@gmail.com",
    pass: "iihj nztc injt ldhd",
  },
});

export class EmailService {
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'timeo.avi47@gmail.com',
      to,
      subject,
      text
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
};
