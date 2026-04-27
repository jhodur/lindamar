# Lindamar

> *"Amor por el Terruño"* — tagline de marca

Tienda online de una diseñadora **Opita** (Huila, Colombia) con identidad cultural colombiana. Estampados con motivos del patrimonio agustiniano, Sanjuanero, paisajes del páramo y fauna/flora colombiana.

**Líneas comerciales** (nomenclatura del catálogo, respetar):
- **Ellas** — Camisas, Vestidos Cola Imperial, Vestidos midi, Kimonos
- **Ellos** — Camisas

**Precios de referencia (COP, catálogo 2025)**:
- Camisas Ellas y Ellos: **$108.000 – $120.000**
- Vestidos Cola Imperial (gala, varios colores): **$250.000**

> Detalle completo de refs, paleta y tono visual en `memory/project_brand_identity.md` (memoria del agente).

## Visión del proyecto

E-commerce real (carrito + checkout + pasarela de pago). El sitio debe transmitir identidad colombiana/opita y servir como canal de venta directa. Botón flotante de WhatsApp siempre visible para atención al cliente.

- **Idioma**: solo español (es-CO)
- **Mercado**: Colombia (precios en COP, envíos nacionales en v1)
- **WhatsApp de contacto**: `+57 315 307 5590`
  - Link directo: `https://wa.me/573153075590`
  - Mensaje pre-llenado configurable por contexto (producto, soporte, etc.)

## Stack técnico

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Estilos**: Tailwind CSS v4
- **UI**: shadcn/ui (componentes base) + Radix primitives
- **Base de datos**: PostgreSQL (productos, órdenes, clientes, inventario)
- **ORM**: Drizzle ORM (preferido) o Prisma
- **Pasarela de pago**: **Bold** (vínculos de pago vía API REST — PSE, tarjetas, Nequi, Daviplata)
- **Auth**: Auth.js (NextAuth v5) — clientes y admin
- **Imágenes**: `next/image` + almacenamiento en bucket S3-compatible (MinIO en EasyPanel) o Cloudinary
- **Email transaccional**: Resend (confirmación de orden, recuperación de password)
- **Despliegue**: Vercel (proyecto `lindamar`, root `web/`). Dockerfile se conserva como respaldo para EasyPanel/auto-host.

### Decisiones técnicas no negociables

- **Server Components por defecto**, Client Components solo cuando se necesite estado/interacción.
- **Server Actions** para mutaciones (carrito, checkout, admin).
- Precios siempre en **centavos / enteros** (no float) para evitar errores de redondeo.
- Toda interacción con la pasarela y webhooks debe estar **idempotente**.

## Estructura propuesta

```
/
├── app/                  # Next.js App Router
│   ├── (shop)/           # Rutas públicas: home, catálogo, producto, carrito
│   ├── (account)/        # Cuenta del cliente: pedidos, direcciones
│   ├── admin/            # Panel admin (productos, órdenes, inventario)
│   ├── api/
│   │   └── webhooks/
│   │       └── wompi/    # Webhook de pagos
│   └── layout.tsx
├── components/
│   ├── ui/               # shadcn/ui
│   ├── shop/             # ProductCard, CartDrawer, WhatsAppButton, etc.
│   └── admin/
├── lib/
│   ├── db/               # Drizzle schema + cliente
│   ├── wompi/            # Cliente de pasarela
│   ├── cart/             # Lógica de carrito (server-side)
│   └── whatsapp.ts       # Helper para construir links wa.me
├── content/              # Productos en MDX/JSON (v0 antes de mover a DB)
├── public/
├── docker/
│   └── Dockerfile
├── docker-compose.yml    # Para desarrollo local (postgres + minio)
└── drizzle/              # Migraciones
```

## Modelo de datos (borrador)

- `products` — sku, slug, nombre, descripción, género (mujer/hombre), categoría (camisa/camiseta/blusón/vestido), precio_centavos, activo
- `product_variants` — talla, color, stock, sku_variante
- `product_images` — orden, url, alt
- `customers` — email, nombre, teléfono, password_hash
- `addresses` — cliente_id, departamento, ciudad, dirección, etc.
- `orders` — número, cliente_id, estado, subtotal, envío, total, wompi_transaction_id
- `order_items` — orden_id, variante_id, cantidad, precio_unitario_snapshot
- `shipping_rates` — por departamento o tarifa plana inicial

## Comandos útiles (a definir cuando exista `package.json`)

```bash
npm run dev              # Next.js + DB local vía docker-compose
npm run build
npm run start
npm run db:generate      # Drizzle: generar migración
npm run db:migrate       # Aplicar migraciones
npm run db:studio        # Drizzle Studio
docker compose up -d     # Postgres + MinIO local
```

## Despliegue

- **Hosting**: **Vercel** (Hobby plan, team `team_WODHnbXVJZMU1VcwmHcCHapb`). Proyecto `lindamar` (`prj_KLE2P8kW32GdIy8rDoEwl8Y2htkK`).
- **Repo**: https://github.com/jhodur/lindamar (público, branch `main`, root `web/`).
- **Deploy actual**: https://lindamar.vercel.app
- **Dominio prod**: `lindamar.com.co` (DNS apunta a Vercel `76.76.21.21`).
- **Build**: el Next.js standalone que Vercel detecta automáticamente. El `web/Dockerfile` se conserva como respaldo si en algún momento se migra a auto-host (EasyPanel, Fly, Railway, etc.).
- **Variables de entorno** (no commitear, configurar en Vercel dashboard cuando lleguen): `DATABASE_URL`, `BOLD_API_KEY`, `BOLD_WEBHOOK_SECRET`, `AUTH_SECRET`, `RESEND_API_KEY`, `S3_*`.
- **Deploy manual**: desde `web/` ejecutar `npx vercel --prod --yes --token $TOKEN --scope team_WODHnbXVJZMU1VcwmHcCHapb`. Token en `$APPDATA/com.vercel.cli/Data/auth.json`.
- **Auto-deploy en push**: pendiente de instalar la GitHub App de Vercel (https://github.com/apps/vercel) en la cuenta `jhodur` y linkear el repo desde Vercel UI.

## Convenciones

- **Commits**: convencionales en español (`feat: añade carrito`, `fix: corrige cálculo de envío`).
- **Componentes**: PascalCase, un componente por archivo.
- **Estilos**: Tailwind utilities; extraer a componente si se repite 3+ veces.
- **Texto**: en español neutro colombiano. Evitar anglicismos en UI (`Carrito`, no `Cart`).
- **Imágenes de producto**: WebP/AVIF, mínimo 1200px de lado largo, máximo 500KB.

## Identidad visual (a definir con la diseñadora)

- Paleta inspirada en cultura opita / colombiana (pendiente de muestras).
- Tipografía: una serif para titulares + una sans para cuerpo (a elegir).
- Tono: artesanal, contemporáneo, orgulloso de raíces.
- **Referencia visual** (solo inspiración, no copiar): https://maemioficial.com

## Decisiones pendientes (TBD)

- [ ] Operador logístico para envíos (Servientrega, Coordinadora, Interrapidísimo).
- [ ] Política de devoluciones y términos legales (requeridos por la pasarela).
- [ ] RUT / datos fiscales de la empresa para facturación electrónica (¿DIAN?).
- [ ] Paleta de colores y tipografías definitivas.
- [ ] Set inicial de productos con fotos profesionales.
- [ ] Migración de catálogo de archivos a panel admin (definir cuándo).

## Modelo de pago y envío

- **Producto pre-pagado online** vía Bold (PSE, tarjetas, Nequi, Daviplata).
- **Envío contra entrega**: el cliente paga el valor del envío al mensajero al recibir el paquete. No se calcula ni se cobra envío en el checkout.
- Comunicar este modelo de forma clara y permanente en checkout, ficha de producto y página `/envios`.

## Roadmap de versiones

- **v0.1** — Maqueta home + paleta + componentes base. ✅
- **v0.2** — Páginas catálogo (Ellas/Ellos/Cola Imperial), ficha de producto con CTA WhatsApp, páginas estáticas. ✅
- **v0.3** — Carrito en localStorage, checkout invitado, flujo manual vía WhatsApp hasta integrar Bold. (en curso)
- **v0.4** — Integración Bold (vínculos de pago + webhook), persistencia de órdenes en DB.
- **v0.5** — Panel admin para productos e inventario, emails transaccionales.
- **v1.0** — Producción: dominio lindamar.com.co + Bold en vivo + analítica + SEO.

## Notas para Claude

- Trabajar en **español** en código de UI y commits; nombres de variables/funciones en inglés.
- **No** asumir cambios visuales de la referencia maemioficial.com — es solo inspiración estructural.
- Antes de tocar la pasarela de pagos o el modelo de órdenes, **confirmar con el usuario**.
- Botón de WhatsApp es elemento global del layout, no de páginas individuales.
