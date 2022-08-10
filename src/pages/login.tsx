import { CreateUserInput } from '@/schema/user.schema'
// import { trpc } from '@/utils/trpc'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

function LoginPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  // const router = useRouter()

  // const { mutate, error } = trpc.useMutation(['users.register-user'], {
  //   onSuccess: () => {
  //     router.push('/login')
  //   },
  // })

  function onSubmit(data: CreateUserInput) {
    // mutate(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {error && error.message} */}
        <h1>Login</h1>

        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register('email')}
        />

        <br />
      </form>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </>
  )
}

export default LoginPage
