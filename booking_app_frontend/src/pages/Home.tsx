import { FunctionComponent } from 'react'
import Admin from './Admin';
import User from './User';

const Home: FunctionComponent = (props) => {
    const role = localStorage.getItem("role")
    return (
        <div>{role === 'admin' ? <Admin /> : <User />}</div>
    )
}

export default Home;