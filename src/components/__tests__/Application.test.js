import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, getByText, getAllByTestId, queryByText, getByAltText, getByPlaceholderText, getByDisplayValue, prettyDOM } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);
describe('Application', () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"))
    
    fireEvent.click(getByText('Tuesday'));
    expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    /* get first appointment */
    const appointment = getAllByTestId(container, "appointment")[0];
  
    /* click add, enter student name, click interviewer, click save */
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
    /* does 'saving' appear */
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment")[1];
  
    fireEvent.click(getByAltText(appointment, /Delete/i));
    fireEvent.click(getByText(appointment, /Confirm/i));
  
    /* does 'deleting appear' appear */
    expect(getByText(appointment, /DELETING/i)).toBeInTheDocument();
  
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment")[1];
  
    fireEvent.click(getByAltText(appointment, /Edit/i));
    fireEvent.change(getByDisplayValue(appointment, /Archie Cohen/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
    /* does 'deleting appear' appear */
    expect(getByText(appointment, /SAVING/i)).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {

    const { container } = render(<Application />);
    axios.put.mockRejectedValueOnce();
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    /* get first appointment */
    const appointment = getAllByTestId(container, "appointment")[0];
  
    /* click add, enter student name, click interviewer, click save */
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    
    await waitForElement(() => getByText(appointment, /error while saving/i));

    expect(getByText(appointment, /error while saving/i));

    fireEvent.click(getByAltText(appointment, /Close/i));

    expect(getByAltText(appointment, 'Add')).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    const { container } = render(<Application />);
    axios.delete.mockRejectedValueOnce();
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    /* get first appointment */
    const appointment = getAllByTestId(container, "appointment")[1];
  
    /* click edit, click confirm */
    fireEvent.click(getByAltText(appointment, /Delete/i));
    fireEvent.click(getByText(appointment, /Confirm/i));

    await waitForElement(() => getByText(appointment, /deleting/i));
    
    await waitForElement(() => getByText(appointment, /Error while deleting/i));

    expect(getByText(appointment, /error while deleting/i));

    fireEvent.click(getByAltText(appointment, /Close/i));

    await waitForElement(() => getByText(appointment, "Archie Cohen"));
  });
});

