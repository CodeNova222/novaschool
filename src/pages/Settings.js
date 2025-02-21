import { useState, useEffect } from "react";

import './../assets/styles/settings.css'
import profile_logo from "./../assets/images/profile.png"
const Settings = () => {
    const [toggles, setToggles] = useState([false, false]);
    useEffect(() => {
        const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute('content', '#0D1117');
    }
        const savedToggles = JSON.parse(localStorage.getItem("toggleStates"));
        if (savedToggles) {
          setToggles(savedToggles);
        }
      }, []);
      const handleToggle = (index) => {
        const newToggles = toggles.map((toggled, i) => (i === index ? !toggled : toggled));
        setToggles(newToggles);
        localStorage.setItem("toggleStates", JSON.stringify(newToggles));
      };
    
    return (
        <div className="page settings">
            <div className="header">
                <div className="profile-img">
                    <img src={profile_logo} alt=""/>
                </div>
                <div className="context">
                    <strong>Raven</strong>
                    <span>email@ssss</span>
                </div>
                <div className="buttons">
                    <button>دەسكاری كردن</button>
                </div>
            </div>
            <div className="container">
                    <div className="title-card">بەشی پەیوەندی</div>
                <div className="fields">
                    <div className="field">
                        <div className="text">
                            <i class='bx bx-support' ></i>
                            <span>پەیوەندی</span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="text">
                            <i class='bx bx-message-square-detail' ></i>
                            <span>پێشنیار كردن</span>
                        </div>
                    </div>
                </div>
                    <div className="title-card">بەشی ڕیكخستنەكان</div>
                    <div className="fields">
                    {[
                        { icon: "bxs-calendar", text: "پشاندانی خشتە" },
                        { icon: "bxs-quote-alt-left", text: "پشاندانی وتەی ڕۆژانە" },
                    ].map((item, index) => (
                        <div key={index} className="field icon">
                        <div className="text">
                            <i className={`bx ${item.icon}`}></i>
                            <span>{item.text}</span>
                        </div>
                        <div className="icon" onClick={() => handleToggle(index)}>
                            <i className={`bx ${toggles[index] ? "bxs-toggle-right" : "bxs-toggle-left"}`}></i>
                        </div>
                    </div>
                    ))}
                    </div>
                    <div className="title-card">دەرچوون</div>
                <div className="fields logout">
                    <div className="field">
                        <div className="text">
                            <i class='bx bx-log-out' ></i>
                            <span>دەرچوون</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings