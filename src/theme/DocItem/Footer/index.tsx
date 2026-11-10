import type { ReactNode } from "react";
import Footer from "@theme-original/DocItem/Footer";
import type FooterType from "@theme/DocItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type Props = WrapperProps<typeof FooterType>;

// Reference pages are synced from the OpenJCockpit repo; say so and name the ref.
export default function FooterWrapper(props: Props): ReactNode {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const ref = String(siteConfig.customFields?.productDocsRef ?? "main");
  const isReference = metadata.permalink.startsWith(
    `${siteConfig.baseUrl}reference`,
  );
  return (
    <>
      {isReference && (
        <p className="margin-top--md">
          <small>
            Synced from{" "}
            <a
              href={`https://github.com/OpenJCockpit/OpenJCockpit/tree/${ref}/docs/readme`}
            >
              OpenJCockpit@{ref}
            </a>
            . To change this page, edit it in the product repository.
          </small>
        </p>
      )}
      <Footer {...props} />
    </>
  );
}
