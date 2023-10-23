import type { GetServerSideProps } from 'next'
import { getCookie } from 'cookies-next'

type PageProps = {
  left_numbers: number[]
  winner: string | null
}

export default function Page({ left_numbers, winner }: PageProps) {
  return (
    <>
      <form action='/api/init-numbers' method='post'>
        <label htmlFor='size'>size: </label>
        <input type='number' name='size' />
        <button type='submit'>initialize</button>
      </form>
      <form action='/api/random' method='post'>
        <button type='submit'>random</button>
      </form>
      {
        left_numbers.map((num: number) => {
          return (
            <div>
              {num}
            </div>
          )
        })
      }
      {
        winner !== null ? (
          <div>
            winner: {winner}
          </div>
        ) : (
          <div></div>
        )
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookie = getCookie('left-numbers', { req, res })
  const winner_cookie = getCookie('winner', { req, res })
  let winner = winner_cookie === undefined ? null : winner_cookie

  if (cookie === undefined) {
    return {
      props: {
        left_numbers: []
      }
    }
  }

  console.log('DEBUG')
  console.log(cookie)

  const left_numbers = JSON.parse(cookie)

  return {
    props: {
      left_numbers,
      winner
    }
  }
}
