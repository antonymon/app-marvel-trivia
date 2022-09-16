import React, { useState, useEffect } from "react";
import axios from "axios";

import ScrollToTop from "../../common/ScrollToTop";
import { Link, Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { ComicsListLinkNext, ComicsListLinkPrevious } from "./styles";

import Search from "../Search";

import {
  ComicsListCard,
  ComicsListCardActionArea,
  ComicsListCardContent,
  ComicsListCardMedia,
  ComicsListGrid,
  ComicsListTypography,
  ComicsListCircularProgress,
  ComicsListPagination
} from "./styles";

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [responseData, setResponseData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  let card = null;

  useEffect(() => {
    async function fetchData() {
      let pageNum = props.match.params.page;

      if (parseInt(pageNum) < 0 || pageNum.match(/^[0-9]+$/) == null) {
        setComicsList([]);
        setLoading(false);
      } else {
        try {
          setLoading(true);

          let pageNum = props.match.params.page;
          const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/external/apiMarvel/comicList/${pageNum}`;

          const { data } = await axios.get(url);

          setComicsList(data.data.results);
          setResponseData(data.data);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
    return () => {
      setSearchTerm("");
    };
    // eslint-disable-next-line
  }, [props.match.params.page]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const paginationButtons = () => {
    let pageNum = props.match.params.page;
    let lastPageDec = parseInt(responseData.total) / 20;
    let lastPage = Math.floor(lastPageDec);
    if (lastPageDec - lastPage <= 0) {
      lastPage = lastPage - 1;
    }

    if (searchTerm) {
      return <div></div>;
    } else if (pageNum === "0") {
      return (
        <ComicsListPagination>
          <ComicsListLinkNext
            to={`/comics/page/${parseInt(props.match.params.page) + 1}`}
          >
            {props.t("SearchResultNextButton")}
          </ComicsListLinkNext>
        </ComicsListPagination>
      );
    } else if (parseInt(pageNum) === lastPage) {
      return (
        <ComicsListPagination>
          <ComicsListLinkPrevious
            to={`/comics/page/${parseInt(props.match.params.page) - 1}`}
          >
            {props.t("SearchResultPreviousButton")}
          </ComicsListLinkPrevious>
        </ComicsListPagination>
      );
    } else {
      return (
        <ComicsListPagination>
          <ComicsListLinkPrevious
            to={`/comics/page/${parseInt(props.match.params.page) - 1}`}
          >
            {props.t("SearchResultPreviousButton")}
          </ComicsListLinkPrevious>
          <ComicsListLinkNext
            to={`/comics/page/${parseInt(props.match.params.page) + 1}`}
          >
            {props.t("SearchResultNextButton")}
          </ComicsListLinkNext>
        </ComicsListPagination>
      );
    }
  };

  const buildCard = (comic) => {
    let charImgUrl = "";

    if (comic.thumbnail.path && comic.thumbnail.extension) {
      charImgUrl =
        comic.thumbnail.path + "/standard_xlarge." + comic.thumbnail.extension;
    }

    return (
      <ComicsListGrid item xs={12} sm={6} md={4} lg={3} xl={2} key={comic.id}>
        <ComicsListCard variant="outlined">
          <ComicsListCardActionArea>
            <Link to={`/comics/${comic.id}`}>
              <ComicsListCardMedia
                component="img"
                image={charImgUrl ? charImgUrl : "/img/no-img.jpeg"}
                title={comic.name + " image"}
              />

              <ComicsListCardContent>
                <ComicsListTypography
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  {comic.title}
                </ComicsListTypography>
              </ComicsListCardContent>
            </Link>
          </ComicsListCardActionArea>
        </ComicsListCard>
      </ComicsListGrid>
    );
  };

  if (comicsList) {
    card =
      comicsList &&
      comicsList.map((comic) => {
        return buildCard(comic);
      });
  }

  if (loading) {
    return (
      <div>
        <ComicsListCircularProgress />
        <h1>{props.t("SearchResultLoading")}</h1>
      </div>
    );
  } else if (searchTerm) {
    return <Redirect to={"/search/comics/" + searchTerm}></Redirect>;
  } else if (comicsList.length === 0) {
    return (
      <Redirect
        to={"/error/comicsList?page=" + props.match.params.page}
      ></Redirect>
    );
  } else {
    return (
      <div id="comicsList">
        <ScrollToTop component={"comicsList"} />
        <Search searchValue={searchValue} />
        {paginationButtons()}
        <ComicsListGrid container spacing={3}>
          {card}
        </ComicsListGrid>
      </div>
    );
  }
};

export default withTranslation()(ComicsList);
