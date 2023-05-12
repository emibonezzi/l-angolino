import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as menu from './menu.json';

const imgPaths = Array(6).fill("").map((item, index) => `${index + 1}.jpeg`)
console.log(imgPaths)

function Nav() {
  return (
    <nav>
      <a href="#aboutus"><span>About Us</span></a>
      <a href="#menu"><span>Menu</span></a>
      <a href="#prenota"><span>Prenota</span></a>
    </nav>
  )
}

function Header({ index }) {
  const bgRef = useRef(null)
  const fadeInAnim = [{
    opacity: 0
  }, {
    opacity: 0.6
  }]
  const fadeInTiming = {
    duration: 150,
    iteration: 1,
    easing: "ease-in-out"
  }

  useEffect(() => {
    bgRef.current.animate(fadeInAnim, fadeInTiming)
  }, [index])

  return (
    <header>
      <div className="container">
        <div className="logo"><img src="forks.png"></img>
        </div>
        <div className="title"><span>L'ANGOLINO</span></div>
      </div>

      <div className="bg-overlay" >
        <img ref={bgRef} src={imgPaths[index]}></img>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer>

      <span> <i className="fa-solid fa-location-dot"></i>Viale Gramsci 7, Robbio (PV)</span>
      <span><i className="fa-solid fa-phone"></i> 348 334 0154</span>
    </footer>
  )
}

function Menu() {
  const [currentSection, setCurrentSection] = useState("Antipasti")

  function handleClick(e) {
    setCurrentSection(e.target.innerHTML)
  }

  return (
    <div id="menu" className="menu-container">
      <div className="heading">
        <span>Il nostro menu</span></div>
      <div className="courses">
        <a href="#current"><button onClick={handleClick}>Antipasti</button></a>
        <a href="#current"><button onClick={handleClick}>Primi</button></a>
        <a href="#current"><button onClick={handleClick}>American Lunch</button></a>
        <a href="#current"><button onClick={handleClick}>Secondi</button></a>
        <a href="#current"><button onClick={handleClick}>Contorni</button></a>
        <a href="#current"><button onClick={handleClick}>Insalate</button></a>
      </div>
      <div className='menu-page'>
      <div id="current" className="heading">
            <span>{currentSection}</span>
          </div>
        <div className="currentCourse">{menu[currentSection].map(function (item, index) {
          return (
            <div id="course" key={index} className="course">
              <div className='title-price'><h1>{item.name}</h1> <span className='course-desc'>{item.price}</span></div>
              <p>{item.description}</p>
            </div>
          )
        })}</div>
      </div>
    </div>
  )
}

function App() {
  const [index, setIndex] = useState(0)
  const hasNext = index < imgPaths.length - 1;
  const imgRef = useRef(null)

  const slideIn = [{
    transform: "translateX(300px)"
  }, {
    transform: "translateX(0px)"
  }]

  const slideInTiming = {
    duration: 1000,
  }

  function handleChange() {
    if (hasNext) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }


  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    };

    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
        } else {
          entry.target.classList.remove("show")
        }
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });
    };

    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelectorAll(".hidden");
    target.forEach((el) => observer.observe(el));
  }, [])


  //useEffect to create a setInterval to call setImage every 1000ms
  useEffect(() => {
    let intervalId = setInterval(() => {
      handleChange()
    }, 5000)
    return () => clearInterval(intervalId)
  }, [index]);

  return (
    <div className="App">
      <Nav />
      <Header index={index} />
      <main>
        <div className="text-container">
          <div id="aboutus" className="heading hidden">
            <span>La nostra filosofia</span>
          </div>
          <div className="paragraph">
            <span> Siamo un ristorante che crede nella <strong>qualità</strong> delle realtà locali e nella collaborazione tra le piccole imprese. Per questo motivo, la maggior parte dei nostri prodotti e delle materie prime proviene da attività locali. Ci impegniamo a garantire la massima qualità dei nostri piatti, utilizzando <strong>solo ingredienti freschi e di stagione.</strong> Il nostro obiettivo è offrire un'esperienza culinaria unica, che soddisfi i gusti e le esigenze di ogni cliente.</span> </div>
          <div ref={imgRef} className="img-element">
            <img className="hidden" src="burg-d.png"></img>
          </div>
        </div>
        <div className="text-container">
          <div className="heading hidden">
            <span>La nostra cucina</span>
          </div>
          <div className="paragraph">
            <span> Potrete gustare piatti della tradizione italiana rivisitati in chiave moderna, utilizzando solo ingredienti di alta qualità provenienti da attività locali. <a href="#menu"><button>Sfoglia il menù </button></a></span> </div>
          <div className="img-element">
            <img className='hidden' src="spaghetti.png"></img>
          </div>
        </div>
        <div className="text-container">
          <div className="heading hidden">
            <span>#Social</span>
          </div>
          <div className="paragraph">
            <div className="social-container">
              <a href="https://www.instagram.com/angolino___/" target="_blank">
                <i className="fa-brands fa-instagram social">
                </i></a><a target="_blank" href="https://www.instagram.com/angolino___/ ">@angolino___</a>
            </div>
            <span>Vieni a scoprire le ultime novità del nostro ristorante seguendoci sui social media! Su Instagram puoi rimanere sempre aggiornato sulle nostre iniziative ed eventi.</span> </div>
          <div className="img-element">
            <img className='hidden' src="steak.png"></img>
          </div>
        </div>
        <div className="gallery-container">
          <div className="gallery-name"><div className="heading hidden"><span>Galleria Gustosa</span></div></div>
          <div className="paragraph">Le immagini parlano più delle parole: scopri la nostra galleria fotografica e lasciati conquistare dai nostri piatti.</div>
          <div className="gallery">
            <div className="piatto">
              <img src="1.jpeg"></img>
            </div>
            <div className="piatto"><img src="2.jpeg"></img></div>
            <div className="piatto"><img src="3.jpeg"></img></div>
            <div className="piatto"><img src="4.jpeg"></img></div>
            <div className="piatto"><img src="5.jpeg"></img></div>
            <div className="piatto"><img src="6.jpeg"></img></div>
          </div>
        </div>

        <Menu />
        <div className="text-container">
          <div className="heading hidden">
            <span>Prenota!</span>
          </div>
          <div id="prenota" className="paragraph">
            <span> Pronti a scoprire la magia del nostro ristorante? 
              Prenotare è semplice e veloce:  </span> <div className="contact-buttons">
              <a href=""><i className="fa-brands fa-whatsapp"></i></a>
              <a href=""><i className="fa-solid fa-phone"></i></a>
              <a href=""><i className="fa-solid fa-inbox"></i></a>
            </div><span>Siamo pronti ad accogliervi con il nostro meglio e a farvi vivere un'esperienza culinaria unica!</span></div>
          <div ref={imgRef} className="img-element">
            <img className="hidden" src="burg-d.png"></img>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
