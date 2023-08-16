// 模板
export interface Template {
    page: Page;
    widgets: Widget[];
}

// 模板长宽id类型
export interface Page {
    name: string;
    width: number;
    height: number;
    pageWidth: number;
    pageHeight: number;
    type: string;
    uuid: string;
}

// 组件
export interface Widget {
    type: string;
    isEdit: boolean;
    resizable: boolean;
    width: number;
    height: number;
    left: number;
    top: number;
    name: string;
    value: any;
    activeCol: number;
    tableName?: string;
    columns?: Column[];
    style: any;
}

// 表格列
export interface Column {
    name: string;
    value: string;
}

export interface MenuItem  {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
}