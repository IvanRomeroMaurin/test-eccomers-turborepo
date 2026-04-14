export interface Role {
  id: number
  name: string
}

export interface UserRole {
  user_id: string
  role_id: number
  assigned_at?: string | Date | null
}
