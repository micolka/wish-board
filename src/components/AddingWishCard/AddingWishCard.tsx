import * as React from 'react';
import {FunctionComponent} from "react";
import {HTMLAttributes} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from "@material-ui/core";
import {Add} from "@material-ui/icons";


interface AddingWishProps extends HTMLAttributes<HTMLDivElement> {
  userCollections: Array<string>;
  state: boolean;
}

const visibility:Array<string> = ['Видно всем', 'Друзьям', 'Только мне'];

const AddingWishCard : FunctionComponent<AddingWishProps> = ({ userCollections }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState('Видно всем');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  return(
    <div>
      <Add onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавляем в желания</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
          />
          <InputLabel id="label">Коллекции</InputLabel>
          <Select labelId="label" id="select" value="20">
            {userCollections.map(collection => (
            <MenuItem value="0">{collection}</MenuItem>
            ))}
          </Select>
          <FormControl component="fieldset">
            <RadioGroup
                        aria-label="visibility"
                        name="visibility"
                        value={value}
                        onChange={handleChange}>
              {visibility.map(category => (
                <FormControlLabel value={category} control={<Radio/>} label={category}/>
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
export default AddingWishCard;
