import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import SuccessMessage from "../../components/globals/SuccessMessage.jsx";

describe("error message", () => {
  it("show a success message!", () => {
    const message = "This is a success message!";

    const component = renderer.create(
      <MemoryRouter>
        <SuccessMessage message={message} />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });
});
