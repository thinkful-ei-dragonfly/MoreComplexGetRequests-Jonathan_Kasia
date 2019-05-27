'use strict';
/* global $ */


const API_key = '54CYcRxUTlemrBpZXjkZchPc4xOnDpZKshwyyYGj';
const searchURL= 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryitems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryitems.join('&');
}

function searchParams(stateCode, maxResults) {
  console.log(maxResults);
  console.log(stateCode);
  if (/\d/.test(stateCode)){
    $('#results').addClass('hidden')
    return $('#js-error-message').text('State Code must only contain letters');
  } 
  else {
    stateCode = stateCode.replace(/\s+/g, '');
  }
  
  const regex = /^[a-z]{2}(?:,[a-z]{2})*$/i
  if (!(regex.test(stateCode))) {
    console.log('here')
    // $('#results').addClass('hidden')
    return $('#js-error-message').text('Use 2 letter state codes seperated by a coma');
  }

    
  const params = {
      stateCode,
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
      
      let state = $('#state-search').val();
      let searchNum= ($('#max-results').val())-1;
      
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
    htmlString = `<li><h3>${data[i].fullName}</h3>
    <p> ${data[i].directionsInfo}</p> 
    <p> ${data[i].description}</p></li>`
    $('#js-error-message').addClass('hidden');
    $('#results').append(htmlString)
    };
    $('#results').removeClass('hidden')
}




$(handleFormEntry());