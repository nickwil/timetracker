import React from "react";
import { Link } from "@reach/router";
import store from "../stores/store.js";
function CustomLink({ to, children, className = null, style={} }) {
  return (
    <Link
    style={style}
      className={className}
      to={to}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
