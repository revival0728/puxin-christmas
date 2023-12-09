import type { NextApiHandler, NextApiResponse } from "next";
import { getCookie, setCookie } from "cookies-next";

function randInt(max: number) {
  return Math.floor(Math.random() * max)
}

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  const cookie = getCookie('left-numbers', { req, res })

  if(cookie === undefined) {
    res.status(307).redirect('/lottery');
    return
  }

  let left_numbers: number[] = JSON.parse(cookie)

  if(left_numbers.length === 0) {
    res.status(307).redirect('/lottery');
    return
  }

  let win_id = randInt(left_numbers.length)

  setCookie('winner', left_numbers[win_id], { req, res })
  left_numbers.splice(win_id, 1)

  setCookie('left-numbers', '[' + left_numbers.toString() + ']', { req, res });
  res.status(307).redirect('/lottery');
}

export default handler;
