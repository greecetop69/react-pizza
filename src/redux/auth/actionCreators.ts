import { Dispatch } from "@reduxjs/toolkit"
// import api from "../../api"
import api from '../../api'
import { ILoginRequest, ILoginResponse } from "../../api/auth/types"
import { loginStart, loginSucess, loginFailure   } from "./authReducer"
// import { history } from '../../utils/history'
// import { store } from ".."
import { AxiosPromise } from "axios"
// import { isTokenExpired } from "../../utils/jwt"

export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)

        dispatch(loginSucess(res.data.accessToken))
        // dispatch(getProfile())
        
      } catch (e: any) {
        console.error(e)

        dispatch(loginFailure(e.message))
      }
    }
