import React, { useEffect, useState } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import { ImageZoom, ZOOM_TYPE } from '@likashefqet/react-native-image-zoom';

export interface Props {
	onTap: () => void;
	setZoomedIn: (zoomedIn: boolean) => void;
	uri: string;
	zoomedIn: boolean;
}

const Page = ({ onTap, zoomedIn, setZoomedIn, uri }: Props) => {
	const { width } = useWindowDimensions();
	const [height, setHeight] = useState(width);

	useEffect(() => {
		Image.getSize(uri, (w, h) => {
			setHeight((h / w) * width);
		});
	}, []);

	return (
		<View>
			<ImageZoom
				uri={uri}
				isDoubleTapEnabled
				isSingleTapEnabled
				onSingleTap={onTap}
				minPanPointers={zoomedIn ? 1 : 2}
				onDoubleTap={(e) => setZoomedIn(e == ZOOM_TYPE.ZOOM_IN)}
				onPinchEnd={(e) => setZoomedIn(e.scale > 1)}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					width,
					height,
				}}
			/>
		</View>
	);
};

export default Page;
