export class User {
    id: number;
    username: string;
    password: string;
    balance: number;
    author: Boolean;

    constructor(id: number, username: string, password: string, balance: number, author: Boolean) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.balance = balance;
        this.author = author;
    }
}
