import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import type { FunctionComponent, HTMLAttributes, SetStateAction, ReactNode } from 'react';

import { ACTIVE_WISH, FULFILLED_WISH } from '@/components/AddingWishCard/mutation';
import { visibility, MODAL_NAME } from '@/constants';

interface AddingWishProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  wishId: string;
  wishName: string;
  nameModal: string;
}

const AddingWishCard: FunctionComponent<AddingWishProps> = ({
  wishId,
  children,
  wishName,
  nameModal,
}) => {
  const keys = Object.keys(visibility);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(keys[0]);

  const [activeWish] = useMutation(ACTIVE_WISH, {
    variables: { wishId, visibility: value },
  });

  const [fulfilledWish] = useMutation(FULFILLED_WISH, {
    variables: { wishId, visibility: value },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (nameModal === MODAL_NAME.active) {
      return activeWish();
    }
    return fulfilledWish();
  };

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setValue(event.target.value);
  };

  return (
    <Fragment>
      <div onClick={() => setOpen(true)} onKeyPress={() => {}} tabIndex={0} role="button">
        {children}
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title">{nameModal}</DialogTitle>
          <Close style={{ marginRight: '1em' }} onClick={handleClose} />
        </div>
        <DialogContent style={{ border: '1px solid grey', margin: '1em' }}>
          <TextField
            style={{ marginBottom: '1em' }}
            value={wishName}
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <InputLabel id="label">Коллекции</InputLabel>
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
          </Select> */}
          <FormControl component="fieldset">
            <RadioGroup
              style={{ flexDirection: 'row', marginTop: '1em' }}
              aria-label="visibility"
              name="visibility"
              value={value}
              onChange={handleChange}
            >
              {keys.map(category => (
                <FormControlLabel
                  key={category}
                  value={category}
                  control={<Radio />}
                  label={visibility[category]}
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
            onClick={handleSubmit}
            color="secondary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default AddingWishCard;
