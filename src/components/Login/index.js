import { withTranslation } from "react-i18next";
import {
    LoginContainer,
    LoginH1,
    LoginCircularProgress
} from "./styles";

import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import { useState } from "react";

import axios from "axios";

import { useDispatch } from 'react-redux';
import { singIn } from '../../redux/userSlice';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)



const Login = (props) => {

    const dispatch = useDispatch();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        console.log("handleSubmitSignIn");
        if (email === "" || password === "") {
            MySwal.fire({
                title: <p className="titleAlert">Email or Password is empty</p>,
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'green'
            })
        } else {
            setLoading(true);
            await singInSendData();
            setLoading(false);
        }
    };

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        console.log("handleSubmitSignUp");
        if (name === "" || email === "" || password === "") {
            MySwal.fire({
                title: <p className="titleAlert">Name, Email or Password is empty</p>,
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'green'
            })
        } else {
            setLoading(true);
            await singUpSendData();
            setLoading(false);
        }
    };

    const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/auth`;

    async function singInSendData() {
        try {
            console.log("singIn");

            setLoading(true);

            let user = {
                email: email,
                password: password
            }

            const { data } = await axios.post(`${url}/signin`, user);

            setLoading(false);

            if (data) {
                console.log("login success" + data);

                dispatch(singIn(data));

                MySwal.fire({
                    title: <p className="titleAlert">Success!</p>,
                    text: 'You have been logged in!',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                    willClose: () => {
                        window.location.href = "/home";
                    }
                })
            }
            else {
                console.log("login failed");

                MySwal.fire({
                    title: <p className="titleAlert">Error!</p>,
                    text: 'Something went wrong!',
                    icon: 'error',
                    timer: 2000,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
            }


        }
        catch (e) {
            console.log("login failed", { e });

            const { response } = e;
            const data = response.data.error ? response.data.error : response.data;

            if (response) {
                MySwal.fire({
                    title: <p className="titleAlert">{data.description.message}</p>,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
            }
            else {
                MySwal.fire({
                    title: <p className="titleAlert">Something went wrong</p>,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
            }
        }
    }

    async function singUpSendData() {
        try {
            console.log("singUp");

            setLoading(true);

            let user = {
                name: name,
                username: email.split("@")[0],
                email: email,
                password: password,
                roles: ["user"]
            }

            const { data } = await axios.post(`${url}/signup`, user);

            setLoading(false);

            if (data) {
                console.log("singUp success" + data);

                //dispatch(singUp(data));
                let user = {
                    email: email,
                    password: password
                }

                const dataLogin = await axios.post(`${url}/signin`, user);

                if (dataLogin.data) {
                    console.log("login success" + dataLogin.data);

                    dispatch(singIn(dataLogin.data));
                    MySwal.fire({
                        title: <p className="titleAlert">Success!</p>,
                        text: 'You have registred!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                        willClose: () => {
                            window.location.href = "/home";
                        }
                    })
                }
                else {
                    MySwal.fire({
                        title: <p className="titleAlert">Something went wrong</p>,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: 'green'
                    })
                }


            }
            else {
                console.log("singUp failed");

                MySwal.fire({
                    title: <p className="titleAlert">Error!</p>,
                    text: 'Something went wrong!',
                    icon: 'error',
                    timer: 2000,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
            }


        }
        catch (e) {
            console.log("singUp failed", { e });

            const { response } = e;

            const data = response.data.error ? response.data.error : response.data;

            if (response) {
                MySwal.fire({
                    title: <p className="titleAlert">{data.description.message ?? data.description}</p>,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
            }
            else {
                MySwal.fire({
                    title: <p className="titleAlert">Something went wrong</p>,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
            }
        }
    }

    if (loading) {
        return (
            <>
                <LoginCircularProgress />
                <LoginH1>{props.t("LoginResultLoading")}</LoginH1>
            </>
        );
    }
    else {
        return (

            <LoginContainer>
                <h6 className="title" id={props.id}>{props.t("LoginTitle")}</h6>
                <input id="input" className="input" type="checkbox" />
                <label htmlFor="input" className="toggle">
                    <span className="text sign-text">{props.t("LoginSingUpToggle")}</span>
                    <span className="icon">
                        <SvgIcon className={"arrow"} src={"loginToggle.svg"} />
                    </span>
                    <span className="text log-text">{props.t("LoginSingInToggle")}</span>
                </label>

                <div className="card">
                    <div className="content sign">
                        <h2 className="title">{props.t("LoginSingUpTitle")}</h2>
                        <div className="fields">
                            <label className="field">
                                <div className="icon">
                                    <SvgIcon className={"loginPerson"} src={"loginPerson.svg"} />
                                </div>
                                <input type="text" className="name" placeholder={props.t("LoginSingUpTitlePlaceHolderName")} onChange={handleChangeName} />
                            </label>

                            <label className="field">
                                <div className="icon">
                                    <SvgIcon className={"loginEmail"} src={"loginEmail.svg"} />
                                </div>
                                <input type="email" className="email" placeholder={props.t("LoginSingUpTitlePlaceHolderEmail")} onChange={handleChangeEmail} />
                            </label>

                            <label className="field">
                                <div className="icon">
                                    <SvgIcon className={"loginPassword"} src={"loginPassword.svg"} />
                                </div>
                                <input type="password" className="password" placeholder={props.t("LoginSingUpTitlePlaceHolderPassword")} onChange={handleChangePassword} />
                            </label>
                        </div>

                        <div className="submit">
                            <Button name="submit" type="submit" onClick={handleSubmitSignUp}>
                                {props.t("LoginSingUpButton")}
                            </Button>
                        </div>
                    </div>
                    <div className="content log">
                        <h2 className="title">{props.t("LoginSigIntitle")}</h2>
                        <div className="fields">
                            <label className="field">
                                <div className="icon">
                                    <SvgIcon className={"loginEmail"} src={"loginEmail.svg"} />
                                </div>
                                <input type="email" className="email" placeholder={props.t("LoginSingInTitlePlaceHolderEmail")} onChange={handleChangeEmail} />
                            </label>

                            <label className="field">
                                <div className="icon">
                                    <SvgIcon className={"loginPassword"} src={"loginPassword.svg"} />
                                </div>
                                <input type="password" className="password" placeholder={props.t("LoginSingInTitlePlaceHolderPassword")} onChange={handleChangePassword} />
                            </label>
                        </div>

                        <div className="submit">
                            <Button name="submit" type="submit" className="button-submit" onClick={handleSubmitSignIn}>
                                {props.t("LoginSingInButton")}
                            </Button>
                        </div>
                    </div>
                </div>
            </LoginContainer>
        );
    }

}

export default withTranslation()(Login);