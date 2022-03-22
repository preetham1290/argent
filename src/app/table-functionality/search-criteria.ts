export class SearchCriteria {
    sortColumn?: string;
    sortDirection?: '' | 'asc' | 'desc';
    searchValue?: string;
    pageNo?: number;
    pageSize?: PAGE_SIZES = 10;
    params?: [{ [key: string]: any }] | undefined;
    multiValueParam?: { [key: string]: any[] } | undefined;
}
export enum PAGE_SIZES {
    ZERO = 0,
    TEN = 10,
    FIFTEEN = 15,
    TWENTY = 20,
    DEFAULT_PAGE_SIZE = 10
}
