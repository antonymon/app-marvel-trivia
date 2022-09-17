import React, { useState, useEffect } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";
import ScrollToTop from "../../common/ScrollToTop";
import { Redirect } from "react-router-dom";
import {
  ComicsContainer,
  ComicsCard,
  CharactersCards,
  ComicsCardContent,
  ComicsCardMedia,
  ComicsTypography,
  ComicsCardHeader,
  ComicsTitle,
  ComicsButtonBack,
  ComicsCircularProgress,
  ComicsP,
  ComicsDiv,
  ComicsDivButton,
  ComicsTableContainer
} from "./styles";

import { Col, Row } from "antd";

import Characters from "../../components/Characters";

import { useSelector, useDispatch } from "react-redux";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { SvgIcon } from "../../common/SvgIcon";

const MySwal = withReactContent(Swal);

const Comics = (props) => {
  const user = useSelector((state) => state.user);
  const maintenance = useSelector((state) => state.user.maintenance);
  const dispatch = useDispatch();

  console.log("Comics: ", user, maintenance);

  const [isMaintenance, setMaintenance] = useState(false);

  useEffect(() => {
    console.log("useEffect Comics Maintenance");
    console.log({ maintenance });
    if (maintenance?.isMaintenance)
      setMaintenance(true);
    else
      setMaintenance(false);
  }, [maintenance, dispatch]);

  const [comicData, setComicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let comicId = props.match.params.id;

      if (parseInt(comicId) < 0 || comicId.match(/^[0-9]+$/) == null) {
        setComicData([]);
        setCharacters([]);
        setLoading(false);
      } else {
        try {
          setLoading(true);

          let comicId = props.match.params.id;
          const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/external/apiMarvel/comics/${comicId}`;

          const configAxios = {
            headers: {
              'x-access-token': user?.accessToken
            }
          };

          const { data } = await axios.get(url, configAxios);

          setComicData(data.data.results[0]);

          const characters = data.data.results[0].characters.items;
          setCharacters(characters);

          setLoading(false);
        } catch (e) {
          console.log("Comics failed", { e });

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
          setLoading(false);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [props.match.params.id]);

  if (loading) {
    return (
      <div>
        <ComicsCircularProgress />
      </div>
    );
  } else if (comicData.length === 0) {
    return <Redirect to={"/error/comics?id=" + props.match.params.id}></Redirect>;
  } else {
    let charImgUrl = "";
    charImgUrl =
      comicData.thumbnail.path +
      "/landscape_incredible." +
      comicData.thumbnail.extension;

    return (
      <>
        <ScrollToTop component={"comics"} />
        <ComicsDivButton id="comics">
          <ComicsButtonBack to="/comics/page/0">
            {props.t("ComicsButtonBack")}
          </ComicsButtonBack>
        </ComicsDivButton>

        <ComicsContainer>
          <Row justify="space-between">
            <Row>
              <Col lg={11} md={11} sm={12} xs={24}>
                <ComicsCard variant="outlined">

                  <ComicsCardHeader title={comicData.title} />
                  <ComicsCardMedia
                    component="img"
                    image={charImgUrl ? charImgUrl : "/img/no-img.jpeg"}
                    title={comicData.title + " image"}
                  />
                  <ComicsCardContent>
                    <ComicsTypography variant="body2" color="textSecondary" component="span">
                      <div>
                        <div>
                          <ComicsTitle>{props.t("ComicsTitleDescription")} </ComicsTitle>
                          <ComicsP>
                            {comicData.description
                              ? comicData.description.replaceAll("<br>", "")
                              : props.t("ComicsDescription")
                            }
                          </ComicsP>
                        </div>
                        <div>
                          <ComicsTitle>
                            {props.t("ComicsTitleCharacters")}{" "}
                            {comicData.characters.available > 0
                              ? comicData.characters.available
                              : props.t("ComicsDescriptionCharacters")}
                          </ComicsTitle>
                          <ComicsDiv>
                            <ol>
                              {comicData.characters.items.map((item, index) => (
                                <li key={index}>{item.name}</li>
                              ))}
                            </ol>
                          </ComicsDiv>
                        </div>
                      </div>
                    </ComicsTypography>
                  </ComicsCardContent>
                </ComicsCard>
              </Col>
              <Col lg={11} md={11} sm={12} xs={24}>
                <CharactersCards>
                  <Characters {...props} characters={characters} />
                </CharactersCards>
              </Col>
            </Row>
          </Row >

          {
            isMaintenance ?
              (
                <ComicsTableContainer>
                  <h6>Question's</h6>
                  <table>
                    <tbody>
                      <tr>
                        <th>#</th>
                        <th>Comic</th>
                        <th>Character</th>
                        <th>Type Question</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Points</th>
                        <th>Options</th>
                      </tr>
                      <tr>
                        <td data-th="#">
                          UPS5005
                        </td>
                        <td data-th="Comic">
                          UPS
                        </td>
                        <td data-th="Character">
                          ASDF19218
                        </td>
                        <td data-th="Type Question">
                          06/25/2016
                        </td>
                        <td data-th="Question">
                          12/25/2016
                        </td>
                        <td data-th="Answer">
                          $8,322.12
                        </td>
                        <td data-th="Points">
                          10
                        </td>
                        <td data-th="Options">
                          <span>
                            <SvgIcon src={"edit.svg"} alt={"edit.svg"} width={"auto"} height={"auto"} />
                          </span>
                          <span>
                            <SvgIcon src={"delete.svg"} alt={"delete.svg"} width={"auto"} height={"auto"} />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </ComicsTableContainer>
              )
              : null
          }


        </ComicsContainer>
      </>
    );
  }
};

export default withTranslation()(Comics);
