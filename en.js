
module.exports = {
  lang: "en",
  nav: [
    { uid: "work", title: "HOME" },
    { uid: "team", title: "TEAM" },
    { uid: "products", title: "PRODUCTS" }
  ],

  content: {
    title: "COLLECTIVE DIGITAL CRAFT",
    p1: "Dift Collective it’s a multidisciplinary team led by Strategist, Designers, Technologist and Producers that believe in innovation-led work.",
    p2: "We love to create products and design powerful user experiences."
  },

  team: [
    {
      fullName: "Carlos De Venezia",
      desc: "This is a product short description here",
      img: {
        low: "/img/team/charly-low.jpg",
        high: "/img/team/charly.jpg"
      },
      href: "",
      projects: ["alantu", "dift"]
    },
    {
      fullName: "Conrado Cimino",
      desc: "This is a product short description here",
      img: {
        low: "/img/team/conan-low.jpg",
        high: "/img/team/conan.jpg"
      },
      href: "",
      projects: ["ingame"]
    },
    {
      fullName: "Gonzalo Aguirre",
      desc: "This is a product short description here",
      img: {
        low: "/img/team/gon-low.jpg",
        high: "/img/team/gon.jpg"
      },
      href: "",
      projects: ["ingame"]
    },
    {
      fullName: "Victor Calvello",
      desc: "This is a product short description here",
      img: {
        low: "/img/team/vic-low.jpg",
        high: "/img/team/vic.jpg"
      },
      href: "",
      projects: ["alantu", "ingame"]
    },
    {
      fullName: "Matias Medina",
      desc: "This is a product short description here",
      img: {
        low: "/img/team/mati-low.jpg",
        high: "/img/team/mati.jpg"
      },
      href: "",
      projects: ["alantu"]
    },
    {
      fullName: "Juan Pablo Garcia",
      desc: "This is a product short description here",
      img: {
        low: "/img/team/jpg-low.jpg",
        high: "/img/team/jpg.jpg"
      },
      href: "",
      projects: ["ingame"]
    },
    {
      fullName: "Ignacio Olaciregui",
      desc: "This is a product short description here",
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
      desc: "Ingame is a new way to interact with your favourite brands, get cool rewards and have fun during the ride.",
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
      desc: "Alantu is a game which aims to create the biggest computer ever made.",
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
      desc: "Dift.io it’s a simple mobile solution that allows users to track social performance.",
      img: {
        low: "/img/projects/dift-low.jpg",
        high: "/img/projects/dift.jpg"
      },
      href: "/products/dift/",
      links: ['http://dift.io']
    }
  ]
};
