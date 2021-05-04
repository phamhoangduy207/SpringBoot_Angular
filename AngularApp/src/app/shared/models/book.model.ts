import { Category } from "./category.model";

export class Book{
    book_id: number;
    title: string;
    category: Category;
    authorName: string;
    price: number;
    published: string;
    imageURL: string;
}