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
  TextField,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';

interface AddingWishProps extends HTMLAttributes<HTMLDivElement> {
  userCollections: Array<string>;
}

const visibility: Array<string> = ['Видно всем', 'Друзьям', 'Только мне'];

const AddingWishCard: FunctionComponent<AddingWishProps> = ({ userCollections }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Видно всем');
  const [state, setState] = React.useState('Разное');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setValue(event.target.value);
  };

  const selectHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState(event.target.value);
  };

  return (
    <div>
      <Add onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title">Добавляем в желания</DialogTitle>
          <Close style={{ marginRight: '1em' }} onClick={handleClose} />
        </div>
        <DialogContent style={{ border: '1px solid grey', margin: '1em' }}>
          <TextField
            style={{ marginBottom: '1em' }}
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
          />
          <InputLabel id="label">Коллекции</InputLabel>
          <Select
            style={{ width: '100%' }}
            labelId="label"
            id="select"
            value={state}
            onChange={selectHandleChange}
          >
            {userCollections.map(collection => (
              <MenuItem key={collection} value={collection}>
                {collection}
              </MenuItem>
            ))}
          </Select>
          <FormControl component="fieldset">
            <RadioGroup
              style={{ flexDirection: 'row', marginTop: '1em' }}
              aria-label="visibility"
              name="visibility"
              value={value}
              onChange={handleChange}
            >
              {visibility.map(category => (
                <FormControlLabel
                  key={category}
                  value={category}
                  control={<Radio />}
                  label={category}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', marginTop: '1em' }}>
          <Button
            style={{
              boxShadow:
                '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
              borderRadius: '0',
              color: 'black',
              margin: '0 0 1em 1em',
            }}
            onClick={handleClose}
            color="primary"
          >
            Отмена
          </Button>
          <Button
            style={{
              backgroundColor: '#e74c1f',
              color: 'white',
              borderRadius: '0',
              margin: '0 1em 1em 0',
              boxShadow:
                '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
            }}
            onClick={handleClose}
            color="secondary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddingWishCard;
