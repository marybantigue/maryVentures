import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import NextPost from './Next-Post'
import PrevPost from './Prev-Post'

const addMetaTags = (post) => {
  const head = document.getElementsByTagName('head')[0];
  let meta = document.createElement('meta');
  meta.setAttribute('property', 'og:title');
  meta.content = post.title;
  head.appendChild(meta)
  meta = document.createElement('meta');
  meta.setAttribute('property', 'og:url');
  meta.content = 'http://' + window.location.hostname + '/' + post.slug;
  head.appendChild(meta)
  meta = document.createElement('meta');
  meta.setAttribute('name', 'twitter:card');
  meta.content = 'summary';
  head.appendChild(meta);
}

const Post = ({ data: { loading, error, post } }) => {
  if (error) return <h1>Error fetching the post!</h1>
  if (!loading) {
    const date = new Date(post.dateAndTime);
    const tags = post.tags.map((tag,i,tags) => <Link key={tag.id} to={`/tag/${tag.name}`}>{tag.name} { i!==tags.length-1 ? <span>&#47;</span> : ''} </Link>);

    addMetaTags(post);


    return (
      <div>
        <article className="post-article">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-details">
            <p className="date"><i className="fas fa-calendar-alt"></i> { date.toDateString() }</p>
            <p className="tags"><i className="fas fa-tags"></i> { tags }</p>
          </div>
          <div className="post-body">
            <Markdown
              source={post.content}
              escapeHtml={false}
            />
          </div>
        </article>

        <div className="post-list">
          <PrevPost date={post.dateAndTime}/>
          <NextPost date={post.dateAndTime}/>
        </div>
      </div>
    )
  }
  return <h2>Loading post...</h2>
}

export const singlePost = gql`
  query singlePost($slug: String!) {
    post: Post(slug: $slug) {
      id
      slug
      title
      content
      dateAndTime
      tags {
        name
        id
      }
      excerpt

    }
  }
`

export default graphql(singlePost, {
  options: ({ match }) => ({
    variables: {
      slug: match.params.slug
    }
  })
})(Post)
