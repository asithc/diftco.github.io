
module.exports = {
  lang: "es",
  nav: [
    { uid: "work", title: "HOME" },
    { uid: "team", title: "EQUIPO" },
    { uid: "products", title: "PRODUCTOS" }
  ],
  content: {
    title: "COLLECTIVE DIGITAL CRAFT",
    p1: "Dift Collective es un equipo multidisciplinario liderado por Estrategas, Disenadores, Tecnologos y Productores que piensan en un mundo guiado por la tecnologia.",
    p2: "Amamos crear productos y crear experiencias poderosas."
  },

  team: [
    {
      fullName: "Carlos De Venezia",
      desc: "Esta es una descripcion corta",
      img: {
        low: "/img/team/charly-low.jpg",
        high: "/img/team/charly.jpg"
      },
      href: "",
      projects: ["alantu", "dift"]
    },
    {
      fullName: "Conrado Cimino",
      desc: "Esta es una descripcion corta",
      img: {
        low: "/img/team/conan-low.jpg",
        high: "/img/team/conan.jpg"
      },
      href: "",
      projects: ["ingame"]
    },
    {
      fullName: "Gonzalo Aguirre",
      desc: "Esta es una descripcion corta",
      img: {
        low: "/img/team/gon-low.jpg",
        high: "/img/team/gon.jpg"
      },
      href: "",
      projects: ["ingame"]
    },
    {
      fullName: "Victor Calvello",
      desc: "Esta es una descripcion corta",
      img: {
        low: "/img/team/vic-low.jpg",
        high: "/img/team/vic.jpg"
      },
      href: "",
      projects: ["alantu", "ingame"]
    },
    {
      fullName: "Matias Medina",
      desc: "Esta es una descripcion corta",
      img: {
        low: "/img/team/mati-low.jpg",
        high: "/img/team/mati.jpg"
      },
      href: "",
      projects: ["alantu"]
    },
    {
      fullName: "Juan Pablo Garcia",
      desc: "Esta es una descripcion corta",
      img: {
        low: "/img/team/jpg-low.jpg",
        high: "/img/team/jpg.jpg"
      },
      href: "",
      projects: ["ingame"]
    },
    {
      fullName: "Ignacio Olaciregui",
      desc: "Esta es una descripcion corta",
      img: {
        low: "/img/team/mono-low.jpg",
        high: "/img/team/mono.jpg"
      },
      href: "",
      projects: ["alantu", "dift"]
    }
  ],

  projects: [
    {
      name: "ingame",
      type: 'product',
      title: "Ingame",
      desc: "Ingame es una nueva forma de interactuar con tus marcas favoritas mientras te divertis y ganas premios.",
      img: {
        low: "/img/projects/ingame-low.jpg",
        high: "/img/projects/ingame.jpg"
      },
      href: "/products/ingame/",
      links: ['http://ingame.io']
    },

    {
      name: "alantu",
      type: 'product',
      title: "Alantu",
      desc: "Alantu es un juego cuyo objetivo es darle vida a la computadora mas grande del planeta.",
      img: {
        low: "/img/projects/alantu-low.jpg",
        high: "/img/projects/alantu.jpg",
        details: "/img/projects/alantu-horizontal.jpg"
      },          
      href: "/products/alantu/",
      links: ['http://alantu.io']
    },

    {
      name: "dift",
      type: 'product',
      title: "Dift.io",
      desc: "Dift.io es una aplicacion mobile que permite a los usuarios seguir su performance en las redes sociales.",
      img: {
        low: "/img/projects/dift-low.jpg",
        high: "/img/projects/dift.jpg"
      },
      href: "/products/dift/",
      links: ['http://dift.io']
    }
  ]
};
