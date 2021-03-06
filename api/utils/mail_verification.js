import { transporter } from '../../configs/modemailer.config';
import { client } from '../../configs/redis.config';

client.on('error', (err) => console.log('Redis Client Error', err));

/// ////////////AUTH TOKEN SEND MAIL//////////////
export const emailVerification = async (uuid, email) => {
  await client.connect();

  const verificationCode = Math.floor(Math.random() * 900000) + 100000;

  await client.set(`verify:${uuid}`, verificationCode, {
    EX: 60 * 5,
  });
  await client.quit();

  const mailOptions = {
    from: 'Testing',
    to: email,
    subject: 'Email Verification',
    text: 'Email Verification',
    html: `<br><a>${verificationCode}</a>`,
  };

  await transporter.sendMail(mailOptions);
};
