import './App.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const [locale, setLocale] = useState('en');

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const [units, setUnits] = useState({
    inches: 0,
    pounds: 0,
    liters: 0,
  });

  const handleInputChange = (e) => {
    setUnits({ ...units, [e.target.name]: e.target.value });
  };

  // Conversion functions
  const convertInchesToCm = (inches) => (inches * 2.54).toFixed(2);
  const convertPoundsToKg = (pounds) => (pounds * 0.453592).toFixed(2);
  const convertLitersToOz = (liters) => (liters * 33.814).toFixed(2);

  const safeToLocaleDateString = (date, locale) => {
    try {
      return date.toLocaleDateString(locale);
    } catch (error) {
      console.error('Error formatting date: ', error);
      return date.toDateString(); // Default to English
    }
  };

  const safeToLocaleTimeString = (date, locale) => {
    try {
      return date.toLocaleTimeString(locale);
    } catch (error) {
      console.error('Error formatting time: ', error);
      return date.toTimeString(); // Default to English
    }
  };

  const safeToLocaleString = (value, locale, options) => {
    try {
      return value.toLocaleString(locale, options);
    } catch (error) {
      console.error('Error formatting number: ', error);
      return value.toString(); // Default to English
    }
  };

  // Date and time formatting
  const now = new Date();
  const formats = [
    now.toISOString(),
    safeToLocaleDateString(now, locale),
    safeToLocaleTimeString(now, locale),
    safeToLocaleString(now, locale),
  ];

  // Number formatting
  const number = 123456789;
  const numberFormats = [
    number.toLocaleString(locale),
    number.toLocaleString(locale, { style: 'currency', currency: 'USD' }),
    number.toLocaleString(locale, { style: 'percent' }),
    number.toLocaleString(locale, { style: 'decimal' }),
  ];

  return (
    <main className="App">
      <select value={locale} onChange={handleLocaleChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
      </select>

      <h2>{t('Welcome to React')}</h2>

      <h2>{t('Dates')}:</h2>
      {formats.map((date, i) => (
        <p key={i}>{date}</p>
      ))}

      <h2>{t('Numbers')}:</h2>
      {numberFormats.map((num, i) => (
        <p key={i}>{num}</p>
      ))}

      <h2>{t('Units')}:</h2>
      <div>
        <label>
          {t('Inches')}:&nbsp;
          <input
            type="number"
            name="inches"
            value={units.inches}
            onChange={handleInputChange}
          />
          = {convertInchesToCm(units.inches)} cm
        </label>
      </div>
      <div>
        <label>
          {t('Pounds')}:&nbsp;
          <input
            type="number"
            name="pounds"
            value={units.pounds}
            onChange={handleInputChange}
          />
          = {convertPoundsToKg(units.pounds)} kg
        </label>
      </div>
      <div>
        <label>
          {t('Liters')}:&nbsp;
          <input
            type="number"
            name="liters"
            value={units.liters}
            onChange={handleInputChange}
          />
          = {convertLitersToOz(units.liters)} oz
        </label>
      </div>
    </main>
  );
}

export default App;
