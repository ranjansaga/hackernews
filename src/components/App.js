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
            const voteCountListCopy = JSON.parse(window.localStorage.getItem('voteCountList')) || [];
            console.log('voteCountListCopy', voteCountListCopy);
            if (voteCountListCopy.length) {
              console.log('inside if case ')
              data.hits && data.hits.map((news, i) => {
                console.log('voteCountListCopy[news.objectID]',news.objectID, voteCountListCopy[news.objectID]);
                news.voteCount = voteCountListCopy[i][news.objectID];
              });
            } else {
              console.log('inside else case ')
              data.hits && data.hits.map((news) => {
                const objid = {}
                objid[news.objectID] = 0;
                voteCountListCopy.push(objid);
                console.log('voteCountListCopy', voteCountListCopy);
                news.voteCount = 0;
                window.localStorage.setItem('voteCountList', JSON.stringify(voteCountListCopy));
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
    console.log('newsListCopy[index][objId]', newsListCopy[index].voteCount);
    newsListCopy[index].voteCount = parseInt(newsListCopy[index].voteCount) + 1;
    this.setState({newsList: newsListCopy});
    const voteCountListCopy = JSON.parse(window.localStorage.getItem('voteCountList'));
    voteCountListCopy[news.objectID] = parseInt(voteCountListCopy[index].voteCount) + 1;
    window.localStorage.setItem('voteCountList', JSON.stringify(voteCountListCopy));
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