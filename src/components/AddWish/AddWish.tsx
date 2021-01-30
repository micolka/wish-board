import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import React, {
  useState,
  useContext,
  useRef,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
  Fragment,
} from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/AddWish/AddWish.scss';
import AddWishUrlContainer from '@/components/AddWishUrlContainer';
import { visibility, addWish, gradientsColor } from '@/constants';
import AddWishWindowContext from '@/context/AddWishContext';

const AddWish: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [WishName, setWishName] = useState('');
  const [Description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | Blob>('');
  const [Value, setValue] = useState('');
  const [Site, setSite] = useState('');
  const [Currency, setCurrency] = useState('rub');
  const [Collection, setCollection] = useState('');
  const [Tag, setTag] = useState('');
  const [Visibility, setVisibility] = useState('All');
  const [OpenUrl, setOpenUrl] = useState(false);
  const [FinalUrl, setFinalUrl] = useState('');
  const [ImageGradient, setImageGradient] = useState('');
  const { closeAddWishWindow } = useContext(AddWishWindowContext);

  const hiddenFileInput = useRef() as MutableRefObject<HTMLInputElement>;
  const handleClick = (): void => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const ChangeWishName = (e: { currentTarget: { value: string } }): void => {
    setWishName(e.currentTarget.value);
  };
  const ChangeDescription = (e: { currentTarget: { value: string } }): void => {
    setDescription(e.currentTarget.value);
  };
  const ChangeValue = (e: { currentTarget: { value: string } }): void => {
    setValue(e.currentTarget.value);
  };
  const ChangeSite = (e: { currentTarget: { value: string } }): void => {
    setSite(e.currentTarget.value);
  };
  const ChangeCurrency = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCurrency(e.target.value);
  };
  const SelectFile = (e: { target: { files: Blob | null | FileList } }): void => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
    if (document.getElementById('image')) {
      const image: HTMLElement | null = document.getElementById('image');
      if (image) {
        image.remove();
      }
    }
    const divElem: HTMLElement | null = document.getElementById('preview');
    function preview(file: string | Blob) {
      const reader = new FileReader();
      reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const img: HTMLImageElement = document.createElement('img');
          img.id = 'image';
          img.style.cssText = 'position:absolute; max-width:100%; max-height:100%';
          img.src = event.target.result as string;
          if (divElem) {
            divElem.appendChild(img);
            divElem.style.background = 'none';
          }
        }
      });
      reader.readAsDataURL(file as Blob);
    }
    if (e.target.files) {
      preview(e.target.files[0]);
    }
    setImageGradient('');
    setFinalUrl('');
  };
  const ChangeCollection = (e: { currentTarget: { value: string } }): void => {
    setCollection(e.currentTarget.value);
  };
  const ChangeTag = (e: { currentTarget: { value: string } }): void => {
    setTag(e.currentTarget.value);
  };
  const ChangeVisibility = (e: { currentTarget: { value: string } }): void => {
    setVisibility(e.currentTarget.value);
  };
  const submitForm = (e: FormEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(`WishName-${WishName}, Description-${Description}, selectedFile-${
      selectedFile as string
    },
    Value-${Value}, Currency-${Currency}, Site-${Site}, Collection-${Collection}, Tag-${Tag},
    Visiblity-${Visibility}, url-${FinalUrl}, ImageGradient-${ImageGradient}`);
    closeAddWishWindow();
  };
  const handleClose = (): void => {
    closeAddWishWindow();
  };
  const ChangeGradient = (e: { currentTarget: { id: string } }): void => {
    const el = e.currentTarget.id;
    const prev: HTMLElement | null = document.getElementById('preview');
    if (prev) {
      if (document.getElementById('image')) {
        const image: HTMLElement | null = document.getElementById('image');
        if (image) {
          image.remove();
        }
      }
      prev.style.background = el;
      setImageGradient(el);
      setFinalUrl('');
      setSelectedFile('');
    }
  };

  const openUrl = (): void => {
    setOpenUrl(true);
  };

  return (
    <Fragment>
      <div className={styles['wish-window-cover']} />
      <div className={styles['addWish_wrapper']}>
        <div className={styles['addWish_content']}>
          <div className={styles['addWish_content_header']}>
            <h1>{addWish.IWant}</h1>
            <Close
              className={styles['close-icon']}
              onClick={handleClose}
              style={{ fontSize: 40 }}
            />
          </div>
          <form onSubmit={submitForm} className={styles['form']}>
            <div className={styles['wish_descriptions']}>
              <div>
                <TextField
                  onChange={ChangeWishName}
                  style={{ marginBottom: '1em' }}
                  value={WishName}
                  margin="dense"
                  required
                  label={addWish.name}
                  type="text"
                  fullWidth
                />
              </div>
              <div className={styles['desriptionOfWish']}>
                <TextField
                  onChange={ChangeDescription}
                  style={{ marginBottom: '1em' }}
                  multiline
                  rows={6}
                  value={Description}
                  label={addWish.description}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className={styles['addFile']}>
                <label htmlFor="addFile">
                  {addWish.picture}
                  <br />
                  <div className={styles['addFileInformation']}>
                    <ImageSearchOutlinedIcon
                      onClick={handleClick}
                      className={styles['uploadImg']}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={SelectFile}
                      id="upload"
                      className={styles['upload']}
                      ref={hiddenFileInput}
                    />
                    <CallMadeIcon className={styles['uploadImg']} onClick={openUrl} />
                    <div id="gradients" className={styles['addFileGradients']} />
                    {gradientsColor.map((el: string) => (
                      // eslint-disable-next-line jsx-a11y/control-has-associated-label
                      <div
                        id={el}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '100%',
                          background: `${el}`,
                          margin: '5px',
                          cursor: 'pointer',
                        }}
                        key={el}
                        onClick={ChangeGradient}
                        onKeyPress={() => {}}
                        tabIndex={0}
                        role="button"
                      />
                    ))}
                  </div>
                </label>
                <div id="preview" className={styles['filePreview']} />
              </div>
              <div className={styles['wishCost']}>
                <div className={styles['cost']}>
                  <TextField
                    onChange={ChangeValue}
                    style={{ marginBottom: '1em' }}
                    value={Value}
                    margin="dense"
                    label={addWish.cost}
                    type="text"
                    fullWidth
                  />
                </div>
                <div className={styles['costCurrency']}>
                  <FormControl>
                    <InputLabel id="currencyLabel">{addWish.currency}</InputLabel>
                    <Select labelId="currencyLabel" value={Currency} onChange={ChangeCurrency}>
                      <MenuItem value="rub">{addWish.rub}</MenuItem>
                      <MenuItem value="euro">&euro;</MenuItem>
                      <MenuItem value="dollar">&#36;</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <TextField
                  onChange={ChangeSite}
                  style={{ marginBottom: '1em' }}
                  value={Site}
                  margin="dense"
                  label={addWish.site}
                  type="text"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  onChange={ChangeCollection}
                  style={{ marginBottom: '1em' }}
                  value={Collection}
                  margin="dense"
                  label={addWish.collection}
                  type="text"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  onChange={ChangeTag}
                  style={{ marginBottom: '1em' }}
                  value={Tag}
                  margin="dense"
                  label={addWish.tags}
                  type="text"
                  fullWidth
                />
              </div>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ flexDirection: 'row', marginBottom: '10px' }}
                  aria-label="gender"
                  name="gender1"
                  value={Visibility}
                  onChange={ChangeVisibility}
                >
                  <FormControlLabel value="All" control={<Radio />} label={visibility.all} />
                  <FormControlLabel
                    value="Friends"
                    control={<Radio />}
                    label={visibility.friends}
                  />
                  <FormControlLabel value="OnlyMe" control={<Radio />} label={visibility.meOnly} />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={styles['submit_btns']}>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                style={{
                  boxShadow:
                    '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
                  color: 'black',
                  margin: '0 0 1em 1em',
                }}
              >
                {addWish.cancel.toUpperCase()}
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                style={{
                  boxShadow:
                    '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
                  color: 'white',
                  margin: '0 0 1em 1em',
                }}
              >
                {addWish.want}
              </Button>
            </div>
          </form>
          {OpenUrl ? (
            <AddWishUrlContainer
              open={setOpenUrl}
              url={setFinalUrl}
              gradient={setImageGradient}
              file={setSelectedFile}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AddWish;
