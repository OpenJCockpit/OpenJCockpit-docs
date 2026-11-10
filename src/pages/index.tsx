import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

const PuffsBackground = lazy(
  () => import("@site/src/components/PuffsBackground"),
);

// Docusaurus appends " | OpenJCockpit Docs".
const HOME_TITLE = "Governed, spec-driven AI software development";
const HOME_DESCRIPTION =
  "Learn, build and operate OpenJCockpit, the open-source AI software factory: spec-driven changes, approval gates, policy as code and reviewable agent delivery.";

const pillars = [
  {
    title: "Specs, not prompts",
    text: "Requirements and acceptance criteria live in your repository and drive every change.",
    to: "/learn/intro",
    cta: "What is OpenJCockpit?",
    icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  },
  {
    title: "Humans stay in control",
    text: "Approval gates and policy as code decide what agents may do and when a person signs off.",
    to: "/learn/tutorials",
    cta: "Approval gates tutorial",
    icon: "M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6zM9 12l2 2 4-4",
  },
  {
    title: "Reviewable delivery",
    text: "Agents work in a branch with checkpoints. You review a pull request, as always.",
    to: "/learn/getting-started/quickstart",
    cta: "Quickstart with Docker Compose",
    icon: "M6 3v12M6 15a3 3 0 100 6 3 3 0 000-6zM18 9a3 3 0 100-6 3 3 0 000 6zM18 9c0 6-12 3-12 6",
  },
];

const sections = [
  {
    title: "Learn",
    text: "Guided tutorials with checkpoints and video: from a first spec-driven change to approval gates, policy as code and your own agents.",
    to: "/learn/intro",
    cta: "Start the learning path",
    icon: "M4 6l8-3 8 3-8 3zM7 10.5V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5M20 6v6",
  },
  {
    title: "Reference",
    text: "The product documentation: architecture, workflows, governance, integrations, operations and configuration.",
    to: "/reference",
    cta: "Open the reference",
    icon: "M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3zM5 17a3 3 0 013-3h10M9 8h5",
  },
];

const goals = [
  {
    goal: "Try it locally",
    start: "Quickstart",
    to: "/learn/getting-started/quickstart",
  },
  {
    goal: "Understand the platform",
    start: "Overview",
    to: "/reference/concepts/overview",
  },
  {
    goal: "Build with agents and workflows",
    start: "Agents and workflows",
    to: "/reference/workflows/agents-and-workflows",
  },
  {
    goal: "Configure governance",
    start: "Policy enforcement",
    to: "/reference/governance/policy-enforcement",
  },
  {
    goal: "Extend the platform",
    start: "Agents and A2A",
    to: "/reference/integrations/a2a-agents",
  },
  {
    goal: "Operate and troubleshoot",
    start: "Troubleshooting",
    to: "/reference/operations/troubleshooting",
  },
  {
    goal: "Assess it for my organization",
    start: "Security considerations",
    to: "/reference/governance/security-considerations",
  },
];

function Icon({ path }: { path: string }) {
  return (
    <span className={styles.iconBox} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </span>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const logo = useBaseUrl("/img/OpenJCockpit_logo_horizontal.png");
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <BrowserOnly>
        {() => (
          <Suspense fallback={null}>
            <PuffsBackground className={styles.puffs} />
          </Suspense>
        )}
      </BrowserOnly>
      <div className={clsx("container", styles.heroContent)}>
        <span className={styles.logoChip}>
          <img
            className={styles.logo}
            src={logo}
            alt="OpenJCockpit, the open-source AI Software Factory"
          />
        </span>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/learn/intro">
            Start learning
          </Link>
          <Link className="button button--secondary button--lg" to="/reference">
            Browse the reference
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const base = siteConfig.url + siteConfig.baseUrl;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}#website`,
        name: siteConfig.title,
        url: base,
        description: HOME_DESCRIPTION,
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${base}#software`,
        name: "OpenJCockpit",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux, macOS, Windows (Docker)",
        description: HOME_DESCRIPTION,
        url: base,
        isAccessibleForFree: true,
        sameAs: ["https://github.com/OpenJCockpit/OpenJCockpit"],
      },
    ],
  };
  return (
    <Layout title={HOME_TITLE} description={HOME_DESCRIPTION}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <div className="row">
          {sections.map((c) => (
            <div key={c.title} className="col col--6">
              <div className={styles.panel}>
                <Icon path={c.icon} />
                <Heading as="h2">{c.title}</Heading>
                <p>{c.text}</p>
                <Link to={c.to}>{c.cta}</Link>
              </div>
            </div>
          ))}
        </div>

        <Heading as="h2" className={styles.sectionTitle}>
          I want to&hellip;
        </Heading>
        <div className={styles.panel}>
          <table className={styles.goals}>
            <tbody>
              {goals.map((g) => (
                <tr key={g.goal}>
                  <th scope="row">{g.goal}</th>
                  <td>
                    <Link to={g.to}>{g.start}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Heading as="h2" className={styles.sectionTitle}>
          How OpenJCockpit works
        </Heading>
        <div className="row">
          {pillars.map((p) => (
            <div key={p.title} className="col col--4">
              <div className={styles.panel}>
                <Icon path={p.icon} />
                <Heading as="h3">{p.title}</Heading>
                <p>{p.text}</p>
                <Link to={p.to}>{p.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
