import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const MindMapVisualization = ({ data, className = '' }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (!data || !data.topic) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.attr('width', width).attr('height', height);

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    const container = svg.append('g');

    // Define colors for subtopics
    const colors = [
      '#4F46E5', '#059669', '#DC2626', '#7C3AED', 
      '#EA580C', '#0891B2', '#BE185D', '#059669'
    ];

    // Create main topic node
    const mainNode = container.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    mainNode.append('circle')
      .attr('r', 60)
      .attr('fill', '#1F2937')
      .attr('stroke', '#374151')
      .attr('stroke-width', 3);

    mainNode.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text(data.topic.length > 20 ? data.topic.substring(0, 20) + '...' : data.topic);

    // Create subtopic nodes
    data.subtopics.forEach((subtopic, index) => {
      const angle = (2 * Math.PI * index) / data.subtopics.length;
      const radius = 200;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Connection line
      container.append('line')
        .attr('x1', centerX + Math.cos(angle) * 60)
        .attr('y1', centerY + Math.sin(angle) * 60)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', colors[index % colors.length])
        .attr('stroke-width', 2);

      // Subtopic node
      const subtopicNode = container.append('g')
        .attr('transform', `translate(${x}, ${y})`);

      subtopicNode.append('circle')
        .attr('r', 40)
        .attr('fill', colors[index % colors.length])
        .attr('opacity', 0.8);

      subtopicNode.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('fill', 'white')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text(subtopic.title.length > 15 ? subtopic.title.substring(0, 15) + '...' : subtopic.title);

      // Create point nodes
      subtopic.points.forEach((point, pointIndex) => {
        const pointAngle = angle + (pointIndex - (subtopic.points.length - 1) / 2) * 0.3;
        const pointRadius = 120;
        const pointX = x + Math.cos(pointAngle) * pointRadius;
        const pointY = y + Math.sin(pointAngle) * pointRadius;

        // Connection line to point
        container.append('line')
          .attr('x1', x + Math.cos(pointAngle) * 40)
          .attr('y1', y + Math.sin(pointAngle) * 40)
          .attr('x2', pointX)
          .attr('y2', pointY)
          .attr('stroke', colors[index % colors.length])
          .attr('stroke-width', 1)
          .attr('opacity', 0.6);

        // Point node
        const pointNode = container.append('g')
          .attr('transform', `translate(${pointX}, ${pointY})`);

        pointNode.append('circle')
          .attr('r', 20)
          .attr('fill', colors[index % colors.length])
          .attr('opacity', 0.6);

        pointNode.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.3em')
          .attr('fill', 'white')
          .attr('font-size', '10px')
          .text(point.length > 12 ? point.substring(0, 12) + '...' : point);

        // Tooltip on hover
        pointNode
          .append('title')
          .text(point);
      });
    });

    // Add zoom controls functionality
    window.mindMapZoom = {
      zoomIn: () => svg.transition().call(zoom.scaleBy, 1.5),
      zoomOut: () => svg.transition().call(zoom.scaleBy, 0.75),
      reset: () => svg.transition().call(zoom.transform, d3.zoomIdentity)
    };

  }, [data]);

  const exportAsPNG = async () => {
    setIsExporting(true);
    try {
      const canvas = await html2canvas(containerRef.current);
      const link = document.createElement('a');
      link.download = `mindmap-${data.topic.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting PNG:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      const canvas = await html2canvas(containerRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`mindmap-${data.topic.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!data || !data.topic) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No mind map data available
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Mind Map: {data.topic}</h3>
        <div className="flex space-x-2">
          {/* Zoom Controls */}
          <button
            onClick={() => window.mindMapZoom?.zoomIn()}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => window.mindMapZoom?.zoomOut()}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={() => window.mindMapZoom?.reset()}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw size={16} />
          </button>
          
          {/* Export Controls */}
          <div className="relative">
            <button
              onClick={exportAsPNG}
              disabled={isExporting}
              className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50"
              title="Export as PNG"
            >
              <Download size={16} />
            </button>
          </div>
          <button
            onClick={exportAsPDF}
            disabled={isExporting}
            className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors text-sm disabled:opacity-50"
            title="Export as PDF"
          >
            PDF
          </button>
        </div>
      </div>

      {/* Mind Map Container */}
      <div 
        ref={containerRef}
        className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
      >
        <svg 
          ref={svgRef} 
          className="w-full h-96"
          style={{ cursor: 'grab' }}
        />
      </div>

      {/* Legend */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Legend:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
            <span>Main Topic</span>
          </div>
          {data.subtopics.slice(0, 3).map((subtopic, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: ['#4F46E5', '#059669', '#DC2626'][index] }}
              ></div>
              <span>{subtopic.title}</span>
            </div>
          ))}
        </div>
      </div>

      {isExporting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Exporting...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapVisualization;