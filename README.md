# 🎮 Hack The Game

[![CI](https://github.com/rafaello129/hack-the-game-class/actions/workflows/build.yml/badge.svg)](https://github.com/rafaello129/hack-the-game-class/actions/workflows/build.yml)

Proyecto educativo para introducir **programación, desarrollo de videojuegos, Git/GitHub, tests y fundamentos de ciberseguridad**.

Esta versión parte directamente del repositorio oficial **Phaser + TypeScript + Vite Template** y conserva su arquitectura de escenas y sus assets base.

Template de origen:

https://github.com/phaserjs/template-vite-ts

## 🌐 Demo

https://rafaello129.github.io/hack-the-game-class/

## Flujo del juego

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

Esto permite enseñar cómo un proyecto de videojuego real se divide en responsabilidades pequeñas.

## 🚀 Ejecutar

```bash
git clone https://github.com/rafaello129/hack-the-game-class.git
cd hack-the-game-class
git switch clase/inicio
npm ci
npm run dev
```

## 🎯 Objetivo

- Muévete con **WASD** o flechas.
- Recoge monedas.
- Evita enemigos.
- Conserva tus vidas.
- Llega a la puntuación objetivo.

## 🧪 Archivo recomendado para comenzar

```text
src/game/config.ts
```

Ahí puedes cambiar:

- velocidad;
- vidas;
- puntos;
- puntuación objetivo;
- monedas;
- enemigos;
- colores.

## 🗂️ Estructura

```text
src/
├── main.ts
└── game/
    ├── main.ts
    ├── config.ts
    ├── config.test.ts
    ├── logic.ts
    ├── logic.test.ts
    └── scenes/
        ├── Boot.ts
        ├── Preloader.ts
        ├── MainMenu.ts
        ├── Game.ts
        └── GameOver.ts
```

## 🌱 Ramas de clase

### `clase/inicio`

Versión limpia para explorar y modificar el juego.

### `clase/vulnerable`

Versión con errores de seguridad **intencionales** para practicar únicamente dentro de este proyecto y con DevTools.

### `clase/seguro`

Versión que elimina esas decisiones inseguras y explica qué debería validarse desde un backend.

## ✅ Verificación

```bash
npm test
npm run build
```

O ambas:

```bash
npm run check
```

## 📚 Material

- [Guía del profesor](docs/GUIA_PROFESOR.md)
- [Retos para alumnos](docs/RETOS_ALUMNOS.md)
- [Tests](TESTING.md)

## 🧰 Stack

- Phaser 4
- TypeScript
- Vite
- Vitest
- GitHub Actions
- GitHub Pages

## Licencia y base

El proyecto conserva la licencia MIT del template original de Phaser. Las modificaciones educativas de este repositorio se construyen sobre esa base.
