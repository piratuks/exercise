import '@emotion/jest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import z from 'zod/v3';
import { DynamicForm, type FieldDefinition } from '../components/form/form';

describe('DynamicForm', () => {
  const fields: FieldDefinition[] = [
    { name: 'name', label: 'Name', type: 'text', helperText: 'Enter your name' },
    { name: 'age', label: 'Age', type: 'number' },
    {
      name: 'color',
      label: 'Favorite Color',
      type: 'select',
      options: [
        { label: 'Red', value: 'red', highlight: true },
        { label: 'Blue', value: 'blue', highlight: false }
      ]
    }
  ];
  const mockSubmit = vitest.fn();
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.preprocess(v => Number(v), z.number().min(1, 'Age must be positive')),
    color: z.string().min(1, 'Color required')
  });

  it('renders all fields correctly', () => {
    render(
      <DynamicForm ref={React.createRef()} submitLabel="Submit" fields={fields} onSubmit={mockSubmit} schema={schema} />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /favorite color/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    render(
      <DynamicForm ref={React.createRef()} submitLabel="Submit" fields={fields} onSubmit={mockSubmit} schema={schema} />
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Age must be positive')).toBeInTheDocument();
      expect(screen.getByText('Color required')).toBeInTheDocument();
    });
  });

  it('submits correct data when valid', async () => {
    render(
      <DynamicForm ref={React.createRef()} submitLabel="Submit" fields={fields} onSubmit={mockSubmit} schema={schema} />
    );

    await userEvent.type(screen.getByRole('textbox', { name: 'Name' }), 'John Doe');
    await userEvent.type(screen.getByRole('spinbutton', { name: 'Age' }), '25');
    await userEvent.click(screen.getByRole('combobox', { name: /favorite color/i }));
    await userEvent.click(screen.getByText('Blue'));
    await fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const firstCallArg = mockSubmit.mock.calls[0][0];
      expect(firstCallArg).toEqual({
        name: 'John Doe',
        age: 25,
        color: 'blue'
      });
    });
  });

  it('applies highlight style to selected highlighted option', async () => {
    render(<DynamicForm ref={React.createRef()} submitLabel="Submit" fields={fields} onSubmit={mockSubmit} />);

    await userEvent.click(screen.getByRole('combobox', { name: /favorite color/i }));
    const redOption = await screen.findByText('Red');
    expect(redOption).toHaveTextContent('Red');
  });

  it('disables fields when "disabled" is true', () => {
    const disabledFields: FieldDefinition[] = [{ name: 'name', label: 'Name', type: 'text', disabled: true }];

    render(<DynamicForm ref={React.createRef()} submitLabel="Submit" fields={disabledFields} onSubmit={mockSubmit} />);

    const input = screen.getByLabelText('Name') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
