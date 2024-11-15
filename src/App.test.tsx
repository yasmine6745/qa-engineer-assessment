import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo App', () => {
    // Test case 1: Toggle Todo Item Checked State
    test('should toggle the checked state of a todo item', () => {
        render(<App />);
        
        // Find a todo item and toggle it
        const todoItem = screen.getByText(/Buy groceries/i);
        fireEvent.click(todoItem);
        
        // Verify it is checked
        expect(todoItem).toHaveClass('checked'); 
        
        // Toggle it back to unchecked
        fireEvent.click(todoItem);
        
        // Verify it is unchecked
        expect(todoItem).not.toHaveClass('checked');
    });

    // Test case 2: Persist State in Local Storage
    test('should save and load todos from local storage', () => {
        render(<App />);

        // Add a new todo item
        const input = screen.getByPlaceholderText(/Add a todo/i);
        fireEvent.change(input, { target: { value: 'Write tests' } });
        fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        // Verify it exists in the DOM
        expect(screen.getByText(/Write tests/i)).toBeInTheDocument();

        // Reload the component to simulate page refresh
        render(<App />);

        // Verify the todo is still present, showing persistence
        expect(screen.getByText(/Write tests/i)).toBeInTheDocument();
    });

    // Test case 3: Auto-sink Checked Items to Bottom
    test('should move checked items to the bottom of the list', () => {
        render(<App />);

        // Mark a todo item as checked
        const todoItem = screen.getByText(/Buy groceries/i);
        fireEvent.click(todoItem);

        // Verify it has moved to the bottom
        const todoItems = screen.getAllByTestId('todo-item'); // Assuming each todo item has a 'data-testid="todo-item"'
        expect(todoItems[todoItems.length - 1]).toHaveTextContent('Buy groceries');
    });
});
