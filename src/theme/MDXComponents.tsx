import MDXComponents from '@theme-original/MDXComponents';
import VideoEmbed from '@site/src/components/VideoEmbed';
import VersionBanner from '@site/src/components/VersionBanner';
import LocalOnlyWarning from '@site/src/components/LocalOnlyWarning';
import ModelNote from '@site/src/components/ModelNote';
import Prerequisites from '@site/src/components/Prerequisites';
import Checkpoint from '@site/src/components/Checkpoint';
import WrittenAndVideo from '@site/src/components/WrittenAndVideo';

// Registered globally so tutorials can use them without imports.
export default {
  ...MDXComponents,
  VideoEmbed,
  VersionBanner,
  LocalOnlyWarning,
  ModelNote,
  Prerequisites,
  Checkpoint,
  WrittenAndVideo,
};
