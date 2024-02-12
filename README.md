# Hono y supabase (Serveless)

Aplicación web construida con Hono JS y utiliza Supabase como sistema de gestión de base de datos.

## Funcionalidades

- Registro de usuarios
- Inicio de sesión
- Post CRUD (Crear, Leer, Actualizar, Eliminar)
  - Estas operaciones requieren autenticación mediante token

## Tecnologías Utilizadas

- `Hono`
- `Supabase`
- `Hono/JWT` (JSON Web Tokens) para la autenticación y protección de rutas

## Empezando

### Prerrequisitos

- **[`🏆 NodeJS`](https://nodejs.org)**
- **[`✅ Supabase`](https://supabase.com/)**: Crear una cuenta
- **[`📜 pnpm`](https://pnpm.io/es/)**: Opcional

### Instalación

Clona el repositorio

```sh
git clone https://github.com/charlsdev/api-rest-serveless
```

Instale las dependencias y devDependencies e inicie el servidor.

```sh
cd api-rest-serveless

### npm
npm i

### pnpm
pnpm i
```

Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

- `APP_PORT`: Puerto del proyecto
- `JWT_SECRET`: Una clave secreta para firmar los tokens JWT
- `SUPABASE_KEY`: Tu clave pública de Supabase
- `SUPABASE_URL`: Tu URL de Supabase

### Ejecución

Para iniciar el servidor, ejecuta:

```sh
### npm
npm run dev

### pnpm
pnpm run dev
```

## Contribuciones

¡Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar tan increíble para aprender, inspirar y crear! Cualquier contribución que hagas será **muy apreciada**.

Si tienes una sugerencia que podría mejorar este proyecto, sigue estos pasos para contribuir:

1. **Fork** el proyecto
2. Crea tu **Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. Realiza tus **cambios** en el código
4. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. **Push** a la Branch (`git push origin feature/AmazingFeature`)
6. Abre un **Pull Request**

Antes de enviar tu contribución, por favor revisa las siguientes directrices:

- **Usa issues para discutir propuestas**: Antes de realizar cambios importantes en el código, por favor, abre un issue para discutirlo con los mantenedores del proyecto. Esto ayuda a evitar duplicar esfuerzos o trabajar en características que no se ajustan a la visión del proyecto.
- **Sigue las convenciones de código**: Mantén tu código en línea con las prácticas de estilo y diseño ya presentes en el proyecto. Esto puede incluir normas de nombramiento, comentarios y pruebas.
- **Escribe tests**: Si es posible, intenta escribir pruebas para tu código. Esto ayuda a asegurar la calidad del proyecto y reduce la posibilidad de futuros errores.
- **Documenta tus cambios**: Si estás añadiendo una nueva característica o cambiando una existente, actualiza la documentación para reflejar tus cambios. Esto incluye tanto los comentarios en el código como los archivos de documentación externos, como el propio `README.md`.
- **Reporta bugs**: El uso de issues no se limita solo a discutir nuevas características. Si encuentras un error, por favor, informa sobre ello usando el sistema de issues del proyecto.

Recuerda que tu contribución, ya sea grande o pequeña, es muy valiosa para el desarrollo y mantenimiento de este proyecto.

## Licencia

MIT

---
> [!NOTE]
> Espero que esta información sea útil para tu proyecto. Si tienes alguna pregunta, no dudes en hacerla. ¡Buena suerte con tu proyecto!
