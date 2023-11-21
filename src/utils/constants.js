const PATTERN = '[^@]+@[^@]+\.[a-zA-Z]{2,6}';

const FIRST_MOVIES = {
    large: 16,
    medium: 12,
    small: 8,
    smallest: 5,
};
const NEXT_STEP = {
    large: 4,
    medium: 3,
    small: 2,
};

const CRASH_MESSAGE = 'Сервер сейчас упадёт';
const AUTHORIZED_MESSAGE = 'Авторизация прошла успешно';
const VALIDATION_ERROR_MESSAGE = 'Передан некорректный ID';
const DUPLICATE_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const USER_NOT_FOUND_ERROR_MESSAGE = 'Пользователь не найден';
const UNATHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const LOGIN_ERROR_MESSAGE = 'Неправильные почта или пароль';
const AUTHORIZATION_ERROR_MESSAGE = 'Ошибка авторизации';
const REGISTRATION_ERROR_MESSAGE = 'При регистрации пользователя произошла ошибка';
const NOT_VALID_URL_MESSAGE = '{VALUE} is not a valid URL';
const NOT_VALID_EMAIL_MESSAGE = '{VALUE} is not a valid email';
const ID_NOT_FOUND_ERROR_MESSAGE = 'Id не найден';
const PAGE_NOT_FOUND_MESSAGE = 'Страница не найдена';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  PATTERN,
  FIRST_MOVIES,
  NEXT_STEP,
  CRASH_MESSAGE,
  AUTHORIZED_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  DUPLICATE_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  UNATHORIZED_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_MESSAGE,
  REGISTRATION_ERROR_MESSAGE,
  NOT_VALID_URL_MESSAGE,
  NOT_VALID_EMAIL_MESSAGE,
  ID_NOT_FOUND_ERROR_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
