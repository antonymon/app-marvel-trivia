import React, { useState, useEffect } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";
import ScrollToTop from "../../common/ScrollToTop";

import { Link } from "react-router-dom";

import {
  ComicsListCard,
  ComicsListCardActionArea,
  ComicsListCardContent,
  ComicsListCardMedia,
  ComicsListGrid,
  ComicsListTypography,
  ComicsListsearchResultTerm,
  ComicsListCircularProgress,
  ComicsListLinkBack,
  ComicsListsearchResultContainer,
  ComicsListsearchResultDiv
} from "./styles";

const SearchResult = (props) => {
  const searchTerm = String(props.match.params.query);
  const searchListing = props.match.params.listing;
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  let card = null;

  useEffect(() => {
    async function fetchData() {
      console.log('search term:' + searchTerm)
      try {
        setLoading(true);
        if (searchTerm === "0") {
          setSearchData({ results: [] });
        } else {
          const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/search/${searchListing}/${searchTerm}`;
          const { data } = await axios.get(url);
          setSearchData(data.data);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [props.match.params.listing, props.match.params.query]);

  const linkTo = () => {
    if (searchListing === "characters") {
      return "characters";
    } else if (searchListing === "comics") {
      return "comics";
    } else {
      return "series";
    }
  };

  const buildCard = (listing) => {
    let charImgUrl = "";

    if (listing.thumbnail.path && listing.thumbnail.extension) {
      charImgUrl =
        listing.thumbnail.path +
        "/standard_xlarge." +
        listing.thumbnail.extension;
    }

    return (
      <ComicsListGrid item xs={12} sm={6} md={4} lg={3} xl={2} key={listing.id}>
        <ComicsListCard variant="outlined">
          <ComicsListCardActionArea>
            <Link to={`/${linkTo()}/${listing.id}`}>
              <ComicsListCardMedia
                component="img"
                image={charImgUrl ? charImgUrl : "/img/no-img.jpeg"}
                title={listing.name + " image"}
              />
              <ComicsListCardContent>
                <ComicsListTypography
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  {searchListing === "characters"
                    ? listing.name
                    : listing.title}
                </ComicsListTypography>
              </ComicsListCardContent>
            </Link>
          </ComicsListCardActionArea>
        </ComicsListCard>
      </ComicsListGrid>
    );
  };

  const searchResultTerm = () => {
    if (searchData.results && searchData.results.length !== 0) {
      return (
        <ComicsListsearchResultTerm>
          <span>{props.t("SearchResultListSeriesMessage")} {searchTerm}</span>
        </ComicsListsearchResultTerm>
      );
    }
  };

  const backToBtn = () => {
    if (searchListing === "characters") {
      return (
        <ComicsListLinkBack to="/characters/page/0">
          {props.t("SearchResultListCharactersButton")}
        </ComicsListLinkBack>
      );
    } else if (searchListing === "comics") {
      return (
        <ComicsListLinkBack to="/comics/page/0">
          {props.t("SearchResultListComicsButton")}
        </ComicsListLinkBack>
      );
    } else if (searchListing === "series") {
      return (
        <ComicsListLinkBack to="/series/page/0">
          {props.t("SearchResultListSeriesButton")}
        </ComicsListLinkBack>
      );
    }
  };

  if (searchTerm) {
    card =
      searchData.results &&
      searchData.results.map((listing) => {
        return buildCard(listing);
      });
  }

  if (loading) {
    return (
      <div>
        <ComicsListCircularProgress />
        <h1>{props.t("SearchResultLoading")}</h1>
      </div>
    );
  } else if (searchData.results && searchData.results.length === 0) {
    return (
      <div>
        <h1>{props.t("SearchResultListSeriesMessage404")}</h1>
        <ComicsListsearchResultDiv>
          <ComicsListLinkBack to="/comics/page/0">
            {props.t("SearchResultListComicsButton")}
          </ComicsListLinkBack>
        </ComicsListsearchResultDiv>
      </div>
    );
  } else {
    return (
      <ComicsListsearchResultContainer id="searchResult">
        <ScrollToTop component={"searchResult"} />
        {backToBtn()}
        {searchResultTerm()}
        <ComicsListGrid container spacing={3}>
          {card}
        </ComicsListGrid>
      </ComicsListsearchResultContainer>
    );
  }
};

export default withTranslation()(SearchResult);
