import { RadioGroup, Radio, FormControlLabel, FormControl } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import React, { useState, useEffect} from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/AddWish/AddWish.scss';

const AddWish: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [WishName, setWishName] = useState('');
  const [Description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | Blob>('');
  const [Value, setValue] = useState('');
  const [Site, setSite] = useState('');
  const [Currency, setCurrency] = useState('руб');
  const [Collection, setCollection] = useState('');
  const [Tag, setTag] = useState('');
  const [Visibility, setVisibility] = useState('All');

  const hiddenFileInput: React.MutableRefObject<null> = React.useRef(null);
  const handleClick = ():void => {
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
          img.id ='image';
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
  };

  const ChangeCollection = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCollection(e.currentTarget.value);
  };
  const ChangeTag = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(e.currentTarget.value);
  };
  const ChangeVisibility = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line no-console
    console.log(e.currentTarget.value);
    setVisibility(e.currentTarget.value);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(`WishName-${WishName}, Description-${Description}, selectedFile-${selectedFile as string},
    Value-${Value}, Currency-${Currency}, Site-${Site}, Collection-${Collection}, Tag-${Tag}, Visiblity-${Visibility}`);
  };

  const handleClose = (): void => {
    // eslint-disable-next-line no-console
    console.log('ВЫХОД');
  };

  const gradientsColor:Array<string> = ['linear-gradient(0deg, rgb(191, 90, 224) 0%, rgb(168, 17, 218) 100%) rgb(191, 90, 224)',
    'linear-gradient(0deg, rgb(230, 92, 0) 0%, rgb(249, 212, 35) 100%) rgb(230, 92, 0)', 'linear-gradient(0deg, rgb(200, 78, 137) 0%, rgb(241, 95, 121) 100%) rgb(200, 78, 137)',
    'linear-gradient(0deg, rgb(255, 224, 0) 0%, rgb(121, 159, 12) 100%) rgb(255, 224, 0)', 'linear-gradient(0deg, rgb(151, 150, 240) 0%, rgb(251, 199, 212) 100%) rgb(151, 150, 240)',
    'linear-gradient(0deg, rgb(22, 34, 42) 0%, rgb(58, 96, 115) 100%) rgb(22, 34, 42)', 'linear-gradient(0deg, rgb(236, 0, 140) 0%, rgb(252, 103, 103) 100%) rgb(236, 0, 140)',
    'linear-gradient(0deg, rgb(255, 239, 186) 0%, rgb(255, 255, 255) 100%) rgb(255, 239, 186)', 'linear-gradient(0deg, rgb(26, 41, 128) 0%, rgb(38, 208, 206) 100%) rgb(26, 41, 128)'];

  useEffect(() => {
    gradientsColor.forEach((el:string) => {
      const gradient = document.createElement('div');
      gradient.style.cssText = `width: 30px; height:30px; border-radius:100%; background:${el}; margin:5px; cursor:pointer; `;
      const elem: HTMLElement | null = document.getElementById('gradients');
      if (elem) {
        elem.style.cssText = 'display:flex';
        elem.append(gradient);
      }
      gradient.onclick = ():void => {
        const prev: HTMLElement | null = document.getElementById('preview');
        if (prev) {
          if (document.getElementById('image')) {
            setSelectedFile('');
            const image: HTMLElement | null = document.getElementById('image');
            if (image) {
              image.remove();
            }
          }
          prev.style.background = el;
        }
      };
    });
  }, []);

  return (
    <div className={styles['addWish_wrapper']}>
      <div className={styles['addWish_content']}>
        <h1>Я хочу...</h1>
        <Close className={styles['close']} onClick={handleClose} />
        <form onSubmit={submitForm}>
          <div className={styles['wish_descriptions']}>
            <div>
              <label htmlFor="descriptions">
                Название *
                <input
                  type="text"
                  required
                  className={styles['wishName']}
                  onChange={ChangeWishName}
                  id="descriptions"
                />
              </label>
            </div>
            <div className={styles['desriptionOfWish']}>
              <label htmlFor="description">
                Описание
                <textarea
                  name="description"
                  id="description"
                  rows={8}
                  onChange={ChangeDescription}
                />
              </label>
            </div>
            <div className={styles['addFile']}>
              <label htmlFor="addFile">
                Изображение или цветной фон
                <br />
                <ImageSearchOutlinedIcon onClick={handleClick} className={styles['uploadImg']} />
                <input type="file" accept="image/*" onChange={SelectFile} id="upload" className={styles['upload']} ref={hiddenFileInput} />
              </label>
              <div id="gradients" />
              <div id="preview" className={styles['filePreview']} />
            </div>
            <div className={styles['wishCost']}>
              <div className={styles['cost']}>
                <label htmlFor="wishCost">
                  Стоимость?
                  <input type="text" className={styles['wishPrice']} onChange={ChangeValue} />
                </label>
              </div>
              <div className={styles['costCurrency']}>
                <label htmlFor="costCurrency">
                  Валюта
                  <select value={Currency} onChange={ChangeCurrency}>
                    <option value="rub">руб</option>
                    <option value="euro">&euro;</option>
                    <option value="dollar">&#36;</option>
                  </select>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="site">
                Ссылка на сайт
                <input type="text" onChange={ChangeSite} />
              </label>
            </div>
            <div>
              <label htmlFor="collection">
                Добавить в колекцию
                <input type="text" onChange={ChangeCollection} />
              </label>
            </div>
            <div>
              <label htmlFor="tags">
                Теги
                <input type="text" onChange={ChangeTag} />
              </label>
            </div>
            {/* <div className={styles['visibleProperties']}>
              <div>
                <input type="radio" value="All" name="visibleWish" onChange={ChangeVisibility} checked={Visibility === 'All'} />
                {' '}
                Видно всем
              </div>
              <div>
                <input type="radio" value="Friends" name="visibleWish" onChange={ChangeVisibility} />
                {' '}
                Друзьям
              </div>
              <div>
                <input type="radio" value="OnlyMe" name="visibleWish" onChange={ChangeVisibility} />
                {' '}
                Только мне
              </div>
            </div> */}
            <FormControl component="fieldset">
              <RadioGroup style={{flexDirection: 'row', marginBottom: '10px'}} aria-label="gender" name="gender1" value={Visibility} onChange={ChangeVisibility}>
                <FormControlLabel value="All" control={<Radio />} label="Видно всем" />
                <FormControlLabel value="Friends" control={<Radio />} label="Друзьям" />
                <FormControlLabel value="OnlyMe" control={<Radio />} label="Только мне" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles['submit_btns']}>
            <div>
              <button type="button" onClick={handleClose}>ОТМЕНА</button>
            </div>
            <div>
              <button type="submit">ХОЧУ</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWish;
