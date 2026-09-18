# Guía rápida del profesor

Esta guía acompaña una sesión de aproximadamente **2 horas**. El objetivo no es enseñar Phaser en profundidad, sino usar un proyecto pequeño para conectar programación, estructura de software, Git/GitHub y fundamentos de ciberseguridad.

## Antes de la clase

Comprueba:

```bash
git clone https://github.com/rafaello129/hack-the-game-class.git
cd hack-the-game-class
npm install
npm test
npm run dev
```

Para empezar la sesión:

```bash
git switch clase/inicio
```

## Secuencia sugerida

### 0–10 min — Jugar antes de programar
Deja que jueguen primero. Pregunta dónde creen que viven la puntuación, vidas, movimiento y colisiones.

### 10–30 min — Explorar el repositorio
Enseña `README.md`, `package.json`, `src/`, `config.ts`, commits e Issues.

### 30–55 min — Modificar
Trabaja principalmente en:

```text
src/game/config.ts
```

Prueba velocidad, puntos, vidas, objetivo, cantidad de enemigos y colores.

### 55–70 min — Qué compone un juego
Usa `GameScene.ts` para señalar entrada, estado, reglas, movimiento, colisiones y renderizado. No hace falta explicar cada línea.

### 70–95 min — Seguridad
Cambia a:

```bash
git switch clase/vulnerable
```

Abre DevTools y deja que investiguen primero. El proyecto contiene decisiones inseguras intencionales sobre datos del cliente y autorización.

Regla de la práctica: trabajar únicamente con este proyecto educativo y el entorno local.

### 95–110 min — Corregir el modelo mental
Cambia a:

```bash
git switch clase/seguro
```

Explica la frontera de confianza:

```text
Usuario
  ↓
Frontend (controlado por el usuario)
  ↓
API
  ↓
Backend (valida reglas/permisos)
  ↓
Base de datos
```

La rama segura no pretende implementar un backend completo; muestra qué decisiones no deberían depender solo del navegador.

### 110–120 min — Calidad
Ejecuta:

```bash
npm test
npm run build
```

Explica que un proyecto no termina cuando “funciona”: también debe poder verificarse.

## Comandos de emergencia

```bash
git status
git restore .
git switch clase/inicio
npm install
npm run dev
```

Si un alumno rompe su copia y quieres restaurar la rama:

```bash
git reset --hard origin/clase/inicio
```

> Este último comando elimina cambios locales de esa rama; úsalo solo cuando realmente quieran reiniciar el ejercicio.
