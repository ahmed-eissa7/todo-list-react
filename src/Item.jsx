import { useState, useContext } from 'react';
import { TodoContext } from "./Context/TodoContext";

// icons 
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';

//  Modal
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


// Component
export default function Item( { task } ) {
  // Context
  const {handelDelete, toggleComplete, tasks, setTasks} = useContext(TodoContext);
  // Show_Delete
  const [showDelete, setShowDelete] = useState(false);
  // Show_Uppdate
  const [showUppdate, setShowUppdate] = useState(false);
  // Uppdate_Input_Task
  const [modalValue, setModalValue] = useState(task.title);


  // uppdate task
  function handelUppdate(idUpd) {
    const uppdateTask = tasks.map( t => {
      if ( t.id === idUpd) {
        return { ...t, title: modalValue }
      }
      return t
    })

    setTasks(uppdateTask);
    setShowUppdate(false);
  }


  return (
    <>
      {/* delete */}
      <Dialog 
        open={showDelete} 
        onClose={() => setShowDelete(false)}
        TransitionProps={{ timeout: 200 }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you Sure to Delete?
          </DialogContentText>
        </DialogContent>
        
        <DialogActions >
          <Button 
            onClick={()=> setShowDelete(false)}
           style={{color: "#000"}}
          >
            close </Button>
          <Button
           autoFocus
           onClick={() => handelDelete(task.id)}
            style={{color: "rgba(255, 0, 0, 0.815)"}}
            >
             yes, delete </Button>
        </DialogActions>
      </Dialog>
      {/* ===delete=== */}

      {/* uppdate */}
        <Dialog 
          open={showUppdate} 
          onClose={()=> setShowUppdate(false)}
          TransitionProps={{ timeout: 200 }}
        >
          {/* <DialogTitle>Uppdate Your Task</DialogTitle> */}
          <DialogContent>
            <DialogContentText> Uppdate Your Task ! </DialogContentText>
            <form onSubmit={(e)=> e.preventDefault()} id="subscription-form">
              <TextField 
                autoFocus margin="dense" id="name" name="text" type="text" fullWidth variant="standard"
                value={modalValue}
                onChange={(e)=> setModalValue(e.target.value)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowUppdate(false) } style={{color:"#000"}} >Cancel</Button>
            <Button
             type="submit" 
             form="subscription-form" 
             onClick={() => handelUppdate(task.id)}
             style={{ color: "green"}}
             >
              uppdate 
            </Button>
          </DialogActions>
        </Dialog>
      {/* ===uppdate=== */}


      <li key={task.id} className="listItem">
        <div style={{display:"flex", alignItems: "center" }}>
          <DoneIcon className={`check ${task.completed ? "active" : ""}`} onClick={() => toggleComplete(task.id)} />
            
          <span style={{ textDecoration: task.completed ? "line-through" : "none" , color: task.completed ? "gray" : "black" , fontWeight:"500", marginLeft:"20px" }}> 
            {task.title} 
          </span>        
        </div>
        
        <div style={{display: "flex" , alignItems: "center"}}>
          <EditIcon className="upd" onClick={() => setShowUppdate(true) } />
          <DeleteIcon className="del" onClick={() => setShowDelete(true)} />
        </div>
      </li>
    </>
  )
}
