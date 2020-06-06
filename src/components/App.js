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
    fetch( url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          this.setState({newsList: data.hits})
        });
      }
    }).catch((e) => {
      console.log('error', e);
    });
  }

  render() {
    //const newsList = this.props.newsList;
    return (
      <News newsList={this.state.newsList} />
    );
  }
}

export default App;

App.propTypes = {
  newsList: PropTypes.array
};