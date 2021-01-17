import React, { useState } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/AddWish/AddWish.scss';

const AddWish: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [WishName, setWishName] = useState('');
  const [Description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [Value, setValue] = useState('');
  const [Site, setSite] = useState('');
  const [Currency, setCurrency] = useState('руб');
  const [Collection, setCollection] = useState('');
  const [Tag, setTag] = useState('');
  const [Visiblity, setVisiblity] = useState('');

  const ChangeWishName = (e: any): void => {
    setWishName(e.currentTarget.value);
  };
  const ChangeDescription = (e: any): void => {
    setDescription(e.currentTarget.value);
  };
  const ChangeValue = (e: any): void => {
    setValue(e.currentTarget.value);
  };
  const ChangeSite = (e: any): void => {
    setSite(e.currentTarget.value);
  };
  const ChangeCurrency = (e: any): void => {
    setCurrency(e.currentTarget.value);
  };
  const SelectFile = (e: any): void => {
    setSelectedFile(e.target.files[0]);
    const divElem: any = document.getElementById('preview');
    function preview(file: any) {
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        const img: any = document.createElement('img');
        img.style.cssText = 'position:absolute; max-width:100%; max-height:100%';
        img.src = event.target.result;
        divElem.appendChild(img);
      });
      reader.readAsDataURL(file);
    }
    preview(e.target.files[0]);

  };

  const ChangeCollection = (e: any): void => {
    setCollection(e.currentTarget.value);
  };
  const ChangeTag = (e: any): void => {
    setTag(e.currentTarget.value);
  };
  const ChangeVisiblity = (e: any): void => {
    setVisiblity(e.target.value);
  };

  const submitForm = (e: any): void => {
    e.preventDefault();
    console.log(`WishName-${WishName}, Description-${Description}, selectedFile-${selectedFile},
    Value-${Value}, Currency-${Currency}, Site-${Site}, Collection-${Collection}, Tag-${Tag}, Visiblity-${Visiblity}`);
  };

  return (
    <div className={styles['addWish_wrapper']}>
      <div className={styles['addWish_content']}>

        <h1>Я хочу...</h1>
        <form onSubmit={submitForm}>
          <div className={styles['wish_descriptions']}>
            <div>
              <label htmlFor='descriptions'>
                Название *
                <input type="text" required className={styles['wishName']} onChange={ChangeWishName} id='descriptions' />
              </label>
            </div>
            <div className={styles['desriptionOfWish']}>
              <label htmlFor='description'>
                Описание
                <textarea name="description" id="description" rows={8} onChange={ChangeDescription} />
              </label>
            </div>
            <div className={styles['addFile']}>
              <label htmlFor='addFile'>
                Изображение или цветной фон
                <input type="file" accept="image/*" onChange={SelectFile} id="upload" />
              </label>
              <div id="preview" className={styles['filePreview']} />
            </div>
            <div className={styles['wishCost']}>
              <div className={styles['cost']}>
                <label htmlFor='wishCost'>
                  Стоимость?
                  <input type="text" className={styles['wishPrice']} onChange={ChangeValue} />
                </label>
              </div>
              <div className={styles['costCurrency']}>
                <label htmlFor='costCurrency'>
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
              <label htmlFor='site'>
                Ссылка на сайт
                <input type="text" onChange={ChangeSite} />
              </label>
            </div>
            <div>
              <label htmlFor='collection'>
                Добавить в колекцию
                <input type="text" onChange={ChangeCollection} />
              </label>
            </div>
            <div>
              <label htmlFor='tags'>
                Теги
                <input type="text" onChange={ChangeTag} />
              </label>
            </div>
            <div className={styles['visibleProperties']} onChange={ChangeVisiblity}>
              <div>
                <input type="radio" value="All" name="visibleWish" />
                {' '}
                Всем видно
              </div>
              <div>
                <input type="radio" value="Friends" name="visibleWish" />
                {' '}
                Друзьям
              </div>
              <div>
                <input type="radio" value="OnlyMe" name="visibleWish" />
                {' '}
                Только мне
              </div>
            </div>
          </div>
          <div className={styles['submit_btns']}>
            <div>
              <button type="button">ОТМЕНА</button>
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
