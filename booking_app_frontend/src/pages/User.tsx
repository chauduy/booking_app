import { List } from '@material-ui/core';
import { FunctionComponent, useEffect, useState } from 'react'
import bookingService from '../services/booking/bookingService';
import Booking from './Booking';

const User: FunctionComponent = (props) => {
    const [listBooking, setListBooking] = useState([]);
    const user_id = localStorage.getItem("user_id")?.toString()

    const fetchData = async () => {
        const response = await bookingService.getBookingByUser(user_id)
        return response
    }

    useEffect(() => {
        fetchData().then(res => setListBooking(res.data))
    }, [])

    return (
        <>
            <h2>User</h2>
            <List>
                {listBooking?.map((booking) => (
                    <Booking booking={booking} />
                ))}
            </List>
        </>
    )
}

export default User;