import Text from "@/widgets/text";
import Table from "@/widgets/table";
import { Column, Widget } from "@/interfaces";

//这些函数的主要作用是 生成和处理动态内容，通常用于 报表系统 或 文档生成系统。它们帮助开发者根据用户输入的数据和配置生成不同的 文本 和 表格 组件，并把这些组件转换成 HTML 格式，方便展示或打印。
// 根据组件类型选择不同组件
export const selectWidget = (type: string, index: number, isDesign: boolean) => {
    switch (type) {
        case 'text':
            return <Text index={index} isDesign={isDesign} key={index}/>
        case 'table':
            return <Table index={index} isDesign={isDesign} key={index}/>
        default:
            break;
    }
}

// 获取字体列表
export const getFonts = () => {
    return [
        { value: '宋体', label: '宋体' },
        { value: '黑体', label: '黑体' },
        { value: '微软雅黑', label: '微软雅黑' },
        { value: '微软正黑体', label: '微软正黑体' },
        { value: '楷体', label: '楷体' },
        { value: '新宋体', label: '新宋体' },
        { value: '仿宋', label: '仿宋' },
        { value: '华文楷体', label: '华文楷体' },
        { value: '华文宋体', label: '华文宋体' },
        { value: '华文仿宋', label: '华文仿宋' },
        { value: '华文中宋', label: '华文中宋' },
        { value: '华文琥珀', label: '华文琥珀' },
        { value: '华文新魏', label: '华文新魏' },
        { value: '华文隶书', label: '华文隶书' },
        { value: '华文行楷', label: '华文行楷' },
        { value: '幼圆', label: '幼圆' },
        { value: '隶书', label: '隶书' },
        { value: '华文细黑', label: '华文细黑' },
        { value: '华文彩云', label: '华文彩云' },
        { value: '方正舒体', label: '方正舒体' },
        { value: '方正姚体', label: '方正姚体' },
    ];
}

// 获取纸张列表
export const getPaper = () => {
    return [
        {
            value: "210,297",
            label: "A4"
        },
        {
            value: "148,210",
            label: "A5"
        },
        {
            value: "297,420",
            label: "A3"
        },
        {
            value: "420,594",
            label: "A2"
        },
        {
            value: "594,841",
            label: "A1"
        },
        {
            value: "841,1189",
            label: "A0"
        },
        {
            value: "216,279",
            label: "Letter"
        },
        {
            value: "279,432",
            label: "Legal"
        },
        {
            value: "105,148",
            label: "A6"
        },
        {
            value: "74,105",
            label: "A7"
        },
        {
            value: "52,74",
            label: "A8"
        },
        {
            value: "37,52",
            label: "A9"
        },
        {
            value: "26,37",
            label: "A10"
        },
        {
            value: "100,148",
            label: "B7"
        },
        {
            value: "141,200",
            label: "B5"
        },
        {
            value: "200,283",
            label: "B4"
        },
        {
            value: "283,400",
            label: "B3"
        },
        {
            value: "400,566",
            label: "B2"
        },
        {
            value: "566,800",
            label: "B1"
        },
        {
            value: "800,1132",
            label: "B0"
        },
        {
            value: "216,356",
            label: "Foolscap"
        }
    ]

}

//作用：函数返回一个具有默认值的文本组件对象。这些默认值包括组件的尺寸、位置、字体样式等。
//该函数为创建一个新的文本组件提供了一个起始模板，返回的对象符合 Widget 类型，主要用于在设计模式下生成一个可编辑的文本组件。
export const getDefaultText = () => {
    return {
        type: 'text',
        isEdit: true,
        resizable: true,
        width: 100,
        height: 50,
        left: 0,
        top: 0,
        name: '',
        value: '文本',
        activeCol: -1,
        style: {
            Bold: false,
            Italic: false,
            FontSize: 12,
            Alignment: 'left',
            Underline: false,
            FontColor: '#000000',
            FontName: '微软雅黑'
        }
    } as Widget
}

// 返回数据绑定文本，getText 函数根据传入的 name 和 key 生成一个绑定数据的文本组件对象。
export const getText = ({name, key}: {name: string, key: string}) => {
    return {
        type: 'text',
        isEdit: false,
        resizable: true,
        width: 100,
        height: 50,
        left: 0,
        top: 0,
        name: name,
        value: '{'+key+'}',
        activeCol: -1,
        style: {
            Bold: false,
            Italic: false,
            FontSize: 12,
            Alignment: 'left',
            Underline: false,
            FontColor: '#000000',
            FontName: '微软雅黑'
        }
    } as Widget
}

// 表格
// getTable 函数的作用是创建一个包含表格信息的对象，用于描述一个表格组件。
//输入参数：
//name: 表格的名称。
//key: 数据源的键，用于标识这个表格绑定的数据。
//columns: 一个数组，包含了表格的列定义，每列包括 name（列的显示名称）和 key（列对应的数据字段）。
export const getTable = ({name, key, columns}: {name: string, key: string, 
    columns:{name: string, key: string}[]}) => {
        const cols: Column[] = columns.map(x=>({name: x.name, value: x.key}))
        //columns.map(...)：将输入的列数组 columns 转换为包含 name 和 value 的新数组 cols，每个 value 对应 columns 中的 key。
    return {
        type: 'table',
        isEdit: false,
        resizable: true,
        width: 100*cols.length,
        height: 100,
        left: 0,
        top: 0,
        name: name,
        value: [],
        activeCol: -1,
        tableName: key,
        columns: cols,
        style: {
            Bold: false,
            Italic: false,
            FontSize: 12,
            Alignment: 'left',
            Underline: false,
            FontColor: '#000000',
            FontName: '微软雅黑',
            BorderWidth: 2
        }
    } as Widget
}

// 测试数据，根据传入的 type 不同，函数会返回对应的 JSON 格式字符串，例如 pw 类型返回的是电力相关的数据，de 类型返回的是配方生产数据。这些数据通常用于模拟实际数据在前端展示效果。
export const getTestData = (type: string) => {
    switch (type) {
        case 'pw':
        return (
`{
    "PowerTable": [
        {
            "Device": "设备A",
            "DateTime": "2023-08-14 08:00:00",
            "DayValue": 50.2,
            "StartValue": 100.5,
            "StopValue": 150.7,
            "TopValue": 10.3,
            "HighValue": 20.1,
            "NormalValue": 15.6,
            "LowValue": 4.2
        },
        {
            "Device": "设备B",
            "DateTime": "2023-08-14 09:00:00",
            "DayValue": 48.7,
            "StartValue": 75.2,
            "StopValue": 124.0,
            "TopValue": 9.8,
            "HighValue": 18.5,
            "NormalValue": 14.2,
            "LowValue": 6.2
        },
        {
            "Device": "设备C",
            "DateTime": "2023-08-14 10:00:00",
            "DayValue": 55.3,
            "StartValue": 50.1,
            "StopValue": 105.4,
            "TopValue": 11.5,
            "HighValue": 22.3,
            "NormalValue": 17.9,
            "LowValue": 3.6
        },
        {
            "Device": "设备X",
            "DateTime": "2023-08-14 11:00:00",
            "DayValue": 62.8,
            "StartValue": 112.3,
            "StopValue": 175.1,
            "TopValue": 12.9,
            "HighValue": 24.7,
            "NormalValue": 19.3,
            "LowValue": 5.9
        },
        {
            "Device": "设备Y",
            "DateTime": "2023-08-14 12:00:00",
            "DayValue": 51.5,
            "StartValue": 88.7,
            "StopValue": 140.2,
            "TopValue": 10.7,
            "HighValue": 21.4,
            "NormalValue": 16.8,
            "LowValue": 2.6
        },
        {
            "Device": "设备Z",
            "DateTime": "2023-08-14 13:00:00",
            "DayValue": 58.2,
            "StartValue": 42.0,
            "StopValue": 100.9,
            "TopValue": 11.2,
            "HighValue": 20.9,
            "NormalValue": 18.5,
            "LowValue": 7.6
        }
    ]
}`
        )    
        case 'de':
        return (
`{
    "Receipe": "配方名称1",
    "DateTime": "2023-08-14 10:00:00",
    "Order": "生产订单001",
    "RawTable": [
        {
            "RawName": "原料1",
            "BatchWeight": "100 kg",
            "Batches": 5,
            "Target": "500 kg",
            "AccTarget": "490 kg",
            "Error": "10 kg"
        },
        {
            "RawName": "原料2",
            "BatchWeight": "50 kg",
            "Batches": 3,
            "Target": "150 kg",
            "AccTarget": "145 kg",
            "Error": "5 kg"
        },
        {
            "RawName": "原料3",
            "BatchWeight": "30 kg",
            "Batches": 2,
            "Target": "60 kg",
            "AccTarget": "58 kg",
            "Error": "2 kg"
        },
        {
            "RawName": "原料4",
            "BatchWeight": "75 kg",
            "Batches": 2,
            "Target": "150 kg",
            "AccTarget": "148 kg",
            "Error": "2 kg"
        },
        {
            "RawName": "原料5",
            "BatchWeight": "45 kg",
            "Batches": 3,
            "Target": "135 kg",
            "AccTarget": "132 kg",
            "Error": "3 kg"
        },
        {
            "RawName": "原料6",
            "BatchWeight": "60 kg",
            "Batches": 5,
            "Target": "300 kg",
            "AccTarget": "305 kg",
            "Error": "-5 kg"
        }
    ]
}`
        )
        default:
            return ''
    }
}

// 模板类型
// 函数返回一组模板类型，每种模板类型都有 value 和 label，value 是内部使用的标识，label 是显示给用户看的名字。
export const getTempType = () => {
    return [
        { value: 'PowerConsumption', label: '耗电报表' },
        { value: 'MaterialProduction', label: '生产报表' },
    ]
}

// 模板dto
//作用是根据传入的 type 返回对应的数据结构描述。
//例如，如果 type 是 'PowerConsumption'，返回的 DTO 包含一个 PowerTable，里面有设备、日期等列的定义。
//如果 type 是 'MaterialProduction'，返回的 DTO 包含 Receipe（配方名称）、DateTime（时间）等信息。
//Dto 一般表示数据传输对象（Data Transfer Object），在这个函数中，它返回的是一个模板类型所需要的数据结构。

export const getDto = (type: string) => {
    switch (type) {
        case 'PowerConsumption':
            return [
                {
                    name: '用电表',
                    key: 'PowerTable',
                    columns: [
                        {name: '设备', key: 'Device'},
                        {name: '日期', key: 'DateTime'},
                        {name: '日用电量', key: 'DayValue'},
                        {name: '期初读数', key: 'StartValue'},
                        {name: '期末读数', key: 'StopValue'},
                        {name: '尖峰用电', key: 'TopValue'},
                        {name: '高峰用电', key: 'HighValue'},
                        {name: '平电', key: 'NormalValue'},
                        {name: '谷电', key: 'LowValue'},
                    ]
                }
            ]
        case 'MaterialProduction':
            return [
                {name: '配方名称', key: 'Receipe'},
                {name: '时间', key: 'DateTime'},
                {name: '生产订单', key: 'Order'},
                {
                    name: '原料表',
                    key: 'RawTable',
                    columns: [
                        {name: '原料名', key: 'RawName'},
                        {name: '单批重量', key: 'BatchWeight'},
                        {name: '批数', key: 'Batches'},
                        {name: '计划消耗量', key: 'Target'},
                        {name: '实际消耗量', key: 'AccTarget'},
                        {name: '误差', key: 'Error'},
                    ]
                }

            ]
        default:
            break;
    }
}
//replacePattern 在一个字符串中找到特定的“标记”并把它替换成你想要的内容。
//const templateString = "设备: {Device}, 日期: {DateTime}"; 使用let result = replacePattern(templateString, "Device", "设备A");和result = replacePattern(result.result, "DateTime", "2023-08-14");
//最后替换成"设备: 设备A, 日期: 2023-08-14"


export const replacePattern = (input: string, pattern: string, replacement: string) => {
  const regex = new RegExp(`{${pattern}}?`, 'g');
  const replacedString = input.replace(regex, replacement);
  const hasReplaced = replacedString !== input;
  return { replaced: hasReplaced, result: replacedString };
}


// 将表格组件转为html，发送给lodop
//函数通过 getTh 和 getTd 两个辅助函数分别生成表头和表格行的 HTML 代码。
export const tableToHtml = (style: any, w: Widget, value?:any[]) => {
    const getTh = () => {
        let th = '';
        w.columns?.forEach(x => th += `<th >${x.name}</th>`)
        return th;
    }
    const getTd = () => {
        let td = '';
        if (!value || value && value.length <= 0) {
            td += '<tr>'
            w.columns?.forEach(x => td += `<td >{${x.value}}</td>`)
            td += '</tr>'
        } else {
            value.forEach(i => {
                td += '<tr>'
                w.columns?.forEach(x => td += `<td >${i[x.value]}</td>`)
                td += '</tr>'
            })
        }
        return td
    }
    const html = 
    `
    <style>
        table th, table td {
            word-break: break-all;
            border-style: solid;
            text-align: ${style.Alignment ? style.Alignment : 'left'};
            border-color: ${style.BorderColor ? style.BorderColor : '#000000'};
            border-width: ${style.BorderWidth ? style.BorderWidth : 2};
            padding: 8px;
        }
        table {
            border-collapse: collapse;
            box-sizing: border-box;
            font-size: ${style.FontSize ? style.FontSize+'pt' : '12pt' };
            color: ${style.FontColor ? style.FontColor : '#000000'};
            font-family: ${style.FontName ? style.FontName : '微软雅黑'};
            font-weight: ${style.Bold ? 'bold': 'normal'};
            text-decoration: ${style.Underline ? 'underline' : 'none'};
            font-style: ${style.Italic ? 'italic' : 'normal'};
            border-color: ${style.BorderColor ? style.BorderColor : '#000000'};
            border-width: ${style.BorderWidth ? style.BorderWidth : 2};
            border-style: solid;
            width: 100%;
        }
        table th {
            font-weight: 'bold';
        }
    </style>
    <table>
        <thead>
            <tr>
                ${getTh()}
            </tr>
        </thead>
        <tbody>
            ${getTd()}
        </todody>
    </table>
    `
    return html;
}

// 文本组件转html
export const textTohtml = (w: Widget, style: any) => {
    const html =
    `
    <div style="
        font-size: ${style.FontSize ? style.FontSize+'pt' : '12pt'};
        color: ${style.FontColor ? style.FontColor : '#000000'};
        text-decoration: ${style.Underline ? 'underline' : 'none'};
        font-weight: ${style.Bold ? 'bold': 'normal'};
        font-style: ${style.Italic ? 'italic' : 'normal'};
        word-break: break-all;
        font-family: ${style.FontName ? style.FontName : '微软雅黑'};
        box-sizing: border-box;
        border-style: solid;
        text-align: ${style.Alignment ? style.Alignment : 'left'};
        border-width: ${style.BorderWidth ? style.BorderWidth : 0};
        border-color: ${style.BorderColor ? style.BorderColor : '#000000'};
        width: ${w.width}px;
        height: ${w.height}px;
        padding: 4px;
        line-height: ${style.VerticalCenter ? w.height/1.7 + 'px' : 'normal' }
    ">
        ${w.value}
    </div>
    `
    return html
} 