export type Direction = {
    x: number;
    y: number;
};

export function addCoinPoints(score: number, coinPoints: number): number
{
    return score + coinPoints;
}

export function loseLife(lives: number): number
{
    return Math.max(0, lives - 1);
}

export function hasReachedTarget(score: number, targetScore: number): boolean
{
    return score >= targetScore;
}

export function normalizeDirection(x: number, y: number): Direction
{
    if (x === 0 && y === 0)
    {
        return { x: 0, y: 0 };
    }

    const length = Math.hypot(x, y);

    return {
        x: x / length,
        y: y / length
    };
}

export function clamp(value: number, min: number, max: number): number
{
    return Math.min(max, Math.max(min, value));
}

export function distanceBetween(
    x1: number,
    y1: number,
    x2: number,
    y2: number
): number
{
    return Math.hypot(x2 - x1, y2 - y1);
}

export function randomIntBetween(min: number, max: number): number
{
    const low = Math.ceil(min);
    const high = Math.floor(max);

    return Math.floor(Math.random() * (high - low + 1)) + low;
}
