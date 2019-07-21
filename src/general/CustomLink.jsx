import React from "react";
import { Link } from "@reach/router";
import store from "../stores/store.js";
function CustomLink({ to, children, className = "", style={} }) {
  return (
    <Link
    style={style}
      className={className}
      onClick={() => console.log("clickedd link")}
      to={to}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
