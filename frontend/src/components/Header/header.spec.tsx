import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './index.tsx';

describe("test header layout", () => {
  it("renders header", async () => {
    render(<Header />);
    expect(await screen.findByRole("banner")).toBeInTheDocument();
  })
});