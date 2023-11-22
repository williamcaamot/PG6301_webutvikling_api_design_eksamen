import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/globals/Header.jsx";
import { AppContext } from "../../components/App.jsx";

describe("header component", () => {
  it("display the header with user information", () => {
    const user = {
      _id: "655dd38a4c15f00c20bc3fcf",
      bio: "dawawddawJeg er kul",
      email: "williamcoucheronaamot@gmail.com",
      family_name: "Coucheron-Aamot",
      name: "William",
      nickname: "WILLIAM123wwwww",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocIOgSmXkWTJqoKPe5Hk3JlkkhfUNer4sWkVo3UuIa_dzg=s96-c",
    };

    const component = renderer.create(
      <AppContext.Provider value={{ user }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AppContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("display the header without user information", () => {
    const user = null;

    const component = renderer.create(
      <AppContext.Provider value={{ user }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AppContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
