import { render, screen } from "@testing-library/react";
import BusInfo from "../BusInfo";

test("renders learn react link", () => {
  render(<BusInfo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
