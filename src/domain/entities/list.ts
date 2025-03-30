export type IMangaDexList = {
	id: string;
	type: string;
	attributes: {
		name: string;
		visibility: string;
		version: number;
	};
	relationships: Array<{
		id: string;
		type: string;
	}>;
};
