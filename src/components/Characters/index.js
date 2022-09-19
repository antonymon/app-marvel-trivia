import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  CharactersCheckboxInput,
  CharacterDivMessage
} from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { SingIn } from "../../redux/userSlice";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Characters = (props) => {
  const user = useSelector((state) => state.user);
  console.log("MiddleBlock: ", user);

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  let card = null;

  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchData() {
      try {
        setLoading(true);

        const charactersIds = props.characters.map((character) => character.resourceURI.split('/').pop());

        //get comic
        const idComic = props.comic.id ? props.comic.id : props.match.params.id;

        let fetchData = [];

        const configAxios = {
          headers: {
            'x-access-token': user?.accessToken
          }
        };

        for (let i = 0; i < charactersIds.length; i++) {
          const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/external/apiMarvel/characters/${charactersIds[i]}?idComic=${idComic}`;
          const { data } = await axios.get(url, configAxios);
          fetchData.push(data.data.results[0]);
        }

        setLoading(false);
        setCharacters(fetchData);
      }
      catch (e) {
        console.log("Characters failed", { e });

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

        if (response.status === 401) {
          console.log("characters: ", response.status + "dispatch Logout() ");
          dispatch(SingIn(null));
        }
      }
    }

    fetchData();


    return () => {
      return null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.characters, user, dispatch]);

  let checkedCharacters = [];

  const handleChecked = (id) => {
    if (checkedCharacters.includes(id)) {
      checkedCharacters = checkedCharacters.filter((characterId) => characterId !== id);
    } else {
      checkedCharacters.push(id);
    }
    console.log({ checkedCharacters });
  }


  const [existQuestions, setExistQuestions] = useState(false);

  useEffect(() => {
    if (existQuestions) {
      setExistQuestions(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existQuestions]);

  const buildCard = (character) => {
    let charImgUrl = '';

    if (character.thumbnail.path && character.thumbnail.extension) {
      charImgUrl =
        character.thumbnail.path +
        '/standard_xlarge.' +
        character.thumbnail.extension;
    }

    if (!existQuestions && character.questions) setExistQuestions(character.questions);

    return (
      <CharactersGrid item key={character.id}>
        <CharactersCard variant="outlined">
          <CharactersCardActionArea>
            {
              user?.roles?.includes('ROLE_ADMIN')
                ? null
                : character.questions
                  ?
                  (
                    <CharactersCheckboxDiv>
                      <label>
                        <CharactersCheckboxInput
                          type="checkbox"
                          onChange={() => handleChecked(character.id)}
                        />
                        <span className="label">XXX</span>
                      </label>
                    </CharactersCheckboxDiv>
                  )
                  : null
            }

            {/* <Link to={() => { }}> */}
            <CharactersCardMedia
              component="img"
              image={charImgUrl ? charImgUrl : "/img/no-img.jpeg"}
              title={character.name + ' image'}
              onClick={() => {
                if (user?.roles?.includes('ROLE_ADMIN')) {
                  console.log({
                    isMaintenance: true,
                    data: character
                  });
                  props.handler({
                    isMaintenance: true,
                    data: character
                  });
                }
              }}
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
            {/* </Link> */}
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
              {
                user?.roles?.includes('ROLE_ADMIN')
                  ? null
                  : !existQuestions
                    ? (
                      <CharacterDivMessage>
                        <h1>No existe ninguna pregunta configurada 😭💔</h1>
                        <p>Si quieres jugar, debes solicitar al administrador que configure las preguntas.</p>
                      </CharacterDivMessage>
                    )
                    : (
                      <CharacterDivMessage>
                        <h1>Solo puedes elegir los personajes disponibles 😀</h1>
                        <p>Estos los puedes identificar con el check ✅.</p>
                      </CharacterDivMessage>
                    )
              }

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
