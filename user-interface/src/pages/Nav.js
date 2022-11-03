import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
   
  return (
    
    <ul  className="flex-row">
    <li className="mx-1">
      <Link style={{color: 'white'}} to="/table">
        Anova_sf1 Table
      </Link>
    </li>
    <li className="mx-1">
      <Link style={{color: 'white'}} to="/filenameTable">
        Filename Table
      </Link>
    </li>
    <li className="mx-1">
      <Link style={{color: 'white'}} to="/sessionTable">
        Session Table
      </Link>
    </li>
    <li className="mx-1">
      <Link style={{color: 'white'}} to="/filename">
        Filename 
      </Link>
    </li>
    <li className="mx-1">
      <Link style={{color: 'white'}} to="/session">
        Session
      </Link>
    </li>
    <li className="mx-1">
      <Link style={{color: 'white'}} to="/anova_sf1">
        Anova_sf1 
      </Link>
    </li>
  </ul>
      );
   
};

export default Nav;