/*
 * @Author: uyrance uyrance@hotmal.com
 * @Date: 2024-08-07 18:18:03
 * @LastEditors: uyrance uyrance@hotmal.com
 * @LastEditTime: 2024-08-21 02:03:42
 * @FilePath: \WebApp\src\test\testData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Template, Page, Widget } from '@/interfaces';

/*这个函数用于生成一个在 min 和 max 之间的随机整数*/
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*生成随机字符串的函数*/
function generateRandomString(length: number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}
/*生成随机文本的函数*/
function getRandomText(): string {
  const texts = ['Hello', 'World', 'TypeScript', 'Random', 'Text'];
  const randomIndex = getRandomNumber(0, texts.length - 1);
  return texts[randomIndex];
}
/*生成随机小部件的函数*/
function generateRandomWidget(pageWidth: number, pageHeight: number): Widget {
  const widgetWidth = getRandomNumber(50, 150);// 生成随机的宽度和高度，在50到150像素之间
  const widgetHeight = getRandomNumber(50, 150);
  const left = getRandomNumber(0, pageWidth - widgetWidth); // 生成随机的左边距和上边距，使得小部件不会超出页面边界
  const top = getRandomNumber(0, pageHeight - widgetHeight);

  const isTextWidget = Math.random() < 0.8; // 以80%的概率生成一个文本小部件，其他情况下生成其他类型的小部件
  const widgetType = isTextWidget ? 'text' : 'other';
  const widgetValue = isTextWidget ? getRandomText() : null;

   // 返回一个小部件对象
   return {
    type: widgetType,  // 小部件的类型 ('text' 或 'other')
    index: 0,          // 小部件的索引，通常用于排序或标识
    isEdit: false,     // 小部件是否处于编辑模式
    resizable: true,   // 小部件是否可以调整大小
    width: widgetWidth,  // 小部件的宽度
    height: widgetHeight, // 小部件的高度
    left,              // 小部件在页面中的左边距
    top,               // 小部件在页面中的上边距
    value: widgetValue,  // 小部件的内容，如果是文本小部件，则是随机文本
    style: {},         // 小部件的样式，初始化为空对象，可以动态设置
  };
  
}
//生成随机模板的函数
export function generateRandomTemplate(): Template {
  // 生成页面的随机宽度和高度
  const pageWidth = getRandomNumber(500, 800);
  const pageHeight = getRandomNumber(200, 800);

  // 定义一个页面对象
  const page: Page = {
    name: generateRandomString(10), // 生成一个随机的10个字符的页面名称
    width: pageWidth,               // 设置页面的宽度
    height: pageHeight,             // 设置页面的高度
    pageWidth,                      // 设置页面的宽度（同上）
    pageHeight,                     // 设置页面的高度（同上）
  };

  // 生成3到14个小部件的随机数量
  const numberOfWidgets = getRandomNumber(3, 14);
  
  // 初始化一个空的 Widget 数组
  const widgets: Widget[] = [];

  // 使用循环生成指定数量的小部件，并添加到 widgets 数组中
  for (let i = 0; i < numberOfWidgets; i++) {
    const widget = generateRandomWidget(pageWidth, pageHeight);
    widgets.push(widget);
  }

  // 最终生成并返回包含 page 和 widgets 的 Template 对象
  const t: Template = {
    page,
    widgets
  }
  return t;
}



