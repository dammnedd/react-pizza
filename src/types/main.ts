
export interface mainState {
    pizzas: pizzaItem[]
    searchValue: string;
    isCart: boolean;
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
    parentId: number;
    quantity: number;
    typeName: string;
    sizeName: number;
}