'use strict';
/* global $ */

const apiKey = '42399924d6dd4ba092cf4d0c97ec8170'

const searchURL = 'https://newsapi.org/v2/everything';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function getNews(query, maxResults=10) {
  const params = {
    q: query,
    language: 'en',
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  
  const options = {
    headers: new Headers({
      'X-Api-Key': apiKey})
  };

  fetch(url, options)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);