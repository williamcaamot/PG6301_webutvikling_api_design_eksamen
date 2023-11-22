import React from "react";

function SuccessMessage(props) {
  if (props.message) {
    return (
      <>
        <div
          style={{ width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
        >
          <div className={"successMessage"}>
            <p>{props.message}</p>
          </div>
        </div>
      </>
    );
  }
}

export default SuccessMessage;
