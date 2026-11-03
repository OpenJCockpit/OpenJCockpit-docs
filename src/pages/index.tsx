import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const pillars = [
  {
    title: 'Specs, not prompts',
    text: 'Requirements and acceptance criteria live in your repository and drive every change.',
    to: '/docs/intro',
  },
  {
    title: 'Humans stay in control',
    text: 'Approval gates and policy as code decide what agents may do and when a person signs off.',
    to: '/docs/tutorials',
  },
  {
    title: 'Reviewable delivery',
    text: 'Agents work in a branch with checkpoints. You review a pull request, as always.',
    to: '/docs/getting-started/quickstart',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logo = useBaseUrl('/img/OpenJCockpit_logo_horizontal.png');
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img
          className={styles.logo}
          src={logo}
          alt="OpenJCockpit, the open-source AI Software Factory"
        />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            What is OpenJCockpit?
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quickstart">
            Quickstart
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <div className="row">
          {pillars.map((p) => (
            <div key={p.title} className="col col--4">
              <Heading as="h2">{p.title}</Heading>
              <p>{p.text}</p>
              <Link to={p.to}>Learn more</Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
