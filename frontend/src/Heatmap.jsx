import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import "./Heatmap.css"
import AverageData from "./average.json"
import SD from "./SD.json"
import Select from 'react-select';
import html2canvas from 'html2canvas';

const Heatmap = () => {
  // console.log(SD)
  const [isFixed, setIsFixed] = useState(false);

  const divRef = useRef(null);

  const rowColorMap = {}
  AverageData.forEach(item => {
    rowColorMap[item["Region Name"]] = item["Primary Annotation"]
  })

  const selectRef = React.useRef(null);
  // const initialGroups = ["PPT1-2 Average Load Set 1", "PPT1-2 Average Load Set 2", "PPT1-2 Average Load Set 3", "PPT1-2 Average Load Set 4", "PPT1-4 Average Load Set 1", "PPT1-4 Average Load Set 2", "PPT1-4 Average Load Set 3", "PPT1-4 Average Load Set 4", "PPT1-7 Average Load Set 1", "PPT1-7 Average Load Set 2", "PPT1-7 Average Load Set 3", "PPT1-7 Average Load Set 4", "WT-2 Average Load Set 1", "WT-2 Average Load Set 2", "WT-2 Average Load Set 3", "WT-2 Average Load Set 4", "WT-12 Average Load Set 1", "WT-12 Average Load Set 2", "WT-12  Average Load Set 3", "WT-12  Average Load Set 4", "WT-18 Average Load Set 1", "WT-18 Average Load Set 2", "WT-18  Average Load Set 3", "WT-18  Average Load Set 4", "WT-24 Average Load Set 1", "WT-24 Average Load Set 2", "WT-24  Average Load Set 3", "WT-24  Average Load Set 4", "Filter out Zeros"];
  const initialGroups = ["PPT1-2 Average Load", "PPT1-4 Average Load", "PPT1-7 Average Load", "WT-2 Average Load", "WT-12 Average Load", "WT-18 Average Load", "WT-24 Average Load"];

  const colorDict = {
    "PPT1-2 Average Load": "#4F1E5A",
    "PPT1-4 Average Load": "#4A4E8C",
    "PPT1-7 Average Load": "#257F93",
    "WT-2 Average Load": "#00AB8B",
    "WT-12 Average Load": "#76D160",
    "WT-18 Average Load": "#FCE742",
    "WT-24 Average Load": "#FF8926"
  }

  const colorDictRow = {
    "CTX": "#009354",
    "OLF": "#8CCCB5",
    "STR": "#6FC5F5",
    "PAL": "#95A7DC",
    "TH": "#FF859A",
    "HY": "#FF3F3D",
    "MB": "#FF82FB",
    "P": "#FFBC91",
    "MY": "#FFA8D3",
    "CB": "#EDE55C",
    "fiber tracts": "#C7C6CB",
    "VS": "#9D9D9F",
    "HPF": "#63C34F"
  }

  const [selectedGroups, setSelectedGroups] = useState(initialGroups);
  const [selectedRange, setSelectedRange] = useState('All');

  function getColorForIndex(index) {
    const colors = ['#4F1E5A', '#4A4E8C', '#257F93', '#00AB8B', '#76D160', '#FCE742', '#FF8926'];
    return colors[index];
  }

  function getColorForRow(index) {
    const colors = ["#009354", "#8CCCB5", "#6FC5F5", "#63C34F", '#FF859A', '#FF3F3D', '#FF82FB', "#FFBC91", '#FFA8D3', "#EDE55C", "#C7C6CB", "#9D9D9F"]
    return colors[index]
  }

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

  const handleRangeChange = selectedOption => {
    // Assuming selectedOption is an object with { value, label } structure
    setSelectedRange(selectedOption.value);
  };

  const dropdownContainerStyle = {
    marginBottom: '20px',
  };

  const boxWidth = 20; // Set the fixed width for each box
  const boxHeight = 20; // Set the fixed height for each box


  useEffect(() => {

    const currentRange = rowRanges[selectedRange];
    const filteredJsonData = AverageData.filter((item, index) => index + 1 >= currentRange.start && index + 1 <= currentRange.end);
    const filteredSDData = SD.filter((item, index) => index + 1 >= currentRange.start && index + 1 <= currentRange.end);

    
    const myVars = [...new Set(filteredJsonData.map(item => item["Region Name"]))]
    const adjustedWidth = boxWidth * selectedGroups.length;
    const adjustedHeight = (boxHeight) * myVars.length;

    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", adjustedWidth + 360)
      .attr("height", adjustedHeight + 230)
      .append("g")
      .attr("transform", `translate(300, 110)`);

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
        return colorDict[d]; 
      });
      
    svg.append("g")
      .call(d3.axisTop(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(7,-4)rotate(-45)")
      .style("text-anchor", "start") 
      .style("fill", function(d, i) {
        return colorDict[d]; 
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
          return colorDictRow[rowColorMap[d]];
        });
    
    // console.log(filteredJsonData)
    // console.log(filteredSDData)
    let combinedData = filteredJsonData.map((item, index) => {
      return {...item, ...filteredSDData[index]};
    });

    const transformedData = [];
    combinedData.forEach(item => {
        selectedGroups.forEach(group => {
            transformedData.push({
            group: group,
            variable: item["Region Name"],
            value: item[group] || null,
            sd: item[`${group.split(" ")[0]} Standard Deviation`] || null
            });
        });
    });
    
    const filteredValues = transformedData
        .map(d => d.value)
        .filter(v => v !== null && v <= 0.1); 
      
    const maxValue = d3.max(filteredValues);
    const minValue = d3.min(filteredValues);

    const startColor = "#FCFAAA";
    const middleColor = "#EF857E"; 
    const endColor = "#4C248D"; 

    const myColor = d3.scaleLinear()
      .range([startColor, middleColor, endColor])
      .domain([0.00000001, 0.1, 0.2]);


    const heatmapData = selectedGroups.map(group => {
      return myVars.map(variable => {
        const found = combinedData.find(d => d["Region Name"] === variable && d[group] !== undefined);
        return {
          group: group,
          variable: variable,
          value: found ? found[group] : null,
          sd: found ? found[`${group.split(" ")[0]} Standard Deviation`] : null
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
        tooltip.html(`Genotype & Age: ${d.group}<br>Anatomical Region: ${d.variable}<br>Lipo Load: ${d.value && parseFloat(d.value.toFixed(4))}<br>Standard Dev: ${d.sd && parseFloat(d.sd.toFixed(4))}`)
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

  const options = Object.keys(rowRanges).map((range, index) => ({
    value: range,
    label: range,
  }));

  const colorArray = ["black", "#009354", "#8CCCB5", "#63C34F", "#6FC5F5", "#6189cf", '#FF859A', '#FF3F3D', '#FF82FB', "#FFBC91", '#FFA8D3', "#EDE55C", "#C7C6CB", "#9D9D9F"]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: colorArray[state.data.index], // This sets the color for options in the dropdown
    }),
    singleValue: (provided, state) => {
      // Assuming state.data.index exists and corresponds to the option's position in your initial options array
      // If not, you might need a different way to determine the correct color for the selected value
      const color = state.data.index !== undefined ? colorArray[state.data.index] : 'defaultColorHere';
      return { ...provided, color }; // This sets the color for the selected value shown in the select box
    },
  };

  const selectedOption = options.find(option => option.value === selectedRange) || null;

  useEffect(() => {
    const handleScroll = () => {
      // Change '100' to the scroll position you want
      if (window.scrollY > 160) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const downloadImage = async () => {
    const dataVizDiv = document.getElementById('my_dataviz');
    const canvas = await html2canvas(dataVizDiv);
    const image = canvas.toDataURL('image/png', 1.0);
  
    // Create a link to trigger the download
    const link = document.createElement('a');
    link.href = image;
    link.download = `${selectedRange}-Lipofuscin-Load.png`; // Name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <div class="wrapper">
    <h1 style={{fontFamily: "ITC", margin: "3rem"}}>Lipofuscin Load by Anatomical Region</h1>
    <div class="container">
      <div class="filters" ref={divRef} // Assign the ref to your div
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: isFixed ? '-4.2rem' : '100px', // Adjust according to where you want your div to start
        backgroundColor: '#ddd', // Just for visibility
      }}
      >
        <h3>Genotype & Age (Months)</h3>
        <div style={dropdownContainerStyle}>
          <select multiple={true} 
              value={selectedGroups} 
              onChange={handleGroupChange} 
              ref={selectRef} 
              style={{ marginRight: "1rem", 
              height: "100%", 
              width: "100%", 
              minHeight: "120px",
              backgroundColor: 'white' }}>
            {initialGroups.map((group, index) => (
              <option key={group} value={group} style={{ color: getColorForIndex(index) }}>{group}</option>
            ))}
          </select>
        </div>
        <h3 style={{marginTop: "50px"}}>Anatomical Region</h3>
        {/* <select
          onChange={handleRangeChange}
          value={selectedRange}
          className="select-style"
        >
          {Object.keys(rowRanges).map((range, index) => (
            <option key={index} value={range} style={{ color: "red" }}>{range}</option>
          ))}
        </select> */}
        <Select options={options.map((option, index) => ({ ...option, index }))}
        onChange={handleRangeChange} 
        value={selectedOption ? { ...selectedOption, index: options.findIndex(option => option.value === selectedRange) } : null}
        styles={customStyles}
/>


        <h4 style={{marginTop: "50px"}}>Region Image</h4>
        <img
            src={`${selectedRange}.png`}
            alt={`${selectedRange} Lipofuscin Load`}
            style={{ width: '100%' }}
          />

        <p style={{marginTop: "50px", cursor: "pointer", textDecoration: "underline"}} onClick={downloadImage}>Download Heatmap Image</p>

        
      </div>
      <div id="my_dataviz">
        <div style={{alignSelf: "start", fontFamily: "san-seriff", fontSize: "1.9rem", fontWeight: "500", marginBottom: "0.5rem", marginLeft: "1rem"}}>{selectedRange} Lipofuscin Load</div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Heatmap;