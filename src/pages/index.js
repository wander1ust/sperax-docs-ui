import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures'
import ReactTypingEffect from 'react-typing-effect';

/*** 

   🛑 Unfinished, faulty code in draft - do NOT use as is.
      Needs work. No bueno. Muy malo. 👎

   Resources:

   Open jsdoc/global.html in the browser (after running `npm run generate-docs` in the terminal) for an overview of the functions & variables available in this JS file. To learn how to configure, style and edit Docusaurus, please refer to the official documentation here: https://docusaurus.io/docs

   See `bugs.txt` in root dir for documentation on known bugs.

***/

/**
 *  Render CSS animated elements by type
 *  @param {String} theme - Content type ('light' or 'dark')
 *  @param {Object} themeAnimation - 
           Object containing the animation properties for light and dark themes
 *  @param {Number} count - Number of particle elements to generate
 *  @param {Number} extraDelay - Increase delay by extraDelay more seconds
 *  @param {Boolean} isSnowing - Increase delay by extraDelay more seconds
 *  @param {Boolean} curtain - Setting to true will position particles to the sides away from the center so that it does not interfere with the <HomePageHeader/> tagline text animation (like draping curtains)
 *  @param {Number} addToTop - Added to top position
 *                   
 *  @returns {Array} - Array of particle elements with CSS animation
 */
const renderParticles = (theme, themeAnimation, count, extraDelay, isSnowing, curtain, addToTop) => {    
    let snow = [];
    let arr = [...Array(count).keys()];
    const defaultDelay = themeAnimation[theme]['animationDelay'];
    const maxDelay = themeAnimation[theme]['maxDelay'];

    count && arr.map( (snowflake, i) => {
       let top = (Math.random() * (310 - -10) + (-10));
       // let top = (Math.random() * 310);
       let n = (Math.random() * 1300);
       let left = Math.floor(Math.random() * (390 - 0 + 1) + 0);  
       let right = Math.floor(Math.random() * (1200 - 650 + 1) + 650);  
       let delay = (Math.random() * maxDelay) + 's'; 

       // let delay = isSnowing(theme, themeAnimation) ? '60s' : (Math.random() * 5) + 's'; 

       const pos_random = {top:top + addToTop, left:n};
       const pos_left = {top:top + addToTop, left:left};
       const pos_right = {top:top + addToTop, left:right};

       // defaultDelay (animationDelay) must be #, not string
       isSnowing && defaultDelay && (delay = (defaultDelay + extraDelay) + 's');
       // defaultDelay && (delay = (1 + 12) + 's');
       

       if (curtain) {
         snow.push(createParticle(theme, themeAnimation, i, pos_left, delay))
         snow.push(createParticle(theme, themeAnimation, i + arr.length, pos_right, delay))
       } else {
         snow.push(createParticle(theme, themeAnimation, i, pos_random, delay))
       }
     })
     
    return snow;
}

/**
 *  Create CSS animated DOM element based on type
  *  @param {String} theme - Content type ('light' or 'dark')
 *  @param {Object} themeAnimation - 
           Object containing the animation properties for light and dark themes
 *  @param {Number} i - Particle element id
 *  @param {Object} pos - Position {left: x, right: y}
 *  @param {Number} delay - CSS animation delay (in seconds)
 *  @returns {Array} - Array of snowflake elements with CSS animation
 */
const createParticle = (theme, themeAnimation, i, pos, delay) => { 
  console.log(`theme: ${theme}`)
  const themeChoice = themeAnimation[theme];
  const type = themeChoice['type'];
  const speed = themeChoice['speed']; // duration

  return <div key={i} id={`${type}-${i}`} className={((type == 'snow') ? styles.snow : styles.star) + ' ' + themeChoice['animationClass'] + ' particle' + ' ' + type} style={{left:pos.left, top:pos.top, animationDelay: delay, webKitAnimationDelay: delay, mozAnimationDelay: delay, animationDuration: `${speed}s`, animationTimingFunction: 'cubic-bezier(1, 1, 1, 1)'}}>{themeChoice['particle']}</div>    
}

/**
 * HomepageHeader - main logic for banner header section of home page
 * @param {Object} props - properties for passing data
 */
function HomepageHeader(props) {
  const { siteConfig } = useDocusaurusContext();

  const { theme, themeAnimation, setTheme, setCurrentAnimation, currentAnimation, setIsSnowing, isSnowing } = props;
  const particleCount = themeAnimation[theme]['count'];
  const curtainStyle = currentAnimation['curtainStyle'];

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>

   {handleThemeChange(theme, themeAnimation, setCurrentAnimation, setTheme, setIsSnowing)}
      {/*{ renderParticles('snow', 200, '1s') }*/}
      { renderParticles(theme, themeAnimation, particleCount, 0, isSnowing, curtainStyle, 0) }

      {handleSnowing(theme, themeAnimation, currentAnimation, isSnowing, curtainStyle)}

      <div className="container">
        <h1 className={styles.title}>{siteConfig.title}</h1>

        <ReactTypingEffect 
                className={styles.typer}
                text={[
                  "Build on the blockchain.", 
                  "Learn. Develop. Scale.", 
                  "Finance + Decentralized Tech 🔥", 
                  "Made for crypto enthusiasts."
                ]}
                cursorRenderer={cursor => <h1>{cursor}</h1>}
                speed={150}
                typingDelay={100}
                eraseSpeed={50}
                displayTextRenderer={(text, i) => {
                    return (
                    <h3>
                    {text.split('').map((tagline, i) => {
                        return (
                          <span key={i} className={styles.tagline} >
                            {tagline}
                          </span>
                        )
                    })}
                    </h3>
                    )
                  }}
        />

        <div className={styles.buttons}>
          <Link
            className={clsx("button button--secondary button--lg", styles.button)}
            to="/docs/next/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>

  );
}

/**
 * Event listener for React toggle theme click
 * Updates theme & animation when user switches theme
 *  @param {String} theme - Content type ('light' or 'dark')
 *  @param {Object} themeAnimation - 
            Object containing the animation properties for light and dark themes
 * @param  {[Object]} setCurrentAnimation - set or update animation state
 * @param  {[Object]} setTheme - set or update theme state
 * @return {[Object]} setIsSnowing - set or update isSnowing state
 */
const handleThemeChange = (theme, themeAnimation, setCurrentAnimation, setTheme, setIsSnowing) => {
  var [count, setCount] = useState(0);
  var [res, setRes] = useState('dark');
  let toggleSwitch = {};
  let icon = {};
    useEffect(() => {
      icon = document.querySelector('.react-toggle-track-x span');
      toggleSwitch = document.querySelector('.react-toggle-track');
      toggleSwitch.addEventListener("click", () => {        
          count++;
          setCount(count);  

          res = icon.innerText;
          // fix this - only runs once
          // res = (icon.innerText == '☀') ? 'light' : 'dark';
          setRes(res);          
    })
    }, [])
  setTheme(count % 2 ? 'dark' : 'light');
  // setTheme(res)
  setCurrentAnimation(themeAnimation[theme]);
  setIsSnowing(isSnowing(theme, themeAnimation));
  // return res;
}

/**
 * Is theme light?
 * @param  {String} theme - Content type ('light' or 'dark')
 * @return  {boolean}
 */
const isThemeLight = (theme) => {
  return theme == 'light';
}

/**
 * Is snow falling as the animation?
 * @param  {String} theme - Content type ('light' or 'dark')
 * @param  {Object} themeAnimation - 
           Object containing the animation properties for light and dark themes
 * @return {boolean}
 */
const isSnowing = (theme, themeAnimation) => {
  return themeAnimation[theme]['animationClass'] == styles.snowfall;
}

/**
 * @param  {String} theme - Content type ('light' or 'dark')
 * @param  {Object} themeAnimation - 
            Object containing the animation properties for light and dark themes
 * @param  {Object} currentAnimation - animation object for the selected theme (i.e. themeAnimation[theme] )
 * @param  {Boolean} isSnowing - Is it snowing?
 * @param  {Boolean} curtainStyle - Setting to true will position particles to the sides away from the center so that it does not interfere with the <HomePageHeader/> tagline text animation (like draping curtains)
 * @return {[type]}
 */
function handleSnowing(theme, themeAnimation, currentAnimation, isSnowing, curtainStyle) {
  // useEffect(() => {
    const speed = currentAnimation.speed;
    // const speed = themeAnimation[theme].speed;
    // curtainStyle = themeAnimation[theme].curtainStyle;

    let arr = [...Array(speed - 2).keys()];
    // let arr = [1, 2, 3, 4, 5];
    let particles = [];

    // isSnowing && 
    arr.map( (durationSecond, i) => {
    // useEffect(() => {
    //   const timeout = setTimeout(() => {
        // alert(isSnowing);
        particles.push(renderParticles(theme, themeAnimation, 10, 0, isSnowing, curtainStyle, -350));
    //   }, 1000);
    //   return () => clearTimeout(timeout);
    // }, [])
      // return renderParticles(theme, themeAnimation, i+1, 0, isSnowing);
    })
    return particles;

     // document.querySelectorAll('.snow').forEach((p) => {
     //    p.style.color = 'pink';
     // })
  
  // }, [isSnowing])
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();  
  const [theme, setTheme] = useState('light'); // either 'light' or 'dark'
  const [isSnowing, setIsSnowing] = useState(true);

  /**
   * themeAnimation - Set the default animation properties that the user sees for light and dark themes (particle type, symbol, count, animation class, animation delay, speed, positioning)
   * @namespace {Object} themeAnimation
   * @property {themeAnimation} theme animation object
   * @property {setThemeAnimation} set theme animation object
   * @type {Object} Object containing light and dark themed animation objects
   * @returns {void}
   */
  const [themeAnimation, setThemeAnimation] = useState(
    {
      light: { type: 'snow', particle: '❆', animationClass: styles['snow-melt'] /*styles.snowfall*/, animationDelay: 1, count: 100, speed: 10, maxDelay: 15, curtainStyle: true }, 

      dark: { type: 'star', particle: '✶', animationClass: styles['twinkle-star'], animationDelay: null, count: 150, speed: 5, maxDelay: 15, curtainStyle: false} 
    });
  const [currentAnimation, setCurrentAnimation] = useState(themeAnimation[theme]);
  const [curtainStyle, setCurtainStyle] = useState(themeAnimation[theme]['curtainStyle']);
  // const currentAnimation = themeAnimation[theme];
  // const curtainStyle = themeAnimation[theme]['curtainStyle'];

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader theme={theme} themeAnimation={themeAnimation} setThemeAnimation={setThemeAnimation} isSnowing={isSnowing} setTheme={setTheme} setIsSnowing={setIsSnowing} currentAnimation={currentAnimation} setCurrentAnimation={setCurrentAnimation} curtainStyle={curtainStyle} />
      <main>
      
        <HomepageFeatures />
      
      </main>
    </Layout>
  );
}
