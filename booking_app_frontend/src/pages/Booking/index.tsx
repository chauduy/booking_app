import { FunctionComponent } from 'react'
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';

interface BookingProps {
    booking: any;
    handleClickApprove?: (proposed_date: any) => void;
    handleClickReject?: () => void;
}

const Booking: FunctionComponent<BookingProps> = (props: any) => {
    const { booking } = props;

    const handleClickApprove = (id: string, proposed_date: any) => {
        localStorage.setItem("booking_id", id)
        props.handleClickApprove(proposed_date)
    }

    const handleClickReject = (id: string) => {
        localStorage.setItem("booking_id", id)
        props.handleClickReject()
    }
    return (
        <>
            <ListItem >
                <ListItemText primary={booking.type} />
                <ListItemText primary={booking.location} />
                <ListItemText primary={booking.status} />
                <input className='confirm-button approve' type="submit" value="Approve" onClick={() => handleClickApprove(booking._id, booking.proposed_date)} />
                <input className='confirm-button reject' type="submit" value="Reject" onClick={() => handleClickReject(booking._id)} />
            </ListItem>
        </>
    )
}

export default Booking;