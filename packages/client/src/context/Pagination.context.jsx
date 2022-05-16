import { createContext, useContext, useReducer } from 'react'

export const INITIAL_STATE = { page: 1, totalPages: 1, pageSize: 100 }

export const PaginationContext = createContext()

function paginationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEXT': {
      return { ...state, page: state.page + 1 }
    }
    case 'PREVIOUS': {
      return { ...state, page: state.page - 1 }
    }
    case 'FIRST': {
      return { ...state, page: 1 }
    }
    case 'LAST': {
      return { ...state, page: state.totalPages }
    }
    case 'SET_INFO': {
      return { ...state, ...action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function PaginationProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(paginationReducer, { ...INITIAL_STATE, ...initialState })

  const value = { state, dispatch }
  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
}

export function usePagination() {
  const context = useContext(PaginationContext)
  if (context === undefined) {
    throw new Error('usePagination must be used within a PaginationProvider')
  }
  return context
}
