import { useState, useEffect } from "react";
import 'animate.css'
import TrackVisibility from 'react-on-screen';
import { toRotate } from './queries'; // Adjust the import path based on your project structure
import CustomHero from "../general/custom_hero";

export default function RotatingHeader() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100);
  const period = 100;

  useEffect(() => {
    const tick = () => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
  
      if (isDeleting) {
        setText((prevText) => prevText.substring(0, prevText.length - 1));
      } else {
        setText((prevText) =>
          prevText === fullText
            ? prevText
            : fullText.substring(0, prevText.length + 1)
        );
      }
  
      if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prevLoopNum) => prevLoopNum + 1);
      } else if (!isDeleting && text === fullText) {
        setIsDeleting(true);
      }
      setDelta(100);
    };
  
    let ticker = setInterval(() => {
      tick();
    }, delta);
  
    return () => {
      clearInterval(ticker);
    };
  }, [loopNum, isDeleting, text, delta]);

  return (
    <section>
      <TrackVisibility>
      {({ isVisible }) => 
        <div className={isVisible ? "animated__animated animate__fadeIn" : ""}>
          <CustomHero
            title = {text}
            message = ''
            searchbar
          />
        </div>}
      </TrackVisibility>
    </section>
  )
}