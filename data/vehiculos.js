/* =====================================================================
   EL PLAYA DE VEHICULOS  ·  INVENTARIO
   ---------------------------------------------------------------------
   ESTE ES EL UNICO ARCHIVO QUE TIENES QUE EDITAR PARA PUBLICAR
   UN VEHICULO NUEVO. Copia un bloque de "vehiculos" y cambia los datos.

   REGLAS:
   - Los textos van entre comillas dobles.
   - El precio es SOLO el numero, sin puntos ni letras:  195000000
   - "imagen" es la ruta de la foto dentro de assets/img/vehiculos/
   - No borres las llaves { } ni las comas entre bloques.
   ===================================================================== */

window.INVENTARIO = {
  /* ------------------------------------------------------------------
     DATOS DEL NEGOCIO  ·  edita aqui
  ------------------------------------------------------------------ */
  negocio: {
    nombre: "El Playa de Vehículos",
    propietario: "Núñez",
    telefono: "0983 748463",
    telefonoEnlace: "+595983748463",
    whatsapp: "595983748463",
    ciudad: "Villarrica",
    departamento: "Paraguarí",
    pais: "Paraguay",
    direccion: "Villarrica, Paraguarí, Paraguay",
    mapa: "https://www.google.com/maps?q=Villarrica,%20Paraguay&output=embed",
    mapaEnlace: "https://www.google.com/maps/search/?api=1&query=Villarrica+Paraguay",
    horario: [
      { dia: "Lunes a Viernes", hora: "08:00 a 18:00" },
      { dia: "Sábado", hora: "08:00 a 13:00" },
      { dia: "Domingo", hora: "Cerrado" }
    ],
    redes: []
  },

  /* ------------------------------------------------------------------
     VEHICULOS  ·  agrega o quita bloques aqui
  ------------------------------------------------------------------ */
  vehiculos: [
    {
      id: "corolla-xei-2021",
      nombre: "Toyota Corolla",
      version: "1.8 XEI",
      anio: 2021,
      km: 42500,
      precio: 195000000,
      condicion: "Seminuevo",
      destacado: true,
      cuerpo: "Sedán",
      combustible: "Gasolina",
      transmision: "Automática",
      puertas: 4,
      color: "Blanco perla",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "6 meses de garantía de motor",
      tags: ["Toyota", "Sedán", "Automática"],
      imagen: "assets/img/vehiculos/corolla-xei-2021.svg",
      descripcion:
        "Toyota Corolla 1.8 XEI del 2021, un solo dueño y con todos los servicios al día. Motor de 132 CV, cámara de retroceso, sensores de estacionamiento y pantalla multimedia. Pintura e interior impecables, neumáticos con muy poco uso. Listo para entrega inmediata."
    },
    {
      id: "corolla-cross-hybrid-2023",
      nombre: "Toyota Corolla Cross",
      version: "2.0 XLE Hybrid",
      anio: 2023,
      km: 18000,
      precio: 365000000,
      condicion: "Seminuevo",
      destacado: true,
      cuerpo: "SUV",
      combustible: "Híbrido",
      transmision: "Automática",
      puertas: 5,
      color: "Gris plata",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "12 meses de garantía de motor",
      tags: ["Toyota", "SUV", "Híbrido", "Automática"],
      imagen: "assets/img/vehiculos/corolla-cross-hybrid-2023.svg",
      descripcion:
        "Toyota Corolla Cross Hybrid 2023, la combinación ideal entre espacio y economía. Sistema híbrido con mayor rendimiento y menor consumo de combustible, 7 airbags, cámara de 360 grados y techo solar. Un solo dueño, kilometraje de trabajo y sin choques."
    },
    {
      id: "hilux-srv-2021",
      nombre: "Toyota Hilux",
      version: "2.0 SRV 4x4",
      anio: 2021,
      km: 61000,
      precio: 389000000,
      condicion: "Usado",
      destacado: true,
      cuerpo: "Camioneta",
      combustible: "Diésel",
      transmision: "Automática",
      puertas: 5,
      color: "Negro",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "3 meses de garantía",
      tags: ["Toyota", "Camioneta", "4x4", "Diésel"],
      imagen: "assets/img/vehiculos/hilux-srv-2021.svg",
      descripcion:
        "Toyota Hilux 2.0 SRV 4x4 2021, la pickup más confiable del mercado. Tracción 4x4, motor diésel económico, llantas de aleación, barra de techo y portón con abertura lateral. Ideal para trabajo en campo y obra. Documentación al día."
    },
    {
      id: "hilux-srx-2023",
      nombre: "Toyota Hilux",
      version: "2.8 SRX AT",
      anio: 2023,
      km: 22000,
      precio: 545000000,
      condicion: "Seminuevo",
      destacado: false,
      cuerpo: "Camioneta",
      combustible: "Diésel",
      transmision: "Automática",
      puertas: 5,
      color: "Blanco",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "12 meses de garantía de motor",
      tags: ["Toyota", "Camioneta", "4x4", "Diésel", "Automática"],
      imagen: "assets/img/vehiculos/hilux-srx-2023.svg",
      descripcion:
        "Toyota Hilux 2.8 SRX 2023, la versión más completa del catálogo. Automática, control de estabilidad, sensores de estacionamento, diferencial y cámaras de asistencia a la conducción. Prácticamente 0 km de uso particular."
    },
    {
      id: "yaris-xls-2020",
      nombre: "Toyota Yaris",
      version: "1.3 XLS",
      anio: 2020,
      km: 58000,
      precio: 138000000,
      condicion: "Usado",
      destacado: false,
      cuerpo: "Hatchback",
      combustible: "Gasolina",
      transmision: "Automática",
      puertas: 5,
      color: "Gris",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "3 meses de garantía",
      tags: ["Toyota", "Hatchback", "Automática"],
      imagen: "assets/img/vehiculos/yaris-xls-2020.svg",
      descripcion:
        "Toyota Yaris 1.3 XLS 2020, el auto más compacto y práctico para la ciudad. Fácil de estacionar, bajo consumo y aire acondicionado. Excelente opción para uso diario y como primer vehículo."
    },
    {
      id: "etios-xls-2019",
      nombre: "Toyota Etios",
      version: "1.5 XLS",
      anio: 2019,
      km: 92000,
      precio: 79000000,
      condicion: "Usado",
      destacado: false,
      cuerpo: "Sedán",
      combustible: "Gasolina",
      transmision: "Manual",
      puertas: 5,
      color: "Blanco",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "2 meses de garantía",
      tags: ["Toyota", "Sedán", "Manual", "Económico"],
      imagen: "assets/img/vehiculos/etios-xls-2019.svg",
      descripcion:
        "Toyota Etios 1.5 XLS 2019, la mejor relación precio-calidad del catálogo. Motor 1.5 de 106 CV que rinde más de lo que cuesta, caja manual de 5 velocidades, aire acondicionado y radio. Ideal para ciudad."
    },
    {
      id: "rav4-xle-2022",
      nombre: "Toyota RAV4",
      version: "2.0 XLE 4x4",
      anio: 2022,
      km: 31000,
      precio: 495000000,
      condicion: "Seminuevo",
      destacado: true,
      cuerpo: "SUV",
      combustible: "Gasolina",
      transmision: "Automática",
      puertas: 5,
      color: "Blanco perla",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "12 meses de garantía de motor",
      tags: ["Toyota", "SUV", "4x4", "Automática"],
      imagen: "assets/img/vehiculos/rav4-xle-2022.svg",
      descripcion:
        "Toyota RAV4 XLE 4x4 2022, el SUV más vendido del mundo. Tracción integral, motor de 2.0L con 152 CV, techo panorámico, cámara de 360 grados y llave inteligente. Un solo dueño, sin choques, historial completo de servicio."
    },
    {
      id: "prado-vx-2021",
      nombre: "Toyota Land Cruiser Prado",
      version: "2.8 VX",
      anio: 2021,
      km: 48000,
      precio: 795000000,
      condicion: "Usado",
      destacado: true,
      cuerpo: "SUV",
      combustible: "Diésel",
      transmision: "Automática",
      puertas: 5,
      color: "Negro perla",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "6 meses de garantía de motor",
      tags: ["Toyota", "SUV", "4x4", "Diésel", "7 plazas"],
      imagen: "assets/img/vehiculos/prado-vx-2021.svg",
      descripcion:
        "Toyota Land Cruiser Prado VX 2021, 7 plazas, diésel y 4x4. El SUV más robusto del mercado, perfecto para la familia y para el campo. Techo solar, cuero, tercera fila, multimedia y control de estabilidad. Revisión general recién realizada."
    },
    {
      id: "volkswagen-tcross-2021",
      nombre: "Volkswagen T-Cross",
      version: "1.4 TSI Comfortline",
      anio: 2021,
      km: 46000,
      precio: 205000000,
      condicion: "Usado",
      destacado: false,
      cuerpo: "SUV",
      combustible: "Gasolina",
      transmision: "Automática",
      puertas: 5,
      color: "Azul",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "3 meses de garantía",
      tags: ["Volkswagen", "SUV", "Automática"],
      imagen: "assets/img/vehiculos/volkswagen-tcross-2021.svg",
      descripcion:
        "Volkswagen T-Cross 1.4 TSI 2021, un solo dueño y con 4x4. Motor turbo de 150 CV, brillante consumo de combustible, pantalla de 8 pulgadas, Apple CarPlay y sensores de Reversa. Revisado y con todos los servicios al día."
    },
    {
      id: "hyundai-h100-2020",
      nombre: "Hyundai H100",
      version: "1.4 Van",
      anio: 2020,
      km: 88000,
      precio: 118000000,
      condicion: "Usado",
      destacado: false,
      cuerpo: "Camioneta",
      combustible: "Diésel",
      transmision: "Manual",
      puertas: 3,
      color: "Blanco",
      ubicacion: "Villarrica",
      financiamiento: true,
      garantia: "3 meses de garantía",
      tags: ["Hyundai", "Camioneta", "Furgón", "Diésel", "Manual"],
      imagen: "assets/img/vehiculos/hyundai-h100-2020.svg",
      descripcion:
        "Hyundai H100 1.4 2020, furgón diésel ideal para reparto y comercio. Amplio espacio de carga, bajo consumo, aire acondicionado y radio. Documentación al día y mantenimiento al día, lista para trabajar."
    }
  ]
};
