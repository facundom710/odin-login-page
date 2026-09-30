# Sistema de Autenticación de Personal de Vardheim

![Vardheim Logo](./assets/img/vardheim_banner.png)

> Una interfaz de autenticación y panel de control tipo terminal cyberpunk / ciencia ficción construida con HTML5, CSS3 y JavaScript vanilla como parte del plan de estudios de **The Odin Project**.

*For the english version of this file, see the [README.md](README.md) file.*

---

## Índice de Contenidos

- [Sobre Este Proyecto](#sobre-este-proyecto)
- [Estructuras Utilizadas](#estructuras-utilizadas)
- [Recursos Utilizados](#recursos-utilizados)
- [Qué Aprendí Con Este Proyecto](#qué-aprendí-con-este-proyecto)

---

## Sobre Este Proyecto

El **Sistema de Autenticación de Personal de Vardheim** es una aplicación web frontend desarrollada para el proyecto *Sign-up Form* de **The Odin Project** (ruta de HTML y CSS Intermedio / JavaScript).

En lugar de construir un formulario genérico convencional, este proyecto está diseñado con una estética inmersiva de terminal de ciencia ficción inspirada en la estética del Federal Bureau Of Control en el videojuego [Control](https://en.wikipedia.org/wiki/Control_(video_game)) de Remedy Entertainment. El diseño es una representación de instalaciones de investigación restringidas y consolas de comando.

### Características Principales

- **Interfaz Multi-Formulario Dinámica**: Cambio fluido entre las vistas de **Iniciar Sesión** (*Log In*), **Registrarse** (*Sign Up*) y **Recuperar Contraseña** (*Password Recovery*) dentro de un único contenedor sin recargar la página.
- **Generación Declarativa de Campos**: Los campos del formulario, etiquetas e iconos SVG se generan programáticamente a partir de configuraciones de datos en JavaScript, manteniendo el marcado modular y *DRY* ([*Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).
- **Validación Personalizada en el Lado del Cliente**: Validación en tiempo real combinando la API nativa de **Constraint Validation de HTML5** del navegador con reglas personalizadas (p. ej., patrones regex, restricción de números en nombres, dominios obligatorios en correos electrónicos y coincidencia de confirmación de contraseña).
- **Simulación de Usuarios en Memoria**:
  - Genera IDs de empleado personalizados (formato: `123-456`) al registrarse exitosamente.
  - Aplica restricciones de unicidad para correos electrónicos y números de teléfono.
  - Autentica credenciales comparándolas con los usuarios registrados en memoria.
  - Simula la recuperación de contraseña localizando cuentas existentes mediante correo electrónico.
  - *Nota sobre datos en tiempo de ejecución*: Como los datos son generados y guardados en tiempo de ejecución (caché), estos se borran al alternar entre páginas o recargar.
- **Panel de Terminal del Sistema**: Al autenticarse exitosamente, navega a una terminal operativa (`dashboard.html`) que muestra los datos de autorización del empleado activo, telemetría de subsistemas en tiempo real y un mecanismo para cerrar sesión.

---

## Estructuras Utilizadas

La aplicación está estructurada en torno a una separación modular de responsabilidades entre archivos, marcado, presentación y lógica:

### 1. Organización de Archivos y Directorios

```text
odin-login-page/
├── assets/
│   ├── fonts/
│   │   └── SometypeMono-SemiBold.ttf    # Tipografía monoespaciada
│   └── img/
│       ├── background.png               # Textura visual de fondo
│       ├── vardheim_isotipe.svg         # Favicon / isotipo de marca
│       └── vardheim_logo.svg            # Logotipo de cabecera de la instalación
├── licences/
│   ├── BOOTSTRAP_ICONS.txt              # Licencia MIT para iconos SVG
│   └── OFL_SOMETYPE_MONO.txt            # Licencia SIL OFL para la fuente
├── scripts/
│   ├── forms_managment.js               # Renderizado de formularios, validación y gestión de eventos
│   └── users_managment.js               # Almacén de datos de usuario, registro y operaciones de autenticación
├── styles/
│   ├── dashboard_styles.css             # Diseño del panel de terminal y tarjetas
│   └── index_styles.css                 # Controles y estados de formularios de login / registro
├── dashboard.html                       # Interfaz protegida de la terminal
├── index.html                           # Portal principal de autenticación
├── README.md                            # Documentación del proyecto (en inglés)
├── README_ES.md                         # Documentación del proyecto (en español)
└── styles.css                           # Resets globales, variables CSS y tipografía
```

### 2. Arquitectura de JavaScript y Datos

- **Esquema Declarativo de Formularios**:
  - Los campos se definen como arrays de objetos de configuración (`signupFields`, `passwFields`, `loginFields`).
  - Cada definición de campo encapsula su `label`, `id`, `type`, icono SVG `icon` y reglas de restricción (`validation: { minlength, maxlength, pattern }`).
- **Flujo de Renderizado con Plantillas**:
  - Funciones auxiliares modulares (`createField`, `createRow`, `createRequirements`) convierten los objetos de configuración declarativos en plantillas literales de HTML semántico.
  - Un controlador de vistas (rastreador de estado `actualForm`) renderiza dinámicamente las vistas mediante `loadLogin()`, `loadSignup()` y `loadRecoverpass()`.
- **Delegación de Eventos**:
  - En lugar de vincular escuchadores individuales a inputs que se montan y desmontan dinámicamente, los escuchadores de eventos para `focusout`, `input` y `submit` se adjuntan al elemento estático `<form>`.
- **Motor de Validación**:
  - Intercepta el envío por defecto del formulario (`event.preventDefault()`).
  - Aprovecha `input.validity` (`valueMissing`, `typeMismatch`, `patternMismatch`, `tooShort`, `tooLong`) y lo combina con lógica de negocio personalizada (p. ej., coincidencia entre campos de contraseña, validación sin dígitos para nombres).
  - Alterna clases de estado CSS (`.invalid`) y actualiza las descripciones de error dinámicas con retroalimentación en vivo.
- **Gestión de Datos y Almacén en Memoria**:
  - `users_managment.js` mantiene una colección de usuarios en memoria (`users = []`).
  - Proporciona métodos modulares: `registerUser()`, `loginUser()`, `recoverPassword()` y `generateId()`.
  - Como los datos son generados y guardados en tiempo de ejecución (caché), estos se borran al alternar entre páginas o recargar.

### 3. Estructura Semántica y Accesibilidad en HTML5

- Elementos semánticos estructurales: `<main>`, `<section>`, `<header>`, `<form novalidate>`, `<fieldset>` y `<footer>`.
- Etiquetas asociadas mediante `<label for="...">` que coinciden con los IDs de los inputs.
- Indicadores accesibles para lectores de pantalla: `aria-live="polite"` en los elementos `.error-msg` para anuncios de error no intrusivos, y `aria-hidden="true"` en iconos SVG decorativos.

### 4. Arquitectura CSS y Sistema de Diseño

- **Reset de CSS Moderno**: Herencia de `box-sizing`, normalización de márgenes/rellenos y suavizado tipográfico.
- **Tokens de Diseño con Custom Properties de CSS**: Paleta centralizada en `:root` para superficies oscuras (`--dark`, `--dark2`, `--dark3`), colores tipográficos (`--main-txt`, `--second-txt`) e indicadores de acento operativo (`--green`, `--red`).
- **Selectores y Maquetación Moderna**:
  - Maquetación con Flexbox para filas dinámicas y alineación.
  - Pseudo-clases modernas como `:has(input:user-invalid)` para dar estilo a los bordes de los contenedores condicionalmente según el estado del input.
  - Carga de fuentes personalizadas mediante `@font-face`.

---

## Recursos Utilizados

- **Tipografía**:
  - [Sometype Mono](https://github.com/googlefonts/sometype-mono) por The Sometype Mono Project Authors (Bajo la [Licencia SIL Open Font 1.1](licences/OFL_SOMETYPE_MONO.txt)).
- **Iconos e Imágenes**:
  - [Bootstrap Icons](https://icons.getbootstrap.com/) por The Bootstrap Authors (Bajo la [Licencia MIT](licences/BOOTSTRAP_ICONS.txt)), integrados como vectores SVG en línea para mejorar el rendimiento y la flexibilidad de estilos.
  - Imágen de fondo generada con [ChatGPT (Modelo GPT-6 Luna)](https://chatgpt.com/) de [OpenAI](https://openai.com/).
- **Plan de Estudios y Guías**:
  - [The Odin Project](https://www.theodinproject.com/) - Enunciado y requerimientos del proyecto *Sign-up Form*. **Cabe aclarar que el presente proyecto no cumple exactamente las especificaciones de la consigna y va más allá de lo planteado en la currícula.**

- **Estándares y APIs Web**:
  - API de Constraint Validation de formularios en HTML5 (`ValidityState`).
  - API `FormData` de JavaScript y características de ES6+ (plantillas literales, funciones flecha, métodos de array como `.map()`, `.some()` y `.find()`).
---

## Qué Aprendí Con Este Proyecto

1. **Dominio de la Validación de Formularios en el Cliente**:
   - Comprensión profunda de cómo combinar atributos nativos de restricción de HTML5 (`required`, `pattern`, `minlength`, `maxlength`) con la API de `ValidityState` de JavaScript (`v.valueMissing`, `v.typeMismatch`, etc.).
   - Implementación de lógica de validación personalizada (como comprobar la coincidencia de contraseñas en tiempo real y rechazar valores numéricos en campos de nombre), suprimiendo los mensajes por defecto del navegador con `novalidate`.

2. **Delegación de Eventos en Elementos Dinámicos**:
   - Aprendizaje sobre por qué enlazar escuchadores de eventos directamente a elementos creados en tiempo de ejecución puede causar pérdidas de memoria o referencias perdidas, y cómo la delegación de eventos en contenedores padre (`form.addEventListener('focusout', ...)`) usando `event.target.matches(...)` lo resuelve de forma limpia.

3. **Construcción de Componentes Declarativos de UI con JavaScript Vanilla**:
   - Separación de los datos de configuración de la interfaz de la lógica de renderizado en el DOM, utilizando arrays de datos y funciones de mapeo puras para renderizar y alternar estados complejos de formularios sin dependencias externas.

4. **Simulación de Autenticación y Manejo de Estado en Memoria**:
   - Comprensión de los fundamentos de la gestión de usuarios en el lado del cliente: generación de IDs únicos, validación de credenciales existentes frente a colecciones en memoria, y el comportamiento y ciclo de vida de los datos generados en tiempo de ejecución al navegar entre páginas.

5. **Creación de Experiencias Web Temáticas y Accesibles**:
   - Aplicación de una estética visual consistente mediante variables CSS, tipografía personalizada e iconografía estilo terminal sin descuidar la accesibilidad (`aria-live`, etiquetas semánticas, vinculaciones explícitas de `<label>`).
