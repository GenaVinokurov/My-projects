import './global.scss';
import Start from './pages/start/start';
import RenderCards from './components/render-cards/render-cards';


new Start();

const a = new RenderCards();
a.render();
console.log(` 
1. Страница с игрушками содержит карточки всех игрушек а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10;
2. Карточка игрушки содержит её изображение, название, текстом или условным значком обозначено количество экземпляров, год покупки, форма, цвет, размер, является ли игрушка любимой +10
3. Добавление игрушек в избранное +20
кликая по карточке с игрушкой или по кнопке на ней игрушку можно добавлять в избранное или удалять из избранного. Карточки добавленных в избранное игрушек внешне отличаются от остальных +10
на странице отображается количество добавленных в избранное игрушек. При попытке добавить в избранное больше 20 игрушек, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" +10
4. Добавление игрушек в избранное +20
  кликая по карточке с игрушкой или по кнопке на ней игрушку можно добавлять в избранное или удалять из избранного. Карточки добавленных в избранное игрушек внешне отличаются от остальных +10
5.Фильтры в указанном диапазоне от и до +30
  фильтры по количеству экземпляров +10
  фильтры по году покупки +10
  для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка +10
6.Фильтры по значению +30
  Выбранные фильтры выделяются стилем.
  фильтры по форме +5
  фильтры по цвету +5
  фильтры по размеру +5
  можно отобразить только любимые игрушки +5
  можно отфильтровать игрушки по нескольким фильтрам одного типа +10
7.Можно отфильтровать игрушки по нескольким фильтрам разного типа +15 (нет уведомления)
  Для нескольких фильтров разного типа отображаются только те игрушки, которые соответствуют всем выбранным фильтрам.
  Например, можно отобразить только синие шары. Или любимые белые и красные игрушки купленные в 1940-1960 годах.

8.Сброс фильтров +15
  есть кнопка reset для сброса фильтров +10
  Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или игрушки, добавленные в избранное.
  После использования кнопки reset фильтры остаются работоспособными
9.Сохранение настроек в local storage +10
выбранные пользователем фильтры, порядок сортировки, добавленные в избранное игрушки сохраняются при перезагрузке страницы. Есть кнопка сброса настроек, которая очищает local storage +10

Итого 160 баллов
`);