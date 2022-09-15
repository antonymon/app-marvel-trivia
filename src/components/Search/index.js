import { Row } from "antd";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { SearchForm, SearchBar, SearchBtn } from "./styles";

const Search = (props) => {
  const [target, setTarget] = useState(null);

  const handleChange = (e) => {
    setTarget(e.target.value);
  };

  const handleClick = (e) => {
    props.searchValue(target);
  };

  return (
    <Row justify="center">
      <SearchForm
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        name="formName"
      >
        <SearchBar
          autoComplete="off"
          type="text"
          name="searchTerm"
          placeholder={props.t("SearchCommicInput")}
          onChange={handleChange}
        />
        <SearchBtn type="submit" onClick={handleClick}>
          {props.t("Search")}
        </SearchBtn>
      </SearchForm>
    </Row>
  );
};

export default withTranslation()(Search);
