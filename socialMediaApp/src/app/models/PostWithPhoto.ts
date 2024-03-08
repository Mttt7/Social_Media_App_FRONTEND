export class PostWithPhoto {
    public postId: number;
    public imageUrl: string;
    public createdAt: Date;
    constructor(postId: number, imageUrl: string, createdAt: Date) {
        this.postId = postId;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }
}