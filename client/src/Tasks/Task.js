import React, { useState } from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import categories from "../categories";
import { deleteTask } from "./taskActions";

const Task = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false);

  const onToggle = (e) => setToggleEdit(!toggleEdit);

  const onDelete = (e) => props.deleteTask(props.task._id);

  const onSubmit = (e) => props.updateTask(props.task);

  return toggleEdit ? (
    <tr>
      <td>{props.task._id}</td>
      <td>
        <Input type="text" value={props.task.title} onChange={onChange} />
      </td>
      <td>
        <Input type="select" onChange={onChange}>
          <option defaultValue>{props.task.category}</option>
          {categories.map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </Input>
      </td>
      <td>
        <Input type="select" onChange={onChange}>
          <option defaultValue>{props.task.important ? "Yes" : "No"}</option>
        </Input>
      </td>
      <td>{new Date(props.task.date).toLocaleDateString()}</td>
      <td>{new Date(props.task.date).toLocaleTimeString()}</td>
      {props.isAdmin ? (
        <>
          <td>
            <Button
              outline={toggleEdit ? true : null}
              color="secondary"
              size="sm"
              onClick={onToggle}
            >
              {toggleEdit ? "Done" : "Edit"}
            </Button>
          </td>
          <td>
            <Button color="danger" size="sm" onClick={onDelete}>
              &times;
            </Button>
          </td>
        </>
      ) : null}
    </tr>
  ) : (
    <tr>
      <td>{props.task._id}</td>
      <td>{props.task.title}</td>
      <td>{props.task.category}</td>
      <td>{props.task.important ? "Yes" : "No"}</td>
      <td>{new Date(props.task.date).toLocaleDateString()}</td>
      <td>{new Date(props.task.date).toLocaleTimeString()}</td>
      {props.isAdmin ? (
        <>
          <td>
            <Button
              outline={toggleEdit ? true : null}
              color="secondary"
              size="sm"
              onClick={onToggle}
            >
              {toggleEdit ? "Done" : "Edit"}
            </Button>
          </td>
          <td>
            <Button color="danger" size="sm" onClick={onDelete}>
              &times;
            </Button>
          </td>
        </>
      ) : null}
    </tr>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.user.admin,
});

const mapDispatchToProps = {
  deleteTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
