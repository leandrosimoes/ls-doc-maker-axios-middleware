class Doc {
    public title: string
    public url: string
    public observations: string
    public groups: Array<Group>

    constructor(title: string, url: string, observations: string, groups: Array<Group> = new Array<Group>()) {
        this.title = title
        this.url = url
        this.observations = observations
        this.groups = groups
    }
}

class Group {
    public title: string
    public items: Array<Item>

    constructor(title: string, items: Array<Item>) {
        this.title = title
        this.items = items
    }
}

class Item {
    public title: string
    public description: string
    public type: string
    public path: string
    public headers: Array<Header> | null
    public parameters: Array<Parameter> | null
    public responses: Array<Response> | null

    constructor(
        title: string,
        description: string,
        type: string,
        path: string,
        headers: Array<Header> | null = null,
        parameters: Array<Parameter> | null = null,
        responses: Array<Response> | null = null) {

        this.title = title
        this.description = description
        this.type = type.toUpperCase()
        this.path = path
        this.headers = headers
        this.parameters = parameters
        this.responses = responses
    }
}

class Header {
    public description: string
    public key: string
    public value: string

    constructor(description: string, key: string, value: string) {
        this.description = description
        this.key = key
        this.value = value
    }
}

class Parameter {
    public description: string
    public key: string
    public value: string

    constructor(description: string, key: string, value: string) {
        this.description = description
        this.key = key
        this.value = value
    }
}

class Response {
    public description: string
    public code: number
    public schema: any

    constructor(description: string, code: number, schema: any) {
        this.description = description
        this.code = code
        this.schema = schema
    }
}

export {
    Doc,
    Group,
    Item,
    Header,
    Parameter,
    Response
}