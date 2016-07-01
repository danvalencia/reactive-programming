'use strict'

let searchInputField = document.querySelector("#search");
let searchInput$ = Rx.Observable.fromEvent(searchInputField, 'input');
let searchResultsContainer = document.querySelector("#search_results");
searchInput$.subscribe(e => {searchResultsContainer.innerHTML = ''})
searchInput$.map(e => {return e.target.value})
            .filter(val => {return val.length >= 3})
            .flatMap(val => {
              return Rx.Observable.fromPromise($.getJSON("http://localhost:3000/search?q=" + val));
            })
            .flatMap(arr => {return Rx.Observable.from(arr)})
            .subscribe(term => {
              let div = document.createElement("div");
              div.appendChild(document.createTextNode(term));
              searchResultsContainer.appendChild(div);
            });
