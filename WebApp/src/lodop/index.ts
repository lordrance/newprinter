import { Page, Template, Widget } from '@/interfaces'
import cloneDeep from 'lodash/cloneDeep';
import getLodop from './lib/LodopFuncs'
import { replacePattern, tableToHtml, textTohtml } from '@/utils';

const strCompanyName = '',
strLicense = 'EE0887D00FCC7D29375A695F728489A6',
strLicenseA = 'C94CEE276DB2187AE6B65D56B3FC2848',
strLicenseB =  '';

export const preview = (temp: Template, data?: any) => {
    const lodop = createLodop(temp.page);
    const items = cloneDeep(temp.widgets);
    if (data !== null && data !== undefined) {
        dataBind(items, data)
    }
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

const dataBind = (items: Widget[], data: any) => {
    const keys = Object.keys(data);
    items.forEach(x => {
        switch (x.type) {
            case 'text':
                if (x.isEdit) break;
                else {
                    for (let i = 0; i < keys.length; i++) {
                        const res = replacePattern(x.value, keys[i], data[keys[i]])
                        if (res.replaced) {
                            x.value = res.result;
                            break;
                        }
                    }
                }
                break;
            case 'table':
                if (x.tableName)
                x.value = data[x.tableName]
                break;
            default:
                break;
        }
    })
}

const additems = (lodop: any, items: Widget[]) => {
    let html
    items.forEach(x => {
        switch (x.type) {
            case 'text':
                html = textTohtml(x, x.style)
                lodop.ADD_PRINT_HTM(
                    x.top,
                    x.left,
                    x.width,
                    x.height,
                    html
                ) 
                break;
            case 'table':
                html = tableToHtml(x.style, x, x.value)
                lodop.ADD_PRINT_HTM(
                    x.top,
                    x.left,
                    x.width + 4,
                    x.height,
                    html
                )
                break;
            default:
                break;
        }
    })
}