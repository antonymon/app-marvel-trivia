import { withTranslation } from "react-i18next";
import {
    PlayConatiner,
    ComicsCircularProgress,
    PlayMain,
    PlayMainInner,
    PlayH1,
    PlayHead,
    PlayQuestion,
    PlayBtns,
    PlayGreenBtn,
    PlayRedBtn,
    PlayGeneralBtn,
    PlayPopup,
    PlayPopupInner
} from "./styles";

import { useState, useEffect } from "react";

import axios from "axios";

import { useSelector } from "react-redux";
// import { SingIn } from "../../redux/userSlice";

// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

const Play = (props) => {

    const user = useSelector((state) => state.user);

    const getQuestion = () => {
        setLoading(true);
        const comicId = props.match.params.comicId;
        const characters = props.match.params.characters;

        const configAxios = {
            headers: {
                'x-access-token': user?.accessToken
            }
        };

        const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/maintenance/questions/play/${comicId}/${characters}`;
        axios.get(url, configAxios)
            .then(response => {
                console.clear();
                console.log(response.data);
                setQuestions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        getQuestion();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleAns = (userAns) => {
        const correctAns = questions[count].correct_answer;
        if (userAns === correctAns) {
            setPoints(points + questions[count].points);
        }

        setCount(count + 1);
    }

    const handleReset = () => {
        console.log('click');

        setCount(0);
        setPoints(0);
        getQuestion();
    }

    if (loading) {
        return (
            <PlayConatiner>
                <ComicsCircularProgress />
            </PlayConatiner>
        )
    } else {

        return (
            <PlayMain data-percent={count}>
                <PlayMainInner>
                    {
                        count === questions.length && count > 0 ?
                            <Popup
                                comicId={props.match.params.comicId}
                                characters={props.match.params.characters}
                                score={points}
                                reset={handleReset}
                                scoreTotal={questions?.reduce((a, b) => a + b, 0)}
                            />
                            :
                            <>
                                <PlayH1>Marvel Trivia</PlayH1>
                                <PlayHead>
                                    <span>Pregunta: {count + 1}</span>
                                    <span>Puntos: {points}</span>
                                </PlayHead>

                                <Question {...questions[count]} sendAns={handleAns} />
                            </>
                    }
                </PlayMainInner>
            </PlayMain>
        )
    }
};

const Question = props => {
    if (props.type === '1') {
        return (
            <PlayQuestion>
                <p>{decodeURIComponent(props.question || 'Loading...')}</p>
                <PlayBtns>
                    <PlayGreenBtn onClick={() => props.sendAns('Verdadero')}>Verdadero</PlayGreenBtn>
                    <PlayRedBtn onClick={() => props.sendAns('Falso')}>Falso</PlayRedBtn>
                </PlayBtns>
            </PlayQuestion>
        )
    }
    else {
        if (props.type === '2') {
            return (
                <PlayQuestion>
                    <p>{decodeURIComponent(props.question || 'Loading...')}</p>
                    <PlayBtns>
                        {
                            props.incorrect_answers?.split('|').map((ans, index) => {
                                return <PlayGeneralBtn
                                    key={index}
                                    onClick={() => props.sendAns(ans)}
                                >{decodeURIComponent(ans)}
                                </PlayGeneralBtn>
                            })
                        }
                    </PlayBtns>
                </PlayQuestion>
            )
        }
    }


    return (
        <PlayQuestion>
            <p>{decodeURIComponent(props.question || 'Loading...')}</p>
            <PlayBtns>
                <PlayGreenBtn onClick={() => props.sendAns('True')}>True</PlayGreenBtn>
                <PlayRedBtn onClick={() => props.sendAns('False')}>False</PlayRedBtn>
            </PlayBtns>
        </PlayQuestion>
    )
}

const Popup = props => {

    const [loading, setLoading] = useState(false);
    const [createScore, setCreateScore] = useState(true);

    const user = useSelector((state) => state.user);

    const postQuestionPoints = async () => {
        setLoading(true);

        const configAxios = {
            headers: {
                'x-access-token': user?.accessToken
            }
        };

        const comicId = props.comicId;
        const characters = props.characters;

        const body = {
            email: user?.email,
            comicId: comicId,
            characters: characters,
            points: props.score
        };

        const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/maintenance/questions/play/points`;

        axios.post(url, body, configAxios)
            .then(response => {
                console.clear();
                console.log(response);
                //setCreateScore(false);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                //setCreateScore(false);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (createScore) {
            postQuestionPoints()
                .then(() => {
                    setCreateScore(false);
                })
                .catch(() => {
                    setCreateScore(false);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let url = '';

    if (props.score === props.scoreTotal) {
        url = 'https://media0.giphy.com/media/62PP2yEIAZF6g/giphy.gif?cid=ecf05e47ar8yjtn6jr3xaz5l75eru3ihs3fnc4m5ew8r0yqo&rid=giphy.gif';
    } else if (props.score === 0) {
        url = 'https://media0.giphy.com/media/62PP2yEIAZF6g/giphy.gif?cid=ecf05e47ar8yjtn6jr3xaz5l75eru3ihs3fnc4m5ew8r0yqo&rid=giphy.gif';
    } else if (props.score < (props.scoreTotal / 2)) {
        url = 'https://media0.giphy.com/media/1gqDQUaLe3mCc/giphy.gif?cid=ecf05e47f341pmrg5729x3oldfpekfomium1n2hgbf96pe2w&rid=giphy.gif';
    } else if (props.score < props.scoreTotal) {
        url = 'https://media0.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif?cid=ecf05e476hajpzr90ydffj54p5eewod1wa6shgiugt7qdzve&rid=giphy.gif';
    } else {
        url = 'https://media0.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif?cid=ecf05e476hajpzr90ydffj54p5eewod1wa6shgiugt7qdzve&rid=giphy.gif';
    }


    if (loading) {
        return (
            <PlayConatiner>
                <ComicsCircularProgress />
            </PlayConatiner>
        )
    } else {


        return (
            <PlayPopup>
                <PlayPopupInner>
                    <h4>¡Felicitaciones!</h4>
                    <span className='score'>{props.score}% Punteo</span>
                    <img src={url} alt='congrats gif' />
                    <p>¡Trivia completada!</p>
                    <PlayGreenBtn onClick={() => props.reset()}>¡Jugar de nuevo🔁!</PlayGreenBtn>
                </PlayPopupInner>
            </PlayPopup>
        )
    }
}


export default withTranslation()(Play);