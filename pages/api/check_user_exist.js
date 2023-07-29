import { excuteQuery } from '~/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Only GET requests allowed' });
      return;
    }

    const { email } = req.query;
    const result = await excuteQuery({
      query: 'SELECT * FROM participants WHERE email = ?',
      values: [email],
    });
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.length > 0) {
      res.status(400).json({ message: 'Email sudah terdaftar, silahkan gunakan email yang lain.' });
    } else {
      res.status(200).json({ message: 'Success', data: {} });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
