export interface IMangaDexResponse<T> {
	result: string;
	response: string;
	data: T;
	limit?: number;
	offset?: number;
	total?: number;
}

export interface IPaginated<T> {
	data: T;
	offset?: number;
	total?: number;
}

export * from './chapter';
export * from './list';
export * from './manga';
export * from './user';
