// ==UserScript==
// @name         查看认证用户个人详情
// @namespace    查看认证用户个人详情
// @version      0.1
// @author       waibuzheng
// @description  查看认证用户个人详情！！！
// @icon         https://image.zmpt.cc/imgs/2023/11/5c60a64ce9d1104a.png
// @match        http*://invites.fun/d/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const e=document.createElement("style");e.textContent=t,document.head.append(e)})(" .userdetails-box{position:relative}.userdetails-box button{cursor:pointer}.userdetails-box>div{position:fixed;top:50%;left:50%;transform:translate3d(-50%,-50%,0);width:50vw;height:50vh;outline:2px solid #000;background:#fff;overflow:auto;z-index:9999;padding:40px 20px 20px}.userdetails-box .userdetails-close{color:#000;font-size:20px;line-height:40px;position:absolute;top:0;right:0;cursor:pointer} ");

(function () {
  'use strict';

  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const getNPHPUserDetails = (url) => {
    return new Promise((resolve, reject) => {
      const data = _GM_getValue(url);
      if (data) {
        return resolve(data);
      }
      _GM_xmlhttpRequest({
        url,
        method: "GET",
        onload: (res) => {
          if (res.response) {
            resolve(res.response);
            console.log(2);
            _GM_setValue(url, res.response);
          } else {
            reject(res);
          }
        }
      });
    });
  };
  async function getUserDetailsInit() {
    const aList = document.querySelectorAll("a");
    const textReg = /https?:\/\/[^/]+\/userdetails\.php\?id=[0-9]+/;
    aList.forEach(async (item) => {
      var _a;
      if (item.textContent && textReg.test(item.textContent)) {
        const button = document.createElement("button");
        button.innerHTML = "查看该详情";
        const detailsBox = document.createElement("div");
        const spanBox = document.createElement("span");
        spanBox.className = "userdetails-close";
        detailsBox.style.display = "none";
        spanBox.innerHTML = "X";
        const div = document.createElement("div");
        const details = await getNPHPUserDetails(item.textContent);
        detailsBox.innerHTML = details;
        div.className = "userdetails-box";
        button.addEventListener("click", () => {
          detailsBox.style.display = "block";
        });
        spanBox.addEventListener("click", () => {
          detailsBox.style.display = "none";
        });
        detailsBox.appendChild(spanBox);
        div.appendChild(button);
        div.appendChild(detailsBox);
        (_a = item.parentNode) == null ? void 0 : _a.appendChild(div);
      }
    });
  }
  getUserDetailsInit();

})();