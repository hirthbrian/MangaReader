import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ChapterState {
	index: number;
	title: string;
	totalPages: number;
	currentPage: number;
	setChapter: (index: number, title: string) => void;
}

const useChapterStore = create<ChapterState>()(
	// persist(
	(set) => ({
		index: 1122,
		title: '',
		totalPages: 1,
		currentPage: 0,
		setChapter: (index: number, title: string) => set({ index, title }),
	}),
	// {
	// name: 'chapter-storage',
	// storage: createJSONStorage(() => AsyncStorage),
	// },
	// ),
);

export default useChapterStore;
