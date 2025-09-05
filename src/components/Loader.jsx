import React from "react";
import Css from "./Loader.module.css";
import { RiseLoader } from "react-spinners";

function Loader() {
  return (
    <div className={Css.loader}>
      <div><RiseLoader color="#529df1ff" /></div>
    </div>
  );
}

export default Loader;
