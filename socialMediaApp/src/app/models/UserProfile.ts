//import { Role } from './Role'; 
export class UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    about: string;
    phone: string;
    photoUrl: string;
    backgroundUrl: string;
    createdAt: Date;
    //roles: Role[];
    constructor(id: number,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        about: string,
        phone: string,
        photoUrl: string,
        backgroundUrl: string,
        createdAt: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.about = about;
        this.phone = phone;
        this.photoUrl = photoUrl;
        this.backgroundUrl = backgroundUrl;
        this.createdAt = createdAt;
    }
}