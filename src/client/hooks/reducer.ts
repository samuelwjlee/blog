import { AppContextVal } from 'client/hooks/appContext'

export const reducer = (state: AppContextVal, action: any) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user
      }
    default:
      return {}
  }
}
