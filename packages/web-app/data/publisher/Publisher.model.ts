export class PublisherModel {
    id!: string;
    title!: string;
    avatarUrl?: string;

    constructor(data: PublisherModel) {
        Object.assign(this, data);
    }

    static fromGraphQL(data) {
        return new PublisherModel({
            id: data.id,
            title: data.title,
            avatarUrl: data.avatar.resized?.medium,
        });
    }
}