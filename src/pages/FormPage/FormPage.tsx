import React, { Component, FormEvent } from 'react';
import css from './FormPage.module.css';
import Input from '../../components/Input/Input';
import Switch from '../../components/Switch/Switch';
import { FormCardType, FormState } from '../../Types';
import FormCard from '../../components/FormCard/FormCard';

class FormPage extends Component<unknown, FormState> {
  name: React.RefObject<HTMLInputElement>;
  lastName: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  countries: React.RefObject<HTMLSelectElement>;
  img: React.RefObject<HTMLInputElement>;
  constructor(props: Record<string, unknown>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = React.createRef();
    this.lastName = React.createRef();
    this.date = React.createRef();
    this.countries = React.createRef();
    this.img = React.createRef();
    this.state = {
      formData: [],
    };
  }
  handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      this.name.current?.value &&
      this.lastName.current?.value &&
      this.date.current?.value &&
      this.countries.current?.value &&
      this.img.current?.files
    ) {
      this.addCard({
        name: this.name.current.value,
        lastName: this.lastName.current.value,
        date: this.date.current.value,
        countries: this.countries.current.value,
        img: URL.createObjectURL(this.img.current.files[0]),
      });
    }
    this.name.current!.value = '';
    this.lastName.current!.value = '';
    this.date.current!.value = '';
    this.countries.current!.value = 'Belarus';
    this.img.current!.value = '';
  }
  addCard = (newCard: FormCardType) => {
    this.setState({
      formData: this.state.formData.concat(newCard),
    });
  };
  render() {
    return (
      <div className={css.container}>
        <form action="" className={css.form} onSubmit={this.handleSubmit}>
          <div className={css.wrapper__input}>
            <input
              type="text"
              className={css.input}
              placeholder="name"
              id="name"
              ref={this.name}
              required
            />
            <input
              type="text"
              className={css.input}
              placeholder="Last name"
              id="lastName"
              ref={this.lastName}
              required
            />
          </div>
          <input type="date" className={css.input} id="date" ref={this.date} />
          <select name="countries" id="selectCountries" className={css.select} ref={this.countries}>
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
          <label className={css.img__label}>
            Загрузить фото:
            <input type="file" name="img" ref={this.img} />
          </label>
          <div className={css.wrapper}>
            <label htmlFor="checkbox">Agree to data processing:</label>
            <Input type="checkbox" placeholder="Last name" id="checkbox" />
          </div>
          <input type="submit" className={css.btn__submit} placeholder="submit" />
        </form>
        <div className={css.card__wrapper}>
          {this.state.formData.map((card, i) => (
            <div key={card.date + i} className={css.container__card}>
              {this.img.current?.files && <img src={card.img} alt="" />}
              <FormCard
                name={card.name}
                lastName={card.lastName}
                countries={card.countries}
                date={card.date}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FormPage;
