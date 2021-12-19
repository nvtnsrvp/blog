import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'

import Link from 'next/Link'

const postsDirectory = path.join(process.cwd(), 'posts')

// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>
          <Link as={`/posts/${post.data.slug}`} href="/posts/[slug]">
            <a>{post.data.title}</a>
          </Link>
          <p>{post.data.excerpt}</p>
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const filenames = await fs.readdir(postsDirectory)

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = await fs.readFile(filePath, 'utf8')

    const slug = filename.replace(/\.md$/, '')
    const { data, content } = matter(fileContents)
    data['slug'] = slug
    return {
      data,
      content: fileContents,
    }
  })
  return {
    props: {
      posts: await Promise.all(posts),
    },
  }
}

export default Blog
