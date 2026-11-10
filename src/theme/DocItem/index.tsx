import type { ReactNode } from "react";
import DocItem from "@theme-original/DocItem";
import type DocItemType from "@theme/DocItem";
import type { WrapperProps } from "@docusaurus/types";
import Head from "@docusaurus/Head";

type Props = WrapperProps<typeof DocItemType>;

// Video scripts mirror the tutorials. They stay reachable but must not compete in search.
// `unlisted` would also drop them from the sidebar, which the video-scripts flag relies on.
export default function DocItemWrapper(props: Props): ReactNode {
  const noindex = props.content.metadata.permalink.includes("/learn/video-scripts");
  return (
    <>
      {noindex && (
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
      )}
      <DocItem {...props} />
    </>
  );
}
