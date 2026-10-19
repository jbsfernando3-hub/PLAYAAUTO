# 🚗 El Playa de Vehículos — Núñez

Catálogo web de vehículos para **Núñez / El Playa de Vehículos** de Villarrica, Paraguarí (Paraguay).

Sitio estático (HTML + CSS + JavaScript puro), **responsive** para PC y celular, listo para publicar en **GitHub Pages** sin ningún servidor ni base de datos.

---

## 📂 Estructura

```
el-playa-vehiculos/
├── index.html                 ← página principal (todo el contenido fijo)
├── data/
│   ├── vehiculos.js           ← ★ EDITÁ ACÁ: tu inventario y datos de contacto
│   └── creditos-fotos.js      ← atribución de las fotos de muestra (borrar al usar tus fotos)
├── assets/
│   ├── css/styles.css         ← estilos (colores, tipografía, responsive)
│   ├── js/main.js             ← filtros, buscador, modal, WhatsApp, favoritos
│   └── img/
│       ├── logo.svg
│       ├── hero.svg
│       ├── nosotros.svg
│       └── vehiculos/         ← ★ acá van las fotos reales de cada auto (jpg)
├── .gitignore
├── .nojekyll
├── package.json
└── README.md
```

---

## ✏️ Cómo agregar o modificar un vehículo

Todo el inventario vive en **`data/vehiculos.js`**. Copiá un bloque, cambiá los valores y listo.

```js
{
  id: "corolla-xei-2021",          // único, sin espacios ni tildes
  nombre: "Toyota Corolla",
  version: "1.8 XEI",
  anio: 2021,
  km: 42500,
  precio: 195000000,               // SOLO el número, sin puntos ni "Gs."
  condicion: "Seminuevo",          // Usado | Seminuevo | Nuevo
  destacado: true,                 // true = aparece en "Destacados"
  cuerpo: "Sedán",                 // Sedán | SUV | Camioneta | Hatchback | Furgón
  combustible: "Gasolina",         // Gasolina | Diésel | Híbrido
  transmision: "Automática",       // Automática | Manual
  puertas: 4,
  color: "Blanco perla",
  ubicacion: "Villarrica",
  financiamiento: true,           // muestra la etiqueta "Financiable"
  garantia: "6 meses de garantía de motor",
  tags: ["Toyota", "Sedán"],
  imagen: "assets/img/vehiculos/corolla-xei-2021.jpg",
  descripcion: "Texto de la descripción..."
}
```

### 📸 Poner las fotos reales

**Ya hay fotos reales de muestra** de los 10 modelos, descargadas de Wikimedia Commons con
licencias libres de uso comercial (optimizadas a 1200×825 px, ~2 MB en total).

Para reemplazarlas por las fotos de tus vehículos:

1. Guardá la foto en **`assets/img/vehiculos/`** con el nombre del `id`, por ejemplo `corolla-xei-2021.jpg`.
2. Cambiá el campo `imagen` a `assets/img/vehiculos/corolla-xei-2021.jpg` (con la extensión real: `.jpg`, `.png` o `.webp`).
3. **Recomendado:** fotos horizontales de al menos 1200 px de ancho, ratio 16:11 (la web recorta al centro).

> Si borrás una foto y queda la imagen rota, la web muestra automáticamente un ícono de
> vehículo con el nombre del modelo (no se ve el ícono de "imagen rota").

### 📄 Créditos de fotos (obligatorio por las licencias)

Las fotos de muestra son **CC BY / CC BY-SA**, que **exigen atribución**. Por eso el sitio tiene
una sección **"Créditos de las fotos"** al final de la página, generada desde
`data/creditos-fotos.js`.

**Cuando pongas tus propias fotos**, vaciá ese archivo para quitar la sección:

```js
window.CREDITOS = [];
```

El sitio detecta el array vacío y oculta la sección automáticamente.

---

## 📱 Editar los datos de contacto

En el mismo archivo `data/vehiculos.js`, bloque `negocio`:

```js
negocio: {
  nombre: "El Playa de Vehículos",
  propietario: "Núñez",
  telefono: "0983 748463",
  telefonoEnlace: "+595983748463",   // para los links de "llamar"
  whatsapp: "595983748463",           // solo el número, con 595 y sin el 0
  ciudad: "Villarrica",
  departamento: "Paraguarí",
  pais: "Paraguay",
  direccion: "Villarrica, Paraguarí, Paraguay",
  mapa: "https://www.google.com/maps?q=Villarrica,%20Paraguay&output=embed",
  horario: [ { dia: "Lunes a Viernes", hora: "08:00 a 18:00" } ],
  redes: []
}
```

> **Importante sobre WhatsApp:** el formato internacional de Paraguay es `595 983 748463` (sin el 0 inicial). Si cambiás el número, actualizá `whatsapp` **y** `telefonoEnlace`.

---

## 💻 Ver el sitio en tu computadora (antes de subirlo)

**Opción 1 — doble clic:** abrí `index.html` en el navegador. Funciona todo.

**Opción 2 — servidor local (recomendado):**

```bash
npm install
npm start
```

Después abrí <http://localhost:3000>.

---

## 🚀 Subir a GitHub y publicar con GitHub Pages

### 1. Crear el repositorio

En GitHub → **New repository** → nombre `el-playa-vehiculos` → **Public** (o Private, si tenés GitHub free y querés Pages público con plan Pro).

### 2. Subir el código

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Catalogo El Playa de Vehiculos"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/el-playa-vehiculos.git
git push -u origin main
```

### 3. Activar GitHub Pages

1. En el repositorio → **Settings** → **Pages**
2. En *Source* elegí **Deploy from a branch**
3. Branch: **main** / carpeta: **/ (root)**
4. **Save**

En 1–2 minutos la web queda publicada en:

```
https://TU_USUARIO.github.io/el-playa-vehiculos/
```

### 4. Actualizar el sitio después

Cada vez que edites `data/vehiculos.js` o las fotos:

```bash
git add .
git commit -m "Actualizo inventario"
git push
```

La página se actualiza sola en 1–2 minutos.

---

## 🎨 Personalizar colores

Todos los colores están al principio de `assets/css/styles.css`:

```css
:root{
  --rojo:#EB0A1E;        /* rojo principal de marca */
  --rojo-oscuro:#B00715;
  --negro:#111315;
  --gris-20:#E4E7EA;    /* bordes */
  --fondo:#FAFAFB;
}
```

Cambiá `--rojo` y toda la web toma el color nuevo.

---

## ✨ Funcionalidades incluidas

- Catálogo responsive (PC, tablet y celular) con menú hamburguesa
- Filtros por marca, tipo, transmisión, combustible, año y precio máximo
- Buscador por texto y orden por precio / año / kilometraje
- Ficha de detalle en modal con todos los datos y botón de WhatsApp
- Botón de WhatsApp con mensaje pre-cargado en cada vehículo
- Formulario de contacto que arma el mensaje y abre WhatsApp
- Favoritos guardados en el navegador (localStorage)
- Mapa de Google con la ubicación
- Secciones de servicios, nosotros y contacto
- Créditos de las fotos con autor y licencia (requisito de las licencias CC BY-SA)
- Carga rápida, sin dependencias externas (solo fuentes de Google)

---

## 📂 Reemplazar el mapa por tu ubicación exacta

En `data/vehiculos.js`, poné el link de Google Maps de tu local:

1. Abrí Google Maps → buscá tu dirección → botón **Compartir** → **Copiar enlace**
2. Pegá ese link en el campo `mapa` de laURL con `&output=embed` al final

Ejemplo:

```
https://www.google.com/maps/place/TU_LOCAL/@-25.30,-57.58,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!8m2!3d-25.30!4d-57.58!16s%2Fg%2F11abc?entry=ttu&output=embed
```

---

© El Playa de Vehículos — Núñez · Villarrica, Paraguay
