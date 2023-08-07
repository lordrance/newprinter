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
}

export interface Widget {
    type: string;
    index: number;
    isEdit: boolean;
    resizable: boolean;
    width: number;
    height: number;
    left: number;
    top: number;
    value: any;
    columns?: Column[];
    style: any;
}

export interface Column {
    name: string;
    value: string;
}