import React from "react";
function Home() {
  return (
    <>
      <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
          <div style={{ width: "100%" }}>
            <h2>Velkommen til denne chatte appen!</h2>
          </div>
          <p>Dette er eksamnsoppgave i Webutvikling & API Design! </p>
          <p>
            Her kan alle registrerte brukere chatte med hverandre i forskjellige
            chat rom.
          </p>
          <p>Du kan logge inn med Google eller Microsoft Entra ID.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
