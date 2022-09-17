import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import { MaintenanceTableContainer, MaintenanceButtonAdd, ComicsCircularProgress } from "./styles";
import axios from "axios";

import react, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Maintenance = (props) => {
    console.log("Maintenance: ");
    console.log({ comic: props.comic, character: props.character });

    const user = useSelector((state) => state.user);

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

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

                console.log("Maintenance: ", data);

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
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const htmlFormNewQuestionType = `
        <div class="form-group">
            <label for="tipoPregunta">Tipo dePregunta</label>
            <select class="form-control" id="tipoPregunta">
                <option value="1">Opción Múltiple</option>
                <option value="2">Verdadero o Falso</option>
            </select>            
        </div>
    `;

    const htmlFormNumAnswers = (numAnswers) => {
        let html = ``;
        for (let i = 1; i < numAnswers; i++) {
            html += `
                <label for="respuesta${i}">Respuesta ${i}</label>
                <input type="text" class="form-control" id="respuesta${i}" placeholder="Ingrese respuesta"}>
            `;
        }
        return html;
    }

    const htmlFormPoints = `
        <div class="form-group">
            <label for="puntos">Puntos</label>
            <input type="number" class="form-control" id="puntos" placeholder="Ingrese puntos">
        </div>
    `;

    const htmlFormNewQuestion = (type, numAwsers) => {
        console.log("htmlFormNewQuestion :", type, numAwsers);
        return `
                <div class="form-group">
                        <label for="pregunta">Pregunta</label>
                        <input type="text" class="form-control" id="pregunta" placeholder="Ingrese pregunta">
                </div>            
                <div class="form-group">                    
                    ${type === 1 ? `
                        ${htmlFormNumAnswers(numAwsers)}
                    ` : `
                        <label for="respuesta1">Respuesta 1</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="respuesta1" id="respuesta1" value="1">
                            <label class="form-check-label" for="respuesta11">
                                Verdadero
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="respuesta1" id="respuesta2" value="2">
                            <label class="form-check-label" for="respuesta1">
                                Falso
                            </label>
                        </div>                            
                    `}
                </div>
                ${htmlFormPoints}
            `;
    };

    const getInfoQuestion = () => {
        MySwal.fire({
            title: <p className="titleAlert">Nueva Pregunta</p>,
            html: htmlFormNewQuestionType,
            showCancelButton: true,
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red',
            preConfirm: () => {
                console.log("preConfirm");
                const tipoPregunta = document.getElementById('tipoPregunta').value;
                console.log("tipoPregunta :", { tipoPregunta });
                if (parseInt(tipoPregunta) === 1) {
                    MySwal.fire({
                        title: <p className="titleAlert">No. de preguntas</p>,
                        html: `
                            <div class="form-group">
                                <label for="numeroPreguntas">Número de preguntas</label>
                                <input type="number" class="form-control" id="numeroPreguntas" placeholder="Ingrese número de preguntas">
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
                            if (parseInt(numeroPreguntas) > 0) {
                                MySwal.fire({
                                    title: <p className="titleAlert">Nueva Pregunta</p>,
                                    html: `
                                        ${htmlFormNewQuestion(1, numeroPreguntas)}
                                    `,
                                    showCancelButton: true,
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: 'green',
                                    cancelButtonText: 'Cancelar',
                                    cancelButtonColor: 'red',
                                    preConfirm: () => {
                                        const formPreguntas = document.getElementById('formPreguntas');
                                        console.log("formPreguntas :", formPreguntas);
                                        const preguntas = [];
                                        for (let index = 0; index < numeroPreguntas; index++) {
                                            const pregunta = formPreguntas[`pregunta${index + 1}`].value;
                                            const respuesta = formPreguntas[`respuesta${index + 1}`].value;
                                            preguntas.push({
                                                pregunta,
                                                respuesta
                                            });
                                        }
                                        console.log("preguntas :", preguntas);
                                    }
                                });
                            }
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("result :", result);
                        }
                        return result;
                    });
                }
                else if (parseInt(tipoPregunta) === 2) {
                    let html = htmlFormNewQuestion(2);
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
                            const respuesta =
                                document.getElementById('respuesta1').checked ? 1
                                    : document.getElementById('respuesta2').checked ? 2 : 0;
                            const puntos = document.getElementById('puntos').value;
                            return { pregunta, respuesta, puntos };
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("result.value :", result.value);
                            // return result.value;
                            handleNewQuestion(result.value, 2, {
                                respuestaPosible: "True|False"
                            });
                        }
                    });
                }
            }
        });
    }

    const handleNewQuestion = (value, typeQuestion, _data) => {
        console.log("handleNewQuestion");
        async function fetchData() {
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

                console.log("Maintenance: ", data.data);

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
            }
        }
        fetchData();
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
                                            <td data-th="#">
                                                {question.id}
                                            </td>
                                            <td data-th="Comic">
                                                {question.comicId}
                                            </td>
                                            <td data-th="Character">
                                                {question.characterId}
                                            </td>
                                            <td data-th="Type Question">
                                                {question?.typeQuestion === 1 ? "Multiple Choice" : "True or False"}
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
                                                {question?.awser === '1' ? 'True' : 'False'}
                                            </td>
                                            <td data-th="Points">
                                                {question.points}
                                            </td>
                                            <td data-th="Options">
                                                <span>
                                                    <SvgIcon src={"edit.svg"} alt={"edit.svg"} width={"auto"} height={"auto"} />
                                                </span>
                                                <span>
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