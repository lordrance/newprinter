import { Template, Page, Widget } from '@/interfaces';

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomText(): string {
  const texts = ['Hello', 'World', 'TypeScript', 'Random', 'Text'];
  const randomIndex = getRandomNumber(0, texts.length - 1);
  return texts[randomIndex];
}

function generateRandomWidget(pageWidth: number, pageHeight: number): Widget {
  const widgetWidth = getRandomNumber(50, 150);
  const widgetHeight = getRandomNumber(50, 150);
  const left = getRandomNumber(0, pageWidth - widgetWidth);
  const top = getRandomNumber(0, pageHeight - widgetHeight);

  const isTextWidget = Math.random() < 0.8;
  const widgetType = isTextWidget ? 'text' : 'other';
  const widgetValue = isTextWidget ? getRandomText() : null;

  return {
    type: widgetType,
    index: 0,
    isEdit: false,
    resizable: true,
    width: widgetWidth,
    height: widgetHeight,
    left,
    top,
    value: widgetValue,
    style: {},
  };
}

export function generateRandomTemplate(): Template {
  const pageWidth = getRandomNumber(500, 800);
  const pageHeight = getRandomNumber(200, 800);

  const page: Page = {
    name: 'Random Page',
    width: pageWidth,
    height: pageHeight,
    pageWidth,
    pageHeight,
  };

  const numberOfWidgets = getRandomNumber(3, 14);
  const widgets: Widget[] = [];

  for (let i = 0; i < numberOfWidgets; i++) {
    const widget = generateRandomWidget(pageWidth, pageHeight);
    widgets.push(widget);
  }

  const t: Template = {
    page,
    widgets
  }
  return t
}


