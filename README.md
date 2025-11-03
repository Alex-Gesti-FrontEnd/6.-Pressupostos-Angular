# 6.-Pressupostos-Angular

## 📄 Descripción - Enunciado del ejercicio

Este proyecto es una aplicación desarrollada en **Angular** que permite **crear, gestionar y compartir pressupostos (presupuestos)** de servicios digitales como SEO, ADS y desarrollo web.

El objetivo principal del ejercicio es aplicar los fundamentos intermedios de Angular: **comunicación entre componentes**, **formularios**, **servicios**, **routing con parámetros dinámicos**, **signals**, **filtros**, **ordenación**, y **testing**.

La aplicación permite al usuario configurar un presupuesto, añadir datos personales y guardarlo. Además, los presupuestos generados pueden visualizarse en una lista con opciones de búsqueda, ordenación y compartición mediante URL.

---

## ✨ Funcionalidades

- **Creación de pressupostos dinámicos 🧾**
  El usuario puede activar los servicios deseados (SEO, ADS, Web) e introducir el número de páginas y lenguajes, con un cálculo automático del precio total.

- **Gestión completa de presupuestos 💼**
  Los presupuestos se almacenan en una lista general donde se muestran todos los datos del cliente, servicios seleccionados y el total calculado.

- **Filtrado y búsqueda 🔍**
  Campo de búsqueda para encontrar presupuestos según el nombre del cliente.

- **Ordenación flexible ↕️**
  Tres opciones de ordenación:

  - Por **fecha** (más nuevos o antiguos)
  - Por **precio total**
  - Por **nombre del cliente**

  Además, se muestran **flechas indicadoras (▲ / ▼)** para visualizar el sentido de la ordenación actual.

- **Compartir presupuestos mediante URL 🔗**
  Cada presupuesto puede compartirse con una URL única que incluye sus datos en los parámetros.  
  Al abrir el enlace, el formulario se rellena automáticamente con la información correspondiente.

- **Validaciones del formulario ✅**

  - Nombre obligatorio.
  - Teléfono solo admite números (9–15 dígitos).
  - Email con formato correcto (`@` y dominio).

- **Arquitectura modular basada en componentes 🧩**

  - `Home` → Configura y genera presupuestos.
  - `Panel` → Controla el número de páginas y lenguajes.
  - `BudgetsList` → Lista, busca y ordena presupuestos.
  - `Modal` → Muestra ayudas contextuales.
  - `BudgetService` → Gestiona los datos, cálculos y ordenación usando **Signals**.

- **Testing unitario con Jasmine + Karma 🧪**
  Se incluyen pruebas para los componentes y servicios principales, verificando:
  - Creación de componentes.
  - Cálculo del total.
  - Filtrado y ordenación de presupuestos.
  - Gestión de datos mediante el servicio.

---

## 💻 Tecnologías Utilizadas

- [Angular](https://angular.dev)
- **TypeScript**
- **HTML5**
- **SCSS / Bootstrap 5**
- **Angular Forms & Signals**
- **Angular Router**
- **Jasmine + Karma** (para testing)

---

## 📋 Requisitos

Para ejecutar este proyecto se necesita:

- Node.js (v18 o superior)
- Angular CLI instalado globalmente
  ```bash
  npm install -g @angular/cli
  ```
- Un editor de código (recomendado: _Visual Studio Code_)
- Un navegador moderno (_Chrome, Edge, Firefox, OperaGX, etc_).

---

## 🛠️ Instalación

1.  Clona el repositorio o descarga los archivos ZIP:

```bash
  git clone https://github.com/Alex-Gesti-FrontEnd/6.-Pressupostos-Angular.git
```

2.  Abre la carpeta del proyecto en tu editor de código.

3.  Instala las dependencias:

```bash
npm install
```

---

## Ejecución

### 🖥️ Modo desarrollo

1. Inicia el servidor:

```bash
ng serve
```

2. Abre el navegador y entra en http://localhost:4200.

3. Desde la interfaz principal puedes:

- Activar servicios y ver el precio actualizado.
- Introducir tus datos y guardar un presupuesto.
- Buscar y ordenar presupuestos guardados.
- Compartir el enlace del presupuesto con otros usuarios.

---

### Testing

1. Ejecuta los tests con:

```bash
ng test
```

2. Se abrirá una ventana en Chrome mostrando los resultados de las pruebas unitarias (éxitos, fallos y logs detallados).

---

## © Derechos de autor

© 2025 [Alex Gesti](https://github.com/alexgesti) — Todos los derechos reservados.
