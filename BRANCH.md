# Rama `clase/seguro`

Esta rama sirve para comparar con `clase/vulnerable`.

## Qué NO hacemos aquí

- No cargamos puntuación ni vidas como datos autoritativos desde `localStorage`.
- No incluimos una contraseña de administrador en el frontend.
- No decidimos permisos importantes únicamente con JavaScript del navegador.

## Frontera de confianza

```text
Usuario
   ↓
Frontend / navegador
   ↓
API
   ↓
Backend valida reglas y permisos
   ↓
Base de datos
```

Este repositorio no implementa un backend completo.

Por eso la lección correcta no es:

> "Ahora el frontend es seguro".

La lección correcta es:

> "Las decisiones importantes no deben depender únicamente de un entorno que controla el usuario".

Para una aplicación real, autenticación, permisos, recompensas o un leaderboard competitivo deberían verificarse en servidor.
