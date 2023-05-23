import { Guid } from "guid-typescript";
export class LoginResponse {
    public UserId!: Guid;
    public EmailId!: string;
    public Password!: string;
}