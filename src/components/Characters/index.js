import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { withTranslation } from "react-i18next";


import {
  CharactersCard,
  CharactersCardActionArea,
  CharactersCardContent,
  CharactersCardMedia,
  CharactersGrid,
  CharactersTypography,
  CharactersCircularProgress,
  CharactersDiv,
  CharacterCheckbox
} from "./styles";

const Characters = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  let card = null;

  useEffect(() => {

    async function fetchData() {
      try {
        setLoading(true);

        const charactersIds = props.characters.map((character) => character.resourceURI.split('/').pop());

        let fetchData = [];

        for (let i = 0; i < charactersIds.length; i++) {
          const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/characters/${charactersIds[i]}`;
          const { data } = await axios.get(url);
          fetchData.push(data.data.results[0]);
        }

        setLoading(false);
        setCharacters(fetchData);
      }
      catch (e) {
        console.log(e);
      }
    }
    fetchData();
    return () => {
      return null;
    };
  }, [props.characters]);

  const buildCard = (character) => {
    let charImgUrl = '';

    if (character.thumbnail.path && character.thumbnail.extension) {
      charImgUrl =
        character.thumbnail.path +
        '/standard_xlarge.' +
        character.thumbnail.extension;
    }

    return (
      <CharactersGrid item xs={12} sm={10} md={4} lg={3} xl={2} key={character.id}>
        <CharactersCard variant="outlined">
          <CharactersCardActionArea>
            <Link to={() => console.log("Link:" + character.id)}>
              <CharactersCardMedia
                component="img"
                image={charImgUrl ? charImgUrl : "/img/no-img.jpeg"}
                title={character.name + ' image'}
              />

              <CharactersCardContent>
                <CharactersTypography
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  {character.name}
                </CharactersTypography>
                <CharacterCheckbox />
              </CharactersCardContent>
            </Link>
          </CharactersCardActionArea>
        </CharactersCard>
      </CharactersGrid>
    );
  };

  if (characters) {
    card =
      characters &&
      characters.map((character) => {
        return buildCard(character);
      });
  }

  if (loading) {
    return (
      <>
        <CharactersCircularProgress />
        <h1>{props.t("CharactersResultLoading")}</h1>
      </>
    );
  }
  else {
    return (
      <>
        {
          card && card.length > 0 ?
            <CharactersDiv>
              <CharactersGrid container spacing={3}>
                {card}
              </CharactersGrid>
            </CharactersDiv>
            : <h1>{props.t("CharactersResultNotFound")}</h1>
        }
      </>
    );
  }
};

export default withTranslation()(Characters);
