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

export const getFonts = () => {
    return [
        { value: 'SimSun', label: '宋体' },
        { value: 'SimHei', label: '黑体' },
        { value: 'Microsoft Yahei', label: '微软雅黑' },
        { value: 'Microsoft JhengHei', label: '微软正黑体' },
        { value: 'KaiTi', label: '楷体' },
        { value: 'NSimSun', label: '新宋体' },
        { value: 'FangSong', label: '仿宋' },
        { value: 'STKaiti', label: '华文楷体' },
        { value: 'STSong', label: '华文宋体' },
        { value: 'STFangsong', label: '华文仿宋' },
        { value: 'STZhongsong', label: '华文中宋' },
        { value: 'STHupo', label: '华文琥珀' },
        { value: 'STXinwei', label: '华文新魏' },
        { value: 'STLiti', label: '华文隶书' },
        { value: 'STXingkai', label: '华文行楷' },
        { value: 'YouYuan', label: '幼圆' },
        { value: 'LiSu', label: '隶书' },
        { value: 'STXihei', label: '华文细黑' },
        { value: 'STCaiyun', label: '华文彩云' },
        { value: 'FZShuTi', label: '方正舒体' },
        { value: 'FZYaoti', label: '方正姚体' },
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
        value: '文本',
        activeCol: -1,
        style: {
            Bold: false,
            Italic: false,
            FontSize: 12,
            Alignment: 'left',
            Underline: false,
            FontColor: '#000000',
            FontName: 'Microsoft Yahei'
        }
    } as Widget
}

export const getDefaultTable = () => {
    return {
        type: 'table',
        isEdit: true,
        resizable: true,
        width: 200,
        height: 100,
        left: 0,
        top: 0,
        value: [],
        activeCol: -1,
        columns: [
            {
                name: 'title1',
                value: '{col1}'
            },
            {
                name: 'title2',
                value: '{col2}'
            }
        ],
        style: {
            Bold: false,
            Italic: false,
            FontSize: 12,
            Alignment: 'left',
            Underline: false,
            FontColor: '#000000',
            FontName: 'Microsoft Yahei'
        }
    } as Widget
}

export const tableToHtml = (style: any, cols?: Column[], value?:any) => {

}