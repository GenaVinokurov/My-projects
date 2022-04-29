import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import css from './FormPage.module.css';
import Switch from '../../components/Switch/Switch';
import { FormCardType } from '../../Types';
import FormCard from '../../components/FormCard/FormCard';
import { formDataContext, FormDataContextType } from '../../Context';

const FormPage: React.FC = () => {
  const { formData, setFormData } = useContext(formDataContext) as FormDataContextType;
  const img = useRef() as React.RefObject<HTMLInputElement>;
  const preview = useRef() as React.RefObject<HTMLInputElement>;
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormCardType>({
    mode: 'onBlur',
  });

  const onSubmit = (data: FormCardType) => {
    if (img.current?.files) {
      addCard({
        name: data.name,
        lastName: data.lastName,
        date: data.date,
        countries: data.countries,
        img: URL.createObjectURL(img.current.files[0]),
      });
    }
    reset();
  };
  const addCard = (newCard: FormCardType) => {
    setFormData(formData.concat(newCard));
  };

  return (
    <div className={css.container}>
      <form action="#" className={css.form} onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div className={css.wrapper__input}>
          <div className={css.container__input}>
            <input
              type="text"
              className={css.input}
              placeholder="Name"
              id="name"
              {...register('name', {
                required: 'Must be filled',
                minLength: {
                  value: 3,
                  message: 'Min length 3',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Use latin letters',
                },
              })}
              data-testid="name"
            />
            {errors?.name && <p className={css.message}>{errors?.name.message}</p>}
          </div>
          <div className={css.container__input}>
            <input
              type="text"
              className={css.input}
              placeholder="Last name"
              id="lastName"
              {...register('lastName', {
                required: 'Must be filled',
                minLength: {
                  value: 3,
                  message: 'Min length 3',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Use latin letters',
                },
              })}
              data-testid="lastName"
            />
            {errors?.lastName && <p className={css.message}>{errors?.lastName.message}</p>}
          </div>
        </div>
        <div className={css.container__input}>
          <input
            type="date"
            className={css.input}
            id="date"
            data-testid="date"
            {...register('date', {
              required: 'Must be filled',
            })}
          />
          {errors?.date && <p className={css.message}>{errors?.date.message}</p>}
        </div>
        <div className={css.container__input}>
          <select
            id="selectCountries"
            className={css.select}
            {...register('countries', {
              required: 'Must be filled',
            })}
            data-testid="countries"
          >
            <option value="Belarus">Belarus</option>
            <option value="Ukraine">Ukraine</option>
            <option value="Poland">Poland</option>
            <option value="USA">USA</option>
            <option value="Great Britain">Great Britain</option>
          </select>
          {errors?.countries && <p className={css.message}>{errors?.countries.message}</p>}
        </div>

        <div className={css.wrapper__switcher}>
          <p>I want to be notified about promotions:</p>
          <Switch />
        </div>
        <div className={css.img__wrapper}>
          <label className={css.img__label}>
            <input type="file" className={css.input__img} ref={img} required />
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
            {...register('notify', {
              required: 'Must be check',
            })}
          />
        </div>
        <input
          type="submit"
          className={css.btn__submit}
          id="btnSubmit"
          placeholder="submit"
          disabled={!isValid}
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
