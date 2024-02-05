export class PostCreateRequestPayload {
    private title: string;
    private content: string;
    private imageUrl?: string;
    private topicId?: number;
    constructor(title: string,
        content: string,
        imageUrl: string,
        topicId: number) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.topicId = topicId;
    }
}