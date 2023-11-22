import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Profile from "../../components/profile/Profile.jsx";

describe("show user profile details", () => {
  it("render a user profile with information", () => {
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
      <MemoryRouter>
        <Profile user={user} />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });
});
