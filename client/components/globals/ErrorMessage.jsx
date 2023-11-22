import React from "react";

function ErrorMessage(props) {
  if (props.message) {
    return (
      <>
        <div
          style={{ width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
        >
          <div className={"errorMessage"}>
            <p>{props.message}</p>
          </div>
        </div>
      </>
    );
  }
}

export default ErrorMessage;
