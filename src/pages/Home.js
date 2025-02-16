import { useState ,useEffect  } from "react";
import image_book from "./../assets/images/kurdi.jpg";
import "boxicons/css/boxicons.min.css";
import "./../assets/styles/home.css"
const Home = () => {
  const menuItems = ["كتێبەكان", "مەلزەمەكان", "ڤیدیۆكان", "ئەسیلەكان","پرسارەكان"];
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [startY, setStartY] = useState(false);

  // Handle touch start
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!startY) return;
    const endY = e.touches[0].clientY;
    const deltaY = endY - startY;

    if (deltaY > 30) {
      setIsExpanded(true); // Drag down → Expand
    } else if (deltaY < -30) {
      setIsExpanded(false); // Drag up → Collapse
    }
  };

  // Reset startY on touch end
  const handleTouchEnd = () => {
    setStartY(null);
  };
  const toggleQuote = () => {
    setIsExpanded((prev) => !prev);
  };
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute('content', '#7C4DFF');
    }
    const timeopen = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 5000);
    return () => {
      clearTimeout(timeopen);
      clearTimeout(timer);
    };

  }, []);
    return (
      <div className="page home">
        <div className="header" onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={toggleQuote}>
          <div className="top-header">
            <div className="profile">
              <strong>ئارێز بەشدار</strong>
              <div className="img-profile">
                <img src={image_book} alt=""/>
              </div>
            </div>
            <div className="icons">
              <i className='bx bx-filter-alt'></i>
              <i className='bx bx-search' ></i>
            </div>
          </div>
          <div className={`quote-header ${isExpanded ? "expanded" : ""}`}>
        <p>وتەی ئەمڕۆ :</p>
        <span>
          تاکە ڕێگە بۆ گەیشتن بە مەحاڵ ئەوەیە کە باوەڕت بەوە هەبێت کە مومکینە و بەردەوام بیت لە هەوڵدان.
        </span>
      </div>
          <div
        className="line-header"

      ></div>

        </div>
        <div className="container">
          <div className="card-title">خشتەی ئەمڕۆ :</div>
          <div className="schedule-today">
            <div className="schedule-container">
              <div className="today">
                <p>شەمە</p>
                <span>15</span>
              </div>
              <div className="subjects">
                <span>بیركاری</span>
                <span>بیركاری</span>
                <span>بیركاری</span>
                <span>بیركاری</span>
                <span>بیركاری</span>
                <span>بیركاری</span>
              </div>
            </div>
          </div>
          <div className="card-title">خشتەی ئەمڕۆ :</div>
          <div className="menus">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`menu-button ${activeItem === item ? "active" : ""}`}
              onClick={() => setActiveItem(item)}
            >
              {item}
            </button>
          ))}
          </div>
          <div className="select-subject">
            <span>ئەو وانەیە دیاری بكە كە دەتەوێت</span>
            <p>بینینی هەمووی</p>
          </div>
          <div className="cards-main books-main">
            <div className="card-title">خشتەی ئەمڕۆ :</div>
            <div className="books">
              <div className="book">
                <div className="image-book">
                  <img src={image_book} alt=""></img>
                </div>
                <span>وانەی كوردی</span>
              </div>
              <div className="book">
                <div className="image-book">
                  <img src={image_book} alt=""></img>
                </div>
                <span>وانەی كوردی</span>
              </div>
              <div className="book">
                <div className="image-book">
                  <img src={image_book} alt=""></img>
                </div>
                <span>وانەی كوردی</span>
              </div>
              <div className="book">
                <div className="image-book">
                  <img src={image_book} alt=""></img>
                </div>
                <span>وانەی كوردی</span>
              </div>
              <div className="book">
                <div className="image-book">
                  <img src={image_book} alt=""></img>
                </div>
                <span>وانەی كوردی</span>
              </div>
              <div className="book">
                <div className="image-book">
                  <img src={image_book} alt=""></img>
                </div>
                <span>وانەی كوردی</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  