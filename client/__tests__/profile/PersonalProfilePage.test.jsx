import renderer, {act} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import PersonalProfilePage from "../../components/profile/PersonalProfilePage.jsx";
import {AppContext} from "../../components/App.jsx";

describe("render external profile page, the page other users can see", () => {

    it("should fetch profile details and dispaly them", async () => {

        const user = {
            _id: "655dd38a4c15f00c20bc3fcf",
            bio: "dawawddawJeg er kul",
            email: "williamcoucheronaamot@gmail.com",
            family_name: "Coucheron-Aamot",
            name: "William",
            nickname: "WILLIAM123wwwww",
            picture: "https://lh3.googleusercontent.com/a/ACg8ocIOgSmXkWTJqoKPe5Hk3JlkkhfUNer4sWkVo3UuIa_dzg=s96-c",
        }

        const chatRooms = [{
                _id: "655e00a9f595fb7c60770caa",
                description: "dawadwadwadw",
                messages: [],
                owner: "williamcoucheronaamot@gmail.com",
                title: "dawdwaadw"
            }, {
            _id: "655e02735da48dabbcbcb639",
                description: "daadwdwa",
                messages: [],
                owner: "williamcoucheronaamot@gmail.com",
                title: "dawdwaadw"
        }];

        async function setUser() {
        }
        let component;
        await act(async () => {
            component = renderer.create(
                <AppContext.Provider value={{user, setUser}}>
                    <MemoryRouter>
                        <PersonalProfilePage

                            handleLogout={() => {
                            }}

                            loadChatRooms={() => {
                                chatRooms
                            }}


                        />
                    </MemoryRouter>
                </AppContext.Provider>);
        });
        expect(component).toMatchSnapshot();
    })
})



