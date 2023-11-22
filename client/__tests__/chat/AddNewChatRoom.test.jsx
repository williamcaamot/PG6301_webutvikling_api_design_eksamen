import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import AddNewChatroom from "../../components/chat/AddNewChatroom.jsx";

describe("Add new chat room", () => {
  it("Should render page for adding new chat rooms", () => {
    async function setChatroom() {}

    const component = renderer.create(
      <MemoryRouter>
        <AddNewChatroom />
      </MemoryRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
