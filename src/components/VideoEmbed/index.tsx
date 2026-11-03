import type {ReactNode} from 'react';
import styles from './styles.module.css';

type Props = {
  /** YouTube video id. Omit while the video is not recorded yet. */
  id?: string;
  title: string;
  /** Link (doc path or URL) to the transcript. */
  transcript?: string;
};

export default function VideoEmbed({id, title, transcript}: Props): ReactNode {
  return (
    <figure className={styles.figure}>
      {id ? (
        <div className={styles.frame}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
            title={title}
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className={styles.placeholder} role="note">
          Video coming soon: {title}. The written steps below cover the same content.
        </div>
      )}
      <figcaption>
        {title}
        {transcript ? <> · <a href={transcript}>Transcript</a></> : null}
      </figcaption>
    </figure>
  );
}
