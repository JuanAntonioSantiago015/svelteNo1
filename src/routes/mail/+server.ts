import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { from, subject, text } = await request.json();
		const transporter = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: 'e80d1c2c04ec26',
				pass: '14c58d48a28fd9'
			}
		});

		const info = await transporter.sendMail({
			to: '"Juan Antonio" juanantoniosantiago92@gmail.com',
			from,
			subject,
			text
		});
		return json({ success: true, messageId: info.messageId });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: error.message }, { status: 500 });
	}
}
