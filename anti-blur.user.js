// ==UserScript==
// @name        anti-blur
// @description disables blur globally
// @namespace   Violentmonkey Scripts
// @license     MPL-2.0
// @match       *://*/*
// @version     1.0
// @author      smartacephal
// @grant       GM_addStyle
// @run-at      document-end
// ==/UserScript==

GM_addStyle('* { filter: blur(0px) !important; }');
