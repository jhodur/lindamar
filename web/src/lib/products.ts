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
};

export const COLORES_COLA_IMPERIAL: ColorOption[] = [
  { slug: "fucsia", nombre: "Fucsia", swatch: "#D8366B" },
  { slug: "verde-biche", nombre: "Verde Biche", swatch: "#9CC428" },
  {
    slug: "huila",
    nombre: "Huila",
    swatch: "linear-gradient(to bottom, #FFD52E 0%, #FFD52E 50%, #4DAF4A 50%, #4DAF4A 100%)",
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

export const PRODUCTOS: Producto[] = [
  {
    slug: "cola-imperial-fucsia",
    ref: "COLA IMPERIAL FUCSIA",
    nombre: "Vestido Cola Imperial Fucsia",
    linea: "ellas",
    categoria: "vestido-cola-imperial",
    precioCentavos: 25_000_000,
    imagen: "/products/cola-imperial-fucsia.jpg",
    imagenAlt: "Vestido Cola Imperial en color fucsia",
    descripcion:
      "Vestido largo de gala con cola desmontable. Diseño Cola Imperial en fucsia vibrante. Confección artesanal en tela ligera y vaporosa, ideal para eventos y ocasiones especiales.",
    colores: COLORES_COLA_IMPERIAL,
    tallas: TALLAS_UNICA,
    destacado: true,
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
    slug: "vestido-san-agustin",
    ref: "SAN AGUSTÍN",
    nombre: "Vestido San Agustín",
    linea: "ellas",
    categoria: "vestido",
    precioCentavos: 18_000_000,
    imagen: "/products/vestido-san-agustin.jpg",
    imagenAlt: "Vestido fucsia con motivos del patrimonio de San Agustín",
    descripcion:
      "Vestido corto con espalda descubierta y cuello halter. Estampado original con motivos del patrimonio agustiniano del Huila — estatuas, fauna y paisajes de la cultura agustiniana.",
    tallas: TALLAS_ELLAS,
    destacado: true,
  },
  {
    slug: "kimono-patchwork",
    ref: "KIMONO PATCHWORK",
    nombre: "Kimono Patchwork",
    linea: "ellas",
    categoria: "kimono",
    precioCentavos: 16_000_000,
    imagen: "/products/kimono-patchwork.jpg",
    imagenAlt: "Kimono largo con estampado patchwork colorido",
    descripcion:
      "Kimono largo en tejido ligero con estampado patchwork de motivos alegres. Versátil — úsalo abierto sobre un body o cerrado como vestido. Ideal para climas cálidos.",
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
    slug: "camisa-sanjuanero",
    ref: "SANJUANERO",
    nombre: "Camisa Sanjuanero",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 10_800_000,
    imagen: "/products/camisa-sanjuanero.jpg",
    imagenAlt: "Camisa blanca con bordado del traje típico Sanjuanero",
    descripcion:
      "Camisa blanca con estampado del Sanjuanero — el traje y baile típico del Huila. Una pieza única que celebra la tradición huilense, ideal para llevar la cultura puesta.",
    tallas: TALLAS_ELLOS,
    destacado: true,
  },
  {
    slug: "camisa-bosque-seco-tropical",
    ref: "BOSQUE SECO TROPICAL",
    nombre: "Camisa Bosque Seco Tropical",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-bosque-seco.jpg",
    imagenAlt: "Camisa con estampado de fauna del bosque seco tropical",
    descripcion:
      "Estampado inspirado en la fauna y vegetación del bosque seco tropical del Huila. Una camisa para los amantes de la naturaleza colombiana.",
    tallas: TALLAS_ELLOS,
  },
  {
    slug: "camisa-paramo",
    ref: "PÁRAMO",
    nombre: "Camisa Páramo",
    linea: "ellos",
    categoria: "camisa",
    precioCentavos: 12_000_000,
    imagen: "/products/camisa-paramo.jpg",
    imagenAlt: "Camisa con estampado de frailejones del páramo",
    descripcion:
      "Estampado con frailejones del páramo colombiano. Para los amantes de las alturas y los paisajes únicos de nuestra cordillera.",
    tallas: TALLAS_ELLOS,
  },
];

export const productosDestacados = () => PRODUCTOS.filter((p) => p.destacado);

export const productosPorLinea = (linea: Linea) =>
  PRODUCTOS.filter((p) => p.linea === linea);

export const productosPorCategoria = (categoria: Categoria) =>
  PRODUCTOS.filter((p) => p.categoria === categoria);

export const productoPorSlug = (slug: string) =>
  PRODUCTOS.find((p) => p.slug === slug);

export const productosRelacionados = (slug: string, linea: Linea, limit = 4) =>
  PRODUCTOS.filter((p) => p.linea === linea && p.slug !== slug).slice(0, limit);
