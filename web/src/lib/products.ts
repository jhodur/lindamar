export type Linea = "ellas" | "ellos";
export type Categoria =
  | "camisa"
  | "vestido-cola-imperial"
  | "vestido"
  | "kimono";

export type ColorOption = {
  slug: string;
  nombre: string;
  swatch: string;
};

export type Producto = {
  slug: string;
  ref: string;
  nombre: string;
  linea: Linea;
  categoria: Categoria;
  precioCentavos: number;
  imagen: string;
  imagenAlt: string;
  descripcion?: string;
  colores?: ColorOption[];
  tallas: string[];
  destacado?: boolean;
  /** Si true, no aparece en listas (catálogo/destacados/relacionados) pero sí por URL directa. */
  oculto?: boolean;
  /** Marca producto sin foto pro aún. Aparece pero con badge "Próximamente fotos". */
  fotosPendientes?: boolean;
};

// 7 colores reales del catálogo Cola Imperial 2026
export const COLORES_COLA_IMPERIAL: ColorOption[] = [
  { slug: "rojo", nombre: "Rojo", swatch: "#D62828" },
  { slug: "fucsia", nombre: "Fucsia", swatch: "#D8366B" },
  { slug: "amarillo", nombre: "Amarillo", swatch: "#FFD52E" },
  { slug: "verde-biche", nombre: "Verde Biche", swatch: "#9CC428" },
  { slug: "azul-rey", nombre: "Azul Rey", swatch: "#1E40AF" },
  {
    slug: "huila",
    nombre: "Huila",
    swatch:
      "linear-gradient(to bottom, #FFD52E 0%, #FFD52E 50%, #4DAF4A 50%, #4DAF4A 100%)",
  },
  {
    slug: "colombia",
    nombre: "Colombia",
    swatch:
      "linear-gradient(to bottom, #FFD52E 0%, #FFD52E 50%, #003893 50%, #003893 75%, #CE1126 75%, #CE1126 100%)",
  },
];

const TALLAS_ELLAS = ["XS", "S", "M", "L", "XL"];
const TALLAS_ELLOS = ["S", "M", "L", "XL", "XXL"];
const TALLAS_UNICA = ["Única"];

const COLA_IMPERIAL_DESC =
  "Vestido largo de gala con cola desmontable. Confección artesanal en tela ligera y vaporosa, ideal para eventos y ocasiones especiales. Disponible en 7 colores.";

export const PRODUCTOS: Producto[] = [
  // ===== COLA IMPERIAL — 7 colores =====
  {
    slug: "cola-imperial-rojo",
    ref: "COLA IMPERIAL ROJO",
    nombre: "Vestido Cola Imperial Rojo",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-rojo.jpg",
    imagenAlt: "Vestido Cola Imperial en rojo intenso",
    descripcion: COLA_IMPERIAL_DESC,
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
    destacado: true,
  },
  {
    slug: "cola-imperial-fucsia",
    ref: "COLA IMPERIAL FUCSIA",
    nombre: "Vestido Cola Imperial Fucsia",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-fucsia.jpg",
    imagenAlt: "Vestido Cola Imperial en color fucsia",
    descripcion: COLA_IMPERIAL_DESC,
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
    destacado: true,
  },
  {
    slug: "cola-imperial-amarillo",
    ref: "COLA IMPERIAL AMARILLO",
    nombre: "Vestido Cola Imperial Amarillo",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-amarillo.jpg",
    imagenAlt: "Vestido Cola Imperial en amarillo vibrante",
    descripcion: COLA_IMPERIAL_DESC,
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
  },
  {
    slug: "cola-imperial-verde-biche",
    ref: "COLA IMPERIAL VERDE BICHE",
    nombre: "Vestido Cola Imperial Verde Biche",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-verde-biche.jpg",
    imagenAlt: "Vestido Cola Imperial en verde biche",
    descripcion: COLA_IMPERIAL_DESC,
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
  },
  {
    slug: "cola-imperial-azul-rey",
    ref: "COLA IMPERIAL AZUL REY",
    nombre: "Vestido Cola Imperial Azul Rey",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-azul-rey.jpg",
    imagenAlt: "Vestido Cola Imperial en azul rey",
    descripcion: COLA_IMPERIAL_DESC,
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
  },
  {
    slug: "cola-imperial-huila",
    ref: "COLA IMPERIAL HUILA",
    nombre: "Vestido Cola Imperial Huila",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-huila.jpg",
    imagenAlt: "Vestido Cola Imperial en colores de la bandera del Huila",
    descripcion:
      "Vestido largo de gala con cola desmontable, en los colores de la bandera del Huila — verde y amarillo. Edición Cola Imperial, una declaración de orgullo opita.",
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
    destacado: true,
  },
  {
    slug: "cola-imperial-colombia",
    ref: "COLA IMPERIAL COLOMBIA",
    nombre: "Vestido Cola Imperial Colombia",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-colombia.jpg",
    imagenAlt: "Vestido Cola Imperial en colores de la bandera de Colombia",
    descripcion:
      "Vestido largo de gala con cola desmontable, en los colores de la bandera de Colombia — amarillo, azul y rojo. Edición Cola Imperial.",
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
  },

  // ===== VESTIDOS MIDI MUJER =====
  {
    slug: "vestido-alma-agustiniana",
    ref: "ALMA AGUSTINIANA",
    nombre: "Vestido Alma Agustiniana",
    linea: "ellas",
    categoria: "vestido",
    precioCentavos: 18_000_000,
    imagen: "/products/vestido-alma-agustiniana.jpg",
    imagenAlt:
      "Vestido fucsia con motivos del patrimonio de San Agustín y simio escultura",
    descripcion:
      "Vestido corto con espalda descubierta y cuello halter. Estampado original con motivos del patrimonio arqueológico de San Agustín — estatuas, fauna y paisajes de la cultura agustiniana, declarada Patrimonio de la Humanidad por la UNESCO.",
    tallas: TALLAS_ELLAS,
    destacado: true,
  },
  {
    slug: "vestido-dulce-caos",
    ref: "DULCE CAOS",
    nombre: "Vestido Dulce Caos",
    linea: "ellas",
    categoria: "vestido",
    precioCentavos: 18_000_000,
    imagen: "/products/vestido-dulce-caos.jpg",
    imagenAlt:
      "Vestido midi negro con estampado de motivos infantiles alegres",
    descripcion:
      "Vestido midi de tirantes con estampado vibrante — arcoíris, soles, dinosaurios, abejas y flores sobre fondo negro. Para quien lleva la alegría con orgullo.",
    tallas: TALLAS_ELLAS,
  },

  // ===== KIMONOS =====
  {
    slug: "kimono-tropipop",
    ref: "TROPIPOP",
    nombre: "Kimono TROPIpop",
    linea: "ellas",
    categoria: "kimono",
    precioCentavos: 16_000_000,
    imagen: "/products/kimono-tropipop.jpg",
    imagenAlt: "Kimono largo con estampado patchwork colorido TROPIpop",
    descripcion:
      "Kimono largo en tejido ligero con estampado patchwork de motivos alegres — corazones, soles, flores y geometrías. Versátil: úsalo abierto sobre un body o cerrado como vestido. Ideal para climas cálidos.",
    tallas: TALLAS_ELLAS,
    destacado: true,
  },

  // ===== CAMISAS MUJER =====
  {
    slug: "camisa-heliconias",
    ref: "HELICONIAS",
    nombre: "Camisa Heliconias",
    linea: "ellas",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-heliconias.jpg",
    imagenAlt: "Camisa con estampado de heliconias colombianas",
    descripcion:
      "Camisa con estampado de heliconias — la flor nacional de Colombia. Confección artesanal con tela fresca.",
    tallas: TALLAS_ELLAS,
    destacado: true,
  },
  {
    slug: "camisa-nuestra-tierra",
    ref: "NUESTRA TIERRA",
    nombre: "Camisa Nuestra Tierra",
    linea: "ellas",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-nuestra-tierra-mujer.jpg",
    imagenAlt: "Camisa con estampado Nuestra Tierra",
    descripcion:
      "Estampado inspirado en los paisajes y vegetación de Colombia. Una camisa que celebra nuestra tierra.",
    tallas: TALLAS_ELLAS,
  },
  {
    slug: "camisa-tierra-de-contrastes",
    ref: "TIERRA DE CONTRASTES",
    nombre: "Camisa Tierra de Contrastes",
    linea: "ellas",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-tierra-de-contrastes.jpg",
    imagenAlt: "Camisa con estampado Tierra de Contrastes",
    descripcion:
      "Estampado que celebra los contrastes geográficos y culturales de Colombia — del páramo al desierto, del altiplano al Caribe.",
    tallas: TALLAS_ELLAS,
  },
  {
    slug: "camisa-noche-dorada",
    ref: "NOCHE DORADA",
    nombre: "Camisa Noche Dorada",
    linea: "ellas",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-noche-dorada.jpg",
    imagenAlt: "Camisa con estampado de girasoles sobre fondo oscuro",
    descripcion:
      "Camisa con estampado de girasoles dorados sobre fondo oscuro. Confección artesanal con tela fresca, perfecta para el día y la noche.",
    tallas: TALLAS_ELLAS,
  },
  {
    slug: "camisa-sol-y-luna",
    ref: "SOL Y LUNA",
    nombre: "Camisa Sol y Luna",
    linea: "ellas",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-sol-y-luna.jpg",
    imagenAlt: "Camisa con estampado Sol y Luna",
    descripcion:
      "Estampado dual de sol y luna — luz y misterio en una sola pieza. Para quien lleva la dualidad con orgullo.",
    tallas: TALLAS_ELLAS,
  },
  {
    slug: "camisa-pasion-carmesi",
    ref: "PASIÓN CARMESÍ",
    nombre: "Camisa Pasión Carmesí",
    linea: "ellas",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-pasion-carmesi.jpg",
    imagenAlt: "Camisa con estampado floral en tonos carmesí",
    descripcion:
      "Estampado floral apasionado en carmesí. Una camisa para los momentos que piden carácter.",
    tallas: TALLAS_ELLAS,
    destacado: true,
  },

  // ===== CAMISAS HOMBRE — 5 líneas reales con foto pro =====
  {
    slug: "camisa-aires-de-san-pedro",
    ref: "AIRES DE SAN PEDRO",
    nombre: "Camisa Aires de San Pedro",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-aires-de-san-pedro.jpg",
    imagenAlt:
      "Camisa blanca con estampado de bailarines del Sanjuanero y motivos del Huila",
    descripcion:
      "Camisa blanca con estampado de los bailarines del Sanjuanero y el patrimonio musical del Huila. Una pieza única que celebra el San Pedro huilense.",
    tallas: TALLAS_ELLOS,
    destacado: true,
  },
  {
    slug: "camisa-orgullo-opita",
    ref: "ORGULLO OPITA",
    nombre: "Camisa Orgullo Opita",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-orgullo-opita.jpg",
    imagenAlt:
      "Camisa con estampado de la mujer Sanjuanera y abuelo del Huila",
    descripcion:
      "Estampado dedicado a la mujer Sanjuanera y los personajes que dan vida al folclor opita. Llevar Orgullo Opita es llevar el alma del Huila.",
    tallas: TALLAS_ELLOS,
  },
  {
    slug: "camisa-tierra-de-contrastes-hombre",
    ref: "TIERRA DE CONTRASTES",
    nombre: "Camisa Tierra de Contrastes",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-tierra-de-contrastes-hombre.jpg",
    imagenAlt:
      "Camisa hombre con estampado Tierra de Contrastes — paisajes del Huila",
    descripcion:
      "Estampado que celebra los contrastes geográficos y culturales de Colombia — del páramo al desierto, del campo al pueblo.",
    tallas: TALLAS_ELLOS,
  },
  {
    slug: "camisa-noche-dorada-hombre",
    ref: "NOCHE DORADA",
    nombre: "Camisa Noche Dorada",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-noche-dorada-hombre.jpg",
    imagenAlt:
      "Camisa hombre negra con estampado de girasoles y mariposas",
    descripcion:
      "Camisa con estampado de girasoles dorados sobre fondo oscuro. Versión hombre.",
    tallas: TALLAS_ELLOS,
    destacado: true,
  },
  {
    slug: "camisa-pasion-carmesi-hombre",
    ref: "PASIÓN CARMESÍ",
    nombre: "Camisa Pasión Carmesí",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-pasion-carmesi-hombre.jpg",
    imagenAlt:
      "Camisa hombre azul claro con estampado de rosas rojas",
    descripcion:
      "Estampado floral apasionado de rosas rojas sobre azul claro. Versión hombre.",
    tallas: TALLAS_ELLOS,
  },
];

/** Productos visibles públicamente (excluye `oculto: true`). */
export const productosVisibles = () => PRODUCTOS.filter((p) => !p.oculto);

export const productosDestacados = () =>
  PRODUCTOS.filter((p) => p.destacado && !p.oculto);

export const productosPorLinea = (linea: Linea) =>
  PRODUCTOS.filter((p) => p.linea === linea && !p.oculto);

export const productosPorCategoria = (categoria: Categoria) =>
  PRODUCTOS.filter((p) => p.categoria === categoria && !p.oculto);

export const productosPorLineaYCategoria = (
  linea: Linea,
  categoria: Categoria,
) =>
  PRODUCTOS.filter(
    (p) => p.linea === linea && p.categoria === categoria && !p.oculto,
  );

/** Encuentra cualquier producto por slug, INCLUYENDO los ocultos (acceso por URL directa). */
export const productoPorSlug = (slug: string) =>
  PRODUCTOS.find((p) => p.slug === slug);

export const productosRelacionados = (slug: string, linea: Linea, limit = 4) =>
  PRODUCTOS.filter(
    (p) => p.linea === linea && p.slug !== slug && !p.oculto,
  ).slice(0, limit);
