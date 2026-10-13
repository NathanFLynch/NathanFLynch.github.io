/* =====================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   1. Fill in SITE with your name and links.
   2. Add one block to PROJECTS for each model (copy an existing block).
   3. Put that project's images in  projects/<id>/
   Full instructions are in README.md
   ===================================================================== */

const SITE = {
  name: "Nathan Filios Lynch",
  headline: "Mechanical design, modeled in Siemens NX.",
  intro:
    "Mechanical engineering student at University of Southern California. Select a model to see renders, " +
    "drawings, and the thinking behind it.",
  links: [
    { label: "Email",    url: "nflynch@usc.edu" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/nflynch" },
    // { label: "Resume", url: "resume.pdf" },   // drop resume.pdf next to index.html, then remove the //
  ],
};

/* Projects appear on the home page in this order, two per row.
   Image names are relative to the project's folder: projects/<id>/
   A name can be plain text, or { file: "name.jpg", caption: "Words under the image" }. */

const PROJECTS = [
  {
    id: "gearbox-housing",                 // must match the folder name in /projects
    title: "Gearbox Housing",
    summary: "Two-stage reduction housing for a student competition vehicle.",
    thumbnail: "thumb.svg",                // picture on the home page
    hero: "hero.svg",                      // big picture at top of project page (optional, defaults to thumbnail)

    facts: {                               // any label: value pairs you like
      Year: "2025",
      Role: "Sole designer",
      Software: "Siemens NX",
      Course: "ME 340 Machine Design",
      Material: "A356 aluminum",
    },

    sections: [                            // short write-up blocks (optional)
      { heading: "Problem",  text: "Describe the need and the constraints: size, weight, load, cost, manufacturing method." },
      { heading: "Approach", text: "Explain the key design decisions, the alternatives you considered, and any analysis you ran." },
      { heading: "Outcome",  text: "What happened? A built part, test results, a measured improvement, or what you would change." },
    ],

    renders: [
      { file: "render-1.svg", caption: "Isometric view" },
      { file: "render-2.svg", caption: "Section view showing gear mesh" },
      "render-3.svg",
    ],
    drawings: [
      { file: "drawing-1.svg", caption: "Housing, sheet 1 of 2" },
      // { file: "assembly-drawing.pdf", caption: "Full drawing set" },   // PDFs show as a download link
    ],
    photos: [
      { file: "photo-1.svg", caption: "Printed prototype" },
    ],
    videos: [
      // Local file:      { file: "turntable.mp4", caption: "Turntable", loop: true },
      // YouTube/Vimeo:   { file: "https://www.youtube.com/watch?v=XXXXXXXXXXX", caption: "Assembly animation" },
      // Sketchfab (3D):  { file: "https://sketchfab.com/models/YOUR_MODEL_ID/embed", caption: "Rotate the model" },
    ],
  },

  {
    id: "pulley-bracket",
    title: "Pulley Bracket",
    summary: "Topology-informed bracket, machined from a single block.",
    thumbnail: "thumb.svg",
    facts: { Year: "2025", Role: "Designer", Software: "Siemens NX" },
    renders: ["render-1.svg", "render-2.svg"],
  },

  {
    id: "four-bar-linkage",
    title: "Four-Bar Linkage",
    summary: "Motion-simulated linkage for a lid-lift mechanism.",
    thumbnail: "thumb.svg",
    facts: { Year: "2024", Role: "Team of 3", Software: "Siemens NX Motion" },
    renders: ["render-1.svg", "render-2.svg"],
  },

  {
    id: "heat-sink",
    title: "Extruded Heat Sink",
    summary: "Fin geometry sized from a thermal budget.",
    thumbnail: "thumb.svg",
    facts: { Year: "2024", Role: "Designer", Software: "Siemens NX" },
    renders: ["render-1.svg", "render-2.svg"],
  },
];
