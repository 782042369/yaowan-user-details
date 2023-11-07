/*
 * @Author: yanghongxuan
 * @Date: 2023-11-01 12:15:00
 * @LastEditors: yanghongxuan
 * @LastEditTime: 2023-11-07 18:42:01
 * @Description:
 */

import { GM_getValue, GM_setValue, GM_xmlhttpRequest } from '$';

/** 用户详情页加载 */
export const getNPHPUserDetails = (url: string) => {
  return new Promise<string>((resolve, reject) => {
    const data = GM_getValue<string>(url);
    if (data) {
      return resolve(data);
    }
    GM_xmlhttpRequest({
      url,
      method: 'GET',
      onload: (res) => {
        if (res.response) {
          resolve(res.response);
          console.log(2);
          GM_setValue(url, res.response);
        } else {
          reject(res);
        }
      }
    });
  });
};
