import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UpdatePostForm from '../components/UpdatePostForm';
import axiosMockAdapter from 'axios-mock-adapter';

const mock = new axiosMockAdapter(axios);

test('updates a post', async () => {
  const post = { id: 1, title: 'Old Title', body: 'Old Body' };
  const onPostUpdated = jest.fn(); // Mock function to track calls

  mock.onPut(`https://jsonplaceholder.typicode.com/posts/${post.id}`).reply(200); // Mock PUT request

  render(<UpdatePostForm post={post} onPostUpdated={onPostUpdated} />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Title' } });
  fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'New Body' } });
  fireEvent.click(screen.getByText('Update Post'));

  await screen.findByText('Update Post'); 

  // Check if the mock function was called
  expect(onPostUpdated).toHaveBeenCalled();
});
