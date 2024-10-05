import { errorCatch } from "@/api/api.helper";
import { UserService } from "@/services/product/user.service";
import { IFullUser, IUser } from "@/types/user.interface";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useProfile = () => {
    const { user } = useAuth();
    const { data, error } = useQuery(['get profile'], UserService.getProfile, {
        select: data => data,
        enabled: !!user // Включаем запрос только если пользователь авторизован
    });

    if (error) {
        console.log(errorCatch(error));
    }

    return { profile: data };
};
