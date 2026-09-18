# Rama `clase/seguro`

Esta rama sirve para comparar la versión vulnerable con una versión corregida **a nivel didáctico**.

## Qué cambia

- La puntuación y las vidas del juego no se cargan como datos "confiables" desde `localStorage`.
- No existe una contraseña o código de administrador incrustado en el frontend.
- El frontend no intenta decidir por sí solo si una persona es administradora.
- El juego distingue entre **estado visual/local** y **datos que serían autoritativos en un sistema real**.

## Límite importante

Este repositorio sigue siendo un juego completamente frontend.

Por eso, un leaderboard realmente confiable, autenticación, permisos de administrador o recompensas con valor real necesitarían un backend.

La arquitectura conceptual sería:

```text
Jugador
  ↓
Frontend
  ↓
API
  ↓
Backend valida reglas y permisos
  ↓
Base de datos
```

La idea clave es:

> El navegador puede ayudar a mostrar y capturar información, pero no debe ser la única autoridad para decisiones importantes.
