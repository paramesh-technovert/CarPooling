export class LoginRequest {
    public EmailId!: string;
    public Password!: string;
    constructor(email: string, password: string) {

        this.EmailId = email;
        this.Password = password;
    }
}