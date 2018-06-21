import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

const Header = ({ data: { loading, error, author, tags }, navOpen, handleClose }) => {

    const openStyle = {
      width: "350px",
      padding: "30px"
    };
    const closeStyle = {
      width: 0,
      padding: 0
    };

    if (!loading && author !== undefined ) {
      author = author[0];

      let uniqueTags = [];
      tags.forEach((arr) => {
        let tempArr = Object.values(arr.tags).reduce((acc, current) => {
          if(acc.indexOf(current) === -1 ){
            acc.push(current);
          }
          return acc;
        } ,[]);

        uniqueTags = uniqueTags.concat(tempArr);
      });

      const tagsList = uniqueTags.map((tag, id) => <Link to={`/tag/${tag.name}`} key={'h' + tag.id} className='tagName'>{tag.name}</Link> );
      return (
        <section id="sidebar" style={ navOpen ? openStyle : closeStyle }>
          <button type="button" name="button"  className="closeBtn" onClick={() => handleClose()}><i className="fas fa-times"></i>
          </button>
          <div className="logo">
            <a href="/">MARY<span>VENTURES</span></a>
          </div>
          <div className="about">
            <div className="avatar">
              <img src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${author.avatar.handle}`} alt=""/>
            </div>
            <p className="bio">
              { author.bibliography }
            </p>
            <div className="social">
              <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
              <a href="https://github.com"><i className="fab fa-github"></i></a>
              <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
            </div>
          </div>


          {/* <div className="search">
            <p>Search this blog</p>
            <div className="search-button">
              <input type="text" name="email" value="" placeholder="Search"/>
              <button type="submit" name="button"><i className="fas fa-search"></i></button>
            </div>
          </div> */}
          <div className="tags">
            <p>Tags</p>
            { tagsList }
          </div>
          <div className="copyright">
            © MaryBantigue2018
          </div>
        </section>
      )
    }
    return null;

}



export const allAuthors = gql`
  query allAuthors {
    author: allAuthors (first: 1) {
      id
      name
      bibliography
      avatar {
        handle
      }
    },
    tags: allPosts {
      tags {
        name
        id
      }
    }
  }
`

export default graphql(allAuthors)(Header)
