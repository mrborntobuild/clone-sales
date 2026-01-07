
import React, { useCallback, useState, useRef, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node, 
  addEdge, 
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  ReactFlowInstance,
  OnConnectStartParams
} from 'reactflow';
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Database, 
  Mail, 
  Search, 
  Zap, 
  Filter, 
  MousePointer2, 
  Trash2, 
  Settings, 
  X, 
  Plus, 
  Webhook, 
  Send, 
  Code, 
  Globe, 
  Clock, 
  Layout, 
  MessageSquare, 
  MessageCircle, 
  Smartphone, 
  Calendar, 
  Table, 
  Box, 
  StickyNote, 
  FileText, 
  PenTool, 
  FileCheck, 
  UserCheck, 
  Users, 
  Sparkles, 
  Bot, 
  Brain, 
  Video, 
  Phone, 
  Mic, 
  GitBranch, 
  Layers, 
  Repeat, 
  Pause, 
  ListFilter, 
  ArrowUpDown, 
  Hash, 
  Bell, 
  SendHorizontal, 
  HardDrive, 
  Cloud, 
  ChevronDown, 
  ChevronRight,
  SearchCode,
  Link as LinkIcon,
  BarChart3,
  Key,
  ShieldCheck,
  Server,
  Terminal,
  FileCode,
  ArrowRightLeft,
  Timer,
  Hash as HashIcon,
  Monitor,
  Linkedin
} from 'lucide-react';
import N8NNode from './N8NNode';

const nodeTypes = {
  n8n: N8NNode,
};

// Node Metadata based on the provided reference
const NODE_METADATA: Record<string, { auth: string, needsConnect: boolean, inputs: string[], color: string }> = {
  'Webhook': { auth: '🔓 None', needsConnect: false, inputs: ['httpMethod', 'path', 'responseMode', 'responseData'], color: 'bg-emerald-500' },
  'Schedule': { auth: '🔓 None', needsConnect: false, inputs: ['rule', 'interval', 'cronExpression'], color: 'bg-emerald-500' },
  'Email Trigger': { auth: '📧 IMAP', needsConnect: true, inputs: ['host', 'port', 'user', 'password', 'mailbox'], color: 'bg-emerald-500' },
  'Gmail Trigger': { auth: '✅ OAuth2', needsConnect: true, inputs: ['pollTimes', 'filters', 'simplify'], color: 'bg-emerald-500' },
  'HubSpot': { auth: '✅ OAuth2 / 🔑 API Key', needsConnect: true, inputs: ['resource', 'operation', 'contactId', 'properties'], color: 'bg-orange-500' },
  'Salesforce': { auth: '✅ OAuth2', needsConnect: true, inputs: ['resource', 'operation', 'object', 'fields'], color: 'bg-blue-400' },
  'Pipedrive': { auth: '✅ OAuth2 / 🔑 API Key', needsConnect: true, inputs: ['resource', 'operation', 'dealId'], color: 'bg-gray-800' },
  'Slack': { auth: '✅ OAuth2 / 🔑 Bot Token', needsConnect: true, inputs: ['resource', 'channel', 'text', 'blocks'], color: 'bg-purple-500' },
  'OpenAI': { auth: '🔑 API Key', needsConnect: true, inputs: ['model', 'messages', 'temperature', 'maxTokens'], color: 'bg-emerald-600' },
  'Google Sheets': { auth: '✅ OAuth2 / ⚙️ Service Account', needsConnect: true, inputs: ['operation', 'spreadsheetId', 'range', 'dataMode'], color: 'bg-emerald-500' },
  'Airtable': { auth: '🔑 API Key / ✅ OAuth2', needsConnect: true, inputs: ['baseId', 'tableId', 'fields'], color: 'bg-emerald-400' },
  'Notion': { auth: '🔑 Token', needsConnect: true, inputs: ['resource', 'databaseId', 'properties'], color: 'bg-gray-900' },
  'IF Condition': { auth: '🔓 None', needsConnect: false, inputs: ['conditions', 'value1', 'operation', 'value2'], color: 'bg-gray-500' },
  'Code': { auth: '🔓 None', needsConnect: false, inputs: ['mode', 'jsCode/pythonCode'], color: 'bg-amber-500' },
  'HTTP Request': { auth: '🔓 Various', needsConnect: true, inputs: ['method', 'url', 'authentication', 'body'], color: 'bg-blue-600' },
};

const CATEGORIES = [
  {
    name: 'Triggers',
    nodes: [
      { name: 'Webhook', icon: Webhook, color: 'bg-emerald-500', type: 'trigger' },
      { name: 'Schedule', icon: Clock, color: 'bg-emerald-500', type: 'trigger' },
      { name: 'Email Trigger', icon: Mail, color: 'bg-emerald-500', type: 'trigger' },
      { name: 'Gmail Trigger', icon: Send, color: 'bg-emerald-500', type: 'trigger' },
    ]
  },
  {
    name: 'CRM',
    nodes: [
      { name: 'HubSpot', icon: Layout, color: 'bg-orange-500', type: 'action' },
      { name: 'Salesforce', icon: Database, color: 'bg-blue-400', type: 'action' },
      { name: 'Pipedrive', icon: Brain, color: 'bg-gray-800', type: 'action' },
      { name: 'Copper', icon: HardDrive, color: 'bg-purple-600', type: 'action' },
    ]
  },
  {
    name: 'Communication',
    nodes: [
      { name: 'Gmail', icon: Mail, color: 'bg-blue-500', type: 'action' },
      { name: 'Slack', icon: MessageSquare, color: 'bg-purple-500', type: 'action' },
      { name: 'Discord', icon: MessageCircle, color: 'bg-indigo-600', type: 'action' },
      { name: 'Twilio', icon: Smartphone, color: 'bg-red-600', type: 'action' },
    ]
  },
  {
    name: 'AI & Research',
    nodes: [
      { name: 'OpenAI', icon: Sparkles, color: 'bg-emerald-600', type: 'action' },
      { name: 'AI Agent', icon: Bot, color: 'bg-violet-600', type: 'action' },
      { name: 'Clearbit', icon: Search, color: 'bg-blue-400', type: 'action' },
      { name: 'Hunter.io', icon: Search, color: 'bg-orange-500', type: 'action' },
    ]
  },
  {
    name: 'Logic & Utility',
    nodes: [
      { name: 'IF Condition', icon: GitBranch, color: 'bg-gray-500', type: 'action' },
      { name: 'Code', icon: Code, color: 'bg-amber-500', type: 'action' },
      { name: 'Wait', icon: Pause, color: 'bg-gray-400', type: 'action' },
      { name: 'HTTP Request', icon: Globe, color: 'bg-blue-600', type: 'action' },
    ]
  }
];

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'n8n',
    data: { 
      label: 'Webhook', 
      subtitle: 'Trigger',
      icon: Webhook, 
      color: 'bg-emerald-500',
      type: 'trigger'
    },
    position: { x: 250, y: 150 },
  },
];

const initialEdges: Edge[] = [];

interface NodeConfigPanelProps {
  node: Node;
  onClose: () => void;
  onUpdate: (id: string, newData: any) => void;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ node, onClose, onUpdate }) => {
  const [label, setLabel] = useState(node.data.label);
  const metadata = NODE_METADATA[node.data.label] || { auth: '🔓 None', needsConnect: false, inputs: ['generic_input'], color: 'bg-gray-500' };

  return (
    <div className="absolute inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${node.data.color} text-white`}>
            {node.data.icon && <node.data.icon size={18} />}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-none">{node.data.label}</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Configuration</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Auth Section */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Authentication</label>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-50 transition-colors">
                <ShieldCheck size={16} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">{metadata.auth}</p>
                <p className="text-[10px] text-gray-400 font-medium">Credential status: Unlinked</p>
              </div>
            </div>
            {metadata.needsConnect && (
              <button className="px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg hover:bg-black transition-all">
                Connect
              </button>
            )}
          </div>
        </div>

        {/* Inputs Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Parameters</label>
          <div className="space-y-4">
            {metadata.inputs.map((inputKey) => (
              <div key={inputKey} className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 capitalize">{inputKey.replace(/([A-Z])/g, ' $1').trim()}</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder={`Enter ${inputKey}...`}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all"
                  />
                  <Terminal size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Node Name */}
        <div className="space-y-2 pt-4 border-t border-gray-50">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Display Name</label>
          <input 
            type="text" 
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              onUpdate(node.id, { ...node.data, label: e.target.value });
            }}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/50"
          />
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all flex items-center justify-center space-x-2">
          <Save size={16} />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
};

const WorkflowCanvasInner: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    'Triggers': true,
    'CRM': true,
    'AI & Research': true,
  });

  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number } | null>(null);
  const [connectingNode, setConnectingNode] = useState<OnConnectStartParams | null>(null);

  const toggleCat = (name: string) => {
    setExpandedCats(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      style: { stroke: '#94a3b8', strokeWidth: 2 } 
    }, eds)),
    [setEdges]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const updateNodeData = (id: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: newData };
        }
        return node;
      })
    );
  };

  const onDragStart = (event: React.DragEvent, categoryName: string, nodeName: string) => {
    event.dataTransfer.setData('application/reactflow-category', categoryName);
    event.dataTransfer.setData('application/reactflow-nodename', nodeName);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;
      const categoryName = event.dataTransfer.getData('application/reactflow-category');
      const nodeName = event.dataTransfer.getData('application/reactflow-nodename');
      if (!categoryName || !nodeName) return;
      const category = CATEGORIES.find(c => c.name === categoryName);
      const nodeConfig = category?.nodes.find(n => n.name === nodeName);
      if (!nodeConfig) return;
      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: 'n8n',
        position,
        data: { 
          label: nodeConfig.name, 
          subtitle: nodeConfig.type === 'trigger' ? 'Trigger' : 'Action', 
          icon: nodeConfig.icon, 
          color: nodeConfig.color, 
          type: nodeConfig.type 
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onConnectStart = useCallback((_: any, params: OnConnectStartParams) => {
    setConnectingNode(params);
  }, []);

  const onConnectEnd = useCallback((event: any) => {
    const targetIsPane = event.target.classList.contains('react-flow__pane');
    if (targetIsPane && connectingNode) {
      setMenuPosition({ x: event.clientX, y: event.clientY });
    }
  }, [connectingNode]);

  const handleQuickAdd = (nodeConfig: any) => {
    if (!reactFlowInstance || !connectingNode || !menuPosition) return;
    const id = `node_${Date.now()}`;
    const position = reactFlowInstance.screenToFlowPosition({ x: menuPosition.x, y: menuPosition.y });
    const newNode: Node = {
      id,
      type: 'n8n',
      position,
      data: { 
        label: nodeConfig.name, 
        subtitle: 'Ready to configure', 
        icon: nodeConfig.icon, 
        color: nodeConfig.color, 
        type: nodeConfig.type 
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => addEdge({
      id: `e-${connectingNode.nodeId}-${id}`,
      source: connectingNode.handleType === 'source' ? connectingNode.nodeId : id,
      target: connectingNode.handleType === 'target' ? connectingNode.nodeId : id,
      animated: true,
      style: { stroke: '#94a3b8', strokeWidth: 2 }
    }, eds));
    setMenuPosition(null);
    setConnectingNode(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f8f9fa] overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-gray-100 px-6 flex items-center justify-between bg-white shrink-0 z-20 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="h-8 w-px bg-gray-100"></div>
          <div>
            <h1 className="text-base font-bold text-gray-900 tracking-tight">Automation Workflow</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Editing • Autosaved</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Save size={16} />
            <span>Save</span>
          </button>
          <button className="flex items-center space-x-2 px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black shadow-xl shadow-gray-200 transition-all active:scale-95">
            <Play size={16} className="fill-white" />
            <span>Execute</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Node Library Sidebar */}
        <div className="w-80 border-r border-gray-100 bg-white flex flex-col z-10 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-50">
             <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search nodes..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/10 focus:outline-none transition-all" />
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="mb-2">
                <button 
                  onClick={() => toggleCat(cat.name)}
                  className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] hover:text-gray-900 transition-colors"
                >
                  <span>{cat.name}</span>
                  {expandedCats[cat.name] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
                
                {expandedCats[cat.name] && (
                  <div className="grid grid-cols-1 gap-1 px-2 mt-1">
                    {cat.nodes.map((item, idx) => (
                      <button 
                        key={idx}
                        draggable
                        onDragStart={(e) => onDragStart(e, cat.name, item.name)}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-all group text-left border border-transparent hover:border-gray-100 cursor-grab active:cursor-grabbing"
                      >
                        <div className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-active:scale-90`}>
                          <item.icon size={16} strokeWidth={2.5} />
                        </div>
                        <div className="ml-3 overflow-hidden">
                           <div className="text-[11px] font-bold text-gray-800 truncate">{item.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-50">
             <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                <p className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider mb-1 flex items-center">
                  <span className="mr-1.5"><Sparkles size={12} /></span> Node Library
                </p>
                <p className="text-[11px] text-indigo-600 leading-tight font-medium">
                  Select a node to view its specific authentication and input requirements.
                </p>
             </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div 
          ref={reactFlowWrapper}
          className="flex-1 relative bg-[#f8f9fa] bg-canvas-dots"
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            fitView
            minZoom={0.1}
            maxZoom={4}
          >
            <Background color="#cbd5e1" variant={BackgroundVariant.Dots} gap={24} size={1} />
            <Controls showInteractive={false} className="!bg-white !border-gray-100 !shadow-xl !rounded-xl overflow-hidden !m-6" />
            
            <Panel position="top-right" className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-2 m-6">
                <button className="p-3 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all" title="Select Tool">
                    <MousePointer2 size={18} />
                </button>
                <div className="w-px h-6 bg-gray-100"></div>
                <button className="p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Delete Selection">
                    <Trash2 size={18} />
                </button>
            </Panel>
          </ReactFlow>

          {/* Quick Add Menu */}
          {menuPosition && (
            <div 
              className="fixed bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 w-72 flex flex-col overflow-hidden animate-in zoom-in-95 duration-100 origin-top-left"
              style={{ left: menuPosition.x, top: menuPosition.y }}
            >
              <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Connect Node</span>
                <button onClick={() => setMenuPosition(null)} className="text-gray-400 hover:text-gray-900">
                  <X size={14} />
                </button>
              </div>
              <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                {CATEGORIES.map(cat => (
                  <div key={cat.name} className="mb-2">
                    <div className="px-3 py-1 text-[9px] font-bold text-gray-300 uppercase tracking-widest">{cat.name}</div>
                    {cat.nodes.slice(0, 4).map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleQuickAdd(item)}
                        className="w-full flex items-center px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className={`w-6 h-6 rounded ${item.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                          <item.icon size={12} strokeWidth={3} />
                        </div>
                        <span className="ml-3 text-[11px] font-bold text-gray-700 truncate">{item.name}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium italic">Release to add</span>
                <Search size={12} className="text-gray-300" />
              </div>
            </div>
          )}

          {selectedNode && (
            <NodeConfigPanel 
              node={selectedNode} 
              onClose={() => setSelectedNode(null)} 
              onUpdate={updateNodeData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const WorkflowCanvas: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <ReactFlowProvider>
    <WorkflowCanvasInner onBack={onBack} />
  </ReactFlowProvider>
);

export default WorkflowCanvas;
