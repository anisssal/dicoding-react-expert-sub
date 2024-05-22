import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/extend-expect';
import matchers from "@testing-library/jest-dom/matchers";
import VoteButton from './VoteButton';

expect.extend(matchers);
describe('VoteButton Component', () => {
    const mockOnVoteClick = vi.fn();
    afterEach(() => {
        cleanup();
    })
    it('renders upvote icon correctly', () => {
        render(<VoteButton iconType="upvote" isVoted={false} onVoteClick={mockOnVoteClick} totalVote={10} />);
        const icon = screen.getByRole('button').firstChild;
        expect(icon).toHaveClass('icon--bx--upvote');
    });

    it('renders downvote icon correctly', () => {
        render(<VoteButton iconType="downvote" isVoted={false} onVoteClick={mockOnVoteClick} totalVote={10} />);
        const icon = screen.getByRole('button').firstChild;
        expect(icon).toHaveClass('icon--bx--downvote');
    });

    it('renders upvoted icon when isVoted is true', () => {
        render(<VoteButton iconType="upvote" isVoted onVoteClick={mockOnVoteClick} totalVote={10} />);
        const icon = screen.getByRole('button').firstChild;
        expect(icon).toHaveClass('icon--bxs--upvote');
    });

    it('renders downvoted icon when isVoted is true', () => {
        render(<VoteButton iconType="downvote" isVoted onVoteClick={mockOnVoteClick} totalVote={10} />);
        const icon = screen.getByRole('button').firstChild;
        expect(icon).toHaveClass('icon--bxs--downvote');
    });

    it('calls onVoteClick when button is clicked', () => {
        render(<VoteButton iconType="upvote" isVoted={false} onVoteClick={mockOnVoteClick} totalVote={10} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockOnVoteClick).toHaveBeenCalledTimes(1);
    });

    it('displays the total vote count correctly', () => {
        render(<VoteButton iconType="upvote" isVoted={false} onVoteClick={mockOnVoteClick} totalVote={10} />);
        const voteCount = screen.getByText('10');
        expect(voteCount).toBeInTheDocument();
    });
});
