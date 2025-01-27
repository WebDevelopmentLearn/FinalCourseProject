import Post from "../models/Post";
import {IPostDoc} from "../entitys/interfaces";
import {Error} from "mongoose";

class PostRepository {
    private static buildPostQuery(query: any) {
        return query
            .populate("author", "_id username avatar")
            .populate({
                path: "comments",
                select: "_id text author createdAt",
                populate: {
                    path: "author",
                    select: "_id username avatar",
                },
            })
            .populate("photos", "url");
    }

    public static async createPostDoc(postData: { title: string; content: string; author: string; photos?: string }): Promise<IPostDoc> {
        try {
            if (!postData.title || !postData.content || !postData.author) {
                throw new Error("Invalid post data: title, content, and author are required.");
            }

            const post = new Post(postData);
            return await post.save();
        } catch (error) {
            console.error("Failed to create post:", error);
            throw new Error("Failed to create post.");
        }
    }

    static async getAllPosts(page = 1, limit = 10): Promise<{ posts: IPostDoc[]; total: number; totalPages: number; currentPage: number }> {
        const skip = (page - 1) * limit;//calculate the number of documents to skip

        try {
            const [posts, total] = await Promise.all([
                PostRepository.buildPostQuery(Post.find().skip(skip).limit(limit)),
                Post.countDocuments(),
            ]);//execute both promises at the same time


            return {
                posts,
                total,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
            };//return the Object with the posts, total, totalPages and currentPage
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            throw new Error("Failed to fetch posts.");
        }
    }

    // Метод для получения постов конкретного пользователя с пагинацией
    public static async getAllPostsByUserId(userId: string, page: number = 1, limit: number = 10
    ): Promise<{ posts: IPostDoc[]; total: number; totalPages: number; currentPage: number }> {
        const skip = (page - 1) * limit; // Количество постов, которые нужно пропустить

        try {
            // Запрос на получение постов
            const [posts, total] = await Promise.all([
                // Посты пользователя с пагинацией
                PostRepository.buildPostQuery(
                    Post.find({ author: userId })
                        .skip(skip) // Пропускаем посты
                        .limit(limit) // Ограничиваем количество постов
                ),
                // Общее количество постов для вычисления totalPages
                Post.countDocuments({ author: userId }),
            ]);

            return {
                posts, // Массив постов
                total, // Общее количество постов
                totalPages: Math.ceil(total / limit), // Всего страниц
                currentPage: page, // Текущая страница
            };
        } catch (error) {
            console.error("Error fetching posts by user ID:", error);
            throw new Error("Failed to fetch posts by user ID.");
        }
    }

    static async getPostById(postId: string): Promise<IPostDoc | null> {
        try {
            const query = Post.findById(postId);
            return await PostRepository.buildPostQuery(query);
        } catch (error) {
            console.error("Failed to fetch post by ID:", error);
            throw new Error("Failed to fetch post by ID.");
        }
    }
}

export default PostRepository;