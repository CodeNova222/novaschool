import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './../assets/styles/login.css'
import "boxicons/css/boxicons.min.css";
import axios from "axios";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [datas , setDatas] = useState({
        email : "",
        password : "",
        gender : "",
        grade : "",
    })

    const handleChange = (e) => {
        const {name , value}  = e.target;
        setDatas((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register", {
                datas
              });
                localStorage.setItem("user", response.data.token);
                console.log(response.data.token)

        } catch (err) {
            console.log(err)
        }
    }
    return (
      <div className="page login register">
        <div className="header">
            <h2>درووستكردنی هەژماری تازە</h2>
            <i onClick={() => navigate("/login")} className='bx bx-chevron-left' ></i>
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

            {/* Gender Selection */}
            <div className="field">
                <label>ڕەگەز</label>
                <select name="gender" value={datas.gender} onChange={handleChange}>
                    <option value="" disabled>ڕەگەز هەڵبژێرە</option>
                    <option value="male">نێر</option>
                    <option value="female">مێ</option>
                </select>
            </div>

            <div className="field">
                <label>پۆل</label>
                <select name="grade" value={datas.grade} onChange={handleChange}>
                    <option value="" disabled>پۆل هەڵبژێرە</option>
                    {[...Array(6)].map((_, i) => (
                        <option key={i} value={i + 7}>{i + 7}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="buttons">
            <button onClick={() => handleSubmit()}><span>درووستكردنی هەژمار</span></button>
        </div>
      </div>
    );
};

export default Register