export class Comment {
    public id: number;
    public content: string;
    public createdAt: Date;
    public lastUpdated: Date;
    public reactionCount: number;
    public reactions: any;
    public authorId: number;

    constructor(id: number,
        content: string,
        createdAt: Date,
        lastUpdated: Date,
        reactionCount: number,
        authorId: number) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
        this.reactionCount = reactionCount;
        this.authorId = authorId;
    }
}