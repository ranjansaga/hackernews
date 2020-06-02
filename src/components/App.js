import React from 'react';
//import './App.css';
import News from './News/News';
import PropTypes from 'prop-types';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newsList: this.props.newsList };
  }

  // componentDidMount() {
  //   const url = 'https://hn.algolia.com/api/v1/search?tags=front_page';
  //   fetch( url, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   },
  //   ).then(response => {
  //     if (response.ok) {
  //       response.json().then(data => {
  //         console.log(data);
  //         this.setState({newsList:data.hits})
  //       });
  //     }
  //   });
  // }

  render() {
    // let news = [{
    //   "created_at": "2020-06-02T02:23:03.000Z",
    //   "title": "Stop Taking Regular Notes; Use a Zettelkasten Instead",
    //   "url": "https://eugeneyan.com/2020/04/05/note-taking-zettelkasten/",
    //   "author": "7d7n",
    //   "points": 670,
    //   "story_text": null,
    //   "comment_text": null,
    //   "num_comments": 244,
    //   "story_id": null,
    //   "story_title": null,
    //   "story_url": null,
    //   "parent_id": null,
    //   "created_at_i": 1591064583,
    //   "_tags": ["story", "author_7d7n", "story_23386630", "front_page"],
    //   "objectID": "23386630",
    //   "_highlightResult": {
    //     "title": {
    //       "value": "Stop Taking Regular Notes; Use a Zettelkasten Instead",
    //       "matchLevel": "none",
    //       "matchedWords": []
    //     },
    //     "url": {
    //       "value": "https://eugeneyan.com/2020/04/05/note-taking-zettelkasten/",
    //       "matchLevel": "none",
    //       "matchedWords": []
    //     },
    //     "author": {
    //       "value": "7d7n",
    //       "matchLevel": "none",
    //       "matchedWords": []
    //     }
    //   }
    // }, {
    //   "created_at": "2020-06-02T02:08:36.000Z",
    //   "title": "Guide to Python Debugging",
    //   "url": "https://martinheinz.dev/blog/24",
    //   "author": "alexeiz",
    //   "points": 402,
    //   "story_text": null,
    //   "comment_text": null,
    //   "num_comments": 126,
    //   "story_id": null,
    //   "story_title": null,
    //   "story_url": null,
    //   "parent_id": null,
    //   "created_at_i": 1591063716,
    //   "_tags": ["story", "author_alexeiz", "story_23386537", "front_page"],
    //   "objectID": "23386537",
    //   "_highlightResult": {
    //     "title": {
    //       "value": "Guide to Python Debugging",
    //       "matchLevel": "none",
    //       "matchedWords": []
    //     },
    //     "url": {
    //       "value": "https://martinheinz.dev/blog/24",
    //       "matchLevel": "none",
    //       "matchedWords": []
    //     },
    //     "author": {
    //       "value": "alexeiz",
    //       "matchLevel": "none",
    //       "matchedWords": []
    //     }
    //   }
    // }];

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