import React, { useState , useEffect} from "react";
import './../assets/styles/quote.css'; // Ensure path is correct
import background from './../assets/videos/background1.mp4'
import { useToast } from './../components/toastContext';

const quotes = [
  {
    text: "زاڵبوونی دڵ بەسەرعاتفییەت ، گەڕانەوەی ئەقڵە بۆ شوێنی خۆی.",
    author: "فریدریك تۆنی ماركۆ",
  },
  {
    text: "زاڵبوونی دڵ بەسەرعاتفییەت ، گەڕانەوەی ئەقڵە بۆ شوێنی خۆی.",
    author: "فریدریك تۆنی ماركۆ",
  },
  {
    text: "زاڵبوونی دڵ بەسەرعاتفییەت ، گەڕانەوەی ئەقڵە بۆ شوێنی خۆی.",
    author: "فریدریك تۆنی ماركۆ",
  },
  {
    text: "زاڵبوونی دڵ بەسەرعاتفییەت ، گەڕانەوەی ئەقڵە بۆ شوێنی خۆی.",
    author: "فریدریك تۆنی ماركۆ",
  },
  {
    text: "زاڵبوونی دڵ بەسەرعاتفییەت ، گەڕانەوەی ئەقڵە بۆ شوێنی خۆی.",
    author: "فریدریك تۆنی ماركۆ",
  },
];

function Quotes() {
  const { showToast } = useToast();

  const handleShowToast = (message) => {
    showToast(message);
  };
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute('content', '#161B22');
    }
  }, []);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(index)
        ? prevFavorites.filter((id) => id !== index)
        : [...prevFavorites, index]
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      handleShowToast("بەسەركەتووی كۆپی كرا." , "success")
    });
  };

  return (
    <div className="page quote">
      <div className="video-background">
        <video autoPlay loop muted playsInline >
          <source src={background} type="video/mp4" />
        </video>
      </div>
      <div className="quote-container">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <p className="quote-text">“{quote.text}”</p>
            <p className="quote-author">- {quote.author}</p>

            <div className="quote-actions">
              <div
                onClick={() => toggleFavorite(index)}
                className="icon-box"
              >
                {favorites.includes(index) ? (
                  <i className="bx bxs-heart"></i>
                ) : (
                  <i className="bx bx-heart"></i>
                )}
              </div>
              <div
                onClick={() => copyToClipboard(quote.text)}
                className="icon-box"
              >
                <i className="bx bx-copy"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quotes;
