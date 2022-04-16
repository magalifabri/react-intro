import React, {useState} from 'react';
import '../styles/Footer.scss';


const Footer = () => {
    const [overlayActive, setOverlayActive] = useState(false);


    const toggleOverlay = (event) => {
        // don't close the overlay when clicking on the overlay window or it's children
        if (event.target.classList.contains('overlay__window')
            || event.target.classList.contains('overlay__p')
            || event.target.classList.contains('overlay__a')) {
            return;
        }

        if (!overlayActive) {
            // prevent scrolling of page 'beneath' overlay
            document.body.style.overflow = 'hidden';

            // without setTimeout the querySelector returns null
            setTimeout(() => {
                document.querySelector('.overlay').style.opacity = 1;
            }, 0)

            setOverlayActive(true);
        } else {
            document.querySelector('.overlay').style.opacity = 0;

            // give overlay time to fade out before removing it from the DOM
            setTimeout(() => {
                document.body.style.overflow = 'scroll';
                setOverlayActive(false);
            }, 100)
        }
    }


    return (
        <footer className="footer">
            {overlayActive ?
                <button
                    className="footer__info-button footer__info-button--active button-style-2"
                    onClick={toggleOverlay}
                >
                    close
                </button>
                :
                <button className="footer__info-button button-style-2"
                        onClick={toggleOverlay}
                >
                    site info
                </button>
            }

            {overlayActive &&
                <div className="overlay"
                     onClick={toggleOverlay}
                >

                    <div className="overlay__window">
                        <p className="overlay__p">
                            This site was made as an exercise for the coding
                            school BeCode in Belgium.
                        </p>

                        <p className="overlay__p">
                            View source code on <a className="overlay__a"
                                                   href="https://github.com/magalifabri/react-intro">
                            GitHub</a>.
                        </p>

                        <p className="overlay__p">
                            Made by Magali Fabri.
                        </p>
                    </div>
                </div>
            }
        </footer>
    );
};

export default Footer;
