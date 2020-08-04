import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { showAlert } from "../../alerts/alerts";
import { closeModals } from "../../actions/ui";
import {
  startCreateEvent,
  cleanerActive,
  startUpdateEvent,
} from "../../actions/calendar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const addNow = now.clone().add(1, "hours");

export const CalendarModal = ({ initDates }) => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(addNow.toDate());
  const [isValid, setIsValid] = useState(true);

  const initState = {
    title: "",
    note: "",
    start: now.toDate(),
    end: addNow.toDate(),
  };

  const [values, handleInputChange, reset, setValues] = useForm(initState);

  const { ui, calendar } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { title, note, start, end } = values;

  const { active } = calendar;

  useEffect(() => {
    if (active) {
      setValues(active);
      setStartDate(active.start);
      setEndDate(active.end);
    } else {
      if (initDates.start) {
        setValues({
          title: "",
          note: "",
          start: initDates.start,
          end: initDates.end,
        });
        setStartDate(initDates.start);
        setEndDate(initDates.end);
      } else {
        setValues({
          title: "",
          note: "",
          start: now.toDate(),
          end: addNow.toDate(),
        });
        setStartDate(now.toDate());
        setEndDate(addNow.toDate());
      }
    }
  }, [active, setValues, initDates]);

  const closeModal = () => {
    dispatch(closeModals());
    dispatch(cleanerActive());
    reset(initState);
    setStartDate(initState.start);
    setEndDate(initState.end);
  };

  const handleStartChange = (e) => {
    setStartDate(e);
    values.start = e;
  };

  const handleEndChange = (e) => {
    setEndDate(e);
    values.end = e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      showAlert("warning", "La fecha final debe ser posterior");
    } else if (title.trim().length <= 2 || title.trim().length > 31) {
      setIsValid(false);
    } else {
      setIsValid(true);
      closeModal();
      if (active) {
        dispatch(startUpdateEvent(values));
      } else {
        dispatch(startCreateEvent(values));
      }
    }
  };

  return (
    <div className="container">
      <Modal
        isOpen={ui.modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <button type="button" onClick={closeModal} className="close">
          <span>&times;</span>
        </button>
        <form onSubmit={handleSubmit} className="container">
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={handleStartChange}
              value={startDate}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={handleEndChange}
              value={endDate}
              minDate={startDate}
              className="form-control"
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${!isValid && "is-invalid"}`}
              placeholder="Título del evento"
              name="title"
              value={title}
              onChange={handleInputChange}
              autoComplete="off"
              maxLength="31"
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="2"
              value={note}
              onChange={handleInputChange}
              name="note"
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            {calendar.active ? (
              <>
                <i className="fas fa-sync-alt"></i>
                <span> Actualizar </span>
              </>
            ) : (
              <>
                <i className="far fa-save"></i>
                <span> Guardar</span>
              </>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};
