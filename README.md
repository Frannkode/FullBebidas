Licorería Azul & Oro
====================

Pequeña tienda web de bebidas creada con React + Vite. Este repositorio contiene la UI, datos de ejemplo y las imágenes usadas por la demo local.

Resumen
-------
- Stack: `React`, `Vite`, `TypeScript`, `TailwindCSS` (si está configurado).
- Contenido: componentes en `components/`, datos de ejemplo en `data.ts`, imágenes en `public/drinks/`.

Cómo ejecutar localmente
------------------------
1. Instalar dependencias:

```bash
npm install
```

2. Levantar el servidor de desarrollo:

```bash
npx vite
```

Abre http://localhost:3000/ en tu navegador.

Notas importantes
-----------------
- Las imágenes están en `public/drinks/` y los paths en `data.ts` apuntan a `/drinks/<nombre>.jpeg` para que Vite las sirva correctamente.
- Evita usar caracteres especiales (por ejemplo `&`) en la ruta del proyecto cuando uses PowerShell, ya que puede romper scripts como `npm run dev`.

Contribuir
---------
- Haz cambios en una rama nueva y abre un pull request.
- Si agregas imágenes, súbelas a `public/drinks/` y actualiza `data.ts` con el nuevo nombre.

Contacto
-------

Licencia
--------

