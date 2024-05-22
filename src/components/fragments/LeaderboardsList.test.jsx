import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LeaderboardsList from "./LeaderboardsList";

expect.extend(matchers);

describe('Leaderboard test Component ', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LeaderboardsList   leaderboards={[]}/>);

    await screen.getByText('Email');
  });


});
