const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Sperax Docs',
  tagline: 'Company tagline goes here',
  url: 'https://docs.sperax.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/sperax-light.ico',
  organizationName: 'Sperax', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Sperax Developer Docs',
        logo: {
          alt: 'Sperax Logo',
          // src: 'img/sperax-light.ico',
          srcDark: 'img/sperax-dark.jpeg',
          src: 'img/sperax-dark.jpeg',
        },
        items: [
          {to: '/docs/next/intro', label: 'Documentation', position: 'left'},
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
            type: 'docsVersionDropdown'
          },
          {type: 'localeDropdown', position: 'right'},
          // {to: '/blog', label: 'Blog', position: 'left'},          
          {
            href: 'https://github.com/Sperax',
            label: 'GitHub',
            position: 'right',
          },
        {
          alt: 'Sperax Logo',
          src: 'img/sperax-dark.jpeg',
          to: 'img/sperax-dark.jpeg',
          position: 'right',
        },          
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/sperax_io',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'About',
                to: 'https://sperax.io',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Sperax',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sperax`,
      },   
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {      
        defaultMode: 'light',      
        disableSwitch: false,      
        respectPrefersColorScheme: false,      
        switchConfig: {        
          darkIcon: '\u{1F319}',  //  🌙 
       
          darkIconStyle: {          
            marginLeft: '2px',        
          },        
          // Unicode icons such as '\u2600' will work        
          // Unicode with 5 chars require brackets: '\u{1F602}'        
          lightIcon: '\u2600',  //  ☀️   
          lightIconStyle: {          
            marginLeft: '1px',        
          },      
        },    
      },    
      announcementBar: {      
        id: 'update',      
        content: 'Sperax Play v1.1 is released with new features to ensure fairness. <a target="_blank" rel="noopener noreferrer" href="https://medium.com/sperax/sperax-play-v1-1-is-released-with-new-features-to-ensure-fairness-74fae08eb8bd">Download it now</a>!',      
        backgroundColor: 'plum',      
        textColor: '#091E42',      
        isCloseable: true,    
      },            
      }),
    i18n: {    
      defaultLocale: 'en',    
      locales: ['en', 'es', 'fr', 'zh'],  
    },
});
