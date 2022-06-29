import { AnyObjectSchema } from "yup";
import Client from "../Client";

const getAll = async (): Promise<any> => {
    return Client.get(`/bookings`)
};

const updateBooking = async (update: any): Promise<any> => {
    return Client.put(`/bookings/${update._id}`, update)
}

const getBookingByUser = async (user_id: any): Promise<any> => {
    return Client.post(`/users/bookings`, { user_id: user_id })
}

export default {
    getAll,
    updateBooking,
    getBookingByUser
}