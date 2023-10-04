import React, { useRef, useEffect } from "react"
import { select, line, curveCardinal, scaleLinear, axisBottom, axisLeft } from "d3"
import { useStateContext } from "../contexts/ContextProvider"

const Plot = ({ data, maxY, maxX }) => {
    const { color } = useStateContext()

    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)
        let width = 500, height = 300

        const xScale = scaleLinear()
        .domain([0, maxX])
        .range([0, width])

        const yScale = scaleLinear()
        .domain([0, maxY])
        .range([height, 0])

        const xAxis = axisBottom(xScale).ticks(data.length)
        svg.select(".x-axis").call(xAxis)
        const yAxis = axisLeft(yScale)
        svg.select(".y-axis").call(yAxis)

        svg.append("g")
        .attr("transform", `translate(20, ${height+10})`)
        .call(xAxis);
        svg.append("g")
        .attr("transform", "translate(20, 10)")
        .call(yAxis);
       

        const myLine = line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.y))
        .curve(curveCardinal)
        svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", myLine)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("transform", "translate(20, 10)")
    }, [data])

    return (
        <svg ref={svgRef} className="w-full h-full border-black border-2" />
    )
}

export default Plot