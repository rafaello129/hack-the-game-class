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
