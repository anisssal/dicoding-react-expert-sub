import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { act } from 'react-dom/test-utils';
import NewThreadInput from "./NewThreadInput";

expect.extend(matchers);

describe('NewThreadInput Component ', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle title typing correctly', async () => {
    // Arrange
    render(<NewThreadInput onThreadSubmitted={() => {}} loading={false} />);

    const input = await screen.getByLabelText('Title');
    // Action
    await userEvent.type(input, 'Diskusi baru');
    // Assert
    expect(input).toHaveValue('Diskusi baru');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<NewThreadInput onThreadSubmitted={() => {}} loading={false} />);

    const input = await screen.getByLabelText('Category');
    // Action
    await userEvent.type(input, 'Redux');
    // Assert
    expect(input).toHaveValue('Redux');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<NewThreadInput onThreadSubmitted={() => {}} loading={false} />);

    const input = await screen.getByTestId('new-thread-body-input');

    // Action
    await userEvent.click(input);
    await userEvent.keyboard("Isinya");
    expect(input.textContent).toBe("Isinya");
    // Assert
  });


  it('should showing error msg when button post clicked without input value', async () => {
    // Arrange
    render(<NewThreadInput onThreadSubmitted={() => {}} loading={false} />);

    const btn = await screen.getByRole('button', { name: 'Post' });

    // Action
    act(() => {
      btn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const titleErrorText = await screen.getByText('Title is required!');
    const contentErrorText = await screen.getByText('Content is required!');

    // Assert
    expect(titleErrorText).toBeVisible()
    expect(contentErrorText).toBeVisible()

  });




  it('should call onThreadSubmitted function when post button is clicked', async () => {
    // Arrange
    const mockSubmit = vi.fn();
    render(<NewThreadInput onThreadSubmitted={mockSubmit} loading={false} />);

    const titleInput = await screen.getByLabelText('Title');
    await userEvent.type(titleInput, 'Diskusi baru');

    const categoryInput = await screen.getByLabelText('Category');
    await userEvent.type(categoryInput, 'Redux');


    const bodyInput = await screen.getByTestId('new-thread-body-input');
    await userEvent.type(bodyInput, 'Contentnya');
    const btn = await screen.getByRole('button', { name: 'Post' });

    // Action
    act(() => {
      btn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });


    // Assert
    expect(mockSubmit).toBeCalledWith({
      title: 'Diskusi baru',
      body : "Contentnya",
      category: 'Redux',
    });
  })


  it('should show loading on button when loading arg is true', async () => {
    const {container} = render(<NewThreadInput onThreadSubmitted={()=>{}} loading />);
    const loadingClassEl = container.querySelector(".MuiLoadingButton-loadingIndicator");
    expect(loadingClassEl).toBeVisible()
  })

});
