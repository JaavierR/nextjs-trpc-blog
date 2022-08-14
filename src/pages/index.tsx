import LoginForm from '@/components/LoginForm'
import { useUserContext } from '@/context/user.context'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  const user = useUserContext()

  if (!user) return <LoginForm />

  return (
    <div>
      <Link href="/posts/new">
        <a>Create post</a>
      </Link>
    </div>
  )
}

export default Home
