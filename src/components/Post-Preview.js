import React from 'react';
import { Link } from 'react-router-dom'

const PostPreview = ({ title, tags, dateAndTime, slug, excerpt }) => {
    const date = new Date(dateAndTime);
    const tagLinks = tags.map((tag,i ) => <Link key={tag.id} to={`/tag/${tag.name}`}>{tag.name} { i!==tags.length-1 ? <span>&#47;</span> : ''} </Link>);

    return (
      <div className="post-item">
        <h2>{title}</h2>
        <div className="post-details">
          <p className="date"><i className="fas fa-calendar-alt"></i> { date.toDateString() }</p>
          <p className="tags"><i className="fas fa-tags"></i>  { tagLinks }</p>
        </div>
        <p className="post-excerpt">
          { excerpt }
        </p>

        <Link to={`/post/${slug}`} className='read-more'>READ MORE</Link>
      </div>
    );
}

export default PostPreview;
