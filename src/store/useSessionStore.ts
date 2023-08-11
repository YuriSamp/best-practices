import { create } from 'zustand'
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'

type Store = {
  session: Session | null
  loading: boolean
  error: string
  fetchUsers: () => void
}

const initialState = {
  session: null,
  loading: false,
  error: '',
}

const useSessionStore = create<Store>()((set) => ({
  session: initialState.session,
  loading: initialState.loading,
  error: initialState.error,

  fetchUsers: async () => {
    const supabase = createClientComponentClient()

    set((state) => ({ ...state, loading: true }))
    try {
      const { data } = await supabase.auth.getSession()
      const session = data.session
      set((state) => ({ ...state, error: '', session }))
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }))
    } finally {
      set((state) => ({
        ...state,
        loading: false,
      }))
    }
  },

  // In our example we only need to fetch the users, but you'd probably want to define other methods here
  // addUser: async (user) => {},
  // updateUser: async (user) => {},
  // deleteUser: async (id) => {},
}))

export default useSessionStore
