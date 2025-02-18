import { useState, useEffect } from "react";
import "./Calculator.css";
import { evaluate } from "mathjs";
import { useNavigate } from "react-router-dom";
export default function Calculator() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeMode, setActiveMode] = useState("Math");
  const [backspaceTimeout, setBackspaceTimeout] = useState(null);
  const navigate = useNavigate();
  const modeTexts = {
    Math: "حاسیبەی بیركاری",
    Science: "حاسیبەی زانستی",
    Physics: "حاسیبەی فیزیایی",
  };
  
  const handleClick = (value, e) => {
    if (value === "icon") {
      e.stopPropagation();
      setShowModal(true);
      return;
    }

    if (value === "backspace" || (value === "AC" && input !== "0")) {
      if (input !== "0") {
        setInput(input.slice(0, -1) || "0"); // Remove last character
      }
      return;
    }

    switch (value) {
      case "AC":
        setInput("0");
        setResult("");
        break;
      case "=":
        try {
          setResult(evaluate(input.replace(/x/g, "*")));
        } catch {
          setResult("Error");
        }
        break;
      case "±":
        const lastNumberMatch = input.match(/(-?\d+(\.\d+)?)/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          setInput(input.replace(lastNumber, lastNumber.startsWith("-") ? lastNumber.slice(1) : `(-${lastNumber})`));
        }
        break;
      case "%":
        setInput(input + "%");
        break;
      case "x":
        if (!/[\+\-\*\/]$/.test(input)) setInput(input + "*");
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (!/[\+\-\*\/]$/.test(input)) setInput(input + value);
        break;
      default:
        setInput(input === "0" && value !== "." ? value : input + value);
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.modal-calculate') && !e.target.closest('.modal-content')) {
      setShowModal(false);
    }
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setShowModal(false);
  };

  // Handle long press for clearing input
  const handleBackspaceHold = () => {
    setBackspaceTimeout(setTimeout(() => {
      setInput("0");
    }, 500));
  };

  const stopBackspaceHold = () => {
    clearTimeout(backspaceTimeout);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`calculator-container ${activeMode}`}>
      <div className="header-container">
        <span>{modeTexts[activeMode]}</span>
        <i onClick={() => navigate("/")} className="bx bx-chevron-left"></i>
      </div>
      <div className="calculator-display">{input || "0"}</div>
      <div className="calculator-result">{result}</div>
      <div className="calculator-keypad">
        {["AC", "±", "%", "/", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "icon", "0", ".", "="].map((item) => (
          <button
            key={item}
            onClick={(e) => handleClick(item, e)}
            onMouseDown={item === "backspace" ? handleBackspaceHold : null}
            onMouseUp={stopBackspaceHold}
            onMouseLeave={stopBackspaceHold}
            className="calculator-key"
          >
            {item === "backspace" || (item === "AC" && input !== "0") ? <i className="bx bx-left-arrow-alt"></i> : 
             item === "icon" ? <i className="bx bxs-calculator"></i> : item}
          </button>
        ))}
      </div>

      <div className={`modal-calculate ${showModal ? "show" : ""}`} onClick={handleClickOutside}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ul>
            {[{ icon: "home", text: "حاسیبەی بیركاری", mode: "Math" },
              { icon: "user", text: "حاسیبەی زانستی", mode: "Science" },
              { icon: "settings", text: "حاسیبەی فیزیایی", mode: "Physics" }]
              .map(({ icon, text, mode }, idx) => (
                <li
                  key={idx}
                  onClick={() => handleModeChange(mode)}
                  className={activeMode === mode ? "active" : ""}
                >
                  <i className={`bx bx-${icon}`}></i>{text}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
