'use strict';
/* global $ */


const API_key = '54CYcRxUTlemrBpZXjkZchPc4xOnDpZKshwyyYGj';
const searchURL= 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryitems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryitems.join('&');
}

function searchParams(query, maxResults) {
    const params = {
      stateCode: query, 
      limit: maxResults || 50, 
      api_key: API_key,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    console.log(url);

    return fetch(url)
    .then(response => {
      return response.json()
     
    });
}

function handleFormEntry(){
  $('#js-form').submit(event => {
      event.preventDefault();
      console.log('here')
      let state = $('#state-search').val();
      let searchNum= $('#max-results').val();
      console.log(searchNum);
      console.log(state);
      return searchParams(state,searchNum)
      .then(response => {
        console.log('RESPONSE', response)
        let data = response.data;
        displayResults(data);
      });
  });
}


function displayResults(data) {
  // data = [{}, {}, {}]
  
   for (let i = 0; i<data.length; i ++){
    const htmlString = data.
    // let {description ,parkName, directionsInfo} = data[i];
    htmlString = `<li><h3>${data[i].parkName}</h3>
    <p> ${data[i].directionsInfo}</p> 
    <p> ${data[i].description}</p></li>`
    $('#results').append(htmlString)
    };
    $('#results').removeClass('hidden')
}


$(handleFormEntry());