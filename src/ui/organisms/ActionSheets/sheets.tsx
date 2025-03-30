import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';

import ProfileActionSheet from './ProfileActionSheet';

registerSheet('profile', ProfileActionSheet);

declare module 'react-native-actions-sheet' {
	interface Sheets {
		profile: SheetDefinition;
	}
}

export {};
