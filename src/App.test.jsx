import { act } from 'react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

describe('App', () => {
  it('shows the splash experience first and then the login screen', () => {
    render(<App />);
    expect(screen.getByText(/engineering study app/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('switches to the courses view when the courses tab is selected', () => {
    localStorage.setItem(
      'studyapp-user',
      JSON.stringify({ name: 'Aarav', email: 'aarav@example.com', course: 'B.Tech', streak: 7, target: 'GATE' }),
    );

    render(<App />);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    act(() => {
      screen.getByRole('button', { name: /courses/i }).click();
    });

    expect(screen.getByText(/engineering mathematics/i)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
