import { Author } from "./author";
import { Category } from "./category.model";

export class Book{
    book_id: number;
    title: string;
    category: Category;
    authors: Author[] = [];
    price: number;
    published: string;
    imageURL: string;
}