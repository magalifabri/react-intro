import React, {useState} from 'react';
import '../styles/Footer.scss';


const Footer = () => {
    const [overlayActive, setOverlayActive] = useState(false);

    const toggleOverlay = (event) => {
        if (!event.target.classList.contains('overlay--active')
            && !event.target.classList.contains('footer__info-button')) {
            return;
        }

        const infoButton = document.querySelector('.footer__info-button');

        if (!overlayActive) {
            document.body.style.overflow = 'hidden';
            infoButton.classList.toggle('footer__info-button--active');
            infoButton.textContent = 'close';
        } else {
            document.body.style.overflow = 'scroll';
            infoButton.classList.toggle('footer__info-button--active');
            infoButton.textContent = 'site info';
        }

        setOverlayActive(!overlayActive);
    }

    return (
        <footer className="footer">
            <button className="footer__info-button button-style-2"
                    onClick={toggleOverlay}
            >
                site info
            </button>

            <div className={overlayActive ? 'overlay--active' : 'overlay'}
                 onClick={toggleOverlay}
            >

                <div className="overlay__window">
                    <p className="overlay__p">
                        This site was made as an exercise for the coding school
                        BeCode in Belgium.
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
        </footer>
    );
};

export default Footer;
