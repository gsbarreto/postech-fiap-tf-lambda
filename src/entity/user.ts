export default class User {
    name: string;
    email: string;
    document: string;
    created: boolean;
    clientId: string | null | undefined;

    constructor(name: string, email: string, document: string, created: boolean, clientId: null | string | undefined) {
        this.name = name;
        this.email = email;
        this.document = document;
        this.created = created;
    }
}