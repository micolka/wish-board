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
  useEffect,
  useContext,
  useRef,
  FormEvent,
  ChangeEvent,
  MutableRefObject,
} from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/AddWish/AddWish.scss';
import { visibility, addwish, gradientsColor } from '@/constants';
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
  const [Url, setUrl] = useState('');
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
  const ChangeUrl = (e: { currentTarget: { value: string } }): void => {
    setUrl(e.currentTarget.value);
  };
  const resetData = (): void => {
    setWishName('');
    setDescription('');
    setSelectedFile('');
    setValue('');
    setSite('');
    setCurrency('rub');
    setCollection('');
    setTag('');
    setVisibility('All');
    setFinalUrl('');
    setImageGradient('');
    const image: HTMLElement | null = document.getElementById('image');
    if (image) {
      image.remove();
    }
    const divElem: HTMLElement | null = document.getElementById('preview');
    if (divElem) {
      divElem.style.background = 'none';
    }
  };

  const submitForm = (e: FormEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(`WishName-${WishName}, Description-${Description}, selectedFile-${
      selectedFile as string
    },
    Value-${Value}, Currency-${Currency}, Site-${Site}, Collection-${Collection}, Tag-${Tag},
    Visiblity-${Visibility}, url-${FinalUrl}, ImageGradient-${ImageGradient}`);
    resetData();
  };

  const handleClose = (): void => {
    resetData();
    closeAddWishWindow();
  };

  useEffect(() => {
    gradientsColor.forEach((el: string) => {
      const gradient = document.createElement('div');
      gradient.style.cssText = `width: 30px; height:30px; border-radius:100%; background:${el}; margin:5px; cursor:pointer; `;
      const elem: HTMLElement | null = document.getElementById('gradients');
      if (elem) {
        elem.style.cssText = 'display:flex';
        elem.append(gradient);
      }
      gradient.onclick = (): void => {
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openUrl = (): void => {
    const container: HTMLElement | null = document.getElementById('urlContainer');
    if (container) {
      container.style.display = 'block';
    }
    const check: HTMLElement | null = document.getElementById('badUrl');
    if (check) {
      check.style.display = 'none';
    }
  };
  const closeUrl = (): void => {
    const container: HTMLElement | null = document.getElementById('urlContainer');
    if (container) {
      container.style.display = 'none';
    }
    setUrl('');
  };
  const submitUrl = (e: FormEvent): void => {
    e.preventDefault();
    const checkImg = new Image();
    checkImg.src = Url;
    checkImg.onerror = (): void => {
      const check: HTMLElement | null = document.getElementById('badUrl');
      if (check) {
        check.style.display = 'inline';
      }
    };
    checkImg.onload = (): void => {
      setFinalUrl(Url);
      const image: HTMLElement | null = document.getElementById('image');
      if (image) {
        image.remove();
      }
      const divElem: HTMLElement | null = document.getElementById('preview');
      const img: HTMLImageElement = document.createElement('img');
      img.id = 'image';
      img.style.cssText = 'position:absolute; max-width:100%; max-height:100%';
      img.src = Url;
      if (divElem) {
        divElem.appendChild(img);
        divElem.style.background = 'none';
      }
      setUrl('');
      const container: HTMLElement | null = document.getElementById('urlContainer');
      if (container) {
        container.style.display = 'none';
      }
      setImageGradient('');
      setSelectedFile('');
    };
  };

  return (
    <React.Fragment>
      <div className={styles['wish-window-cover']} />
      <div className={styles['addWish_wrapper']}>
        <div className={styles['addWish_content']}>
          <div className={styles['addWish_content_header']}>
            <h1>{addwish.IWant}</h1>
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
                  label={addwish.name}
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
                  label={addwish.description}
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className={styles['addFile']}>
                <label htmlFor="addFile">
                  {addwish.picture}
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
                    label={addwish.cost}
                    type="text"
                    fullWidth
                  />
                </div>
                <div className={styles['costCurrency']}>
                  <FormControl>
                    <InputLabel id="currencyLabel">{addwish.currency}</InputLabel>
                    <Select labelId="currencyLabel" value={Currency} onChange={ChangeCurrency}>
                      <MenuItem value="rub">{addwish.rub}</MenuItem>
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
                  label={addwish.site}
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
                  label={addwish.collection}
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
                  label={addwish.tags}
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
                {addwish.cancel.toUpperCase()}
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
                {addwish.want}
              </Button>
            </div>
          </form>
          <div className={styles['addImageUrlContainer']} id="urlContainer">
            <div className={styles['addImageUrl']}>
              <form onSubmit={submitUrl} className={styles['form']}>
                <div className={styles['headerUrl']}>
                  <h2>{addwish.addUrl}</h2>
                  <Close className={styles['closeUrl']} onClick={closeUrl} />
                </div>
                <span className={styles['badUrl']} id="badUrl">
                  {addwish.badUrl}
                </span>
                <TextField
                  onChange={ChangeUrl}
                  style={{ marginBottom: '1em' }}
                  value={Url}
                  margin="dense"
                  id="url"
                  required
                  label={addwish.url}
                  type="text"
                  fullWidth
                />
                <div className={styles['submit_btns']}>
                  <Button
                    onClick={closeUrl}
                    variant="outlined"
                    color="primary"
                    style={{
                      boxShadow:
                        '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
                      color: 'black',
                      margin: '0 0 1em 1em',
                    }}
                  >
                    {addwish.cancel}
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
                    {addwish.send}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddWish;
