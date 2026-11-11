import {useEffect, useState, type ReactNode} from 'react';
import styles from './styles.module.css';

type Props = {
  /** YouTube video id. Omit while the video is not recorded yet. */
  id?: string;
  title: string;
  /** Link (doc path or URL) to the transcript. */
  transcript?: string;
};

export default function VideoEmbed({id, title, transcript}: Props): ReactNode {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [expanded]);

  return (
    <figure className={styles.figure}>
      {id ? (
        <div className={expanded ? `${styles.frame} ${styles.expanded}` : styles.frame}>
          <button
            type="button"
            className={styles.expand}
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? 'Close enlarged video' : 'Enlarge video'}>
            {expanded ? '✕' : '⤢'}
          </button>
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
