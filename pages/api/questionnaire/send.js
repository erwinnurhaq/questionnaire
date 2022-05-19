import excuteQuery from "../../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Only POST requests allowed' })
      return
    }
  
    const { name, email } = req.body;
    const result = await excuteQuery({
      query: "INSERT INTO test (name, email) VALUES (?, ?)",
      values: [name, email],
    });
    console.log("result", result);
    if(result.error) {
      throw new Error(result.error)
    }
    res.status(200).json({ message: 'Success', data: result })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
