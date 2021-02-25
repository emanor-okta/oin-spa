export class State {
    public authenticated: boolean;
    public email: string;
    public idToken: string;
    public name: string;
    public msg: string;
    public color: string;

    constructor() {
        this.authenticated = false;
        this.email = '';
        this.idToken = '';
        this.color = '##e4227c';
        this.name = '';
        this.msg = '';
    }
}