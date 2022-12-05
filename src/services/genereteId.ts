import {v4} from "uuid";

export class generateId {
    public generate():string{
        return v4()
    }
}