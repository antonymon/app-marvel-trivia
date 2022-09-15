import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ScrollToTop from "../../common/ScrollToTop";

import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'

import {
  CharactersCard,
  CharactersCardActionArea,
  CharactersCardContent,
  CharactersCardMedia,
  CharactersGrid,
  CharactersTypography,
  CharactersCircularProgress,
  CharactersDiv,
  CharactersSpanChecked,
  CharactersGridClass,
  CharactersH1,
  CharactersInputChecked,
  CharactersLabelChecked
} from "./styles";

const Characters = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checked, setChecked] = useState(false);

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


  const handleChecked = () => {
    setChecked(!checked);
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
            {/* <CharactersSpanChecked onClick={handleChecked} >
              {
                checked ?
                  <FontAwesomeIcon className='faCheckSquare' icon={faCheckSquare} size="lg" color="green" />
                  : <FontAwesomeIcon className='faSquare' icon={faSquare} size="lg" color="white" />
              }
            </CharactersSpanChecked> */}
            <CharactersInputChecked id={`${character.id}_checkbox`} type="checkbox" onClick={handleChecked} />
            <CharactersLabelChecked>

            </CharactersLabelChecked>
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
