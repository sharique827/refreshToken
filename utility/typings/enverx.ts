export type PostCategory = 'Food' | 'Travel' | 'Fashion' | 'Lifestyle' | 'Other'
export enum Category {
    Food = 'Food',
    Travel = 'Travel',
    Fashion = 'Fashion',
    Lifestyle = 'Lifestyle',
    Other = 'Other',
}

export interface FilterCategory {
    category: PostCategory
    limit?: number
    skip?: number
}

export interface Filter {
    limit?: number
    skip?: number
}

export interface BlogPost {
    userId: string;
    blog: string;
    category: string;
}

export interface AggregationWithCount<T> {
    result: T
    count: number
}