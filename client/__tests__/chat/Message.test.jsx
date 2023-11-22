import renderer, {act} from "react-test-renderer";
import Message from "../../components/chat/Message.jsx";
import {MemoryRouter} from "react-router-dom";

describe("chat message", () => {

    it("show a message", () => {

        const message = {
            message: "daww",
            sender: "williamcoucheronaamot@gmail.com",
            nickname: "WILLIAM123",
            picture: "https://lh3.googleusercontent.com/a/ACg8ocIOgSmXkWTJqoKPe5Hk3JlkkhfUNer4sWkVo3UuIa_dzg=s96-c",
            time: "2023-11-22T13:28:21.025Z"
        }

        const component = renderer.create(
            <MemoryRouter>
                <Message message={message}/>
            </MemoryRouter>);
        expect(component).toMatchSnapshot();
    })


})