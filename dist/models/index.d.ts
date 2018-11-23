declare class Doc {
    title: string;
    url: string;
    observations: string;
    groups: Array<Group>;
    constructor(title: string, url: string, observations: string, groups?: Array<Group>);
}
declare class Group {
    title: string;
    items: Array<Item>;
    constructor(title: string, items: Array<Item>);
}
declare class Item {
    title: string;
    description: string;
    type: string;
    path: string;
    headers: Array<Header> | null;
    parameters: Array<Parameter> | null;
    responses: Array<Response> | null;
    constructor(title: string, description: string, type: string, path: string, headers?: Array<Header> | null, parameters?: Array<Parameter> | null, responses?: Array<Response> | null);
}
declare class Header {
    description: string;
    key: string;
    value: string;
    constructor(description: string, key: string, value: string);
}
declare class Parameter {
    description: string;
    key: string;
    value: string;
    constructor(description: string, key: string, value: string);
}
declare class Response {
    description: string;
    code: number;
    schema: any;
    constructor(description: string, code: number, schema: any);
}
export { Doc, Group, Item, Header, Parameter, Response };
