import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PostPreview from  './Post-Preview'


const POSTS_PER_PAGE = 4



const Tag = ({ data: { loading, error, allPosts, _allPostsMeta, networkStatus }, loadMorePosts }) => {
  if (error) return <h1>Error fetching posts! { error.message }</h1>
  if (allPosts && _allPostsMeta) {
    const areMorePosts = allPosts.length < _allPostsMeta.count
    return (
      <div>
        <div className="post-list">
               {allPosts.map(post => {
                 return (
                    <PostPreview {...post} key={post.id}/>
                  )
                }
              )
            }


        </div>

        {areMorePosts
          ? <button className='load-btn' disabled={loading} onClick={() => loadMorePosts()}>
            {loading ? 'Loading...' : 'Show More Posts ' }
          </button>
          : ''}
      </div>
    )
  }
  return <h2>Loading posts...</h2>
}

export const allPosts = gql`
  query allPosts($first: Int!, $skip: Int!, $tag: String!) {
    allPosts(
      filter: {
     		tags_some: {
          name: $tag
        }
    	},
      orderBy: dateAndTime_DESC, first: $first, skip: $skip) {
      id
      slug
      title
      dateAndTime
      coverImage {
        handle
      }
      tags {
        name
        id
      }
      excerpt

    },
    _allPostsMeta  (filter: {
     		tags_some: {
          name: "graphcms"
        }
    }) {
      count
    }
  }
`

export const allPostsQueryVars = {
  skip: 0,
  first: POSTS_PER_PAGE
}

export default graphql(allPosts, {
  options: ({ match }) => ({
    variables: {
      ...allPostsQueryVars,
      tag: match.params.slug
    },
    notifyOnNetworkStatusChange: true
  }),
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.allPosts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
          })
        }
      })
    }
  })
})(Tag)
