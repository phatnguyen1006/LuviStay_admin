// types of api data response

export interface PaginationParams {
    _limit: number;
    _page:number;
    _total:number;
}

interface MetaField {
    succces?: boolean;
    messsage?: string;
}


export interface DataResponse<T> extends MetaField {
    data:T;
    pagination?:PaginationParams;
}
