import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

/*** 
   🛑 The code in this file has been minimally modified from the original.
/***

/* Docs Directories */
var rootDir = '/docs/next';
var mainDir = `${rootDir}/tutorial-basics`;
var otherDir = `${rootDir}/tutorial-extras`;

/**
 * [FeatureList - Featured snippets on the homepage]
 * @type {Array} - Array of Feature Objects
 */
const FeatureList = [
  {
    title: 'Quick Start',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      </>
    ),
    links: [
    {title: 'Intro - Getting Started' , url: `${rootDir}/intro`},
    {title: 'Create a Document' , url: `${mainDir}/create-a-document`},
    {title: 'Create a Page' , url: `${mainDir}/create-a-page`},
    ],
    urls: [`${rootDir}/intro`, `${mainDir}/create-a-page`],
  },
  {
    title: 'Developer Guides',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
    urls: [`${mainDir}/congratulations`],
    links: [
    {title: 'Manage Doc Versions' , url: `${otherDir}/manage-docs-versions`},
    {title: 'Translate your site' , url: `${otherDir}/translate-your-site`},
    {title: 'How to add DocSearch' , url: `${otherDir}/translate-your-site`},
    ],
  },
  {
    title: 'Code Examples',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      </>
    ),
    urls: [],
    links: [
      {title: 'Hello World' , url: 'https://github.com/Sperax'},
      {title: 'DeFi dapp' , url: 'https://github.com/Sperax'}
    ],
  },
];

/**
 * Feature component displaying a title, image & link(s) on homepage
 * @param {Object} - Object with properties - svg, title, array of urls
 * @returns {Object} - HTML <div> element
 */
function Feature({Svg, title, links}) {
  return (
    <div className={styles.feature + ' ' + clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
       {links.map((link, i) => (
          <Link className={styles.refLink} to={link.url}> {link.title}</Link>        
       ))} 
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
