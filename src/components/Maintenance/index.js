import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import { MaintenanceTableContainer, MaintenanceButtonAdd, ComicsCircularProgress } from "./styles";
import axios from "axios";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../redux/userSlice";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Maintenance = (props) => {
    console.log("Maintenance: ");
    console.log({ comic: props.comic, character: props.character });

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isRefreshView, setIsRefreshView] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const { id: comicId } = props.comic;
                const { id: characterId } = props.character;
                const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/maintenance/questions/${comicId}/${characterId}`;

                const configAxios = {
                    headers: {
                        'x-access-token': user?.accessToken
                    }
                };

                const { data } = await axios.get(url, configAxios);

                setQuestions(data);
                setLoading(false);

            } catch (e) {
                console.log("Maintenance failed", { e });

                const { response } = e;
                const data = response.data.error ? response.data.error : response.data;

                if (response) {
                    MySwal.fire({
                        title: <p className="titleAlert">{data.description.message ?? data.description}</p>,
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
                    dispatch(Logout());
                }
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isRefreshView) {
            window.location.reload();
            setIsRefreshView(false);
        }
    }, [isRefreshView]);

    const htmlFormNewQuestionType = (type = 1) => {
        let html = `
                        <div class="form-group SelectAlert">
                            <label for="tipoPregunta">Tipo de Pregunta: </label>
                            <select class="select" id="tipoPregunta">
                                <option value="1" ${type === '1' ? 'selected' : ''}>Verdadero o Falso</option>
                                <option value="2" ${type === '2' ? 'selected' : ''}>Opción Múltiple</option>                
                            </select>            
                        </div>
                    `
        return html;
    };

    const htmlFormNumAnswers = (numAnswers) => {
        let html = "";
        for (let i = 1; i <= numAnswers; i++) {
            html += `
                <div class="question">
                    <label for="respuesta${i}">Respuesta ${i}</label>
                    <input type="text" class="form-control" id="respuesta${i}" placeholder="Ingrese respuesta"}>
                </div>
            `;
        }
        html += `
            <div class="question">
                    <label for="respuesta">Respuesta Correcta: </label>
                    <input type="text" class="form-control" id="respuesta" placeholder="Ingrese respuesta correcta"}>
                </div>
        `;
        return html;
    }

    const htmlFormPoints = `
        <div class="question">
            <label for="puntos">Puntos: </label>
            <input type="number" class="form-control" id="puntos" placeholder="Ingrese puntos">
        </div>
    `;

    const htmlFormNewQuestion = (type, numAwsers) => {
        console.log("htmlFormNewQuestion :", type, numAwsers);
        return `
                <div class="form-group conteinerQuestionsAlert">
                    <div class="question">
                        <label for="pregunta">Pregunta: </label>
                        <input type="text" class="" id="pregunta" placeholder="Ingrese pregunta">
                    </div>
                    ${type === 2 ? `
                        ${htmlFormNumAnswers(numAwsers)}
                    ` : `
                    <div class="answer">
                        <label for="respuesta1">Respuesta: </label>
                        <div class="form-check">
                            <div>  
                                <label for="respuesta1">Verdadero</label>
                                <input type="radio" class="" id="respuesta1" name="respuesta" value="true"> 
                            </div>
                            <div>  
                                <label for="respuesta2">Falso</label>                          
                                <input type="radio" class="" id="respuesta2" name="respuesta" value="false">                            
                            </div>
                        </div>
                    </div>                       
                    `}
                    ${htmlFormPoints}
                </div>
            `;
    };

    const getInfoQuestion = async (question = null) => {
        MySwal.fire({
            title: <p className="titleAlert">Nueva Pregunta</p>,
            html: htmlFormNewQuestionType(question?.typeQuestion),
            showCancelButton: true,
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red',
            preConfirm: () => {
                console.log("preConfirm");
                const tipoPregunta = document.getElementById('tipoPregunta').value;
                console.log("tipoPregunta :", { tipoPregunta });
                return tipoPregunta;
            }
        }).then((result) => {
            if (parseInt(result.value.tipoPregunta) === 2) {
                MySwal.fire({
                    title: <p className="titleAlert">No. de preguntas</p>,
                    html: `
                            <div class="conteinerQuestionsAlert">
                                <div class="question">
                                    <label for="numeroPreguntas">Número de preguntas</label>
                                    <input type="number" class="form-control" id="numeroPreguntas" placeholder="Ingrese número de preguntas">
                                </div>
                            </div>
                        `,
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: 'red',
                    preConfirm: () => {
                        const numeroPreguntas = parseInt(document.getElementById('numeroPreguntas').value);
                        console.log("numeroPreguntas :", { numeroPreguntas });
                        return { numeroPreguntas, tipoPregunta: parseInt(result.value.tipoPregunta) };
                    }
                }).then(({ value }) => {
                    MySwal.fire({
                        title: <p className="titleAlert">Nueva Pregunta</p>,
                        html: `${htmlFormNewQuestion(2, value.numeroPreguntas)}`,
                        showCancelButton: true,
                        confirmButtonText: 'Ok',
                        confirmButtonColor: 'green',
                        cancelButtonText: 'Cancelar',
                        cancelButtonColor: 'red',
                        preConfirm: () => {
                            const pregunta = document.getElementById('pregunta').value;
                            let respuestas = [];
                            for (let i = 1; i <= value.numeroPreguntas; i++) {
                                respuestas.push(document.getElementById(`respuesta${i}`).value);
                            }

                            const respuestaCorrecta = document.getElementById('respuesta').value;
                            const puntos = document.getElementById('puntos').value;

                            console.log("preguntas :", pregunta, respuestas, respuestaCorrecta, puntos);
                            return {
                                pregunta,
                                respuestas,
                                respuestaCorrecta,
                                puntos,
                                tipoPregunta: value.tipoPregunta
                            }
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("result :", result);
                            if (!question) {
                                console.log("getInfoQuestion create: ", result.value, question);
                                handleNewQuestion(
                                    {
                                        pregunta: result.value.pregunta,
                                        respuesta: result.value.respuestaCorrecta,
                                        puntos: result.value.puntos
                                    },
                                    parseInt(result.value.tipoPregunta),
                                    {
                                        respuestaPosible: result.value?.respuestas?.join("|")
                                    }
                                );
                            } else {
                                console.log("getInfoQuestion edit: ", result.value, question);
                                handleEditQuestion(
                                    {
                                        pregunta: result.value.pregunta,
                                        respuesta: result.value.respuestaCorrecta,
                                        puntos: result.value.puntos
                                    },
                                    parseInt(result.value.tipoPregunta),
                                    {
                                        respuestaPosible: result.value?.respuestas?.join("|")
                                    },
                                    question.id
                                );
                            }
                        }
                    });
                });
            }
            else if (parseInt(result.value.tipoPregunta) === 1) {
                let html = htmlFormNewQuestion(1);
                MySwal.fire({
                    title: <p className="titleAlert">Nueva Pregunta</p>,
                    html: html,
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: 'red',
                    preConfirm: () => {
                        const pregunta = document.getElementById('pregunta').value;
                        const respuesta = document.getElementById('respuesta1').checked ? "Verdadero" : "Falso";
                        const puntos = document.getElementById('puntos').value;
                        return { pregunta, respuesta, puntos };
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log("result.value :", result.value);
                        // return result.value;
                        if (!question) {
                            console.log("getInfoQuestion create: ", result.value);
                            handleNewQuestion(result.value, parseInt(result.value.tipoPregunta), {
                                respuestaPosible: "True|False"
                            });
                        } else {
                            console.log("getInfoQuestion edit: ", result.value);
                            handleEditQuestion(result.value, parseInt(result.value.tipoPregunta), {
                                respuestaPosible: "True|False"
                            }, question.id);
                        }
                    }
                });
            }
        });
    }

    const handleNewQuestion = async (value, typeQuestion, _data) => {
        console.log("handleNewQuestion", value, typeQuestion, _data);
        async function fetchDataNewQuestion() {
            try {
                setLoading(true);
                const { id: comicId } = props.comic;
                const { id: characterId } = props.character;

                let newQuestion = {
                    comicId: comicId,
                    characterId: characterId,
                    typeQuestion: typeQuestion,
                    question: value.pregunta,
                    awserPosibility: _data.respuestaPosible,
                    awser: value.respuesta,
                    points: value.puntos,
                };

                console.log("newQuestion :", newQuestion);

                const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/maintenance/questions`;

                const configAxios = {
                    headers: {
                        'x-access-token': user?.accessToken
                    }
                };

                const { data } = await axios.post(url, newQuestion, configAxios);

                setQuestions(data.data);
                setLoading(false);

            } catch (e) {
                console.log("Maintenance failed", { e });

                const { response } = e;
                const data = response.data.error ? response.data.error : response.data;

                if (response) {
                    MySwal.fire({
                        title: <p className="titleAlert">{data.description.message ?? data.description}</p>,
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
                    dispatch(Logout());
                }
            }
        }
        await fetchDataNewQuestion();
    }

    const handleDeleteQuestion = async (id) => {
        console.log("handleDeleteQuestion :", id);
        async function fetchDataDeleteQuestion() {
            try {
                setLoading(true);

                const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/maintenance/questions/${id}`;

                const configAxios = {
                    headers: {
                        'x-access-token': user?.accessToken
                    }
                };

                const { data } = await axios.delete(url, configAxios);
                setLoading(false);
                console.log("handleDeleteQuestion :", data);

            } catch (e) {
                console.log("handleDeleteQuestion failed", { e });

                const { response } = e;
                const data = response.data.error ? response.data.error : response.data;

                if (response) {
                    MySwal.fire({
                        title: <p className="titleAlert">{data.description.message ?? data.description}</p>,
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
                    console.log("handleDeleteQuestion: ", response.status + "dispatch Logout() ");
                    dispatch(Logout());
                }
            }
        }
        await fetchDataDeleteQuestion();
    }

    const handleEditQuestion = async (value, typeQuestion, _data, id) => {
        console.log("handleEditQuestion", value, typeQuestion, _data);
        async function fetchDataEditQuestion() {
            try {
                setLoading(true);

                let editQuestion = {
                    typeQuestion: typeQuestion,
                    question: value.pregunta,
                    awserPosibility: _data.respuestaPosible,
                    awser: value.respuesta,
                    points: value.puntos,
                };

                console.log("editQuestion :", editQuestion);

                const url = `${process.env.REACT_APP_MARVEL_TRIVIAL_API}/maintenance/questions/${id}`;

                const configAxios = {
                    headers: {
                        'x-access-token': user?.accessToken
                    }
                };

                const { data } = await axios.put(url, editQuestion, configAxios);
                console.log("handleEditQuestion :", data);
                setLoading(false);

            } catch (e) {
                console.log("handleEditQuestion failed", { e });

                const { response } = e;
                const data = response.data.error ? response.data.error : response.data;

                if (response) {
                    MySwal.fire({
                        title: <p className="titleAlert">{data.description.message ?? data.description}</p>,
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
                    dispatch(Logout());
                }
            }
        }
        await fetchDataEditQuestion();
    }


    if (loading) {
        return (
            <div>
                <ComicsCircularProgress />
            </div>
        );
    } else {
        return (
            <MaintenanceTableContainer>
                <div>
                    <h6>{props.t("MaintenanceTitleQuestion")}</h6>
                </div>
                <div>
                    <MaintenanceButtonAdd onClick={() => {
                        getInfoQuestion();
                        setIsRefreshView(true);
                    }}>
                        {props.t("MaintenanceTitleButtonAdd")}
                    </MaintenanceButtonAdd>
                </div>
                <div>

                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>{props.t("MaintenanceTitleComic")}</th>
                                <th>{props.t("MaintenanceTitleCharacter")}</th>
                                <th>{props.t("MaintenanceTitleTypeQuestion")}</th>
                                <th>{props.t("MaintenanceTitleQuestion")}</th>
                                <th>{props.t("MaintenanceTitleAnswerPosibility")}</th>
                                <th>{props.t("MaintenanceTitleAnswer")}</th>
                                <th>{props.t("MaintenanceTitlePoints")}</th>
                                <th>{props.t("MaintenanceTitleOption")}</th>
                            </tr>
                            {
                                questions?.map((question, index) => {
                                    return (
                                        <tr>
                                            <td data-th="#" key={question.id}>
                                                {question.id}
                                            </td>
                                            <td data-th="Comic">
                                                {question.comicId}
                                            </td>
                                            <td data-th="Character">
                                                {question.characterId}
                                            </td>
                                            <td data-th="Type Question">
                                                {
                                                    question?.typeQuestion === '1' ? "Verdadero o Falso" : "Opción Múltiple"
                                                }
                                            </td>
                                            <td data-th="Question">
                                                {question.question}
                                            </td>
                                            <td data-th="AnswerPosibility">
                                                <ul>
                                                    {
                                                        question?.awserPosibility?.split('|')?.map((answer, index) => {
                                                            return (
                                                                <li>
                                                                    <span>{answer}</span>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </td>
                                            <td data-th="Answer">
                                                {
                                                    question?.awser
                                                }
                                            </td>
                                            <td data-th="Points">
                                                {question.points}
                                            </td>
                                            <td data-th="Options">
                                                <span onClick={
                                                    () => {
                                                        getInfoQuestion(question);
                                                        setIsRefreshView(true);
                                                    }
                                                }>
                                                    <SvgIcon src={"edit.svg"} alt={"edit.svg"} width={"auto"} height={"auto"} />
                                                </span>
                                                <span onClick={
                                                    () => {
                                                        handleDeleteQuestion(question.id);
                                                        setIsRefreshView(true);
                                                    }
                                                }>
                                                    <SvgIcon src={"delete.svg"} alt={"delete.svg"} width={"auto"} height={"auto"} />
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </MaintenanceTableContainer>
        )
    }

};


export default withTranslation()(Maintenance);