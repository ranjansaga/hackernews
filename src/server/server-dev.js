import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';
import fs from 'fs';
import fetch from 'isomorphic-fetch';


const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, 'index.html'),
  compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))
//app.use(express.static('../../dist/index.html'));

app.get('*', (req, res, next) => {
  console.log('reached here --->');
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
        const htmlCont = ReactDOMServer.renderToString(<App newsList={data.hits} />);
        console.log('htmlCont', htmlCont);
        fs.readFile(HTML_FILE, 'utf8', (err, result) => {
          if (err) {
            return next(err)
          }
          res.set('content-type', 'text/html')
          return res.send(result.replace('<div id="react-container"></div>',
            `<div id="react-container">${htmlCont}</div>`))
          //res.end()
        })
      });
    }
  });
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
