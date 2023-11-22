import renderer, {act} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import ChatRoomListing from "../../components/chat/ChatRoomListing.jsx";
import {createContext} from "react";
import {ChatContext} from "../../components/chat/Chat.jsx";

describe("ChatRoomListing", () => {

    it("should render a chat room", () => {
        async function setChatroom(){
        }

        const user = {
            _id: "655dd38a4c15f00c20bc3fcf",
            bio: "dawawddawJeg er kul",
            email: "williamcoucheronaamot@gmail.com",
            family_name: "Coucheron-Aamot",
            name: "William",
            nickname: "WILLIAM123wwwww",
            picture: "https://lh3.googleusercontent.com/a/ACg8ocIOgSmXkWTJqoKPe5Hk3JlkkhfUNer4sWkVo3UuIa_dzg=s96-c",
        }

        const chatroom = {
            _id: "655e00a9f595fb7c60770caa",
            description: "dawadwadwadw",
            owner: "williamcoucheronaamot@gmail.com",
            title: "dawdwaadw"
        }

        const component2 = renderer.create(
            <ChatContext.Provider value={setChatroom}>
                <MemoryRouter>
                    <ChatRoomListing chatRoom={{chatroom}}/>
                </MemoryRouter>)
            </ChatContext.Provider>
        )
        expect(component2).toMatchSnapshot();
    })


})