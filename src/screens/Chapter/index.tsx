import React, { useState, useEffect } from "react";
import {
  FlatList,
  NativeScrollEvent,
  useWindowDimensions,
  NativeSyntheticEvent,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChapterList from "../../components/ChapterList";
import Loading from "../../components/Loading";
import Progress from "../../components/Progress";
import Page from "../../components/Page";
import Footer from "../../components/Footer";

const URL = "https://us-central1-onepiece-31470.cloudfunctions.net/getPages";

import { Props } from "./types";
import { Container } from "./styles";

function Chapter({ initialIndex, initialTitle, chapters }: Props) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(initialIndex);
  const [title, setTitle] = useState(initialTitle);
  const [images, setImages] = useState([]);
  const [showChapters, setShowChapters] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios(`${URL}?index=${index}`).then((response) => {
      setImages(response.data);
      setLoading(false);
    });
    AsyncStorage.setItem("@chapter", index.toString());
  }, [index]);

  const renderChapterList = () => (
    <ChapterList
      chapters={chapters}
      isVisible={showChapters}
      onClose={() => setShowChapters(false)}
      initialChapter={index}
      onChapterChanged={(index: number, title: string) => {
        setIndex(index);
        setTitle(title);
        setShowChapters(false);
      }}
    />
  );

  const renderPage = ({ item: { uri } }) => (
    <Page uri={uri} onPress={() => setShowFooter(!showFooter)} />
  );

  const renderFooter = () => (
    <Footer
      index={index}
      title={title}
      isVisible={showFooter}
      showChapters={setShowChapters}
      onChapterChanged={(index: number) => {
        setIndex(index);
        setTitle(chapters[index - 1].title);
      }}
    />
  );

  const onMomentum = ({
    nativeEvent: { contentSize, contentOffset, layoutMeasurement },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const percentage =
      (contentOffset.x + layoutMeasurement.width) / contentSize.width;
    setShowFooter(percentage === 1);
    setProgress(percentage);
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          horizontal
          data={images}
          renderItem={renderPage}
          snapToInterval={width}
          decelerationRate="fast"
          keyExtractor={(item) => item.uri}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentum}
          onMomentumScrollBegin={onMomentum}
        />
      )}
      <Progress progress={progress} />
      {renderFooter()}
      {renderChapterList()}
    </Container>
  );
}

export default Chapter;
