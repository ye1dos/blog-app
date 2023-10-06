interface IPost {
    post: any;
    id: string;
    title: string;
    content: string;
    preview: string;
    likesNumber: number;
    postImg: string | File;
    comments: IComment[];
    author: IUser;
    data: any;
    attributes: any;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}
