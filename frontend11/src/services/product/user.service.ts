import { getContentType } from "@/api/api.helper"
import { headers } from "next/headers"
import Cookies from "js-cookie"
import axios from "axios"
import { instance } from "@/api/api.interceptor"
import { IFullUser, IUser } from "@/types/user.interface"
import { create } from "domain"

const USERS = 'users'

type TypeData = {
    email: string
    password?: string
    name?: string
    avatarPath?: string
    phone?: string
}

export const UserService = {

    async getProfile(){
        return instance<IFullUser>({
            url: `${USERS}/profile`,
            method: 'GET',
        })
    },

    

    async updateProfile(data: TypeData) {
        return instance<IUser>({
            url: `${USERS}/profile`,
            method: 'PUT',
            data
        })
    },

    async toggleFavorite(productId: string | number) {
        return instance<IUser>({
            url: `${USERS}/profile/favorites/${productId}`,
            method: 'PATCH',
        })
    }
}

    

    
  
  


