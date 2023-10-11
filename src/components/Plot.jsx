import React, { useRef, useEffect } from "react"
import { select, line, curveCardinal, scaleLinear, axisBottom, axisLeft, area } from "d3"
import { useStateContext } from "../contexts/ContextProvider"

const Plot = ({ data1, data2, maxX, minY, maxY, tgtX, tgtY, start }) => {
    const { color } = useStateContext()
    const svgRef = useRef()

    let width = 530, height = 440, coords1 = [], coords2 = [], coords3 = [], mid, lim = Math.max(maxX, Math.abs(maxY - minY))
    tgtX = width * Number(tgtX) / lim
    tgtY = height - (height * Number(tgtY) / lim)
    start = height * Number(start) / lim
    for(let i = 0; i < data1.length; i++){
        if(data1[i] != null) coords1.push({x: i, y: data1[i]})
        else{
            mid = i-1
            coords2.push({x: mid, y: data1[mid]})
            for(let j = i + 1; j < data1.length; j++){
                coords2.push({x: j, y: data1[j]})
            }
            break
        }
    }
    for(let i = 0; i < data2.length; i++){
        coords3.push({x: i * width / lim, y: (height - (data2[i] * height / lim))})
    }

    useEffect(() => {
        const svg = select(svgRef.current)
        svg.selectAll("*").remove()

        const xScale = scaleLinear()
        .domain([0, lim])
        .range([0, width])
        const yScale = scaleLinear()
        .domain([minY, lim+minY])
        .range([height, 0])

        const xAxis = axisBottom(xScale).ticks(10)
        svg
        .select(".x-axis")
        .call(xAxis)
        const yAxis = axisLeft(yScale).ticks(10)
        svg
        .select(".y-axis")
        .call(yAxis)

        var axisX = svg.append("g")
        .attr("transform", `translate(35, ${12 + (height * (lim + minY) / lim)})`)
        .call(xAxis)
        axisX.selectAll("line")
        .style("stroke", "white")
        axisX.selectAll("path")
        .style("stroke", "white")
        .style("stroke-width", 2)
        axisX.selectAll("text")
        .style("color", "white")
        .style("font-family", "consolas")
        .style("font-size", 14)
        .style('fill-opacity', d => d === 0 ? 0.0 : 1.0)

        var axisY = svg.append("g")
        .attr("transform", "translate(35, 12)")
        .call(yAxis)
        axisY.selectAll("line")
        .style("stroke", "white")
        axisY.selectAll("path")
        .style("stroke", "white")
        .style("stroke-width", 2)
        axisY.selectAll("text")
        .style("color", "white")
        .style("font-family", "consolas")
        .style("font-size", 14)

        const graphLine1 = line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.y))
        .curve(curveCardinal)

        const graphLine2 = line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.y))
        .curve(curveCardinal)

        const ar = area() 
        .x((p) => p.x) 
        .y0((p) => (height + start + ( height - (height * (lim + minY) / lim))))
        .y1((p) => p.y)

        svg
        .selectAll(".line")
        .data([coords1])
        .join("path")
        .attr("class", "line")
        .attr("d", graphLine1)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 4)
        .attr("transform", `translate(35, ${12 - start})`)

        svg
        .append("path")
        .data([coords2])
        .attr("class", "line")
        .attr("d", graphLine2)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-dasharray", ("3, 3"))
        .attr("stroke-width", 4)
        .attr("transform", `translate(${35 + (width * mid / lim)}, ${12 - start})`)

        svg
        .append("circle")
        .attr("r", 4)
        .attr("fill", "white")
        .attr("stroke", color)
        .attr("cx", tgtX)
        .attr("cy", tgtY)
        .attr("transform", `translate(35, ${12 + (height * minY / lim)})`)

        svg 
        .append("path") 
        .attr("d", ar(coords3)) 
        .attr("fill", color) 
        .attr("stroke", "none")
        .attr("opacity", "0.05")
        .attr("transform", `translate(35, ${12 - start  - (height - (height * (lim + minY) / lim))})`)

    }, [coords1, coords2, coords3])

    return (
        <svg ref={svgRef} className="float-right h-full border-2 rounded-xl bg-main-dark-bg" style={{borderColor: color, width: "36.5rem"}} />
    )
}

export default Plot