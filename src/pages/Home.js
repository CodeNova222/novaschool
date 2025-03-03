import { useEffect } from "react";
import profileImage from "./../assets/images/profile.png";
import "boxicons/css/boxicons.min.css";
import "./../assets/styles/home.css";
import { useNavigate } from "react-router-dom";
const Card = ({ title, image, backgroundColor, url }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(url)} className="card" style={{ backgroundColor }}>
      <div className="image-back">
        <img src={require("./../assets/images/bubbles.png")} alt="background" />
      </div>
      <div className="image-card">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">{title}</div>
    </div>
  );
};

const SuggestionCard = ({ title }) => <div className="sug-card"><span>{title}</span></div>;

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#7C4DFF');
  }, []);

  const colors = ["#1A4A7F", "#D9534F", "#2C3E50", "#5A8F5A"];
  const cardItems = ["كتێبەكان", "مەلزەمەكان", "ڤیدیۆكان", "ئەسیلەكان"].map((title, i) => ({
    title,
    image: require(`./../assets/images/${["books", "book", "blended-learning", "essay"][i]}.png`),
    backgroundColor: colors[i],
    url: ["/bookshow", "/requirements", "/videos", "/tools"][i] // Define URLs here
}));

  const suggestions = [
    "لیستی باشترین مامۆستاكان بۆ پۆلی 12",
    "ئەسیلەی وزاری بۆ پۆلی 12",
    "خۆ ئامادەكردن بۆ پۆلی 12",
    "چۆن یخوێنین ؟"
  ];

  return (
    <div className="page home">
      <div className="header">
        <div className="profile">
          <div className="img-profile"><img src={profileImage} alt="Profile" /></div>
        </div>
        <div className="icons">
          <i className="bx bx-filter-alt"></i>
          <i className="bx bx-search"></i>
        </div>
      </div>

      <div className="container">
        <div className="quote">"هەوڵ بدە، مەوەستە ، تا سەرکەوتن بەدەست بهێنیت. هەر چەندەها بەرز و نزم هەبێت، بەڵام بەردەوام بە."</div>
        <div className="cards">
          {cardItems.map((item, index) => <Card key={index} {...item} />)}
        </div>
        <div className="suggestionCards">
          {suggestions.map((title, index) => <SuggestionCard key={index} title={title} />)}
        </div>
        <div className="cards">
          {cardItems.map((item, index) => <Card key={index} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
