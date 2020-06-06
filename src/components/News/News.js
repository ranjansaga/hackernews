import React from 'react'
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rows = this.props.newsList && this.props.newsList.map((news, index) => {
      return (
        <tr key={index}>
          <td>{news.num_comments}</td>
          <td>{news.voteCount}</td>
          <td><FontAwesomeIcon icon={faCaretUp} /></td>
          <td>{news.title}</td>
        </tr>
      )
    });
    return (
      <table className="table table-striped news-table">
        <thead>
          <tr>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>UpVote</th>
            <th>News Details</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default News;

News.propTypes = {
  newsList: PropTypes.array
};


