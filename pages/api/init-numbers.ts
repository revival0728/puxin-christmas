import type { NextApiHandler, NextApiResponse } from "next";
import { setCookie, deleteCookie } from "cookies-next";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  const { size } = req.body;
  console.log(size)
  let left_numbers = []

  for(let i = 1; i <= size; ++i) {
    left_numbers.push(i)
  }
  setCookie('left-numbers', '[' + left_numbers.toString() + ']', { req, res });
  deleteCookie('winner', { req, res })
  res.status(307).redirect('/lottery');
}

export default handler;
