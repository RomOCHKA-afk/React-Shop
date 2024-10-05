import { IReview } from "@/types/review.interface"
import { instance } from "@/api/api.interceptor"
import { IOrder } from "@/types/order.interface"


const ORDERS = 'orders'


export const OrderService = {

    async getAll() {
        return instance<IOrder[]>({
            url: ORDERS,
            method: 'GET',
        })
    },
}



