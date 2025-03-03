import { useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import "./../assets/styles/showpages.css";
import { useNavigate } from "react-router-dom";
const Card = ({ title, image}) => (
  <div className="card">
    <div className="image-book">
      <img src={require('./../assets/images/kurdi.jpg')} alt="background"/>
    </div>
    <span>{title}</span>
  </div>
);


const Booksshow = () => {
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#7C4DFF');
  }, []);
  const cardItems = Array(10).fill("كوردی - پۆلی 12").map((title, i) => ({ title }));
  const navigate = useNavigate();

  return (
    <div className="page show-books">
      <div className="header">
        <div className="title">
            <span>بەشی كتێبەكان</span>
        </div>
        <div className="icons">
          <i className="bx bx-filter-alt"></i>
          <i onClick={() => navigate('/')} className="bx bxs-chevron-left"></i>
        </div>
      </div>

      <div className="container">
        <div className="cards">
          {cardItems.map((item, index) => <Card key={index} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default Booksshow;
