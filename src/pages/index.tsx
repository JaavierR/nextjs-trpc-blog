import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(['users.me'])

  if (isLoading) {
    return <div className="text-gray-500 text-sm font-semibold">Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default Home
