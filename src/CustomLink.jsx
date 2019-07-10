import React from "react";
import { Link } from "@reach/router";
import store from "./store.js";
function CustomLink({ to, children, className = "" }) {
  return (
    <Link
      className={className}
      onClick={() => console.log("clickedd link")}
      to={to}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
