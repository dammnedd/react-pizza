export interface sortItem {
    name: string;
    sortProperty: string;
    type: string;
}
export interface sortState {
    mouseValue: null | number;
    open: boolean;
    sort: sortItem;
}

export interface listState {
    name: string;
    sort: string;
    type: string;
}