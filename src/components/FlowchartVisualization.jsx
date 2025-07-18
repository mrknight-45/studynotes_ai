import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Custom node components
const StartNode = ({ data }) => (
  <div className="px-4 py-2 bg-green-500 text-white rounded-full text-center font-medium min-w-24">
    {data.label}
  </div>
);

const ProcessNode = ({ data }) => (
  <div className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center font-medium min-w-32">
    {data.label}
  </div>
);

const DecisionNode = ({ data }) => (
  <div className="px-4 py-2 bg-yellow-500 text-white transform rotate-45 text-center font-medium min-w-24 min-h-16 flex items-center justify-center">
    <span className="transform -rotate-45">{data.label}</span>
  </div>
);

const EndNode = ({ data }) => (
  <div className="px-4 py-2 bg-red-500 text-white rounded-full text-center font-medium min-w-24">
    {data.label}
  </div>
);

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  end: EndNode,
};

const FlowchartVisualization = ({ data, className = '' }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

  React.useEffect(() => {
    if (!data || !data.nodes) return;

    // Convert data nodes to ReactFlow format
    const flowNodes = data.nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: { label: node.label },
    }));

    // Convert data edges to ReactFlow format
    const flowEdges = data.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: true,
      style: { stroke: '#374151', strokeWidth: 2 },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [data]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const exportAsPNG = async () => {
    setIsExporting(true);
    try {
      const flowElement = document.querySelector('.react-flow');
      if (flowElement) {
        const canvas = await html2canvas(flowElement);
        const link = document.createElement('a');
        link.download = `flowchart-${data.title?.replace(/\s+/g, '-').toLowerCase() || 'diagram'}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Error exporting PNG:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      const flowElement = document.querySelector('.react-flow');
      if (flowElement) {
        const canvas = await html2canvas(flowElement);
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

        pdf.save(`flowchart-${data.title?.replace(/\s+/g, '-').toLowerCase() || 'diagram'}.pdf`);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!data || !data.nodes || data.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No flowchart data available
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Flowchart: {data.title || 'Process Diagram'}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={exportAsPNG}
            disabled={isExporting}
            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50"
            title="Export as PNG"
          >
            <Download size={16} />
          </button>
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

      {/* Flowchart Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background color="#f3f4f6" gap={20} />
          <Controls />
          <MiniMap 
            style={{
              height: 120,
              backgroundColor: '#f8fafc',
            }}
            zoomable
            pannable
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Node Types:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-6 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Start/Begin</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Process/Action</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 transform rotate-45 mr-2"></div>
            <span>Decision</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>End/Finish</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-2 text-xs text-gray-500">
        💡 Tip: Drag nodes to reposition them. Use the controls in the bottom-right to zoom and pan.
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

export default FlowchartVisualization;