import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import ExternalProfilePage from "../../components/profile/ExternalProfilePage.jsx";

describe("render external profile page, the page other users can see", () => {
  it("should fetch profile details and dispaly them", async () => {
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
    let component;

    await act(async () => {
      component = renderer.create(
        <MemoryRouter initialEntries={["/profile/william@gmail.com"]}>
          <ExternalProfilePage
            getUser={() => {
              user;
            }}
          />
        </MemoryRouter>,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
