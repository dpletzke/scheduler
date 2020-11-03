import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"))

  fireEvent.click(getByText('Tuesday'));
  expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { getByText, getByAltText } = render(<Application />);

  await waitForElement(() => getByText("Archie Cohen"));

  fireEvent.click(getByAltText('Add'));

  await waitForElement(() => getByPlaceholderText("Enter Student Name"));

  fireEvent.change(getByPlaceholderText("Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });

  await waitForElement(() => getByText("Archie Cohen"));

  expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
});
