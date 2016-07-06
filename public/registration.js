'use strict'

// Requirements

// User Name  -> unique
// First Name -> Non-empty
// Last Name  -> Non-empty
// Email      -> unique
//
// Field successful validation indicator
// Loading indicator
// Submit button only enabled when everything is validated

let username = document.querySelector("#username");
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let registerBtn = document.querySelector("#register-btn");
let loader = document.querySelector("#loader");

let usernameOnChange$ = Rx.Observable.fromEvent(username, "change");

usernameOnChange$.filter((e) => {return e.target.value.length < 3})
                 .subscribe((e) => {
                   $(username).css("border-color", "red");
                   console.log("Invalid UserName")
                 })
//
let response$ = usernameOnChange$.filter((e) => {return e.target.value.length >= 3})
                 .pluck("target", "value")
                 .map(username => {
                   return Rx.Observable.fromPromise($.getJSON("http://localhost:3000/checkUser?username=" + username));
                 })
                 .map((res$) => {
                   return res$.catch(Rx.Observable.return(null));
                 })
                 .flatMap(res$ => {
                    return res$;
                 })
                 .subscribe(res => {
                   console.log("Response is: " + res);
                 })


// Rx.Observable.fromPromise($.getJSON())
