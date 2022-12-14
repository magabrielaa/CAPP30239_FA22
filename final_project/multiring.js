// Multiring comparison of access to social security, by gender

d3.json("data/ssn_perc.json").then((data) => {
    for (let d of data) {
      createRing(d);
    }
  });
  
  function createRing({ gender, values }) {
    const height = 400,
      color = (gender === "MALE") ? d3.schemePaired[7] : d3.schemePaired[8],
      width = 400,
      innerRadius = 80,
      outerRadius = 150,
      labelRadius = 185;
  
    const arcs = d3.pie().value(d => d.amount)(values);
  
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
  
    const svg = d3.select("#chart4")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(arcs)
      .attr("opacity", 0.5)
      .join("path")
      .attr("class", "pie-color")
      .style("fill", function(d) { // fill with color only for "No Access" category, otherwise gray
        if (d.data.category == "Access"){
          return "#ccc"
        } else {
          return color
        }
      })
      .attr("d", arc);
  
    svg.append("g")
      .attr("font-size", 16)
      .attr("class", "desc-label")
      .attr("text-anchor", "middle")
      .style("fill", "rgb(86, 85, 85)")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => "translate("+ `${arcLabel.centroid(d)}` + ")")
      .selectAll("tspan")
      .data(d => {
        return [d.data.category, d.data.amount.toLocaleString()+ "%"]; //add percentage sign to label
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i) => `${i * 1.1}em`)
      .attr("font-weight", (d, i) => i ? null : "bold")
      .text(d => d);
  
    svg.append("text")
      .attr("font-size", 14)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("class", "pie-label")
      .style("fill", "rgb(86, 85, 85)")
      .text(gender)
      .style("font-size", 20);
  }