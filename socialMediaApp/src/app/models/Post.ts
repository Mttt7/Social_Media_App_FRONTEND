import { Topic } from "./Topic";

export class Post {
    public id: number;
    public title: string;
    public content: string;
    public createdAt: Date;
    public lastUpdated: Date;
    public reactionCount: number;
    public commentCount: number;
    public reactions: any;
    public imageUrl: String;
    public topic: Topic;
    public userId: number;

    constructor(id: number,
        title: string,
        content: string,
        createdAt: Date,
        lastUpdated: Date,
        reactionCount: number,
        commentCount: number,
        imageUrl: String,
        topic: Topic,
        userId: number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
        this.reactionCount = reactionCount;
        this.commentCount = commentCount;
        this.imageUrl = imageUrl;
        this.topic = topic;
        this.userId = userId;
    }
}