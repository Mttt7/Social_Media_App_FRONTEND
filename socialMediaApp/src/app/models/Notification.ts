export class Notification {
    id: number;
    authorId: number;
    authorName: string;
    receiverId: number;
    type: string;
    contentId: number;
    authorProfilePhotoSrc: string;
    read: boolean;
    createdAt: Date;
    constructor(id: number, authorId: number, authorName: string, receiverId: number, type: string, contentId: number, authorProfilePhotoSrc: string, read: boolean, createdAt: Date) {
        this.id = id;
        this.authorId = authorId;
        this.authorName = authorName;
        this.receiverId = receiverId;
        this.type = type;
        this.contentId = contentId;
        this.authorProfilePhotoSrc = authorProfilePhotoSrc;
        this.read = read;
        this.createdAt = createdAt;
    }

}