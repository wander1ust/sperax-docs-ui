import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures'
import ReactTypingEffect from 'react-typing-effect';

/**
 *  Render CSS animated elements by type
 *  @param {String} type -  Content type ('star' or 'snow')
 *  @param {Number} count -  Number of particle elements to generate
 *  @param {Number} extraDelay -  Increase delay by extraDelay more seconds
 *  @returns {Array} - Array of particle elements with CSS animation
 */
const renderParticles = (theme, themeAnimation, currentTheme, count, extraDelay, isSnowing, curtain, addToTop) => {    
    let snow = [];
    let arr = [...Array(count).keys()];
    const defaultDelay = themeAnimation[theme]['animationDelay'];
    const maxDelay = themeAnimation[theme]['maxDelay'];

    count && arr.map( (snowflake, i) => {
       let top = (Math.random() * (310 - -10) + (-10));
       // let top = (Math.random() * 310);
       let n = (Math.random() * 1300);
       let left = Math.floor(Math.random() * (350 - 0 + 1) + 0);  
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
         snow.push(createParticle(theme, themeAnimation, currentTheme, i, pos_left, delay))
         snow.push(createParticle(theme, themeAnimation, currentTheme, i + arr.length, pos_right, delay))
       } else {
         snow.push(createParticle(theme, themeAnimation, currentTheme, i, pos_random, delay))
       }
     })
     
    return snow;
}

/**
 *  Create CSS animated DOM element based on type
 *  @param {String} type - Content type ('star' or 'snow')
 *  @param {Number} i - Index
 *  @param {Number} top - Position top
 *  @param {Number} left - Position left
 *  @param {Number} delay - CSS animation delay (in seconds)
 *  @returns {Array} - Array of snowflake elements with CSS animation
 */
const createParticle = (theme, themeAnimation, currentTheme, i, pos, delay) => { 
  console.log(`theme: ${theme}`)
  const themeChoice = themeAnimation[theme];
  // const themeChoice = currentTheme;
  const type = themeChoice['type'];
  const speed = themeChoice['speed']; // duration

  return <div key={i} id={`${type}-${i}`} className={((type == 'snow') ? styles.snow : styles.star) + ' ' + themeChoice['animationClass'] + ' particle' + ' ' + type} style={{left:pos.left, top:pos.top, animationDelay: delay, webKitAnimationDelay: delay, mozAnimationDelay: delay, animationDuration: `${speed}s`, animationTimingFunction: 'cubic-bezier(1, 1, 1, 1)'}}>{themeChoice['particle']}</div>    
}


function HomepageHeader(props) {
  const { siteConfig } = useDocusaurusContext();
  // let arr = [1, 2, 3, 4, 5];
  // let top = (Math.random() * 100);
  // let left = (Math.random() * 100);

  const { theme, themeAnimation, setTheme, setCurrentAnimation, currentAnimation, setIsSnowing, isSnowing, currentTheme, setCurrentTheme } = props;
  const particleCount = themeAnimation[theme]['count'];
  const curtainStyle = currentAnimation['curtainStyle'];

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>

   {handleThemeChange(theme, themeAnimation, setCurrentAnimation, setTheme, setIsSnowing, currentTheme, setCurrentTheme)}
      {/*{ renderParticles('snow', 200, '1s') }*/}
      { renderParticles(theme, themeAnimation, currentTheme, particleCount, 0, isSnowing, curtainStyle, 0) }

      {handleSnowing(theme, themeAnimation, currentAnimation, isSnowing, curtainStyle)}
      
 {/*     {
        props.isSnowing ?
        renderParticles(theme, themeAnimation, particleCount, 2, isSnowing) : renderParticles(theme, themeAnimation, 0, 0, isSnowing) 
        // moreSnow(props.theme, props.themeAnimation)
      }*/}

      <div className="container">
        <h1 className={styles.title}>{siteConfig.title}</h1>
        {/*<p className="hero__subtitle">{siteConfig.tagline}</p>*/}

        <ReactTypingEffect 
                className={styles.typer}
                text={[
                  "Build on the blockchain.", 
                  "Learn. Develop. Scale.", 
                  "Finance + Decentralized Tech ????", 
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

const handleThemeChange = (theme, themeAnimation, setCurrentAnimation, setTheme, setIsSnowing, currentTheme, setCurrentTheme) => {
  var [count, setCount] = useState(0);
  // var toggleClickCount = 0;
  let toggleSwitch = {};
    useEffect(() => {
      toggleSwitch = document.querySelector('.react-toggle-track');
      toggleSwitch.addEventListener("click", () => {        
          count++;
          setCount(count);  
                
          let icon = document.querySelector('.react-toggle-track-x span');
          const res = icon.innerText === '???' ? 'light' : 'dark';
          setCurrentTheme(res);  
          // setTheme('dark');        
    })
    }, [])
  setTheme(count % 2 ? 'dark' : 'light');
  // setTheme(currentTheme);
  // setCurrentAnimation(themeAnimation[theme]);
  setIsSnowing(isSnowing(theme, themeAnimation));
  return count;
}

/**
 * @param  {String} theme - Current stored theme mode ('light' or 'dark')
 * @return {boolean}
 */
const isThemeLight = (theme) => {
  return theme == 'light';
}

const isSnowing = (theme, themeAnimation) => {
  return themeAnimation[theme]['animationClass'] == styles.snowfall;
}

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

const moreSnow = (theme, themeAnimation) => {
  // useEffect(() => {
    renderParticles(theme, themeAnimation, 'star', 800, '10s');
    alert('snowing');
  // }, [isSnowing])  
}

const getCurrentTheme = () => {
  let res = 'dark';
  var [currentTheme, setCurrentTheme] = useState('dark');
  useEffect(() => {
    // let icon = document.querySelector('.toggle_node_modules-@docusaurus-theme-classic-lib-next-theme-Toggle-styles-module');
    let icon = document.querySelector('.react-toggle-track-x span');
    // let icon = document.querySelector('.heroBanner_src-pages-index-module');
    res = icon.innerText === '???' ? 'light' : 'dark';
    setCurrentTheme(res);
    // return res;
  }, [])
  return currentTheme;
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();  
  const [theme, setTheme] = useState('light');
  // const [toggleClickCount, setToggleClickCount] = useState(0);
  const [particle, setParticle] = useState('???');
  const [isSnowing, setIsSnowing] = useState(true);
  const [banner, setBanner] = useState('');
  const [themeAnimation, setThemeAnimation] = useState(
    {
      light: { type: 'snow', particle: '???', animationClass: styles.snowfall, animationDelay: 0, count: 100, speed: 10, maxDelay: 0, curtainStyle: false}, 
      // light: { type: 'snow', particle: '???', animationClass: styles['melt-snow'], animationDelay: 1, count: 200, speed: '10s', maxDelay: 15 }, 

      dark: { type: 'star', particle: '???', animationClass: styles['twinkle-star'], animationDelay: null, count: 100, speed: 5, maxDelay: 15, curtainStyle: false} 
    });
  const [currentAnimation, setCurrentAnimation] = useState(themeAnimation[theme]);
  const [curtainStyle, setCurtainStyle] = useState(themeAnimation[theme]['curtainStyle']);
  var [currentTheme, setCurrentTheme] = useState('dark');
  // const currentAnimation = themeAnimation[theme];
  // const curtainStyle = themeAnimation[theme]['curtainStyle'];

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader theme={theme} themeAnimation={themeAnimation} setThemeAnimation={setThemeAnimation} isSnowing={isSnowing} setTheme={setTheme} setIsSnowing={setIsSnowing} setParticle={setParticle} banner={banner} setBanner={setBanner} currentAnimation={currentAnimation} setCurrentAnimation={setCurrentAnimation} curtainStyle={curtainStyle} currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
      <main>
      
        <HomepageFeatures />
      }
      </main>
    </Layout>
  );
}
