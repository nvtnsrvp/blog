import Head from 'next/head'
import Link from 'next/Link'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import markdownToHtml from '../../lib/markdownToHtml'


const postsDirectory = path.join(process.cwd(), 'posts')

export default function Post({ post }) {
  return (
    <div className="container">
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <main>
        <h1 className="title">
          <Link as={`/posts/${post.data.slug}`} href="/posts/[slug]">{post.data.title}
          </Link>
        </h1>
        <time>{post.data.date}</time>

        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const filePath = path.join(postsDirectory, `${params.slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  const { data, content } = matter(fileContents)
  data['slug'] = params.slug

  return {
    props: {
      post: {
        data,
        content: await markdownToHtml(content || ''),
      },
    },
  }
}

export async function getStaticPaths() {
  const filenames = await fs.promises.readdir(postsDirectory)

  return {
    paths: await Promise.all(filenames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, '')
      return {
        params: {
          slug,
        },
      }
    })),
    fallback: false,
  }
}
