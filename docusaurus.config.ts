import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OpenJCockpit Education',
  clientModules: ['./src/clientModules/d3-transition.ts'],
  tagline: 'Learn governed, spec-driven AI software development',
  favicon: 'img/OpenJCockpit_logo.png',

  future: {
    v4: true,
  },

  url: 'https://openjcockpit.github.io',
  baseUrl: '/openJCockpit-education/',

  organizationName: 'OpenJCockpit',
  projectName: 'openJCockpit-education',
  trailingSlash: false,

  // Dead links must fail the build.
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: true,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/OpenJCockpit/openJCockpit-education/tree/main/',
        },
        blog: {
          blogTitle: "What's new",
          blogDescription: 'Release notes and announcements for learners',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/OpenJCockpit/openJCockpit-education/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/OpenJCockpit_logo_horizontal.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OpenJCockpit Education',
      logo: {
        alt: 'OpenJCockpit logo',
        src: 'img/OpenJCockpit_logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'learningSidebar',
          position: 'left',
          label: 'Learn',
        },
        {to: '/blog', label: "What's new", position: 'left'},
        {
          href: 'https://github.com/OpenJCockpit/OpenJCockpit/tree/main/docs/readme',
          label: 'Product docs',
          position: 'right',
        },
        {
          href: 'https://github.com/OpenJCockpit/OpenJCockpit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {label: 'What is OpenJCockpit?', to: '/docs/intro'},
            {label: 'Quickstart', to: '/docs/getting-started/quickstart'},
          ],
        },
        {
          title: 'OpenJCockpit',
          items: [
            {
              label: 'Product documentation',
              href: 'https://github.com/OpenJCockpit/OpenJCockpit/tree/main/docs/readme',
            },
            {
              label: 'Docs site',
              href: 'https://openjcockpit.github.io/OpenJCockpit/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/OpenJCockpit/OpenJCockpit',
            },
          ],
        },
        {
          title: 'More',
          items: [{label: "What's new", to: '/blog'}],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenJCockpit contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'yaml', 'rego', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
