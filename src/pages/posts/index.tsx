import { trpc } from '@/utils/trpc'
import Link from 'next/link'

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(['posts.posts'])

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  return (
    <div className="max-w-xl mx-auto my-10 space-y-4">
      {data?.map((post) => {
        return (
          <article key={post.id} className="border border-gray-200 p-4 rounded">
            <p>{post.title}</p>
            <Link href={`/posts/${post.id}`}>
              <a className="text-blue-500 underline hover:text-blue-700">
                Read post
              </a>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export default PostListingPage
