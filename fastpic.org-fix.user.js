// ==UserScript==
// @name        fastpic.org fix
// description  remove adds and show image full screen
// @namespace   Violentmonkey Scripts
// @match       https://fastpic.org/view/*
// @grant       none
// @version     1.0
// @author       smartacephale
// @supportURL   https://github.com/smartacephale/greasy-fork-scripts
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fastpic.org
// ==/UserScript==

document.body.innerHTML = `<img src=${document.querySelector('.img-fluid').src}>`
