# 🎮 Hack The Game

[![CI](https://github.com/rafaello129/hack-the-game-class/actions/workflows/build.yml/badge.svg)](https://github.com/rafaello129/hack-the-game-class/actions/workflows/build.yml)

Proyecto educativo para una clase introductoria de **programación, desarrollo de videojuegos, Git/GitHub y ciberseguridad**.

La dinámica es intencionalmente simple:

**jugar → explorar → modificar → romper → proteger → verificar**

## 🌐 Demo web

Cuando GitHub Pages está habilitado para este repositorio, la demo se publica en:

**https://rafaello129.github.io/hack-the-game-class/**

## 🚀 Ejecutar localmente

```bash
git clone https://github.com/rafaello129/hack-the-game-class.git
cd hack-the-game-class
npm ci
npm run dev
```

Vite mostrará la dirección local del proyecto.

## 🎯 Objetivo del juego

- Muévete con **WASD** o las **flechas**.
- Recoge monedas.
- Evita enemigos.
- Llega a la puntuación objetivo antes de perder todas tus vidas.

## 🌱 Ramas para la clase

### `clase/inicio`

Versión para comenzar. Se usa para:

- explorar la estructura;
- modificar constantes;
- relacionar código con comportamiento;
- conocer Git/GitHub.

### `clase/vulnerable`

Incluye **decisiones inseguras intencionales** para una práctica local con DevTools.

Se utiliza únicamente con fines educativos dentro de este proyecto.

### `clase/seguro`

Sirve para contrastar las decisiones vulnerables y explicar qué datos o permisos deberían validarse fuera del navegador.

> Esta rama no implementa un backend completo; enseña la frontera de confianza cliente/servidor.

## 🧭 Misiones de programación

1. Encuentra dónde se define la velocidad del jugador.
2. Haz que el jugador se mueva más rápido.
3. Cambia cuántos puntos entrega una moneda.
4. Cambia el número inicial de vidas.
5. Cambia la puntuación necesaria para ganar.
6. Modifica colores o cantidades de elementos.
7. Explica qué archivo controla cada parte del juego.

También hay misiones creadas como **Issues de GitHub**.

## 🗂️ Estructura

```text
hack-the-game-class/
├── .github/
│   └── workflows/
│       ├── build.yml
│       └── pages.yml
├── docs/
│   ├── GUIA_PROFESOR.md
│   └── RETOS_ALUMNOS.md
├── src/
│   ├── game/
│   │   ├── config.ts
│   │   ├── config.test.ts
│   │   ├── logic.ts
│   │   ├── logic.test.ts
│   │   └── scenes/
│   │       └── GameScene.ts
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── package-lock.json
├── TESTING.md
└── tsconfig.json
```

### Archivos clave

- **`src/game/config.ts`**: valores fáciles de modificar durante la clase.
- **`src/game/logic.ts`**: reglas pequeñas y comprobables del juego.
- **`src/game/scenes/GameScene.ts`**: entrada, renderizado, movimiento y comportamiento general.
- **`src/game/*.test.ts`**: tests automatizados.
- **`package.json`**: dependencias y comandos.
- **`docs/GUIA_PROFESOR.md`**: ruta rápida para impartir la sesión.
- **`docs/RETOS_ALUMNOS.md`**: retos sin dar directamente las respuestas.

## ✅ Tests y build

Ejecutar tests:

```bash
npm test
```

Comprobar tests + build:

```bash
npm run check
```

La integración continua valida automáticamente `main` y las ramas `clase/**`.

## 🧰 Tecnologías

- TypeScript
- Phaser 4
- Vite
- Vitest
- Git
- GitHub Actions
- GitHub Pages

## 📚 Material docente

- [Guía del profesor](docs/GUIA_PROFESOR.md)
- [Retos para alumnos](docs/RETOS_ALUMNOS.md)
- [Cómo funcionan los tests](TESTING.md)

No hace falta entender todo el código al comenzar. El proyecto está diseñado para aprender mediante pequeños experimentos visibles.
