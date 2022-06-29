import { FunctionComponent, useEffect, useState } from 'react'
import { List } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import bookingService from '../services/booking/bookingService';
import Booking from './Booking';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#a9a9a9'
        },
    }),
);


const Admin: FunctionComponent = (props) => {
    const [listBooking, setListBooking] = useState([]);
    const [visibleApproveModal, setVisibleApproveModal] = useState(false)
    const [visibleRejectModal, setVisibleRejectModal] = useState(false)
    const [proposedDate, setProposedDate] = useState([]);
    const [confirmDate, setConfirmDate] = useState("");
    const [reason, setReason] = useState("");
    const classes = useStyles();

    const fetchData = async () => {
        const response = await bookingService.getAll()
        return response
    }

    const handleClickApprove = (proposed_date: any) => {
        setProposedDate(proposed_date)
        setVisibleApproveModal(!visibleApproveModal)
    }

    const handleClickReject = () => {
        setVisibleRejectModal(!visibleRejectModal)
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmDate((event.target as HTMLInputElement).value);
    };

    const handleClickApproveConfirm = async () => {
        try {
            const update = {
                _id: localStorage.getItem("booking_id"),
                status: 'Approved',
                update_by: localStorage.getItem("user_id"),
                event_date: confirmDate
            }
            const result = await bookingService.updateBooking(update)
            if (result.status === 200) {
                setVisibleApproveModal(!visibleApproveModal)
            }
        } catch (error) {
            throw error;
        }
    }

    const handleClickRejectConfirm = async () => {
        try {
            const update = {
                _id: localStorage.getItem("booking_id"),
                status: 'Rejected',
                update_by: localStorage.getItem("user_id"),
                reason: reason
            }
            const result = await bookingService.updateBooking(update)
            if (result.status === 200) {
                setVisibleRejectModal(!visibleRejectModal)
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchData().then(res => setListBooking(res.data))
    }, [visibleApproveModal, visibleRejectModal])


    useEffect(() => {
        fetchData().then(res => setListBooking(res.data))
    }, [])


    return (
        <>
            <h2>ADMIN</h2>
            <List>
                {listBooking?.map((booking) => (
                    <Booking booking={booking} handleClickApprove={handleClickApprove} handleClickReject={handleClickReject} />
                ))}
            </List>
            <Modal
                open={visibleApproveModal}
                onClose={handleClickApprove}
                className={classes.modal}
            >
                <div className="approve-form">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Proposed-Date</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={confirmDate} onChange={handleRadioChange}>
                            <FormControlLabel value={proposedDate[0]} control={<Radio />} label={proposedDate[0]} />
                            <FormControlLabel value={proposedDate[1]} control={<Radio />} label={proposedDate[1]} />
                            <FormControlLabel value={proposedDate[2]} control={<Radio />} label={proposedDate[2]} />
                        </RadioGroup>
                    </FormControl>
                    <div className='approve-form-button'>
                        <input className='confirm-button approve' type="submit" value="Confirm" onClick={handleClickApproveConfirm} />
                        <input className='confirm-button reject' type="submit" value="Cancel" onClick={handleClickApprove} />
                    </div>
                </div>
            </Modal>
            <Modal
                open={visibleRejectModal}
                onClose={handleClickReject}
                className={classes.modal}
            >
                <form>
                    <input type="text" placeholder='Reason' className="reason-input" onChange={(event) => setReason(event.target.value)} />
                    <div className='approve-form-button'>
                        <input className='confirm-button approve' value="Confirm" onClick={handleClickRejectConfirm} />
                        <input className='confirm-button reject' value="Cancel" onClick={() => setVisibleRejectModal(false)} />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Admin;