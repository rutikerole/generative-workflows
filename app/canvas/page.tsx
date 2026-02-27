'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from '@/components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { 
      label: 'Text Prompt',
      icon: '📝',
      type: 'input'
    },
    position: { x: 250, y: 100 },
  },
  {
    id: '2',
    type: 'custom',
    data: { 
      label: 'AI Building Description',
      icon: '🤖',
      type: 'transform'
    },
    position: { x: 250, y: 250 },
  },
  {
    id: '3',
    type: 'custom',
    data: { 
      label: 'Generate 3D Building',
      icon: '🏗️',
      type: 'generate'
    },
    position: { x: 250, y: 400 },
  },
  {
    id: '4',
    type: 'custom',
    data: { 
      label: 'Concept Image',
      icon: '🎨',
      type: 'generate'
    },
    position: { x: 250, y: 550 },
  },
  {
    id: '5',
    type: 'custom',
    data: { 
      label: 'Export & Download',
      icon: '💾',
      type: 'export'
    },
    position: { x: 250, y: 700 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
];

export default function CanvasPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-screen h-screen bg-gray-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🔥 Workflow Canvas</h1>
          <p className="text-sm text-gray-600">Text → Building → Image (Hero Workflow)</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            Clear
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            Run Workflow →
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full h-full pt-20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              switch (node.data.type) {
                case 'input': return '#3b82f6';
                case 'transform': return '#8b5cf6';
                case 'generate': return '#10b981';
                case 'export': return '#f59e0b';
                default: return '#6b7280';
              }
            }}
          />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white px-6 py-2 text-sm flex items-center justify-between">
        <div>5 nodes • 4 connections • Ready to run</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live
          </span>
          <span>Day 1 Sprint 🔥</span>
        </div>
      </div>
    </div>
  );
}
