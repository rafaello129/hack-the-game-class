# Tests

Este proyecto utiliza **Vitest**.

```bash
npm test
```

Se prueban reglas que no necesitan canvas ni teclado:

- sumar puntos;
- restar vidas;
- impedir vidas negativas;
- detectar victoria;
- normalizar movimiento diagonal;
- validar la configuración inicial.

Las reglas están separadas en:

```text
src/game/logic.ts
```

La escena utiliza esas funciones desde:

```text
src/game/scenes/Game.ts
```

Esto permite explicar una idea importante:

> La interfaz y las reglas pueden estar relacionadas sin tener que estar mezcladas.

Para ejecutar tests y build:

```bash
npm run check
```
