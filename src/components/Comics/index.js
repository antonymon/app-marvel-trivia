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
  ComicsDivButton
} from "./styles";
import { Col, Row } from "antd";

import Characters from "../../components/Characters";

const Comics = (props) => {
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
          const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/comics/${comicId}`;

          const { data } = await axios.get(url);

          setComicData(data.data.results[0]);

          const characters = data.data.results[0].characters.items;
          setCharacters(characters);

          setLoading(false);
        } catch (e) {
          console.log(e);
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
                            {
                              console.log("comicData.description", comicData.description)
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
        </ComicsContainer>
      </>
    );
  }
};

export default withTranslation()(Comics);
