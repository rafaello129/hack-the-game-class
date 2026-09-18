# Guía rápida del profesor

Este proyecto está basado directamente en el **template oficial Phaser + TypeScript + Vite**. La clase aprovecha una estructura real de videojuego:

```text
Boot
  ↓
Preloader
  ↓
MainMenu
  ↓
Game
  ↓
GameOver
```

La sesión está pensada para aproximadamente **2 horas**.

## Antes de la clase

```bash
git clone https://github.com/rafaello129/hack-the-game-class.git
cd hack-the-game-class
git switch clase/inicio
npm ci
npm test
npm run dev
```

## 0–10 min — Jugar primero

Abre el juego sin enseñar el código.

Pide al grupo identificar visualmente:

- jugador;
- monedas;
- enemigos;
- puntos;
- vidas;
- condición de victoria.

La primera pregunta no es "¿cómo está programado?", sino:

> ¿Qué cosas creen que tuvieron que programarse para que esto funcione?

## 10–25 min — Anatomía del proyecto

Muestra la estructura:

```text
src/
└── game/
    ├── main.ts
    ├── config.ts
    ├── logic.ts
    └── scenes/
        ├── Boot.ts
        ├── Preloader.ts
        ├── MainMenu.ts
        ├── Game.ts
        └── GameOver.ts
```

Explica superficialmente:

- **Boot**: carga lo mínimo para comenzar.
- **Preloader**: carga los recursos restantes.
- **MainMenu**: pantalla inicial.
- **Game**: reglas, entrada, movimiento y colisiones.
- **GameOver**: resultado de la partida.
- **config.ts**: valores fáciles de experimentar.
- **logic.ts**: reglas pequeñas separadas para poder probarlas.

## 25–55 min — Modificar el juego

Trabaja principalmente en:

```text
src/game/config.ts
```

Pruebas recomendadas:

1. Cambiar `PLAYER_SPEED`.
2. Cambiar `COIN_POINTS`.
3. Cambiar `STARTING_LIVES`.
4. Cambiar `TARGET_SCORE`.
5. Cambiar `ENEMY_COUNT`.
6. Cambiar los colores.

Después de cada cambio:

```text
PREDICCIÓN → CAMBIO → EJECUCIÓN → RESULTADO → EXPLICACIÓN
```

## 55–70 min — Cómo funciona un juego

Abre `src/game/scenes/Game.ts`.

No expliques cada línea.

Señala solamente:

- `create()`: preparación de la escena;
- `update()`: trabajo repetido mientras el juego corre;
- controles de teclado;
- actualización de posición;
- detección de monedas;
- detección de enemigos;
- cambio de escena al terminar.

## 70–95 min — Ciberseguridad

Cambia a:

```bash
git switch clase/vulnerable
npm ci
npm run dev
```

Usa DevTools:

- Console;
- Sources;
- Application → Local Storage.

Deja que el grupo investigue antes de enseñar la respuesta.

La práctica contiene errores intencionales y debe realizarse únicamente sobre este proyecto educativo.

## 95–110 min — Frontera de confianza

Cambia a:

```bash
git switch clase/seguro
```

Explica:

```text
Jugador
   ↓
Frontend / navegador
   ↓
API
   ↓
Backend valida
   ↓
Base de datos
```

Idea principal:

> El navegador pertenece al usuario. Un dato importante no debe considerarse verdadero únicamente porque el frontend lo envía.

## 110–120 min — Tests y cierre

```bash
npm test
npm run build
```

Los tests comprueban reglas pequeñas sin tener que jugar manualmente cada caso.

## Comandos útiles

```bash
git status
git restore .
git switch clase/inicio
npm ci
npm run dev
```

Para restaurar completamente la rama inicial:

```bash
git reset --hard origin/clase/inicio
```

Ese último comando elimina cambios locales.
