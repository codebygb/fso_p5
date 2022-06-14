import React, { forwardRef, useImperativeHandle, useState } from "react";
// import PropTypes from "prop-types";
const Toggle = forwardRef((props, ref) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  useImperativeHandle(ref, () => {
    return {
      toggle,
    };
  });

  return (
    <div className="toggle">
      {isToggled ? props.children : <></>}
      <button className="toggleButton" onClick={toggle}>
        {isToggled ? "Hide" : props.buttonLabel}
      </button>
    </div>
  );
});
// Toggle.propTypes.buttonLabel = PropTypes.string;
Toggle.displayName = "Toggle";
export default Toggle;
