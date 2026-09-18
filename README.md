# 🎮 Hack The Game

Proyecto educativo para una clase introductoria de **programación, desarrollo de videojuegos, Git/GitHub y ciberseguridad**.

La idea no es construir un videojuego completo desde cero. Primero ejecutaremos un proyecto real, entenderemos su estructura, modificaremos su comportamiento y después veremos por qué el código y los datos del lado del cliente pueden ser manipulados.

## 🚀 Ejecutar el proyecto

```bash
git clone https://github.com/rafaello129/hack-the-game-class.git
cd hack-the-game-class
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente:

```text
http://localhost:5173
```

## 🎯 Objetivo del juego

- Muévete con **WASD** o las **flechas**.
- Recoge monedas.
- Evita los enemigos.
- Llega a la puntuación objetivo antes de perder todas tus vidas.

## 🧭 Misiones de programación

1. Encuentra dónde se define la velocidad del jugador.
2. Haz que el jugador se mueva más rápido.
3. Cambia cuántos puntos entrega una moneda.
4. Cambia el número inicial de vidas.
5. Cambia la puntuación necesaria para ganar.
6. Modifica el tamaño o color de algún elemento.
7. Explica qué archivo controla cada parte del juego.

## 🗂️ Estructura

```text
hack-the-game-class/
├── src/
│   ├── game/
│   │   ├── config.ts
│   │   └── scenes/
│   │       └── GameScene.ts
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
└── tsconfig.json
```

### Archivos importantes

- **src/main.ts**: inicia Phaser.
- **src/game/config.ts**: contiene valores fáciles de modificar durante la clase.
- **src/game/scenes/GameScene.ts**: contiene las reglas y comportamiento principal del juego.
- **src/style.css**: apariencia de la página que contiene el juego.
- **package.json**: dependencias y comandos del proyecto.

## 🌱 Etapas previstas

El repositorio se preparará para trabajar con distintas etapas de la clase:

- `clase/inicio`: juego base para explorar y modificar.
- `clase/vulnerable`: versión con vulnerabilidades didácticas intencionales.
- `clase/seguro`: versión usada para explicar cómo mejorar esas decisiones.

> Las vulnerabilidades que se incorporen al proyecto serán exclusivamente educativas y estarán diseñadas para ejecutarse en este entorno local.

## 🧰 Tecnologías

- TypeScript
- Phaser
- Vite
- Git
- GitHub

## 📚 Propósito

Este repositorio está pensado para aprender haciendo:

**usar → explorar → modificar → romper → proteger**

No hace falta entender todo el código al comenzar.
