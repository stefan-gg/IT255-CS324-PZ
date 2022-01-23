export class Course {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    price: string;
    imageURL: string;
    author_id: number;

    constructor(id: number, name: string, shortDescription: string,
         description: string, price: string, imageURL: string,
          author_id: number) {
        this.id = id;
        this.name = name;
        this.shortDescription = shortDescription;
        this.description = description;
        this.price = price;
        this.imageURL = imageURL;
        this.author_id = author_id;
    }
}
