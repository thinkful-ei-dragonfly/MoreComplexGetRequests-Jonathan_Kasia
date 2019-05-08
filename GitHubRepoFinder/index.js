'use strict';
/* global $ */

function getHandle(handleName) {
    const searchURL = 'https://api.github.com/users/';
    const searchURLEnd = '/repos';
    let url = searchURL + handleName + searchURLEnd;
    console.log(url);
    return url;
    
    
}

function fetchHandleRepos(url){
    return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson);
        displayResults(responseJson);
    });
}


function displayResults(responseJson) {
    $('#results-list').empty();
    $('#results-list').append(
    `<h3>${handleName}</h3>
    <span>${url}<span>`
    );
    
    $('#results').removeClass('hidden');  
} 

function watchForm() {
    $('#js-form').submit(e => {
        e.preventDefault();
        const handleName = $('#handle-search').val();
         const url = getHandle(handleName);
        fetchHandleRepos(url);
    })
    
}
$(watchForm());