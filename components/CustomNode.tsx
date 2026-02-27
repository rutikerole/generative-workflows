import React from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    label: string;
    icon?: string;
    type?: 'input' | 'transform' | 'generate' | 'export';
  };
}

export function CustomNode({ data }: CustomNodeProps) {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'input':
        return 'bg-blue-500 border-blue-600';
      case 'transform':
        return 'bg-purple-500 border-purple-600';
      case 'generate':
        return 'bg-green-500 border-green-600';
      case 'export':
        return 'bg-orange-500 border-orange-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <div
      className={`px-6 py-4 shadow-lg rounded-lg border-2 ${getNodeStyle()} text-white min-w-[200px]`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex items-center gap-2">
        {data.icon && <span className="text-2xl">{data.icon}</span>}
        <div className="font-semibold">{data.label}</div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
