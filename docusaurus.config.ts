import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OpenJCockpit Docs',
  customFields: {
    // Same ref the sync script uses for generated GitHub links.
    productDocsRef: process.env.PRODUCT_DOCS_REF ?? 'main',
  },
  clientModules: [
    './src/clientModules/d3-transition.ts',
    './src/clientModules/video-scripts-flag.ts',
  ],
  tagline:
    'Learn, build and operate governed, spec-driven AI software development',
  favicon: 'img/OpenJCockpit_logo.png',

  future: {
    v4: true,
  },

  url: 'https://openjcockpit.github.io',
  baseUrl: '/OpenJCockpit-docs/',

  organizationName: 'OpenJCockpit',
  projectName: 'OpenJCockpit-docs',
  trailingSlash: false,

  // Dead links must fail the build.
  onBrokenLinks: 'throw',
  markdown: {
    // Synced product docs are plain CommonMark; only .mdx files are parsed as MDX.
    format: 'detect',
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
        docsRouteBasePath: ['/learn', '/reference'],
        docsDir: ['docs', 'reference'],
      },
    ],
  ],

  plugins: [
    // Second docs instance: product reference documentation (synced from the
    // OpenJCockpit repo in a later phase, see docs/EDUCATION_REBRAND_DOCUMENTATION_PLAN.md).
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reference',
        path: 'reference',
        routeBasePath: 'reference',
        sidebarPath: './sidebars-reference.ts',
      },
    ],
    // Education pages moved from /docs/* to /learn/*; keep old links working.
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath: string) {
          if (existingPath === '/learn' || existingPath.startsWith('/learn/')) {
            return [existingPath.replace(/^\/learn/, '/docs')];
          }
          return undefined;
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'learn',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/OpenJCockpit/OpenJCockpit-docs/tree/main/',
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
            'https://github.com/OpenJCockpit/OpenJCockpit-docs/tree/main/',
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

  // Runs before first paint so the sidebar entry does not flash. See src/clientModules/video-scripts-flag.ts.
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(){try{var k='ojc:showVideoScripts',q=new URLSearchParams(location.search).get('videoScripts');if(q==='on')localStorage.setItem(k,'true');if(q==='off')localStorage.removeItem(k);if(localStorage.getItem(k)==='true')document.documentElement.setAttribute('data-video-scripts','on')}catch(e){}})()`,
    },
  ],

  themeConfig: {
    image: 'img/OpenJCockpit_logo_horizontal.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'OpenJCockpit Docs',
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
        {
          type: 'docSidebar',
          docsPluginId: 'reference',
          sidebarId: 'referenceSidebar',
          position: 'left',
          label: 'Reference',
        },
        {to: '/blog', label: "What's new", position: 'left'},
        {
          href: 'https://github.com/OpenJCockpit/OpenJCockpit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Learn',
          items: [
            {label: 'What is OpenJCockpit?', to: '/learn/intro'},
            {label: 'Quickstart', to: '/learn/getting-started/quickstart'},
          ],
        },
        {
          title: 'Reference',
          items: [{label: 'Product documentation', to: '/reference'}],
        },
        {
          title: 'OpenJCockpit',
          items: [
            {
              label: 'Project overview',
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
