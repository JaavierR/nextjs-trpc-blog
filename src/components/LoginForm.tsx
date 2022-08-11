import { CreateUserInput } from '@/schema/user.schema'
import { trpc } from '@/utils/trpc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter()
  const { data, isLoading } = trpc.useQuery(['users.verify-otp', { hash }])

  if (isLoading) {
    return <p>Verifying...</p>
  }

  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')

  return <p>Redirecting...</p>
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true)
    },
  })

  function onSubmit(data: CreateUserInput) {
    mutate({ ...data, redirect: router.asPath })
  }

  const hash = router.asPath.split('#token=')[1]

  if (hash) {
    return <VerifyToken hash={hash} />
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 max-w-xl mx-auto"
      >
        {error && error.message}

        {success && <p>Check your email</p>}
        <h1 className="text-3xl font-semibold leading-tight my-4">Login</h1>

        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register('email')}
          className="border px-4 py-2 border-gray-200 rounded-md shadow-sm placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="bg-blue-500 py-2 rounded-md border border-blue-300 font-medium text-white"
        >
          Login
        </button>
      </form>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </>
  )
}

export default LoginForm
