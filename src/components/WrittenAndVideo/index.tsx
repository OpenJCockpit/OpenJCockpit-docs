import type {ReactNode} from 'react';
import VideoEmbed from '../VideoEmbed';

type Props = {
  videoId?: string;
  videoTitle: string;
  transcript?: string;
  /** The written steps that mirror the video. */
  children: ReactNode;
};

/** Video on top, written steps below, same content in both. */
export default function WrittenAndVideo({
  videoId,
  videoTitle,
  transcript,
  children,
}: Props): ReactNode {
  return (
    <>
      <VideoEmbed id={videoId} title={videoTitle} transcript={transcript} />
      {children}
    </>
  );
}
