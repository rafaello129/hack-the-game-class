# Tests del proyecto

El proyecto utiliza **Vitest** para verificar reglas pequeñas sin necesitar abrir el juego.

Ejecuta:

```bash
npm test
```

Actualmente se comprueban:

- suma de puntos al recoger monedas;
- reducción de vidas sin valores negativos;
- condición de victoria;
- normalización del movimiento diagonal;
- estado sin movimiento;
- dimensiones y velocidad válidas;
- valores iniciales jugables.

Para ejecutar todas las verificaciones:

```bash
npm run check
```

Ese comando ejecuta tests y después genera el build de producción.

## ¿Por qué separar lógica de Phaser?

Las reglas están en:

```text
src/game/logic.ts
```

La escena utiliza esas funciones, pero los tests pueden verificarlas sin iniciar gráficos, teclado ni canvas. Esta separación hace el código más fácil de entender, probar y mantener.
