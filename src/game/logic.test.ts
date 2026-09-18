import { describe, expect, it } from 'vitest';
import {
    addCoinPoints,
    clamp,
    distanceBetween,
    hasReachedTarget,
    loseLife,
    normalizeDirection,
    randomIntBetween
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

    it('clamps values inside a range', () =>
    {
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(6, 0, 10)).toBe(6);
        expect(clamp(14, 0, 10)).toBe(10);
    });

    it('calculates distance between two points', () =>
    {
        expect(distanceBetween(0, 0, 3, 4)).toBe(5);
    });

    it('returns an integer inside the requested random range', () =>
    {
        for (let index = 0; index < 30; index += 1)
        {
            const value = randomIntBetween(3, 7);

            expect(Number.isInteger(value)).toBe(true);
            expect(value).toBeGreaterThanOrEqual(3);
            expect(value).toBeLessThanOrEqual(7);
        }
    });
});
