import Text from "@/widgets/text";
import Table from "@/widgets/table";
import { Column, Widget } from "@/interfaces";

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

// export const getFonts = () => {
//     return [
//         { value: 'SimSun', label: '宋体' },
//         { value: 'SimHei', label: '黑体' },
//         { value: 'Microsoft Yahei', label: '微软雅黑' },
//         { value: 'Microsoft JhengHei', label: '微软正黑体' },
//         { value: 'KaiTi', label: '楷体' },
//         { value: 'NSimSun', label: '新宋体' },
//         { value: 'FangSong', label: '仿宋' },
//         { value: 'STKaiti', label: '华文楷体' },
//         { value: 'STSong', label: '华文宋体' },
//         { value: 'STFangsong', label: '华文仿宋' },
//         { value: 'STZhongsong', label: '华文中宋' },
//         { value: 'STHupo', label: '华文琥珀' },
//         { value: 'STXinwei', label: '华文新魏' },
//         { value: 'STLiti', label: '华文隶书' },
//         { value: 'STXingkai', label: '华文行楷' },
//         { value: 'YouYuan', label: '幼圆' },
//         { value: 'LiSu', label: '隶书' },
//         { value: 'STXihei', label: '华文细黑' },
//         { value: 'STCaiyun', label: '华文彩云' },
//         { value: 'FZShuTi', label: '方正舒体' },
//         { value: 'FZYaoti', label: '方正姚体' },
//     ];
// }
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

// export const getDefaultTable = () => {
//     return {
//         type: 'table',
//         isEdit: true,
//         resizable: true,
//         width: 200,
//         height: 100,
//         left: 0,
//         top: 0,
//         name: '',
//         value: [],
//         activeCol: -1,
//         tableName: '',
//         columns: [
//             {
//                 name: 'title1',
//                 value: '{col1}'
//             },
//             {
//                 name: 'title2',
//                 value: '{col2}'
//             }
//         ],
//         style: {
//             Bold: false,
//             Italic: false,
//             FontSize: 12,
//             Alignment: 'left',
//             Underline: false,
//             FontColor: '#000000',
//             FontName: 'Microsoft Yahei'
//         }
//     } as Widget
// }

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

export const getTable = ({name, key, columns}: {name: string, key: string, 
    columns:{name: string, key: string}[]}) => {
        const cols: Column[] = columns.map(x=>({name: x.name, value: x.key}))
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
            break;
    }
}

export const getTempType = () => {
    return [
        { value: 'PowerConsumption', label: '耗电报表' },
        { value: 'MaterialProduction', label: '生产报表' },
    ]
}

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

export const replacePattern = (input: string, pattern: string, replacement: string) => {
  const regex = new RegExp(`{${pattern}}?`, 'g');
  const replacedString = input.replace(regex, replacement);
  const hasReplaced = replacedString !== input;
  return { replaced: hasReplaced, result: replacedString };
}

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
                console.log(i)
                td += '<tr>'
                w.columns?.forEach(x => td += `<td >${i[x.value]}</td>`)
                td += '</tr>'
            })
        }
        return td
    }
    let html = 
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
            font-weight: ${style.FontWeight ? 'bold': 'normal'};
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

export const textTohtml = (w: Widget, style: any) => {
    let html =
    `
    <div style="
        font-size: ${style.FontSize ? style.FontSize+'pt' : '12pt'};
        color: ${style.FontColor ? style.FontColor : '#000000'};
        font-weight: ${style.FontWeight ? 'bold': 'normal'};
        text-decoration: ${style.Underline ? 'underline' : 'none'};
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
    ">
        ${w.value}
    </div>
    `
    return html
} 