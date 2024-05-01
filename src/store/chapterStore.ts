import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ChapterState {
	index: number;
	title: string;
	setIndex: (index: number) => void;
	setTitle: (title: string) => void;
}

const useChapterStore = create<ChapterState>()(
	persist(
		(set) => ({
			index: 0,
			title: '',
			setIndex: (index: number) => set({ index }),
			setTitle: (title: string) => set({ title }),
		}),
		{
			name: 'chapter-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

export default useChapterStore;
