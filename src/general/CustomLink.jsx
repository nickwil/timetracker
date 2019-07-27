import React from "react";
import { Link } from "@reach/router";
import { observer } from "mobx-react-lite";

const CustomLink = observer(function CustomLink({ to, children, className = null, style={} }) {
  return (
    <Link
    style={style}
      className={className}
      to={to}
    >
      {children}
    </Link>
  );
})
export default CustomLink;
