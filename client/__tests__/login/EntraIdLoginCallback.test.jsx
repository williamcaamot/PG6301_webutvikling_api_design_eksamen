import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../../components/App.jsx";
import EntraIdLoginCallback from "../../components/login/EntraIdLoginCallback.jsx";

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

    async function setUser() {}

    const component = renderer.create(
      <AppContext.Provider value={{ user, setUser }}>
        <MemoryRouter initialEntries={["/#awdpjdawiojdawoijdawiojdwaiudw"]}>
          <EntraIdLoginCallback />
        </MemoryRouter>
      </AppContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
