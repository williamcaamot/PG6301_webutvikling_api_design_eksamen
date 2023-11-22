import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import ErrorMessage from "../../components/globals/ErrorMessage.jsx";

describe("error message", () => {
  it("show a error message", () => {
    const message = "This is an error!";

    const component = renderer.create(
      <MemoryRouter>
        <ErrorMessage message={message} />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });
});
