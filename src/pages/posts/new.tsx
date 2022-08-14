import { CreatePostInput } from '@/schema/post.schema'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

function CreatePostPage() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<CreatePostInput>()

  const { mutate, error } = trpc.useMutation('posts.create-post', {
    onSuccess({ id }) {
      router.push(`/posts/${id}`)
    },
  })

  function onSubmit(values: CreatePostInput) {
    mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 max-w-lg mx-auto"
    >
      {error && error.message}

      <h1 className="text-3xl text-center py-6 font-semibold tracking-tight">
        Create Post
      </h1>

      <input
        type="text"
        placeholder="Your post title"
        {...register('title')}
        className="border px-4 py-2 border-gray-200 rounded-md shadow-sm placeholder:text-gray-400"
      />

      <textarea
        rows={3}
        placeholder="Your post content"
        {...register('body')}
        className="border px-4 py-2 border-gray-200 rounded-md shadow-sm placeholder:text-gray-400"
      />

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1.5 rounded-md"
      >
        Create post
      </button>
    </form>
  )
}

export default CreatePostPage
