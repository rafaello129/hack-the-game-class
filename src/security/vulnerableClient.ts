import { STARTING_LIVES } from '../game/config';

// ============================================================
// VERSIÓN INTENCIONALMENTE VULNERABLE PARA LA CLASE
// NO copies estas decisiones a un proyecto real.
// ============================================================

// Error 1: una "contraseña" escrita en frontend no es secreta.
export const DEMO_ADMIN_CODE = 'dragon123';

// Error 2: tratamos datos controlados por el navegador como confiables.
const SCORE_KEY = 'hackGame.score';
const LIVES_KEY = 'hackGame.lives';
const ADMIN_KEY = 'hackGame.admin';

export type ClientProgress = {
    score: number;
    lives: number;
};

export function loadClientProgress (): ClientProgress
{
    const rawScore = window.localStorage.getItem(SCORE_KEY);
    const rawLives = window.localStorage.getItem(LIVES_KEY);

    const score = Number.parseInt(rawScore ?? '0', 10);
    const lives = Number.parseInt(rawLives ?? String(STARTING_LIVES), 10);

    return {
        score: Number.isFinite(score) ? score : 0,
        lives: Number.isFinite(lives) ? lives : STARTING_LIVES
    };
}

export function saveClientProgress (score: number, lives: number)
{
    window.localStorage.setItem(SCORE_KEY, String(score));
    window.localStorage.setItem(LIVES_KEY, String(lives));
}

// Error 3: el navegador decide si alguien es "admin".
export function isClientSideAdmin (): boolean
{
    const params = new URLSearchParams(window.location.search);

    return (
        params.get('admin') === DEMO_ADMIN_CODE ||
        window.localStorage.getItem(ADMIN_KEY) === 'true'
    );
}
