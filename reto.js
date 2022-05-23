// -------------------------------------------- Lienzo
const canvas = d3.select("#canvas");

// -------------------------------------------- Data
const URL =
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";

// -------------------------------------------- Dimensiones del lienzo

const width = 850;
const height = 850;
const margin = { top: 10, left: 50, bottom: 40, right: 10 };
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top - margin.bottom;

// -------------------------------------------- Grafico 1

const svg = canvas.append("svg");

// ----- Tamaño de la gráfica

svg.attr("width", width);
svg.attr("height", height);

// ----- Ejes + Información

let g = svg
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json(URL).then((data) => {
  console.log(data);

  // -- Eje X
  const max_x = Math.max.apply(null, [data.map((d) => parseFloat(d.value))][0]);
  const x = d3.scaleLinear().domain([0, max_x]).range([0, iheight]);

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(5, ${iheight})`);

  // -- Eje Y
  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, iwidth])
    .padding(0.1);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

  // -- Datos

  const bars = g.selectAll("rect").data(data);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", 5)
    .attr("y", (d) => y(d.name))
    .attr("width", (d) => d.value / 1000)
    .attr("height", y.bandwidth());
});

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------

// -------------------------------------------- Data
const URL2 =
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";

// -------------------------------------------- Grafico 2

const svg2 = canvas.append("svg");

// ----- Tamaño de la gráfica

svg2.attr("width", width);
svg2.attr("height", height);

// ----- Ejes + Información

let g2 = svg2
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json(URL2).then((data) => {
  console.log(data);

  // -- Eje X
  const max_x2 = Math.max.apply(
    null,
    [data.map((d) => parseFloat(d.purchasingpower))][0]
  );
  const x2 = d3.scaleLinear().domain([0, max_x2]).range([0, iheight]);

  g2.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x2))
    .attr("transform", `translate(5, ${iheight})`);

  // -- Eje Y
  const max_y2 = Math.max.apply(
    null,
    [data.map((d) => parseFloat(d.lifeexpectancy))][0]
  );
  const y2 = d3.scaleLinear().domain([0, max_y2]).range([iheight, 0]);

  g2.append("g").classed("y--axis", true).call(d3.axisLeft(y2));

  // -- Información
  var node = g2.selectAll(".node").data(data);

  node
    .enter()
    .append("circle")
    .attr("id", (d) => d.country)
    .attr("r", (d) => d.population / 2500000)
    .style("fill", "steelblue")
    .attr("cx", (d) => d.purchasingpower / 50)
    .attr("cy", (d) => d.lifeexpectancy * 5);
});
