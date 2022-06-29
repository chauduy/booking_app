import { FunctionComponent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import mainLogo from '../resource/images/fullerton-health.png'
import { LoginDto } from '../services/login/dto';
import loginService from '../services/login/loginService';

const schema = yup.object().shape({
    email: yup.string().email('This must be a valid email').max(255).required('Email is required'),
    password: yup.string().required('Password is required')
})

const Login: FunctionComponent = (props) => {
    const [response, setResponse] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<LoginDto>({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    const submitForm: SubmitHandler<LoginDto> = async (data) => {
        try {

            const result = await loginService.login(data)
            if (result) {
                localStorage.setItem("role", result.data.role[0])
                localStorage.setItem("user_id", result.data.user_id)
                localStorage.setItem("access_token", result.data.access_token)
            }
            if (result.status === 200) {
                navigate('/home')
            }
        } catch (error) {
            setResponse("Credentials incorrect")
        }
    }


    return (
        <>
            <div className='wrapper'>
                <img src={mainLogo} />
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className='input-frame'>
                        <input type="text" placeholder='Email'{...register("email")} className="input" />
                        <p className='text-error'>{errors.email?.message}</p>
                        <input type="password" placeholder='Password' {...register("password")} className="input" />
                        <p className='text-error'>{errors.password?.message}</p>
                    </div>
                    <p className='text-error'>{response}</p>
                    <input className='login-button' type="submit" value="Login" />
                </form>
            </div>
        </>
    )
}

export default Login;