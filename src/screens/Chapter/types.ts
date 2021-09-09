export interface Chapter {
  index: number,
  title: string,
  url: string,
};

export interface Props {
  initialIndex: number,
  initialTitle: string,
  chapters: Chapter[],
};