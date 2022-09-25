import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
// import { Button } from "../../common/Button";
import {
  MiddleBlockSection,
  ContentWrapper,
  Leaderboard,
  MiddleCircularProgress
} from "./styles";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const MiddleBlock = ({ title, content, button, t, id }) => {
  const user = useSelector((state) => state.user);
  console.log("MiddleBlock: ", user);

  // const scrollTo = (id) => {
  //   const element = document.getElementById(id);
  //   element.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };

  const [loading, setLoading] = useState(false);
  const [dataPuntos, setDataPuntos] = useState([]);

  useEffect(() => {
    console.log("Leaderboard useEffect");
    async function fetchData() {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/maintenance/questions/pointsAll`;
        const response = await axios.get(url);
        setDataPuntos(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <MiddleCircularProgress />
      </div>
    );
  } else {
    return (
      <MiddleBlockSection>
        <Slide direction="up">
          <Row justify="center" align="middle" id={id}>
            <ContentWrapper>
              <Col lg={24} md={24} sm={24} xs={24}>
                <h6>{t(title)}</h6>
                {/* <Content>{t(content)}</Content> */}
                <Leaderboard>
                  <div className="content">
                    {
                      user?.accessToken && user?.roles?.includes("ROLE_USER")
                        ?
                        dataPuntos?.map((item, index) => {
                          if (item?.email === user?.email) {
                            return (
                              <div className="info">
                                <div className="card medium-card">
                                  <div className="left">
                                    <h2 className="small-txt">Mi Puesto</h2>
                                    <h1 className="medium-txt">{index + 1}</h1>
                                  </div>
                                  <div className="right">
                                    <h2 className="small-txt">Mis Puntos</h2>
                                    <h1 className="medium-txt">{item.points}</h1>
                                  </div>
                                </div>
                                <div className="dark profile medium-card">
                                  <h1 id="profile-top-txt">Perfil Personal</h1>
                                  <img
                                    alt=""
                                    className="card-avatar"
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Skull&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Yellow"
                                  />
                                  <h1 id="profile-mid-txt">Usuario</h1>
                                  <h1 id="profile-bot-txt" className="blue">
                                    {item?.email}
                                  </h1>
                                </div>
                                {/* <div className="dark profile medium-card">
                                  <h1 className="medium-txt">
                                    <span id="txt-recently-title">Resultado Reciente</span>
                                  </h1>
                                  <div className="recent">
                                    <h1 className="txt-recently">{new Date(item.createdAt).toLocaleString()}</h1>
                                    <h1 className="txt-recently">{item?.comicId}</h1>
                                    <h1 className="txt-recently blue">{item?.points}</h1>
                                  </div>
                                </div> */}
                              </div>
                            );
                          }
                          return null;
                        })
                        : null
                    }
                    <div className="dark table-div">
                      <div id="top-table">
                        <h1 id="table-title">RECEIVED KUDOS</h1>
                        <h2 className="dark" id="table-date">
                          {new Date().toLocaleString()}
                        </h2>
                      </div>
                      <table>
                        <thead>
                          <tr id="tr-head">
                            <th scope="col">Puesto</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Puntos</th>
                            <th scope="col">Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            dataPuntos?.slice(0, 3).map((item, index) => (
                              <tr key={item.id}>
                                <th data-label="Puesto">
                                  <h3>
                                    {
                                      index + 1 === 1 ?
                                        <span className="gold-background rounded-span">
                                          {index + 1}
                                          <sup>st</sup>
                                        </span>
                                        : index + 1 === 2 ?
                                          <span className="silver-background rounded-span">
                                            {index + 1}
                                            <sup>nd</sup>
                                          </span>
                                          : index + 1 === 3 ?
                                            <span className="brown-background rounded-span">
                                              {index + 1}
                                              <sup>rd</sup>
                                            </span>
                                            :
                                            <span className="blue-background rounded-span">
                                              {index + 1}
                                              <sup>th</sup>
                                            </span>
                                    }

                                  </h3>
                                </th>
                                <th data-label="Avatar">
                                  <img
                                    alt=""
                                    className="avatar-table"
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Skull&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Yellow"
                                  />
                                </th>
                                <th data-label="Usuario">{item.email}</th>
                                <th data-label="Puntos" className="points gold">
                                  {item.points}
                                </th>
                                <th data-label="Fecha" className="date">
                                  {new Date(item.createdAt).toLocaleString()}
                                </th>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>

                  </div>
                </Leaderboard>
                {/* {button && (
                  <Button name="submit" onClick={() => scrollTo("mission")}>
                    {t(button)}
                  </Button>
                )} */}
              </Col>
            </ContentWrapper>
          </Row>
        </Slide>
      </MiddleBlockSection>
    );
  }
};

export default withTranslation()(MiddleBlock);
