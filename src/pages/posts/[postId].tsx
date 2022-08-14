import { trpc } from '@/utils/trpc'
import Error from 'next/error'
import { useRouter } from 'next/router'

function SinglePostPage() {
  const router = useRouter()

  const postId = router.query.postId as string

  const { data, isLoading } = trpc.useQuery(['posts.single-post', { postId }])

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (!data) {
    return <Error statusCode={404} />
  }

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="py-10 ">{data.body}</p>
    </div>
  )
}

export default SinglePostPage
