
export interface WorkspaceNode {
  label: string,
  children: Array<WorkspaceNode>
}

export interface Workspace {
  name: string
  id: string // uuid,
  children: Array<WorkspaceNode>
}
