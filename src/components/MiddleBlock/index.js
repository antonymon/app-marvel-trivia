import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import {
  MiddleBlockSection,
  ContentWrapper,
  Leaderboard,
} from "./styles";

const MiddleBlock = ({ title, content, button, t, id }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
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
                  <div className="info">
                    <div className="card medium-card">
                      <div className="left">
                        <h2 className="small-txt">My Rank</h2>
                        <h1 className="medium-txt">3RD PLACE</h1>
                      </div>
                      <div className="right">
                        <h2 className="small-txt">My Score</h2>
                        <h1 className="medium-txt">24</h1>
                      </div>
                    </div>
                    <div className="dark profile medium-card">
                      <h1 id="profile-top-txt">Top Sender Last Week</h1>
                      <img
                        alt=""
                        className="card-avatar"
                        src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Skull&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Yellow"
                      />
                      <h1 id="profile-mid-txt">DANIEL RICCIARDO</h1>
                      <h1 id="profile-bot-txt" className="blue">
                        DANIEL RICCIARDO
                      </h1>
                    </div>
                    <div className="dark profile medium-card">
                      <h1 className="medium-txt">
                        <span id="txt-recently-title">Recently Results</span>
                      </h1>
                      <div className="recent">
                        <h1 className="txt-recently">5 minutes ago</h1>
                        <h1 className="txt-recently">Nexivis</h1>
                        <h1 className="txt-recently blue">500</h1>
                      </div>
                    </div>
                  </div>
                  <div className="dark table-div">
                    <div id="top-table">
                      <h1 id="table-title">RECEIVED KUDOS</h1>
                      <h2 className="dark" id="table-date">
                        Sunday, Feb. 23 - Sunday, Feb. 30
                      </h2>
                    </div>
                    <table>
                      <thead>
                        <tr id="tr-head">
                          <th scope="col">Rank</th>
                          <th scope="col">Avatar</th>
                          <th scope="col">Username</th>
                          <th scope="col">Points</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th data-label="Rank">
                            <h3>
                              <span className="gold-background rounded-span">
                                1
                              </span>
                            </h3>
                          </th>
                          <th data-label="Avatar">
                            <img
                              alt=""
                              className="avatar-table"
                              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Skull&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Yellow"
                            />
                          </th>
                          <th data-label="Username">Nexivis</th>
                          <th data-label="Points" className="points gold">
                            300
                          </th>
                          <th data-label="Date" className="date">
                            3 minutes ago
                          </th>
                        </tr>
                        {/* <!-- NEXT --> */}
                        <tr>
                          <th data-label="Rank">
                            <h3>
                              <span className="silver-background rounded-span">
                                2
                              </span>
                            </h3>
                          </th>
                          <th data-label="Avatar">
                            <img
                              alt=""
                              className="avatar-table"
                              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Skull&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Yellow"
                            />
                          </th>
                          <th data-label="Username">Nexivis</th>
                          <th data-label="Points" className="points silver">
                            200
                          </th>
                          <th data-label="Date" className="date">
                            1 minutes ago
                          </th>
                        </tr>
                        {/* <!-- NEXT --> */}
                        <tr>
                          <th data-label="Rank">
                            <h3>
                              <span className="brown-background rounded-span">
                                3
                              </span>
                            </h3>
                          </th>
                          <th data-label="Avatar">
                            <img
                              alt=""
                              className="avatar-table"
                              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Skull&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Yellow"
                            />
                          </th>
                          <th data-label="Username">Nexivis</th>
                          <th data-label="Points" className="points brown">
                            200
                          </th>
                          <th data-label="Date" className="date">
                            1 minutes ago
                          </th>
                        </tr>
                        {/* <!-- NEXT --> */}
                        <tr>
                          <th data-label="Rank">
                            <h3>
                              <span className="blue-background rounded-span">
                                4
                              </span>
                            </h3>
                          </th>
                          <th data-label="Avatar">
                            <img
                              alt=""
                              className="avatar-table"
                              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Skull&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Yellow"
                            />
                          </th>
                          <th data-label="Username">Nexivis</th>
                          <th data-label="Points" className="points blue">
                            50
                          </th>
                          <th data-label="Date" className="date">
                            32 minutes ago
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Leaderboard>
              {button && (
                <Button name="submit" onClick={() => scrollTo("mission")}>
                  {t(button)}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
