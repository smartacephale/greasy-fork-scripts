// ==UserScript==
// @name         Fix RYM export data format
// @description  Export format according to https://letterboxd.com/about/importing-data/ https://rateyourmusic.com/film_collection_p/username/r0.5-5.0
// @namespace    http://tampermonkey.net/
// @version      0.2
// @license      MIT
// @author       smartacephale
// @supportURL   https://github.com/smartacephale/greasy-fork-scripts
// @match        https://rateyourmusic.com/film_collection_p/*/r0.5-5.0
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rateyourmusic.com
// @grant        none
// ==/UserScript==

const LOGO = `
    ⡏⠉⠉⢹⣿⣿⣿⣯⢪⢪⢪⡪⡎⡎⡐⣵⢱⠡⡯⣯⢯⡯⣯⢯⡯⣗⢕⢧⢳⡱⣣⢳⢹⡪⣗⢕⠇⢀⠐⡵
    ⣇⣀⣀⣸⣿⣿⣿⣗⢕⢕⢕⡕⣕⠢⢘⣞⢜⢌⣯⢯⣯⢯⡯⣯⡯⣗⢝⡜⣎⢮⢪⢎⢗⡽⣪⢪⠇⢀⠂⣏
    ⣿⣿⣿⣿⣿⣿⣿⣗⢕⢝⢜⢜⢜⠌⡐⣗⢕⠔⣯⣟⣾⣫⣟⣗⣟⡧⡳⡱⡕⣕⢇⢗⣕⢯⢞⢼⠅⡀⢂⡳
    ⣿⠿⠿⠿⢿⢿⢿⢗⡕⡵⡱⡹⡸⡨⠨⣞⢅⠇⣿⣺⣞⣗⣟⡾⡽⣇⢯⢺⡸⡪⡎⡗⡼⣕⢯⢪⡃⠠⠀⡯
    ⣿⠕⠡⠡⢱⢕⢇⢇⢇⢇⢇⢏⢎⡂⡱⣝⢎⠬⣷⣳⢷⣻⢾⢽⡯⣗⢕⢇⢗⢵⢹⢜⢮⡺⣝⢜⠆⠂⠡⡹
    ⣿⡅⢅⢑⠸⡜⡎⡇⡇⡗⡕⡝⣜⢐⠨⣾⠸⡨⡾⣽⡽⣞⣯⢿⢽⡳⡹⡜⡕⣇⢗⢵⡱⣝⢮⡪⡇⠈⢠⡫
    ⣿⡂⡂⠢⡑⡧⡳⡱⡱⡕⡕⡝⡜⢄⠱⡽⡊⡆⣿⣳⣟⣽⣞⡿⡽⣏⢞⢜⢵⢱⢣⢇⢗⡽⡕⡵⡅⢬⠀⡯
    ⣿⡊⢄⠑⡜⡎⡮⡪⡪⡪⡪⡺⡸⡐⡑⣟⢜⢸⣳⣗⣟⣾⣺⡽⣯⡗⣝⢜⢵⢹⢜⢎⢇⣯⡺⡸⡂⢕⠨⣝
    ⣿⡊⠄⠅⣣⢫⡪⣪⢪⢣⢫⢪⢣⠡⡨⡷⡑⣝⣗⣟⣞⣷⣳⣟⣗⡯⡪⡎⡧⡳⡱⡝⣜⢮⢎⢮⡃⢕⠨⢮
    ⣿⡢⠡⠑⡜⣕⢕⢕⢕⢕⢕⡝⡜⢔⢸⢽⢪⢸⣞⣷⣻⣺⣞⣾⣳⢯⢺⡸⡪⡎⡧⡫⡪⣞⡕⡧⡃⢕⠨⡳
    ⣿⡢⠡⢁⢏⢎⢮⢪⢪⢣⢣⡣⡫⡂⢺⡽⡢⢳⣻⣺⣞⣗⣯⢾⣞⣗⢵⢱⢝⢜⢎⢧⢫⣺⢪⢮⡃⢵⠈⡯
    ⣿⡢⢁⠂⡗⡝⣜⢜⢎⢎⢎⢮⢪⠂⢝⣞⢌⢮⢷⣻⣺⣳⢯⣟⣞⡧⡳⡱⡝⡎⡧⡳⡱⣳⢣⢳⠅⡺⢀⢯
    ⣿⡂⡢⢁⢗⢝⢜⢜⢜⢜⢕⢕⢕⠅⢽⢎⢆⢺⡯⣷⣻⣞⣟⣾⣳⢝⡜⡵⡱⣣⢳⢹⡸⡮⡇⡯⡃⡺⠠⡳
    ⣿⡂⡂⡂⡗⣕⢝⢜⢜⢎⢎⢇⢇⡃⡺⣇⠇⢵⣻⣳⣗⣟⣞⣗⣯⢇⢗⢝⡜⣎⢮⢣⡣⡯⡎⣞⠅⡺⢈⣝
    ⣿⡊⡐⠄⣳⢱⢕⢝⢜⢜⢜⢕⢕⡂⡺⣇⢍⢺⡽⣞⣗⣟⡾⣽⢾⢕⢽⢸⢪⡪⣎⢮⢪⢞⣕⢵⡃⢝⠠⡳
    ⣿⠢⡈⡂⣇⢧⢳⢱⢱⢕⢵⢹⢸⢐⢸⣇⢣⢹⣽⣻⣺⡽⣽⡽⣽⢕⢇⢯⢪⢎⢮⢪⢎⡯⡎⣞⠆⠉⢰⢝
    ⣿⢈⠐⠄⡇⣇⢧⢣⢣⢣⢣⢳⢱⢁⢺⡎⡆⡳⣗⣟⡾⣽⣳⢿⢽⡕⡽⡸⡱⣣⢫⢺⢸⡪⡇⣗⡅⠌⢘⢮
    ⣷⠐⠡⡁⡗⡕⣕⢕⢕⢇⢗⢕⢕⠅⣪⢧⠣⣹⢽⣞⣯⢷⡯⡿⣽⡪⡎⡗⣝⢜⢎⢧⢳⢝⡵⣱⠅⠐⢨⡳
    ⣯⢈⢂⠂⣇⢏⢎⢎⢮⢪⢪⢎⠧⡡⢺⡕⡕⢜⣿⣺⡽⣽⢽⡯⣷⢳⢹⢜⢎⡎⡧⡳⡱⣫⢎⢮⠃⡈⢰⢝
    ⣿⠐⡠⢁⢧⢳⢹⢸⢸⢸⡸⡜⡕⡂⢵⢯⢘⢼⣳⣗⡿⡽⡯⣯⢯⡳⡱⣣⢳⢱⢣⡫⢮⡳⡝⡮⠐⢀⠸⣕`;

(function () {
  'use strict';
  console.log(LOGO);

  document.querySelectorAll('.or_q_albumartist_td').forEach(f => {
    const title = f.querySelector('.film').innerText;
    const titleHasUnicode = title.match(/\[(.*)\]/);
    f.querySelector('.film').innerText = (titleHasUnicode && titleHasUnicode[1] ? titleHasUnicode[1] : title) + ",";
    f.querySelector('.smallgray').innerText = f.querySelector('.smallgray').innerText.substr(1, 4) + ",";
    //f.parentElement.querySelector('.or_q_rating').innerText
  })
})();
