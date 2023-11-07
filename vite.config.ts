/*
 * @Author: yanghongxuan
 * @Date: 2023-11-03 14:45:13
 * @LastEditors: yanghongxuan
 * @LastEditTime: 2023-11-07 18:39:28
 * @Description:
 */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://image.zmpt.cc/imgs/2023/11/5c60a64ce9d1104a.png',
        namespace: '查看认证用户个人详情',
        match: 'http*://invites.fun/d/*',
        version: '0.1',
        name: '查看认证用户个人详情',
        author: 'waibuzheng',
        description: '查看认证用户个人详情！！！',
        grant: ['GM_xmlhttpRequest', 'GM.setValue', 'GM.getValue']
      },
      build: {
        externalGlobals: {}
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
