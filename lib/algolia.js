// lib/algolia.js
import algoliasearch from 'algoliasearch'

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
)

export const postsIndex = client.initIndex('aurlink_posts')

export const indexPost = async (post) => {
  try {
    await postsIndex.saveObject({
      objectID: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      author: post.author,
      createdAt: post.createdAt,
      image: post.featuredImage,
      url: `/blog/posts/${post.slug}`
    })
  } catch (error) {
    console.error('Algolia indexing error:', error)
  }
}

export const searchPosts = async (query, options = {}) => {
  try {
    const results = await postsIndex.search(query, options)
    return results
  } catch (error) {
    console.error('Algolia search error:', error)
    return { hits: [] }
  }
}