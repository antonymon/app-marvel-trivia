import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import {
  ProfileImage,
  ProfileContainer,
  ComicsCircularProgress
} from "./styles";
import { SvgIcon } from "../../common/SvgIcon";

import { useSelector, useDispatch } from "react-redux";
import { SingIn } from "../../redux/userSlice";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";


const MySwal = withReactContent(Swal);

const Profile = (props) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Profile useEffect set data");
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setImagePreviewUrl(user.image);
    }
  }, [user]);


  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setUpdateUser(true);
  };


  const [updateUser, setUpdateUser] = useState(false);
  useEffect(() => {
    async function fetchUpdateUser() {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/test/updateUser/${user?.username}`;

        const configAxios = {
          headers: {
            'x-access-token': user?.accessToken
          }
        };

        let userUpdate = {};
        if (name) userUpdate.name = name;
        if (email) userUpdate.email = email;
        if (password) userUpdate.password = password;
        if (imagePreviewUrl) userUpdate.imageBase64 = imagePreviewUrl;

        const { data } = await axios.put(url, userUpdate, configAxios);

        if (data.userUpdatedResponse) {
          const { username, name, email, imageBase64 } = data.userUpdatedResponse;
          const newData = {
            username: username,
            name: name,
            email: email,
            roles: user?.roles,
            imageBase64: imageBase64,
            accessToken: user?.accessToken
          }
          dispatch(SingIn(null));
          dispatch(SingIn(newData));
          setLoading(false);
          MySwal.fire({
            title: <p className="titleAlert">{data.message ?? data.description.message}</p>,
            icon: 'ok',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green'
          })
          window.location.reload();
        }
      } catch (e) {
        console.log("Profile failed", { e });
        setLoading(false);
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
        setLoading(false);

        if (response.status === 401) {
          setLoading(false);
          dispatch(SingIn(null));
        }
      }
    }



    if (updateUser) {
      fetchUpdateUser();
      setUpdateUser(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUser]);

  const handleUploadImage = async (e) => {
    e.preventDefault();
    console.log("handleUploadImage");
    if (e.target.files[0] === null) {
      MySwal.fire({
        title: <p className="titleAlert">El avatar esta vacio.</p>,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'green'
      })
    } else {
      const MAX_SIZE_50Mb = 52428800;
      if (e.target.files[0].size > MAX_SIZE_50Mb) {
        MySwal.fire({
          title: <p className="titleAlert">El tamaño máximo de la imagen es 50Mb</p>,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'green'
        })
      } else {
        const reader = new FileReader();
        const fileResult = e.target.files[0];
        reader.onloadend = async () => {
          setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(fileResult);
        e.target.value = null;
      }
    }
  };

  if (loading) {
    return (
      <div>
        <ComicsCircularProgress />
      </div>
    );
  }
  else {
    return (
      <ProfileContainer>

        <div className="card">
          <div className="content sign">
            <ProfileImage>
              <span>
                <span>
                  <input type="file" accept="image/png*" onChange={handleUploadImage} />
                  <img className="upload" src="/img/upload.png" alt="upload" />
                </span>
                {
                  imagePreviewUrl ?
                    <img className="img" src={imagePreviewUrl} alt="profile" />
                    :
                    <img className="img" src={user?.imageBase64} alt="profile" />
                }

              </span>
            </ProfileImage>
            <div className="fields">
              <label className="field">
                <div className="icon">
                  <SvgIcon className={"loginPerson"} src={"loginPerson.svg"} />
                </div>
                <input type="text" className="name" placeholder={props.t("LoginSingUpTitlePlaceHolderName")} value={name} onChange={handleChangeName} />
              </label>

              <label className="field">
                <div className="icon">
                  <SvgIcon className={"loginEmail"} src={"loginEmail.svg"} />
                </div>
                <input type="email" className="email" placeholder={props.t("LoginSingUpTitlePlaceHolderEmail")} value={email} onChange={handleChangeEmail} />
              </label>

              <label className="field">
                <div className="icon">
                  <SvgIcon className={"loginPassword"} src={"loginPassword.svg"} />
                </div>
                <input type="password" className="password" placeholder={props.t("LoginSingUpTitlePlaceHolderPassword")} onChange={handleChangePassword} />
              </label>
            </div>

            <div className="divBtn">
              <button className="btnActualizar" onClick={handleSubmitSignUp}>
                Actualizar
              </button>
              <button className="btnCerrarSesion" onClick={() => {
                console.log({ user: user.actions });
                dispatch(SingIn(null));
                window.location.href = "/";
              }}>
                Cerrar sesión
              </button>
            </div>
          </div>

        </div>
      </ProfileContainer>
    );
  }
};


export default withTranslation()(Profile);
