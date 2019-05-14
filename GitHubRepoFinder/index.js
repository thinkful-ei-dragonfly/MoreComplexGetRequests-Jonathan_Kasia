'use strict';
/* global $ */

function getHandle(handleName) {
    const searchURL = 'https://api.github.com/users/';
    const searchURLEnd = '/repos';
    let url = searchURL + handleName + searchURLEnd;
    return url;
}

function fetchHandleRepos(url){
    return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson);
        handleFetchResults(responseJson);
    });
}
 

function handleFetchResults(gitHubArray) {
    console.log('here')
    const HTML = gitHubArray.map(repo => {
      let fullName = repo.full_name;
      let  url = repo.clone_url;
      const string = `<li>Repo name and title: ${fullName}<span><br>Link: ${url}<span></li>`
      return string;
    })
    $('#results-list').empty();
    $('#results-list').append(HTML);
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