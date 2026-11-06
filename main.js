class character {
  constructor(nombre, vida, ataque, defensa) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
  }

  Personaje_vivo() {
    return this.vida > 0;
  }

  recibir_Ataque(dano_entrante) {
    let dano_mitigado = Math.max(0, dano_entrante - this.defensa * 0.15);
    this.vida -= Math.floor(dano_mitigado);
    if (this.vida < 0) {
      this.vida = 0;
    }
  }
}

class tipo_fuego extends character {
  constructor(nombre) {
    super(nombre, 150, 35, 75);
    this.habilidades = ["Bola Fuego", "Llamarada", "Giro Fuego"];
  }

  atacar() {
    const IndiceAleatorio = Math.floor(Math.random() * this.habilidades.length);
    let habilidadEscogida = this.habilidades[IndiceAleatorio];
    let dano_base = 0;
    if (habilidadEscogida === "Bola Fuego") {
      dano_base = this.ataque * 1.7;
    } else if (habilidadEscogida === "Llamarada") {
      dano_base = this.ataque * 2;
    } else {
      dano_base = this.ataque * 2.2;
    }
    return {
      dano: Math.floor(dano_base),
      Habilidad_Usada: habilidadEscogida,
    };
  }
}

class tipo_planta extends character {
  constructor(nombre) {
    super(nombre, 130, 40, 80);
    this.habilidades = ["Rayo Solar", "Latigo Cepa", "Gigadrenadora"];
  }

  atacar() {
    const IndiceAleatorio = Math.floor(Math.random() * this.habilidades.length);
    let habilidadEscogida = this.habilidades[IndiceAleatorio];
    let dano_base = 0;
    if (habilidadEscogida === "Rayo Ssolar") {
      dano_base = this.ataque * 1.65;
    } else if (habilidadEscogida === "Latigo Cepa") {
      dano_base = this.ataque * 1.89;
    } else {
      dano_base = this.ataque * 2;
    }
    return {
      dano: Math.floor(dano_base),
      Habilidad_Usada: habilidadEscogida,
    };
  }
}

class tipo_agua extends character {
  constructor(nombre) {
    super(nombre, 135, 42, 95);
    this.habilidades = ["Pistola Agua", "Hidrobomba", "Surf"];
  }

  atacar() {
    const IndiceAleatorio = Math.floor(Math.random() * this.habilidades.length);
    let habilidadEscogida = this.habilidades[IndiceAleatorio];
    let dano_base = 0;
    if (habilidadEscogida === "Pistola Agua") {
      dano_base = this.ataque * 1.65;
    } else if (habilidadEscogida === "Ataque Rapido") {
      dano_base = this.ataque * 1.89;
    } else {
      dano_base = this.ataque * 2.3;
    }
    return {
      dano: Math.floor(dano_base),
      Habilidad_Usada: habilidadEscogida,
    };
  }
}

class tipo_electrico extends character {
  constructor(nombre) {
    super(nombre, 140, 41, 70);
    this.habilidades = ["Impactrueno", "Ataque Rapido", "Rayo"];
  }

  atacar() {
    const IndiceAleatorio = Math.floor(Math.random() * this.habilidades.length);
    let habilidadEscogida = this.habilidades[IndiceAleatorio];
    let dano_base = 0;
    if (habilidadEscogida === "Impactrueno") {
      dano_base = this.ataque * 1.55;
    } else if (habilidadEscogida === "Ataque Rapido") {
      dano_base = this.ataque * 1.45;
    } else {
      dano_base = this.ataque * 2.1;
    }
    return {
      dano: Math.floor(dano_base),
      Habilidad_Usada: habilidadEscogida,
    };
  }
}

let Nombre_Personajes = [
  new tipo_fuego("Charizard"),
  new tipo_agua("Blastoise"),
  new tipo_planta("Venusaur"),
  new tipo_electrico("Pikachu"),
];

function batalla() {
  let rondas = 1;

  console.log("Estadisticas Iniciales de cada Pokemon:");
  for (let personajes of Nombre_Personajes) {
    console.log(
      `${personajes.nombre}: Vida: ${personajes.vida} - Defensa: ${personajes.defensa} - Habilidades: ${personajes.habilidades}`,
    );
  }

  while (Nombre_Personajes.some((personajes) => personajes.Personaje_vivo())) {
    console.log(`------------RONDA ${rondas}-----------`);
    for (let atacantes of Nombre_Personajes) {
      if (atacantes.Personaje_vivo()) {
        let ObjetivosDisponibles = Nombre_Personajes.filter(
          (OtroPersonaje) =>
            OtroPersonaje.Personaje_vivo() && OtroPersonaje !== atacantes,
        );

        if (ObjetivosDisponibles.length === 0) {
          break;
        }

        const objetivos_Aleatorios =
          ObjetivosDisponibles[
            Math.floor(Math.random() * ObjetivosDisponibles.length)
          ];

        const { Habilidad_Usada, dano } = atacantes.atacar();
        objetivos_Aleatorios.recibir_Ataque(dano);

        console.log(
          `${atacantes.nombre} esta listo para atacar a ${objetivos_Aleatorios.nombre} usando [${Habilidad_Usada}]`,
        );
        console.log(`El ataque le causo ${dano} de daño.`);
        console.log(
          `Vida restante de ${objetivos_Aleatorios.nombre}: ${objetivos_Aleatorios.vida > 0 ? objetivos_Aleatorios.vida : "Derrotado"} `,
        );
      }
    }

    let sobrevivientes = Nombre_Personajes.filter((personaje) =>
      personaje.Personaje_vivo(),
    );

    if (sobrevivientes.length <= 1) {
      break;
    }
    rondas++;
  }

  const winner = Nombre_Personajes.find((personaje) =>
    personaje.Personaje_vivo(),
  );
  console.log("----------------------------------------------");
  console.log(
    `El ganador de la batalla pokemon es: ${winner.nombre.toUpperCase()}`,
  );
  console.log("-------------------------------------------");
  console.log(`Estado Final de todos los personajes: `);
  for (let personaje of Nombre_Personajes) {
    let estado_vida = "";
    if (personaje.Personaje_vivo()) {
      estado_vida = `Vivo: (Vida:${personaje.vida})`;
    } else {
      estado_vida = "Derrotado";
    }
    console.log(`${personaje.nombre}: ${estado_vida}`);
  } 
}

batalla();
