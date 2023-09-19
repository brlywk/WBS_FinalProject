import PropTypes from "prop-types";
import { useReducer } from "react";

export const Components = ({ size, direction, stateProp, className, ellipsisClassName }) => {
  const [state, dispatch] = useReducer(reducer, {
    size: size || "small",
    direction: direction || "next",
    state: stateProp || "disabled",
  });

  return (
    <div
      className={`relative components ${state.size} ${state.state} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {["disabled", "normal"].includes(state.state) && (
        <div className={`absolute text-center whitespace-nowrap ellipsis ${ellipsisClassName} ${state.size === 'small' ? 'top[-5px] left[3px]' : 'top[-1px] left[7px]'} text-[#00000040] font-[Arial-Regular] text-sm leading-8 tracking-wider`}>•••</div>
      )}

      {state.state === "hover" && (
        <img
          className={`absolute double-right ${ellipsisClassName} ${state.size === 'small' ? 'top[6px] left[6px] h[3rem] w[3rem]' : 'top[10px] left[10px] h[4rem] w[4rem]'} `}
          alt="Double right"
          src={state.direction === "prev" ? "/img/doubleleft.png" : "/img/doubleright.png"}
        />
      )}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_leave":
      return {
        ...state,
        state: "normal",
      };

    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };
  }

  return state;
}

Components.propTypes = {
  size: PropTypes.oneOf(["medium", "small"]),
  direction: PropTypes.oneOf(["next", "prev"]),
  stateProp: PropTypes.oneOf(["normal", "hover", "disabled"]),
};

