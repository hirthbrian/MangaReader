import Icon from '@react-native-vector-icons/lucide';
import { SvgUri } from 'react-native-svg';

type Props = {
	size: number;
	color: string;
};

export const IconArrowRight = (props: Props) => (
	<Icon name="arrow-right" {...props} />
);

export const IconClock = (props: Props) => <Icon name="clock" {...props} />;

export const IconSearch = (props: Props) => <Icon name="search" {...props} />;

export const IconUser = (props: Props) => <Icon name="user" {...props} />;

export const IconSettings = (props: Props) => (
	<Icon name="settings" {...props} />
);

export const IconPalette = (props: Props) => <Icon name="palette" {...props} />;

export const IconExternal = (props: Props) => (
	<Icon name="square-arrow-out-up-right" {...props} />
);

export const IconUri = ({ size, uri }: { size: number; uri: string }) => (
	<SvgUri width={size} height={size} uri={uri} />
);
