import React, { useRef, useEffect } from "react"
import { select, line, curveCardinal, scaleLinear, axisBottom, axisLeft } from "d3"
import { useStateContext } from "../contexts/ContextProvider"

const Plot = ({ data, maxY, maxX, tgtX, tgtY }) => {
    const { color } = useStateContext()

    const svgRef = useRef()

    /*let coords = []
    for(let i = 0; i < data.length; i++){
        coords.push({x: i, y: data[i]})
    }*/

    let coords = [{x:0, y:0}, {x:1, y:1}, {x:2, y:2}]
    maxY=10
    maxX=20
    tgtX=4
    tgtY=6

    useEffect(() => {
        const svg = select(svgRef.current)
        let width = 530, height = 440, lim = Math.max(maxX, maxY)
        tgtX = 30 + (width * tgtX / lim)
        tgtY = 12 + height - (height * tgtY / lim)

        const xScale = scaleLinear()
        .domain([0, lim])
        .range([0, width])

        const yScale = scaleLinear()
        .domain([0, lim])
        .range([height, 0])

        const xAxis = axisBottom(xScale).ticks(lim/2)
        svg
        .select(".x-axis")
        .call(xAxis)

        const yAxis = axisLeft(yScale).ticks(lim/2)
        svg
        .select(".y-axis")
        .call(yAxis)

        var axisX = svg.append("g")
        .attr("transform", `translate(30, ${height+12})`)
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
        

        var axisY = svg.append("g")
        .attr("transform", "translate(30, 12)")
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

        const myLine = line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.y))
        .curve(curveCardinal)

        svg
        .selectAll(".line")
        .data([coords])
        .join("path")
        .attr("class", "line")
        .attr("d", myLine)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("transform", "translate(30, 12)")

        svg
        .append("circle")
        .attr("r", 4)
        .attr("fill", "white")
        .attr("stroke", color)
        .attr("cx", tgtX)
        .attr("cy", tgtY)
    }, [coords])

    return (
        <svg ref={svgRef} className="w-full h-full border-2 rounded-xl bg-main-dark-bg" style={{borderColor: color}} />
    )
}

export default Plot