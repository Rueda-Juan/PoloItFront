<div align="center">

# AlquiMaps – Frontend  
### Una aplicación moderna para la visualización y gestión de alquileres en un mapa interactivo

---

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm">

</div>

---

## Descripción General

**AlquiMaps** es la interfaz de usuario de una plataforma de alquileres que permite:

- Explorar propiedades en un mapa interactivo.  
- Visualizar detalles sin salir de la vista principal.  
- Permitir a los propietarios gestionar sus alquileres de forma intuitiva.  

Construida con un stack moderno, la aplicación prioriza una experiencia fluida, responsiva y basada en modales para una navegación sin interrupciones.

---

## Características Principales

### Mapa Interactivo  
Visualización de todos los alquileres como marcadores en un mapa (basado en **Leaflet**).

### Autenticación de Usuarios  
Sistema completo de registro e inicio de sesión con **JWT**, adaptando dinámicamente la interfaz según el estado del usuario.

### Gestión de Alquileres (CRUD)
- **Crear:** añadir nuevos alquileres directamente desde el mapa.  
- **Leer:** ver detalles sin recargar la página.  
- **Actualizar:** editar la información mediante formularios modales.  
- **Eliminar:** borrar alquileres propios.

### Perfiles de Usuario  
Cada usuario cuenta con una página de perfil editable.

### Interfaz Moderna y Reactiva  
- Diseño **responsive** construido con **Tailwind CSS**.  
- Navegación fluida mediante **modales** dinámicos.  
- Rutas protegidas para usuarios autenticados.

---

## Stack Tecnológico

| Tecnología | Uso Principal |
|-------------|----------------|
| **React** | Framework principal |
| **Vite** | Build tool y servidor de desarrollo |
| **Tailwind CSS** | Estilos y diseño responsive |
| **React Router DOM** | Manejo de rutas |
| **Leaflet + React Leaflet** | Mapas interactivos |
| **Headless UI** | Componentes modales accesibles |
| **React Icons** | Iconografía |
| **pnpm** | Gestor de paquetes |

---

## Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu entorno local:

### Prerrequisitos
- **Node.js** (v18 o superior)  
- **pnpm** (instalación global con `npm install -g pnpm`)  
- Servidor backend ejecutándose localmente

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>

# Navegar al directorio del frontend
cd PoloItFront/frontend

# Instalar dependencias
pnpm install
```

---

Configura las Variables de Entorno: Crea un archivo .env en la raíz de la carpeta frontend y añade la URL de tu API de backend.
por ejemplo:
```bash
# Apuntando al backend local
VITE_API_URL=http://localhost:3000/api/v1
```

---

Inicia el servidor de desarrollo:

```bash
# 
pnpm run dev
```
La aplicación estará disponible en http://localhost:5173.

📜 Scripts Disponibles
En el directorio del proyecto, puedes ejecutar los siguientes comandos:

<table> 
  <thead> 
    <tr> 
      <th>Comando</th> 
      <th>Descripción</th> 
    </tr> 
  </thead>
  <tbody> 
    <tr> 
      <td><code>pnpm run dev</code></td> 
      <td>Inicia la aplicación en modo desarrollo con Hot-Reload.</td> </tr> 
    <tr> 
      <td><code>pnpm run build</code></td> 
      <td>Compila la aplicación para producción en la carpeta <code>dist/</code>.</td> </tr> 
    <tr> 
      <td><code>pnpm run lint</code></td> 
      <td>Ejecuta ESLint para analizar el código en busca de errores.</td> </tr> 
    <tr> 
      <td><code>pnpm run preview</code></td> 
      <td>Levanta un servidor local para previsualizar el build de producción.</td> 
    </tr> 
  </tbody> 
</table>

---

📁 Estructura del Proyecto
El proyecto sigue una arquitectura modular para mantener el código organizado y escalable.
```bash
src
├── api/              # Funciones para interactuar con el backend
├── assets/           # Imágenes, CSS global, etc.
├── components/       # Componentes globales y reutilizables (Navbar, Modal, Loader)
├── context/          # Contexto global de React (AuthContext)
├── modules/          # Módulos de la aplicación (features)
│   ├── auth/         # Lógica de autenticación (formularios, hooks)
│   ├── rentals/      # Lógica de alquileres (mapa, tarjetas, formularios)
│   └── user/         # Lógica de perfiles de usuario
├── routes/           # Configuración de React Router (AppRouter, ProtectedRoute)
├── App.jsx           # Componente raíz y layout principal
└── main.jsx          # Punto de entrada de la aplicación
```
📄 Licencia
Este proyecto está bajo la Licencia MIT.

Desarrollado por:
<div align="center"><strong>Rueda Juan Bautista</strong> <br> <h1>AlquiMaps</h1></div>
