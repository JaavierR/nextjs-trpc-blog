import { CreateUserInput } from '@/schema/user.schema'
import { trpc } from '@/utils/trpc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onSuccess: () => {
      router.push('/login')
    },
  })

  function onSubmit(data: CreateUserInput) {
    mutate(data)
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 max-w-xl mx-auto"
      >
        {error && error.message}
        <h1 className="text-3xl font-semibold leading-tight my-4">Register</h1>

        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register('email')}
          className="border px-4 py-2 border-gray-200 rounded-md shadow-sm placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Tom"
          {...register('name')}
          className="border px-4 py-2 border-gray-200 rounded-md shadow-sm placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="bg-blue-500 py-2 rounded-md border border-blue-300 font-medium text-white"
        >
          Register
        </button>
      </form>
      <Link href="/login">
        <a className="block mt-6 text-blue-500 hover:underline">Login</a>
      </Link>
    </>
  )
}

export default RegisterPage
