import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import ExternalProfilePage from "../../components/profile/ExternalProfilePage.jsx";
import EditProfilePage from "../../components/profile/EditProfilePage.jsx";
import { App, AppContext } from "../../components/App.jsx";

describe("edit user component", () => {
  it("should render the edit user component", async () => {
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

    let component;
    await act(async () => {
      component = renderer.create(
        <AppContext.Provider value={{ user, setUser }}>
          <MemoryRouter initialEntries={["/profile/william@gmail.com"]}>
            <EditProfilePage handleUpdateUser={() => {}} />
          </MemoryRouter>
        </AppContext.Provider>,
      );
    });
    expect(component).toMatchSnapshot();
  });

  it("should must be signed in to edit", async () => {
    const user = null;

    async function setUser() {}

    let component;
    await act(async () => {
      component = renderer.create(
        <AppContext.Provider value={{ user, setUser }}>
          <MemoryRouter initialEntries={["/profile/william@gmail.com"]}>
            <EditProfilePage handleUpdateUser={() => {}} />
          </MemoryRouter>
        </AppContext.Provider>,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
