import type { ReactNode } from "react";
import DocItem from "@theme-original/DocItem";
import type DocItemType from "@theme/DocItem";
import type { WrapperProps } from "@docusaurus/types";
import Head from "@docusaurus/Head";

type Props = WrapperProps<typeof DocItemType>;

// "30 minutes" -> "PT30M"; anything unparseable is omitted.
function toIsoDuration(value: unknown): string | undefined {
  const m = /^(\d+)\s*(minute|min|hour|hr)s?$/i.exec(String(value ?? "").trim());
  if (!m) return undefined;
  return `PT${m[1]}${m[2].toLowerCase().startsWith("h") ? "H" : "M"}`;
}

// Video scripts mirror the tutorials. They stay reachable but must not compete in search.
// `unlisted` would also drop them from the sidebar, which the video-scripts flag relies on.
export default function DocItemWrapper(props: Props): ReactNode {
  const { metadata, frontMatter } = props.content;
  const noindex = metadata.permalink.includes("/learn/video-scripts");
  const fm = frontMatter as Record<string, unknown>;
  const isTutorial = fm.estimated_time !== undefined || fm.difficulty !== undefined;
  const jsonLd = isTutorial
    ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: metadata.title,
        description: metadata.description,
        proficiencyLevel: fm.difficulty
          ? String(fm.difficulty).replace(/^./, (c) => c.toUpperCase())
          : undefined,
        timeRequired: toIsoDuration(fm.estimated_time),
        inLanguage: "en",
      }
    : undefined;
  return (
    <>
      {(noindex || jsonLd) && (
        <Head>
          {noindex && <meta name="robots" content="noindex" />}
          {jsonLd && (
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
          )}
        </Head>
      )}
      <DocItem {...props} />
    </>
  );
}
