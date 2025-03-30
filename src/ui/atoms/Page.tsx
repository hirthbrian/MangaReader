import { ImageZoom, ZOOM_TYPE } from '@likashefqet/react-native-image-zoom';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export interface Props {
	onTap: () => void;
	setZoomedIn: (zoomedIn: boolean) => void;
	uri: string;
	_zoomedIn: boolean;
}

const Page = ({ onTap, _zoomedIn, setZoomedIn, uri }: Props) => {
	const { width } = useWindowDimensions();
	const [height, setHeight] = useState(width);

	useEffect(() => {
		Image.getSize(uri, (w, h) => {
			setHeight((h / w) * width);
		});
	}, [uri, width]);

	return (
		<View>
			<ImageZoom
				uri={uri}
				isDoubleTapEnabled
				isSingleTapEnabled
				onSingleTap={onTap}
				// minPanPointers={zoomedIn ? 1 : 2}
				onDoubleTap={(e) => setZoomedIn(e === ZOOM_TYPE.ZOOM_IN)}
				onPinchEnd={(e) => setZoomedIn(e.scale > 1)}
				style={[
					{
						width,
						height,
					},
					styles.container,
				]}
			/>
		</View>
	);
};

export default Page;
