import { create } from 'zustand'
import axios from 'axios'

type Repository = {
  name: string
  id: number
}

type Store = {
  projects: Repository[] | null
  loading: boolean
  error: string
  fetchProjects: () => void
}

const initialState = {
  projects: null,
  loading: false,
  error: '',
}

const useRepositoriesStore = create<Store>()((set) => ({
  projects: initialState.projects,
  loading: initialState.loading,
  error: initialState.error,

  fetchProjects: async () => {
    set((state) => ({ ...state, loading: true }))
    try {
      const data = await axios.get('../api/repository')
      const projects = data.data.repositories.data.repositories
      set((state) => ({ ...state, error: '', projects }))
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }))
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }))
    }
  },
}))

export { useRepositoriesStore }
