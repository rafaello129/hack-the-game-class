import { describe, expect, it } from 'vitest';
import {
    COIN_COUNT,
    COIN_POINTS,
    ENEMY_COUNT,
    GAME_HEIGHT,
    GAME_WIDTH,
    PLAYER_SIZE,
    PLAYER_SPEED,
    STARTING_LIVES,
    TARGET_SCORE
} from './config';

describe('classroom game configuration', () =>
{
    it('uses positive dimensions and player values', () =>
    {
        expect(GAME_WIDTH).toBeGreaterThan(0);
        expect(GAME_HEIGHT).toBeGreaterThan(0);
        expect(PLAYER_SPEED).toBeGreaterThan(0);
        expect(PLAYER_SIZE).toBeGreaterThan(0);
    });

    it('starts with playable values', () =>
    {
        expect(STARTING_LIVES).toBeGreaterThan(0);
        expect(COIN_POINTS).toBeGreaterThan(0);
        expect(TARGET_SCORE).toBeGreaterThanOrEqual(COIN_POINTS);
        expect(COIN_COUNT).toBeGreaterThan(0);
        expect(ENEMY_COUNT).toBeGreaterThan(0);
    });
});
