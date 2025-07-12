
## Una aplicación móvil desarrollada con React Native y Expo que consume la API pública de Pokémon (PokeAPI).

## Características Principales

### **Funcionalidades **
- **Lista de Pokémon**: Visualización paginada de todos los Pokémon disponibles
- **Búsqueda inteligente**: Por nombre o ID de Pokémon
- **Filtros por tipo**: Filtrado por elemento (Fuego, Agua, Planta, etc.)
- **Detalles completos**: Información detallada con estadísticas y datos básicos
- **Autenticación**: Sistema de login y registro de usuarios
- **Diseño responsivo**: Adaptado para diferentes tamaños de pantalla

### **Características Visuales**
- **Cards coloridas**: Cada Pokémon tiene el color de su tipo principal
- **Navegación intuitiva**: Tab navigation simplificada
- **Animaciones suaves**: Transiciones fluidas entre pantallas


## 🔧 Componentes Principales

### 📱 **Client (Frontend)**

#### **Navegación (`Navegacion.js`)**
```javascript
// Configuración principal de navegación
- Tab Navigator: Pokédex y Ajustes
- Stack Navigator: Pantallas de detalles
- Context API: Control de estado de autenticación
```

#### **Pantalla Principal (`ScreenHome.jsx`)**
```javascript
// Funcionalidades principales:
- fetchPokemons(): Carga Pokémon desde PokeAPI
- fetchTypes(): Obtiene tipos disponibles
- Filtrado por búsqueda y tipo
- Paginación infinita
- Estado: pokemons, filteredPokemons, loading, searchQuery, selectedType
```

#### **Card de Pokémon (`PokemonCard.jsx`)**
```javascript
// Características:
- Tamaño fijo responsivo (2-3 columnas según pantalla)
- Colores por tipo de Pokémon
- Borde colorido según tipo principal
- Fondo con transparencia del color del tipo
- Optimizado para rendimiento
```

#### **Barra de Búsqueda (`SearchBar.jsx`)**
```javascript
// Funcionalidades:
- Búsqueda en tiempo real
- Placeholder personalizable
- Estilo consistente con el tema
- Iconos coloridos
```

#### **Pantallas de Autenticación**
```javascript
// ScreenLogin.jsx:
- Formulario de login elegante
- Validación de campos
- Integración con API del servidor
- Diseño con cards y colores modernos

// ScreenCrearCuenta.jsx:
- Registro de nuevos usuarios
- Validación completa
- Navegación entre login/registro
```

#### **Pantalla de Ajustes (`ScreenSetting.jsx`)**
```javascript
// Características:
- Lista organizada por secciones
- Iconos descriptivos
- Botón de logout prominente
- Diseño con cards modernas
```

### 🖥️ **Server (Backend)**

#### **Configuración Principal (`app.js`)**
```javascript
// Configuración Express:
- CORS habilitado
- JSON parsing
- Rutas de API
- Middleware de seguridad
```

#### **Módulos de API**
```javascript
// users/controlador.js:
- Login de usuarios
- Registro de usuarios
- Validación de credenciales

// users/rutas.js:
- POST /api/usuario/login
- POST /api/usuario/agregar
```

## 🎨 Sistema de Colores

### **Paleta Principal**
```css
/* Colores principales */
Primary: #6366F1 (Índigo)
Background: #F8FAFC (Gris muy claro)
Text Primary: #1E293B (Gris oscuro)
Text Secondary: #64748B (Gris medio)
Border: #E2E8F0 (Gris claro)
```

### **Colores por Tipo de Pokémon**
```javascript
const typeColors = {
  fire: '#F08030',      // Naranja
  water: '#6890F0',     // Azul
  grass: '#78C850',     // Verde
  electric: '#F8D030',  // Amarillo
  ice: '#98D8D8',       // Azul claro
  fighting: '#C03028',  // Rojo
  poison: '#A040A0',    // Púrpura
  ground: '#E0C068',    // Marrón
  flying: '#A890F0',    // Púrpura claro
  psychic: '#F85888',   // Rosa
  bug: '#A8B820',       // Verde amarillento
  rock: '#B8A038',      // Marrón gris
  ghost: '#705898',     // Púrpura oscuro
  dragon: '#7038F8',    // Púrpura
  dark: '#705848',      // Gris oscuro
  steel: '#B8B8D0',     // Gris
  fairy: '#EE99AC',     // Rosa claro
  normal: '#A8A878'     // Gris claro
}
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
```bash
- Node.js (v14+)
- npm o yarn
- Expo CLI
- MySQL (para el servidor)
```

### **Configuración del Cliente**
```bash
cd client
npm install
npm start
```

### **Configuración del Servidor**
```bash
cd server
npm install
# Configurar variables de entorno
npm run dev
```

### **Variables de Entorno**
```env
# .env en server/
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
JWT_SECRET=tu_secreto_jwt

# .env en client/
EXPO_PUBLIC_API_URL=http://localhost:4000
```

## 📊 Flujo de Datos

### **Carga de Pokémon**
```javascript
1. ScreenHome monta → fetchPokemons()
2. Llamada a PokeAPI → /api/v2/pokemon
3. Para cada Pokémon → fetch detalles individuales
4. Actualizar estado → setPokemons()
5. Renderizar → PokemonCard components
```

### **Filtrado y Búsqueda**
```javascript
1. Usuario escribe → setSearchQuery()
2. Usuario selecciona tipo → setSelectedType()
3. useEffect detecta cambios → filtrar pokemons
4. Actualizar → setFilteredPokemons()
5. Re-renderizar lista
```

### **Autenticación**
```javascript
1. Usuario ingresa credenciales → handlogin()
2. POST a /api/usuario/login
3. Servidor valida → bcrypt.compare()
4. Respuesta exitosa → login() del context
5. Navegación automática → Mytabs
```

## 🔍 API Endpoints

### **PokeAPI (Externa)**
```javascript
GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
GET https://pokeapi.co/api/v2/pokemon/{id}
GET https://pokeapi.co/api/v2/type
```

### **Servidor Local**
```javascript
POST /api/usuario/login
POST /api/usuario/agregar
GET /api/health
```

## 🎯 Optimizaciones Implementadas

### **Rendimiento**
- **Lazy loading**: Carga progresiva de Pokémon
- **Paginación infinita**: Carga bajo demanda
- **Memoización**: Componentes optimizados
- **Imágenes optimizadas**: Tamaños apropiados

### **UX/UI**
- **Feedback visual**: Loading states
- **Responsive design**: Adaptable a diferentes pantallas
- **Accesibilidad**: Contraste y tamaños apropiados

### **Código**
- **Componentes reutilizables**: DRY principle
- **Estado centralizado**: Context API
- **Separación de responsabilidades**: Módulos organizados

## 🛠️ Tecnologías Utilizadas

### **Frontend**
```json
{
  "react-native": "0.79.4",
  "expo": "53.0.12",
  "react-navigation": "^7.3.3",
  "react-native-paper": "^5.14.5",
  "axios": "^1.6.0"
}
```

### **Backend**
```json
{
  "express": "^4.21.2",
  "mysql2": "^3.14.1",
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5"
}
```

## 📱 Características de la UI

### **Diseño Responsivo**
- **Mobile**: 2 columnas de cards
- **Tablet**: 3 columnas de cards
- **Adaptive spacing**: Márgenes dinámicos
- **Flexible layouts**: Flexbox optimizado

### **Interacciones**
- **Touch feedback**: Estados de presión
- **Smooth animations**: Transiciones fluidas
- **Gesture handling**: Navegación intuitiva
- **Loading states**: Indicadores de progreso

## Seguridad

### **Autenticación**
- **JWT tokens**: Autenticación segura
- **Password hashing**: bcrypt para contraseñas
- **Session management**: Context API
- **Input validation**: Validación en cliente y servidor

### **API Security**
- **CORS configurado**: Acceso controlado
- **Error handling**: Respuestas seguras
- **Input sanitization**: Prevención de inyecciones
- **Rate limiting**: Protección contra spam

## Despliegue

### **Desarrollo**
```bash
# Cliente
cd client && npm start

# Servidor
cd server && npm run dev
```

### **Producción**
```bash
# Cliente
cd client && expo build

# Servidor
cd server && npm start
```
