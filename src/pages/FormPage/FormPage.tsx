import React, { FormEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import css from './FormPage.module.css';
import Switch from '../../components/Switch/Switch';
import { FormCardType } from '../../Types';
import FormCard from '../../components/FormCard/FormCard';

const FormPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState<FormCardType[]>([]);
  const name = useRef() as React.RefObject<HTMLInputElement>;
  const lastName = useRef() as React.RefObject<HTMLInputElement>;
  const date = useRef() as React.RefObject<HTMLInputElement>;
  const countries = useRef() as React.RefObject<HTMLSelectElement>;
  const img = useRef() as React.RefObject<HTMLInputElement>;
  const preview = useRef() as React.RefObject<HTMLInputElement>;
  const notify = useRef() as React.RefObject<HTMLInputElement>;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = () => {
    if (
      name.current?.value &&
      lastName.current?.value &&
      date.current?.value &&
      countries.current?.value &&
      img.current?.files
    ) {
      addCard({
        name: name.current.value,
        lastName: lastName.current.value,
        date: date.current.value,
        countries: countries.current.value,
        img: URL.createObjectURL(img.current.files[0]),
      });
    }
    name.current!.value = '';
    lastName.current!.value = '';
    date.current!.value = '';
    countries.current!.value = 'Belarus';
    img.current!.value = '';
    notify.current!.value = '';
  };
  const addCard = (newCard: FormCardType) => {
    setFormData(formData.concat(newCard));
  };

  const activeButton = () => setIsDisabled(false);
  const disabledButton = () => setIsDisabled(true);

  const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      name.current &&
      name.current.checkValidity() &&
      lastName.current &&
      lastName.current.checkValidity() &&
      date.current &&
      date.current.checkValidity() &&
      img.current &&
      img.current.checkValidity() &&
      notify.current &&
      notify.current.checkValidity()
    ) {
      activeButton();
    } else disabledButton();
  };
  return (
    <div className={css.container}>
      <form action="#" className={css.form} onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div className={css.wrapper__input}>
          <input
            type="text"
            className={css.input}
            placeholder="name"
            id="name"
            ref={name}
            required
            onChange={(e) => inputTextHandler(e)}
            minLength={2}
            maxLength={12}
            pattern="[A-Za-z]{2,12}"
            title="Use latin letters"
            data-testid="name"
          />
          <label htmlFor="name" id={css.labelName}></label>
          <input
            type="text"
            className={css.input}
            placeholder="Last name"
            id="lastName"
            ref={lastName}
            required
            onChange={(e) => inputTextHandler(e)}
            minLength={2}
            maxLength={18}
            pattern="[A-Za-z]{2,18}"
            title="Use latin letters"
            data-testid="lastName"
          />
        </div>
        <input
          type="date"
          className={css.input}
          id="date"
          ref={date}
          required
          onChange={(e) => inputTextHandler(e)}
          data-testid="date"
        />
        <select
          name="countries"
          id="selectCountries"
          className={css.select}
          ref={countries}
          data-testid="countries"
        >
          <option value="Belarus">Belarus</option>
          <option value="Ukraine">Ukraine</option>
          <option value="Poland">Poland</option>
          <option value="USA">USA</option>
          <option value="Great Britain">Great Britain</option>
        </select>
        <div className={css.wrapper__switcher}>
          <p>I want to be notified about promotions:</p>
          <Switch />
        </div>
        <div className={css.img__wrapper}>
          <label className={css.img__label}>
            <input
              type="file"
              className={css.input__img}
              name="img"
              ref={img}
              required
              onChange={(e) => inputTextHandler(e)}
            />
            <button className={css.img__btn}>Choose image</button>
            <div className={css.img__preview} id="preview" ref={preview}></div>
          </label>
        </div>
        <div className={css.wrapper}>
          <label htmlFor="checkbox">Agree to data processing:</label>
          <input
            type="checkbox"
            placeholder="Last name"
            id="checkbox"
            ref={notify}
            required
            title="Choose it"
          />
        </div>
        <input
          type="submit"
          className={css.btn__submit}
          id="btnSubmit"
          placeholder="submit"
          disabled={isDisabled}
        />
      </form>
      {formData?.length > 0 && (
        <div className={css.card__wrapper}>
          {formData.map((card, i) => (
            <div key={card.date + i} className={css.container__card}>
              {img.current?.files && <img src={card.img} alt="img" />}
              <FormCard
                name={card.name}
                lastName={card.lastName}
                countries={card.countries}
                date={card.date}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormPage;
