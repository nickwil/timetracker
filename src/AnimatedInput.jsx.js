import React from "react";
import { useSpring, animated } from "react-spring";

function AnimatedInput({ outsideChange, extras = {} }) {
  const [showAnimation, changeAnimation] = useState(false);
  const style = useSpring({
    width: showAnimation ? `25%` : `0%`,
    from: { width: `0%`, height: `0.25em`, backgroundColor: `blue` }
  });
  const [value, onChange] = useState("");
  const handleOnChange = text => {
    if (text != "") {
      changeAnimation(true);
    } else {
      changeAnimation(false);
    }
    onChange(text);

    outsideChange(text, extras);
  };
  const handleOnBlur = () => {
    changeAnimation(false);
  };
  const handleOnFocus = () => {
    if (value != "") {
      changeAnimation(true);
    }
  };
  return (
    <div>
      <input
        onFocus={() => handleOnFocus()}
        style={{ width: `25%`, border: `0` }}
        onBlur={() => handleOnBlur()}
        onChange={e => handleOnChange(e.target.value)}
        value={value}
      />
      <animated.div style={style}></animated.div>
    </div>
  );
}

export default AnimatedInput;
