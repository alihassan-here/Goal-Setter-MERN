import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const { name, email, password, password2 } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);


    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = e => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match');
        }
        else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData));
        }
    }
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            id='name'
                            name="name"
                            value={name}
                            placeholder="Enter your Name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            id='email'
                            name="email"
                            value={email}
                            placeholder="Enter your Email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"
                            id='password'
                            name="password"
                            value={password}
                            placeholder="Enter your Password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"
                            id='password2'
                            name="password2"
                            value={password2}
                            placeholder="Confirm Password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register