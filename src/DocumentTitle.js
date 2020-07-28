import "./App.scss";

import React, { useEffect } from "react";

function DocumentTitle(props) {

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
    </>
  );
}

export default DocumentTitle;
