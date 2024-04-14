import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import jsonData from './output3.json';
import "./HeatmapOG.css"
import AverageData from "./average.json"

const Heatmap = () => {
  const selectRef = React.useRef(null);
  const initialGroups = ["PPT1-2 Average Load Set 1", "PPT1-2 Average Load Set 2", "PPT1-2 Average Load Set 3", "PPT1-2 Average Load Set 4", "PPT1-4 Average Load Set 1", "PPT1-4 Average Load Set 2", "PPT1-4 Average Load Set 3", "PPT1-4 Average Load Set 4", "PPT1-7 Average Load Set 1", "PPT1-7 Average Load Set 2", "PPT1-7 Average Load Set 3", "PPT1-7 Average Load Set 4", "WT-2 Average Load Set 1", "WT-2 Average Load Set 2", "WT-2 Average Load Set 3", "WT-2 Average Load Set 4", "WT-12 Average Load Set 1", "WT-12 Average Load Set 2", "WT-12  Average Load Set 3", "WT-12  Average Load Set 4", "WT-18 Average Load Set 1", "WT-18 Average Load Set 2", "WT-18  Average Load Set 3", "WT-18  Average Load Set 4", "WT-24 Average Load Set 1", "WT-24 Average Load Set 2", "WT-24  Average Load Set 3", "WT-24  Average Load Set 4", "Filter out Zeros"];

  const colorDict = {
    "PPT1-2 Average Load Set 1": "#AB91B3",
    "PPT1-2 Average Load Set 2": "#AB91B3",
    "PPT1-2 Average Load Set 3": "#AB91B3",
    "PPT1-2 Average Load Set 4": "#AB91B3",
    "PPT1-4 Average Load Set 1": "#8FA8C8",
    "PPT1-4 Average Load Set 2": "#8FA8C8",
    "PPT1-4 Average Load Set 3": "#8FA8C8",
    "PPT1-4 Average Load Set 4": "#8FA8C8",
    "PPT1-7 Average Load Set 1": "#9CC3CF",
    "PPT1-7 Average Load Set 2": "#9CC3CF",
    "PPT1-7 Average Load Set 3": "#9CC3CF",
    "PPT1-7 Average Load Set 4": "#9CC3CF",
    "WT-2 Average Load Set 1": "#ACD8CB",
    "WT-2 Average Load Set 2": "#ACD8CB",
    "WT-2 Average Load Set 3": "#ACD8CB",
    "WT-2 Average Load Set 4": "#ACD8CB",
    "WT-12 Average Load Set 1": "#C4E4B1",
    "WT-12 Average Load Set 2": "#C4E4B1",
    "WT-12  Average Load Set 3": "#C4E4B1",
    "WT-12  Average Load Set 4": "#C4E4B1",
    "WT-18 Average Load Set 1": "#FCF4A6",
    "WT-18 Average Load Set 2": "#FCF4A6",
    "WT-18  Average Load Set 3": "#FCF4A6",
    "WT-18  Average Load Set 4": "#FCF4A6",
    "WT-24 Average Load Set 1": "#F7C999",
    "WT-24 Average Load Set 2": "#F7C999",
    "WT-24  Average Load Set 3": "#F7C999",
    "WT-24  Average Load Set 4": "#F7C999",
    "Filter out Zeros": "black"
  }

  const [selectedGroups, setSelectedGroups] = useState(initialGroups);
  const [selectedRange, setSelectedRange] = useState('All'); // Default range

  function getColorForIndex(index) {
    const colors = ['#AB91B3', '#8FA8C8', '#9CC3CF', '#ACD8CB', '#C4E4B1', '#FCF4A6', '#F7C999', 'black'];
    return colors[Math.floor(index / 4)];
  }

  function getColorForRow(index) {
    const colors = ["#009354", "#8CCCB5", "#6FC5F5", "#63C34F", '#FF859A', '#FF3F3D', '#FF82FB', "#FFBC91", '#FFA8D3', "#EDE55C", "#C7C6CB", "#9D9D9F"]
    return colors[index]
  }

  console.log("JSON", jsonData)
  console.log("AVG", AverageData)


  // function getColorForRow(index) {
  //   index = 438 - index 
  //   const colors = ["#009354", "#8CCCB5", "#6FC5F5", "#63C34F", '#FF859A', '#FF3F3D', '#FF82FB', "#FFBC91", '#FFA8D3', "#EDE55C", "#C7C6CB", "#9D9D9F"]
  //   let newI = 0
  //   if (index < 101) {
  //     newI = 0
  //   } else if (index < 111) {
  //     newI = 1
  //   } else if (index < 111) {
  //     newI = 2
  //   } else if (index < 124) {
  //     newI = 3
  //   } else if (index < 136) {
  //     newI = 4
  //   } else if (index < 145) {
  //     newI = 5
  //   } else if (index < 182) {
  //     newI = 6
  //   } else if (index < 228) {
  //     newI = 7
  //   } else if (index < 279) {
  //     newI = 8
  //   } else if (index < 306) {
  //     newI = 9
  //   } else if (index < 346) {
  //     newI = 10
  //   } else if (index < 364) {
  //     newI = 11
  //   } else if (index < 431) {
  //     newI = 12
  //   } else {
  //     newI = 13
  //   }
  //   return colors[newI]
  // }

  const rowRanges = {
    'All': {start: 0, end: 438},
    'Cortex': { start: 1, end: 101 },
    'Olfactory Areas': { start: 102, end: 111 },
    'Hippocampal formation': { start: 112, end: 124 },
    'Striatum': { start: 125, end: 136 },
    'Pallidum': { start: 137, end: 145 },
    'Thalamus': { start: 146, end: 182 },
    'Hypothalamus': { start: 183, end: 228 },
    'Midbrain': { start: 229, end: 279 },
    'Pons': { start: 280, end: 306 },
    'Medulla': { start: 307, end: 346 },
    'Cerebellum': { start: 347, end: 364 },
    'Fiber Tracts': { start: 365, end: 431 },
    'Lateral Ventricle': { start: 432, end: 438 },
  };

  const handleGroupChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setSelectedGroups(selectedOptions);
  };

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  const dropdownContainerStyle = {
    marginBottom: '20px',
  };

  const boxWidth = 20; // Set the fixed width for each box
  const boxHeight = 20; // Set the fixed height for each box


  useEffect(() => {
    // const margin = { top: 30, right: 5, bottom: 10, left: 5 }

    const currentRange = rowRanges[selectedRange];
    const filteredJsonData = jsonData.filter((item, index) => index + 1 >= currentRange.start && index + 1 <= currentRange.end);
  
    
    const myVars = [...new Set(filteredJsonData.map(item => item["Region Name"]))]
    const adjustedWidth = boxWidth * selectedGroups.length;
    const adjustedHeight = (boxHeight) * myVars.length;

    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", adjustedWidth + 320)
      .attr("height", adjustedHeight + 230)
      .append("g")
      .attr("transform", `translate(240, 110)`);

    const x = d3.scaleBand()
      .range([0, adjustedWidth])
      .domain(selectedGroups)
      .padding(0.01);

    svg.append("g")
      .attr("transform", `translate(0,${adjustedHeight})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", function(d, i) {
        return colorDict[d]; // Use your existing function
      });
      
    svg.append("g")
      .call(d3.axisTop(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(7,-4)rotate(-45)")
      .style("text-anchor", "start") // Adjust text-anchor if needed
      .style("fill", function(d, i) {
        return colorDict[d]; // Use your existing function
      });
    const y = d3.scaleBand()
        .range([adjustedHeight, 0])
        .domain(myVars.reverse())
        .padding(0.01);

    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "10px")
        .style("fill", function(d, i) {
          return getColorForRow(i); // Use your existing function
        });

    const transformedData = [];
    filteredJsonData.forEach(item => {
        selectedGroups.forEach(group => {
      
            transformedData.push({
            group: group,
            variable: item["Region Name"],
            value: item[group] || null 
            });
        });
        });
    
    const filteredValues = transformedData
        .map(d => d.value)
        .filter(v => v !== null && v <= 0.1); 
      
    const maxValue = d3.max(filteredValues);
    const minValue = d3.min(filteredValues);

    const startColor = "#FCFAAA"; // First color
    const middleColor = "#EF857E"; // Middle color - choose an appropriate color
    const endColor = "#4C248D"; // Last color

    // Adjust the domain to include a midpoint
    // The domain now has three points: start, middle, and end
    const myColor = d3.scaleLinear()
      .range([startColor, middleColor, endColor])
      .domain([0.00000001, 0.1, 0.2]);


    const heatmapData = selectedGroups.map(group => {
      return myVars.map(variable => {
        const found = filteredJsonData.find(d => d["Region Name"] === variable && d[group] !== undefined);
        return {
          group: group,
          variable: variable,
          value: found ? found[group] : null // Use null or a specific value to denote missing data
        };
      });
    }).flat();

    const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "solid 1px black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("font-size", "12px")
    .style("color", "black")
    .style("pointer-events", "none");


    svg.selectAll()
      .data(heatmapData, function(d) { return d.group+':'+d.variable; })
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.variable); })
      .attr("width", boxWidth) // Use fixed boxWidth
      .attr("height", boxHeight) // Use fixed boxHeight
      .style("fill", d => {
        if (d.value === null || d.value == " ") return "white"; 
        if (d.value > 0.2) return "#351C67";
        return myColor(d.value);
      })
      .on("mouseover", function(event, d) {
        tooltip.style("opacity", 1);
        tooltip.html(`Group: ${d.group}<br>Variable: ${d.variable}<br>Lipo Load: ${d.value}`)
          .style("left", (event.pageX + 10) + "px") 
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        tooltip.style("opacity", 0);
      });

    return () => {
      d3.select("#my_dataviz svg").remove();
      tooltip.remove();
    };
  }, [selectedGroups, selectedRange]);


  return (
    <>
    <div class="wrapper">
    <h1 style={{fontFamily: "ITC", margin: "3rem"}}>Lipofuscin Load by Anatomical Region</h1>
    <div class="container">
      <div class="filters">
        <h3>Genotype & Age (Months)</h3>
        <div style={dropdownContainerStyle}>
          <select multiple={true} value={selectedGroups} onChange={handleGroupChange} ref={selectRef}     style={{ width: '360px', height: '250px', backgroundColor: 'white' }}>
            {initialGroups.map((group, index) => (
              <option key={group} value={group} style={{ color: getColorForIndex(index) }}>{group}</option>
            ))}
          </select>
        </div>
        <h3 style={{marginTop: "50px"}}>Anatomical Region</h3>
        <select
          onChange={handleRangeChange}
          value={selectedRange}
          className="select-style"
        >
          {Object.keys(rowRanges).map((range, index) => (
            <option key={index} value={range}>{range}</option>
          ))}
        </select>
        <h4 style={{marginTop: "50px"}}>Brain Region</h4>
        <img
            src={`${selectedRange}.png`}
            alt={`${selectedRange} Lipofuscin Load`}
            style={{ width: '100%', marginTop: '20px' }}
          />

        <h4 style={{marginTop: "50px"}}>Download Heatmap Image</h4>
        
      </div>
      <div id="my_dataviz">
        <div style={{fontFamily: "san-seriff", fontSize: "1.9rem", fontWeight: "500", marginBottom: "1.5rem"}}>{selectedRange} Lipofuscin Load</div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Heatmap;