

export interface paramsTypes {
    type: string;
    sortProperty: string;
    page: number;
    limit: number;
    searchValue: string;
    categoryValue: number;
}

export interface paramsWithoutLimit {
    type: string;
    sortProperty: string;
    searchValue: string;
    categoryValue: number;
}