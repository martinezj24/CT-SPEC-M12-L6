import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreatePostForm from '../components/CreatePostForm';
import axiosMockAdapter from 'axios-mock-adapter';

const mock = new axiosMockAdapter(axios);

test('creates a new post', async () => {
  const onPostAdded = jest.fn();
  mock.onPost('https://jsonplaceholder.typicode.com/posts').reply(201);

  render(<CreatePostForm onPostAdded={onPostAdded} />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Test Post' } });
  fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Body of New Test Post' } });
  fireEvent.click(screen.getByText('Add Post'));

  await waitFor(() => {
    expect(onPostAdded).toHaveBeenCalled();
  });
});
