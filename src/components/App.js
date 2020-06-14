import React from 'react';
import News from './News/News';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newsList: this.props.newsList };
  }

  componentDidMount() {
    const url = 'https://hn.algolia.com/api/v1/search?tags=front_page';
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          if (typeof window !== 'undefined') {
            const voteCountDictCopy = JSON.parse(window.localStorage.getItem('voteCountList')) || {};
            console.log('voteCountDictCopy', voteCountDictCopy);
            if (Object.keys(voteCountDictCopy).length) {
              console.log('inside if case ')
              data.hits && data.hits.map((news, i) => {
                console.log('news.objectID', news.objectID);

                if (voteCountDictCopy.hasOwnProperty(news.objectID)) {
                  news.voteCount = voteCountDictCopy[news.objectID];
                } else {
                  news.voteCount = 0;
                }
              });
            } else {
              console.log('inside else case ')
              data.hits && data.hits.map((news) => {
                voteCountDictCopy[news.objectID] = 0;
                console.log('voteCountDictCopy', voteCountDictCopy);
                news.voteCount = 0;
                window.localStorage.setItem('voteCountList', JSON.stringify(voteCountDictCopy));
              });
            }
          }

          console.log('data hit before set state', data.hits);
          this.setState({ newsList: data.hits })
        });
      }
    }).catch((e) => {
      console.log('error', e);
    });
  }

  updateVoteCount = (index, news) => {
    console.log('index', news);
    const newsListCopy = this.state.newsList;
    newsListCopy[index].voteCount = parseInt(newsListCopy[index].voteCount) + 1;
    this.setState({ newsList: newsListCopy });
    const voteCountDictCopy = JSON.parse(window.localStorage.getItem('voteCountList'));
    voteCountDictCopy[news.objectID] = parseInt(voteCountDictCopy[news.objectID]) + 1;
    console.log('voteCountDictCopy after update ', voteCountDictCopy );
    window.localStorage.setItem('voteCountList', JSON.stringify(voteCountDictCopy));
  };

  render() {
    //const newsList = this.props.newsList;
    return (
      <News newsList={this.state.newsList} updateVoteCount={this.updateVoteCount} />
    );
  }
}

export default App;

App.propTypes = {
  newsList: PropTypes.array
};