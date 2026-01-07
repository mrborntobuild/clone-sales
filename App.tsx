
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import TableView from './components/TableView';
import WorkflowsView from './components/WorkflowsView';
import { NavView, UserProfile, CompanyInfo } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavView>('prospects');
  const [isEditingWorkflow, setIsEditingWorkflow] = useState(false);
  
  const [user] = useState<UserProfile>({
    name: 'Henry Moses',
    workspace: "Henry's Workspace",
    credits: 1200,
    initials: 'H'
  });

  const [company] = useState<CompanyInfo>({
    name: "AirOps",
    logo: "AO",
    industry: "Software",
    employeeCount: "11-50",
    description: "AI-driven personalization and high-scale data enrichment platform."
  });

  const renderContent = () => {
    switch (currentView) {
      case 'prospects':
        return <TableView title="Prospects" />;
      case 'workflows':
        return (
          <WorkflowsView 
            workspaceName={user.workspace} 
            isEditing={isEditingWorkflow}
            onToggleEdit={setIsEditingWorkflow}
          />
        );
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <h2 className="text-xl font-medium text-gray-600">Settings</h2>
            <p className="mt-2 text-sm">Configure your workspace preferences and integrations.</p>
          </div>
        );
      default:
        return null;
    }
  };

  // If editing a workflow, render it full screen
  if (currentView === 'workflows' && isEditingWorkflow) {
    return (
      <div className="h-screen w-screen bg-white">
        <WorkflowsView 
          workspaceName={user.workspace} 
          isEditing={true}
          onToggleEdit={setIsEditingWorkflow}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] overflow-hidden text-gray-900">
      <Sidebar activeView={currentView} onViewChange={setCurrentView} company={company} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav user={user} />
        <main className="flex-1 overflow-hidden m-4 rounded-xl border border-gray-200 bg-white bg-canvas-dots shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative flex flex-col">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
