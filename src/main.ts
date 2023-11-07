/*
 * @Author: yanghongxuan
 * @Date: 2023-11-01 14:46:20
 * @LastEditors: yanghongxuan
 * @LastEditTime: 2023-11-07 18:43:08
 * @Description:
 */
/*
 * @Author: yanghongxuan
 * @Date: 2023-11-01 12:48:49
 * @LastEditors: yanghongxuan
 * @LastEditTime: 2023-11-01 15:56:10
 * @Description:
 */
import { getNPHPUserDetails } from '@/utils/api';
import '@/utils/userdetails-button.scss';
// 建立一个初始化函数来封装所有的逻辑
async function getUserDetailsInit() {
  /** 按钮动画效果 */
  function animateButton(e: MouseEvent) {
    e.preventDefault;
    if (e.target && e.target instanceof Element) {
      const target = e.target;
      target.classList.remove('animate');
      target.classList.add('animate');
      setTimeout(() => {
        target.classList.remove('animate');
      }, 700);
    }
  }
  // 获取所有的a标签匹配数据
  const aList = document.querySelectorAll('a');
  const textReg = /https?:\/\/[^/]+\/userdetails\.php\?id=[0-9]+/;
  aList.forEach(async (item) => {
    if (item.textContent && textReg.test(item.textContent)) {
      const button = document.createElement('button');
      button.innerHTML = '查看该详情';
      const detailsBox = document.createElement('div');
      const spanBox = document.createElement('span');
      spanBox.className = 'userdetails-close';
      detailsBox.style.display = 'none';
      spanBox.innerHTML = 'X';
      const div = document.createElement('div');
      const details = await getNPHPUserDetails(item.textContent);
      detailsBox.innerHTML = details;
      div.className = 'userdetails-box';
      button.addEventListener('click', () => {
        detailsBox.style.display = 'block';
      });
      spanBox.addEventListener('click', () => {
        detailsBox.style.display = 'none';
      });
      detailsBox.appendChild(spanBox);
      div.appendChild(button);
      div.appendChild(detailsBox);
      item.parentNode?.appendChild(div);
    }
  });
}
// 调用初始化函数
getUserDetailsInit();
