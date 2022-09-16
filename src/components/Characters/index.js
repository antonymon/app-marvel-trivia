import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ScrollToTop from "../../common/ScrollToTop";

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
  CharactersGridClass,
  CharactersH1,
  CharactersCheckboxDiv,
  CharactersCheckboxInput
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
          const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/external/apiMarvel/characters/${charactersIds[i]}`;
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

  let checkedCharacters = [];

  const handleChecked = (id) => {
    if (checkedCharacters.includes(id)) {
      checkedCharacters = checkedCharacters.filter((characterId) => characterId !== id);
    } else {
      checkedCharacters.push(id);
    }
    console.log({ checkedCharacters });
  }

  const buildCard = (character) => {
    let charImgUrl = '';

    if (character.thumbnail.path && character.thumbnail.extension) {
      charImgUrl =
        character.thumbnail.path +
        '/standard_xlarge.' +
        character.thumbnail.extension;
    }

    return (
      <CharactersGrid item key={character.id}>
        <CharactersCard variant="outlined">
          <CharactersCardActionArea>
            <CharactersCheckboxDiv>
              <label>
                <CharactersCheckboxInput
                  type="checkbox"
                  onChange={() => handleChecked(character.id)}
                />
                <span class="label">XXX</span>
              </label>
            </CharactersCheckboxDiv>

            <Link to={() => { }}>
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
              </CharactersCardContent>
            </Link>
          </CharactersCardActionArea>
        </CharactersCard>
      </CharactersGrid >
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
        <CharactersH1>{props.t("CharactersResultLoading")}</CharactersH1>
      </>
    );
  }
  else {
    return (
      <div id="characters">
        <ScrollToTop component={"characters"} />
        {
          card && card.length > 0 ?
            <CharactersDiv>
              <CharactersGridClass container spacing={3}>
                {card}
              </CharactersGridClass>
            </CharactersDiv>
            : <CharactersH1>{props.t("CharactersResultNotFound")}</CharactersH1>
        }
      </div>
    );
  }
};

export default withTranslation()(Characters);
