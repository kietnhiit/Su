import { type } from "os";

export class RequestOptions {
    type?: string;
    limit?: number;
    offset?: number;
    
    constructor(type?: string, limit?: number, offset?: number){
        this.type = type;
        this.limit = limit | 10;
        this.offset = offset | 0;
    }
}