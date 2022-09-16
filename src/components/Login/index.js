import { withTranslation } from "react-i18next";
import { LoginContainer, CharactersH1, CharactersCircularProgress } from "./styles";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import { useState } from "react";

import axios from "axios";

const Login = (props) => {

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

    const handleSubmitSignIn = (e) => {
        e.preventDefault();
        setLoading(true);
        singIn();
        setLoading(false);
    };

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        setLoading(true);
        singUp();
        setLoading(false);
    };

    const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/auth/signin`;

    async function singIn() {
        try {

            let user = {
                username: email,
                password: password
            }

            const { data } = await axios.post(url, user);
            console.log({ data });
        }
        catch (e) {
            console.log(e);
        }
    }

    async function singUp() {
        try {
            setLoading(true);
            let user = {
                username: name,
                email: email,
                password: password
            }

            const { data } = await axios.post(url, user);
            console.log({ data });
        }
        catch (e) {
            console.log(e);
        }
    }

    if (loading) {
        return (
            <>
                <CharactersCircularProgress />
                <CharactersH1>{props.t("CharactersResultLoading")}</CharactersH1>
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
                                {props.t("LoginSigInButton")}
                            </Button>
                        </div>
                    </div>
                </div>
            </LoginContainer>
        );
    }

}

export default withTranslation()(Login);