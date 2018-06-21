import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PostPreview from  './Post-Preview'

const NextPost = ({ data: { loading, error, post } }) => {

  if (error) return <h1>Error fetching the post! { error.message }</h1>

  if (!loading && post[0]) {
    post = post[0];
    return (
      <PostPreview {...post}  />
    )
  }

  return null;
}


export const singlePost = gql`
  query singlePost($date: DateTime!) {
    post: allPosts (
      filter: {
     		dateAndTime_gt: $date,
    	},
      first: 1,
    	orderBy: dateAndTime_ASC) {
      	title
      	tags {
          name
          id
        }
      	dateAndTime
        slug
        excerpt

  	}
  }
`

export default graphql(singlePost,  {

  options: (props) => ({
    variables: {
      date: props.date
    }
  }),
})(NextPost)
