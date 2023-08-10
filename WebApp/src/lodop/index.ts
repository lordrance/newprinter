import { Page, Template, Widget } from '@/interfaces'
import cloneDeep from 'lodash/cloneDeep';
import getLodop from './lib/LodopFuncs'
import { tableToHtml } from '@/utils';

const strCompanyName = '',
strLicense = 'EE0887D00FCC7D29375A695F728489A6',
strLicenseA = 'C94CEE276DB2187AE6B65D56B3FC2848',
strLicenseB =  '';

export const preview = (temp: Template, data?: any) => {
    const lodop = createLodop(temp.page);
    const items = cloneDeep(temp.widgets);
    toLodopStyle(items)
    additems(lodop, items)
    lodop.PREVIEW()
}

const createLodop = (page: Page) => {
    const lodop = getLodop();
    lodop.SET_LICENSES(strCompanyName, strLicense, strLicenseA, strLicenseB);
    lodop.PRINT_INITA(0, 0, page.width, page.height, page.name);
    lodop.SET_PRINT_PAGESIZE(1, page.pageWidth+'mm', page.pageHeight+'mm', '');
    return lodop
}

const toLodopStyle = (items: Widget[]) => {
    for (let i = 0; i < items.length; i++) {
        let lodopStyle: any = {};
        const style = items[i].style;
        const keys = ['Bold', 'Italic', 'Underline'];
        for (const key in style) {
            if (keys.some(x=>x===key)) {
                lodopStyle[key] = style[key] ? 1 : 0;
            } else if (key === 'Alignment') {
                lodopStyle[key] = style[key] === 'left' ? 1 : style[key] === 'center' ? 2 : 3;
            } else {
                lodopStyle[key] = style[key]
            }
        }
        items[i].style = lodopStyle
    }
}

const additems = (lodop: any, items: Widget[]) => {
    items.forEach(x => {
        switch (x.type) {
            case 'text':
                lodop.ADD_PRINT_TEXT(
                    x.top,
                    x.left,
                    x.width,
                    x.height,
                    x.value
                ) 
                break;
            case 'table':
                const html = tableToHtml(x.style, x.columns,x.value)
                lodop.ADD_PRINT_TABLE(
                    x.top,
                    x.left,
                    x.width,
                    x.height,
                    html
                )
                break;
            default:
                break;
        }
        Object.keys(x.style).forEach(s => {
            lodop.SET_PRINT_STYLEA(0, s, x.style[s])
        })
    })
}