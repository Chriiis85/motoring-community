# 🏎️ Motoring Community — F1 Hub

[🇪🇸 Ver en Español](#-español) | [🇬🇧 View in English](#-english)

**Live Demo:** [https://motoring-community-v1.vercel.app](https://motoring-community-v1.vercel.app)

---

## 🇪🇸 Español

¡Hola! 👋 Soy **Christian**, desarrollador frontend / fullstack con unos 3 años de experiencia dándole al código. 

Este proyecto nació por dos razones muy simples: **me apasiona la Fórmula 1** y quería construir una aplicación real, moderna y completa utilizando **Next.js 16 (App Router)** y **React 19**, cuidando tanto la experiencia de usuario como los detalles técnicos que hay detrás.

La idea era tener en un solo sitio todo lo que consulta un aficionado de las carreras: calendario con cuenta atrás, tabla de posiciones, un explorador histórico de más de 70 años de F1 y noticias actualizadas que no dependan de una API de pago que se caiga a las dos visitas.

### 🚀 ¿Qué hace la aplicación?

- **Cuenta atrás y calendario:** Te muestra los días, horas y minutos exactos para el próximo Gran Premio (adaptado a tu zona horaria) y todo el calendario de la temporada.
- **Clasificación del mundial:** Tabla de pilotos y constructores actualizada, con puntos, victorias, banderas de países y colores oficiales de cada escudería.
- **Datos históricos (1950 - 2026):** Un explorador conectado a la API de Jolpica/Ergast donde puedes consultar cualquier temporada histórica, resultados por Gran Premio y campeonatos pasados.
- **Noticias en tiempo real con sistema anti-caídas:** Si has usado APIs gratuitas de noticias como NewsAPI, sabrás que en producción te bloquean o se agotan en 100 peticiones. Por eso implementé un sistema multi-fuente que lee directamente feeds RSS de medios como *Motorsport.com* y *Crash.net*. Si una fuente falla, salta a la siguiente; las noticias nunca se quedan en blanco.
- **Bilingüe (Español / Inglés):** Soporte en dos idiomas guardado en cookies para que la app recuerde tu preferencia.
- **Modo Oscuro / Claro:** Conmutador fluido que respeta el tema del sistema y no da tirones al cargar.
- **Detector de conexión:** Si te quedas sin internet en el móvil, te avisa amablemente sin romper la pantalla.

### 🧠 Retos técnicos interesantes que resolví

1. **Evitar renders en cascada en React 19:**  
   Next.js 16 y React 19 son bastante estrictos con el uso de `useEffect` para sincronizar estados. Sustituí patrones antiguos de montaje por `useSyncExternalStore` (para chequear hidratación SSR y el estado de `navigator.onLine`), logrando un renderizado limpio sin advertencias de linter.
2. **Resiliencia en el consumo de datos:**  
   En lugar de depender ciegamente de un único endpoint, diseñé la API interna de noticias como un agregador tolerante a fallos. Si la API principal da error o supera la cuota gratuita en Vercel, entra en juego el parser RSS nativo y, como último salvavidas, datos cacheados. La UI jamás se queda en esqueleto infinito.
3. **TypeScript estricto y cero `any`:**  
   Todo el proyecto está tipado de extremo a extremo y pasa `eslint .` con 0 errores y 0 warnings.

### 🛠️ Tecnologías que utilicé

- **Next.js 16** (App Router, Turbopack, Route Handlers)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **next-themes** (Dark/Light mode)
- **APIs externas:** Jolpica / Ergast F1 API + RSS Feeds de Motorsport

### 💻 Cómo probarlo en local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Chriiis85/motoring-community.git
cd motoring-community

# 2. Instalar dependencias
npm install

# 3. Arrancar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador y listo.

---

## 🇬🇧 English

Hey there! 👋 I'm **Christian**, a frontend / fullstack developer with around 3 years of hands-on experience building web apps.

I built this project for two straightforward reasons: **I love Formula 1**, and I wanted to build a solid, full-featured web app using **Next.js 16 (App Router)** and **React 19**, paying close attention to both UI/UX and clean frontend architecture.

The goal was to create a single place with everything an F1 fan looks up on a race weekend: live countdowns, championship standings, 70+ years of historical data, and fresh news that don't break when deployed.

### 🚀 What does it do?

- **Race countdown & calendar:** Live countdown to the next Grand Prix session formatted to your local timezone, plus the full season schedule.
- **Driver & Constructor standings:** Real-time points, wins, country flags, and team colors for both championships.
- **Historic Data Explorer (1950 - 2026):** Searchable archive powered by the Jolpica/Ergast API where you can browse any past F1 season, race results, and driver stats.
- **Resilient F1 News Engine:** Free news APIs usually get rate-limited to 100 requests or outright blocked on cloud hosting like Vercel. To fix this, I engineered a multi-source fallback system that parses live RSS feeds from *Motorsport.com* and *Crash.net*. If one source fails, it falls back to the next—news never stay blank.
- **Bilingual (English / Spanish):** Built-in language switcher persisted with cookies.
- **Dark / Light theme:** Clean theme toggle synced with system preferences and safe from hydration flashes.
- **Offline detector:** Catches when your network drops and shows a friendly banner without crashing the view.

### 🧠 Technical challenges I solved

1. **Eliminating cascading renders in React 19:**  
   Next.js 16 and React 19 are very strict about `useEffect` calling `setState` during mount. I replaced old state-sync effects with `useSyncExternalStore` (for SSR hydration safety and `navigator.onLine` checks), keeping renders fast and the linter completely clean.
2. **API resilience & fallbacks:**  
   Instead of trusting a single third-party API that could fail in production, I created an internal aggregator route that gracefully falls back to direct RSS parsing and cached data when quotas are hit.
3. **Strict TypeScript & clean code:**  
   Everything is strictly typed without `any` shortcuts, passing `npm run lint` and `npm run build` with zero errors.

### 🛠️ Tech Stack

- **Next.js 16** (App Router, Turbopack, Route Handlers)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **next-themes** (Dark/Light mode)
- **Data sources:** Jolpica / Ergast F1 API + Motorsport RSS feeds

### 💻 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Chriiis85/motoring-community.git
cd motoring-community

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and you're good to go.

---

## 📬 Contact / Contacto

- **GitHub:** [@Chriiis85](https://github.com/Chriiis85)
- **LinkedIn:** [Christian Moreno Díaz](https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/)
