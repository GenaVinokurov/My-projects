import React, { Component, FormEvent } from 'react';
import css from './FormPage.module.css';
import Switch from '../../components/Switch/Switch';
import { FormCardType, FormState } from '../../Types';
import FormCard from '../../components/FormCard/FormCard';

class FormPage extends Component<unknown, FormState> {
  name: React.RefObject<HTMLInputElement>;
  lastName: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  countries: React.RefObject<HTMLSelectElement>;
  img: React.RefObject<HTMLInputElement>;
  notify: React.RefObject<HTMLInputElement>;
  preview: React.RefObject<HTMLInputElement>;
  constructor(props: Record<string, unknown>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = React.createRef();
    this.lastName = React.createRef();
    this.date = React.createRef();
    this.countries = React.createRef();
    this.img = React.createRef();
    this.notify = React.createRef();
    this.preview = React.createRef();
    this.state = {
      formData: [],
      isDisabled: true,
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
    this.notify.current!.value = '';
  }
  addCard = (newCard: FormCardType) => {
    this.setState({
      formData: this.state.formData.concat(newCard),
    });
  };
  activeButton = () => this.setState({ isDisabled: false });
  disabledButton = () => this.setState({ isDisabled: true });
  inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      this.name.current &&
      this.name.current.checkValidity() &&
      this.lastName.current &&
      this.lastName.current.checkValidity() &&
      this.date.current &&
      this.date.current.checkValidity() &&
      this.img.current &&
      this.img.current.checkValidity() &&
      this.notify.current &&
      this.notify.current.checkValidity()
    ) {
      this.activeButton();
    } else this.disabledButton();
  };
  render() {
    return (
      <div className={css.container}>
        <form action="#" className={css.form} onSubmit={this.handleSubmit} data-testid="form">
          <div className={css.wrapper__input}>
            <input
              type="text"
              className={css.input}
              placeholder="name"
              id="name"
              ref={this.name}
              required
              onChange={(e) => this.inputTextHandler(e)}
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
              ref={this.lastName}
              required
              onChange={(e) => this.inputTextHandler(e)}
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
            ref={this.date}
            required
            onChange={(e) => this.inputTextHandler(e)}
            data-testid="date"
          />
          <select
            name="countries"
            id="selectCountries"
            className={css.select}
            ref={this.countries}
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
                ref={this.img}
                required
                onChange={(e) => this.inputTextHandler(e)}
              />
              <button className={css.img__btn}>Choose image</button>
              <div className={css.img__preview} id="preview" ref={this.preview}></div>
            </label>
          </div>
          <div className={css.wrapper}>
            <label htmlFor="checkbox">Agree to data processing:</label>
            <input
              type="checkbox"
              placeholder="Last name"
              id="checkbox"
              ref={this.notify}
              required
              title="Choose it"
            />
          </div>
          <input
            type="submit"
            className={css.btn__submit}
            id="btnSubmit"
            placeholder="submit"
            disabled={this.state.isDisabled}
          />
        </form>
        {this.state.formData?.length > 0 && (
          <div className={css.card__wrapper}>
            {this.state.formData.map((card, i) => (
              <div key={card.date + i} className={css.container__card}>
                {this.img.current?.files && <img src={card.img} alt="img" />}
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
  }
}

export default FormPage;
