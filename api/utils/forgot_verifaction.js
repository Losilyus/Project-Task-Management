import { transporter } from '../../configs/modemailer.config';
import { client } from '../../configs/redis.config';

client.on('error', (err) => console.log('Redis Client Error', err));

/// ////////////AUTH TOKEN SEND MAIL//////////////
export const forgotPassword = async (uuid, email) => {
  await client.connect();

  const verificationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  await client.set(`forgot:${verificationCode}`, uuid, {
    EX: 60 * 5,
  });
  await client.quit();

  const mailOptions = {
    from: 'Testing',
    to: email,
    subject: 'Email Verification',
    text: 'Email Verification',
    html: `<h2>${verificationCode}</h2> <a href="${`${process.env.URL}api/auth/forgot/reset?token=${verificationCode}`}">Token</a>`,
  };

  await transporter.sendMail(mailOptions);
};
