

export interface mainState {
    pizzas: pizzaItem | null;
    searchValue: string;
}


export interface pizzaItem {
    category: number;
    id: number;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];

}