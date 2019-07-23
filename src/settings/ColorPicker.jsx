import React from "react";

function ColorPicker({ setColor, color }) {
  const [colorVal, update] = React.useState(color);

  const onChange = color => {
    update(color);
    setColor(color);
  };
  return (
    <label>
    Color:
    <input
      onChange={e => onChange(e.target.value)}
      type="color"
      value={colorVal}
    />
    </label>
  );
}

export default ColorPicker;
