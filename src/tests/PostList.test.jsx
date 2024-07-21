import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import PostList from '../components/PostList';  // Ensure this path is correct
import axiosMockAdapter from 'axios-mock-adapter';

const mock = new axiosMockAdapter(axios);

test('fetches and displays posts', async () => {
  const posts = [
    { id: 1, title: 'Test Post 1', body: 'Body of Test Post 1' },
    { id: 2, title: 'Test Post 2', body: 'Body of Test Post 2' },
  ];
  mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, posts);

  render(<PostList />);

  const postTitles = await screen.findAllByRole('heading', { level: 2 });

  expect(postTitles).toHaveLength(2); 
});

test('deletes a post', async () => {
  const posts = [
    { id: 1, title: 'Test Post 1', body: 'Body of Test Post 1' },
    { id: 2, title: 'Test Post 2', body: 'Body of Test Post 2' },
  ];
  mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, posts);
  mock.onDelete('https://jsonplaceholder.typicode.com/posts/1').reply(200);

  render(<PostList />);

  const deleteButtons = await screen.findAllByText('Delete');
  expect(deleteButtons).toHaveLength(2);

  fireEvent.click(deleteButtons[0]);

  await new Promise(resolve => setTimeout(resolve, 500));

  const postTitles = await screen.findAllByRole('heading', { level: 2 });

  expect(postTitles).toHaveLength(1);
});
