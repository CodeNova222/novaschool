import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_image from "./../assets/images/logo.webp";
import './../assets/styles/login.css'
import "boxicons/css/boxicons.min.css";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [datas , setDatas] = useState({
        username_email : "",
        password : ""
    })
    const handleChange = (e) => {
        const {name , value} = e.target;
        setDatas((prev) => ({...prev , [name]:value}))
    }
    return (
      <div className="page login">
        <div className="header">
            <img src={logo_image} alt=""/>
            <strong>Nova School</strong>
        </div>
        <div className="context">
            <h2>بەخێربێیت بۆ نۆڤا سكوڵ</h2>
            <p> شوێنی تێكست شوێنی تێكست شوێنی تێكست شوێنی تێكست شوێنی تێكست</p>
        </div>
        <div className="fields">
        <div className="field">
                <label>هەژماری ئەلیكترنی</label>
                <input
                    type="text"
                    name="email"
                    placeholder="هەژمار بنووسە"
                    value={datas.email}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label>وشەی نهێنی</label>
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="وشەی نهێنی بنووسە"
                        value={datas.password}
                        onChange={handleChange}
                    />
                    <i
                        className={`bx bx-${showPassword ? "hide" : "show-alt"}`}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>
            </div>
            <div className="forget-password">
                <button>وشەی نهێنیت بیرچووە ؟</button>
            </div>
        </div>
        <div className="buttons">
            <button><span>چوونەژوورەوە</span></button>
            <div className="line"></div>
            <button onClick={() => navigate("/register")}><span>درووستكردنی هەژماری تازە</span></button>
            <button>
                <span>Google</span>
            </button>
        </div>
      </div>
    );
};

export default Login