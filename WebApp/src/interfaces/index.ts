export interface Template {
    page: Page;
    widgets: Widget[];
}

export interface Page {
    name: string;
    width: number;
    height: number;
    pageWidth: number;
    pageHeight: number;
    uuid: string;
}

export interface Widget {
    type: string;
    isEdit: boolean;
    resizable: boolean;
    width: number;
    height: number;
    left: number;
    top: number;
    value: any;
    activeCol: number;
    tableName?: string;
    columns?: Column[];
    style: any;
}

export interface Style {
    FontSize: number;
    Bold: boolean;
    Italic: boolean;
    Underline: boolean;
    Alignment: string;
    FontColor: string;
}

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