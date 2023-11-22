import renderer, {act} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import Header from "../../components/globals/Header.jsx";
import {AppContext} from "../../components/App.jsx";

describe("header component", () => {

    it("display the header with user information", () => {

        const user = {
            message: "daww",
            sender: "williamcoucheronaamot@gmail.com",
            nickname: "WILLIAM123",
            picture: "https://lh3.googleusercontent.com/a/ACg8ocIOgSmXkWTJqoKPe5Hk3JlkkhfUNer4sWkVo3UuIa_dzg=s96-c",
            time: "2023-11-22T13:28:21.025Z"
        }

        const component = renderer.create(
            <AppContext.Provider value={{user}}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </AppContext.Provider>);
        expect(component).toMatchSnapshot();
    })

    it("display the header without user information", () => {

        const user = null;


        const component = renderer.create(
            <AppContext.Provider value={{user}}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </AppContext.Provider>);
        expect(component).toMatchSnapshot();
    })


})