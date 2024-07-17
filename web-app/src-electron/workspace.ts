
export interface WorkspaceNode {
  label: string,
  children: Array<WorkspaceNode>
}

export interface Workspace {
  label: string
  id: string // uuid,
  children: Array<WorkspaceNode>
}
