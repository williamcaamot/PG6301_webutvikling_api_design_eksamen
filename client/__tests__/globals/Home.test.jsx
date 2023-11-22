import renderer, { act } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/globals/Header.jsx";
import { AppContext } from "../../components/App.jsx";
import Home from "../../components/home/Home.jsx";

describe("Home component", () => {
  it("Should display the home component", () => {
    const user = null;

    const component = renderer.create(
      <AppContext.Provider value={{ user }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AppContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
