import { describe, expect, it } from 'vitest';
import {
    addCoinPoints,
    hasReachedTarget,
    loseLife,
    normalizeDirection
} from './logic';

describe('game rules', () =>
{
    it('adds coin points to the current score', () =>
    {
        expect(addCoinPoints(20, 10)).toBe(30);
    });

    it('never allows lives to become negative', () =>
    {
        expect(loseLife(3)).toBe(2);
        expect(loseLife(1)).toBe(0);
        expect(loseLife(0)).toBe(0);
    });

    it('detects when the target score has been reached', () =>
    {
        expect(hasReachedTarget(90, 100)).toBe(false);
        expect(hasReachedTarget(100, 100)).toBe(true);
        expect(hasReachedTarget(110, 100)).toBe(true);
    });

    it('normalizes diagonal movement', () =>
    {
        const direction = normalizeDirection(1, 1);

        expect(Math.hypot(direction.x, direction.y)).toBeCloseTo(1);
        expect(direction.x).toBeCloseTo(Math.SQRT1_2);
        expect(direction.y).toBeCloseTo(Math.SQRT1_2);
    });

    it('keeps an idle direction at zero', () =>
    {
        expect(normalizeDirection(0, 0)).toEqual({ x: 0, y: 0 });
    });
});
