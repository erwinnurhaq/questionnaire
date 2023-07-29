import moment from 'moment-timezone';
import formatScores from '~/helpers/formatScores';
import { db, excuteQuery } from '~/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Only POST requests allowed' });
      return;
    }

    const {
      user,
      answers_part_1,
      answers_part_2,
      answers_part_3,
      answers_part_4,
      answers_part_5,
      answers_part_6,
      answers_misc_1,
      answers_misc_2,
      token,
    } = req.body;

    if (!token) {
      throw new Error('Token is required!');
    }

    const scores = formatScores({
      answers_part_1,
      answers_part_2,
      answers_part_3,
      answers_part_4,
      answers_part_5,
      answers_part_6,
    });

    const currentTime = moment().utc();
    const created_at = currentTime.format('YYYY-MM-DD HH:mm:ss');
    const created_at_local = moment(currentTime).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

    const insertedUser = await excuteQuery({
      query: 'INSERT INTO participants SET ?',
      values: { ...user, created_at, created_at_local },
    });

    const participant_id = insertedUser.insertId;
    const result = await db
      .transaction()
      .query('INSERT INTO answers_part_1 SET ?', { participant_id, created_at, ...answers_part_1 })
      .query('INSERT INTO answers_part_2 SET ?', { participant_id, created_at, ...answers_part_2 })
      .query('INSERT INTO answers_part_3 SET ?', { participant_id, created_at, ...answers_part_3 })
      .query('INSERT INTO answers_part_4 SET ?', { participant_id, created_at, ...answers_part_4 })
      .query('INSERT INTO answers_part_5 SET ?', { participant_id, created_at, ...answers_part_5 })
      .query('INSERT INTO answers_part_6 SET ?', { participant_id, created_at, ...answers_part_6 })
      .query('INSERT INTO answers_misc_1 SET ?', { participant_id, created_at, ...answers_misc_1 })
      .query('INSERT INTO answers_misc_2 SET ?', { participant_id, created_at, ...answers_misc_2 })
      .query('INSERT INTO scores SET ?', { participant_id, created_at, ...scores })
      .rollback(() =>
        excuteQuery({
          query: 'DELETE FROM participants WHERE id = ?',
          values: [participant_id],
        })
      )
      .commit();

    if (result.error) {
      throw new Error(result.error);
    }
    res.status(200).json({ message: 'Success', data: scores });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
