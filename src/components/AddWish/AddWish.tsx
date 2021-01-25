import { RadioGroup, Radio, FormControlLabel, FormControl } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import React, { useState, useEffect, useContext } from 'react';
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
  const [Currency, setCurrency] = useState(addwish.rub);
  const [Collection, setCollection] = useState('');
  const [Tag, setTag] = useState('');
  const [Visibility, setVisibility] = useState('All');
  const [Url, setUrl] = useState('');
  const [FinalUrl, setFinalUrl] = useState('');
  const [ImageGradient, setImageGradient] = useState('');
  const { closeAddWishWindow } = useContext(AddWishWindowContext);

  const hiddenFileInput = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const handleClick = (): void => {
    if (hiddenFileInput) {
      hiddenFileInput.current.click();
    }
  };

  const ChangeWishName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWishName(e.currentTarget.value);
  };
  const ChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.currentTarget.value);
  };
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
  };
  const ChangeSite = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSite(e.currentTarget.value);
  };
  const ChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrency(e.currentTarget.value);
  };
  const SelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const ChangeCollection = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCollection(e.currentTarget.value);
  };
  const ChangeTag = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(e.currentTarget.value);
  };
  const ChangeVisibility = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVisibility(e.currentTarget.value);
  };
  const ChangeUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.currentTarget.value);
  };
  const resetData = (): void => {
    setWishName('');
    setDescription('');
    setSelectedFile('');
    setValue('');
    setSite('');
    setCurrency(addwish.rub);
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

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
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
  const submitUrl = (e: React.FormEvent<HTMLFormElement>): void => {
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
      <div className={styles['home-page-cover']} />
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
          <form onSubmit={submitForm}>
            <div className={styles['wish_descriptions']}>
              <div>
                <label htmlFor="descriptions">
                  {addwish.name}
                  <input
                    type="text"
                    required
                    value={WishName}
                    className={styles['wishName']}
                    onChange={ChangeWishName}
                    id="descriptions"
                  />
                </label>
              </div>
              <div className={styles['desriptionOfWish']}>
                <label htmlFor="description">
                  {addwish.description}
                  <textarea
                    name="description"
                    id="description"
                    rows={8}
                    value={Description}
                    onChange={ChangeDescription}
                  />
                </label>
              </div>
              <div className={styles['addFile']}>
                <label htmlFor="addFile">
                  {addwish.picture}
                  <br />
                  <div className={styles['addFileInformation']}>
                    <ImageSearchOutlinedIcon onClick={handleClick} className={styles['uploadImg']} />
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
                  <label htmlFor="wishCost">
                    {addwish.cost}
                    <input
                      type="text"
                      className={styles['wishPrice']}
                      onChange={ChangeValue}
                      value={Value}
                    />
                  </label>
                </div>
                <div className={styles['costCurrency']}>
                  <label htmlFor="costCurrency">
                    {addwish.currency}
                    <select value={Currency} onChange={ChangeCurrency}>
                      <option value="rub">{addwish.rub}</option>
                      <option value="euro">&euro;</option>
                      <option value="dollar">&#36;</option>
                    </select>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="site">
                  {addwish.site}
                  <input type="text" value={Site} onChange={ChangeSite} />
                </label>
              </div>
              <div>
                <label htmlFor="collection">
                  {addwish.collection}
                  <input type="text" value={Collection} onChange={ChangeCollection} />
                </label>
              </div>
              <div>
                <label htmlFor="tags">
                  {addwish.tags}
                  <input type="text" value={Tag} onChange={ChangeTag} />
                </label>
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
                  <FormControlLabel value="Friends" control={<Radio />} label={visibility.friends} />
                  <FormControlLabel value="OnlyMe" control={<Radio />} label={visibility.meOnly} />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={styles['submit_btns']}>
              <div>
                <button type="button" onClick={handleClose}>
                  {addwish.cancel.toUpperCase()}
                </button>
              </div>
              <div>
                <button type="submit">{addwish.want}</button>
              </div>
            </div>
          </form>
          <div className={styles['addImageUrlContainer']} id="urlContainer">
            <div className={styles['addImageUrl']}>
              <form onSubmit={submitUrl}>
                <div className={styles['headerUrl']}>
                  <h2>{addwish.addUrl}</h2>
                  <Close className={styles['closeUrl']} onClick={closeUrl} />
                </div>
                <label htmlFor="url">
                  <span>{addwish.url}</span>
                  <span className={styles['badUrl']} id="badUrl">
                    {addwish.badUrl}
                  </span>
                  <input
                    type="text"
                    required
                    value={Url}
                    className={styles['inputUrl']}
                    onChange={ChangeUrl}
                    id="url"
                  />
                </label>
                <div className={styles['submit_btns']}>
                  <div>
                    <button type="button" onClick={closeUrl}>
                      {addwish.cancel}
                    </button>
                  </div>
                  <div>
                    <button type="submit">{addwish.send}</button>
                  </div>
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
