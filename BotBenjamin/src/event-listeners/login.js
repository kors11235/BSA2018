import { showLoginForm, highlightLoginErrors, loginUser } from './functions/login';
import { userNickValidation, userNameValidation, validateNameAndNickname } from '../functions/validate';

const loginBtn = document.getElementById('login_btn');
// При завантаженні сторінки перевіряємо, чи є юзер в sessionStorage,
// якщо так, пропускаємо авторизацію
window.addEventListener('load', () => showLoginForm());

// Name & Nickname validation
nicknameInput.addEventListener('input', (evt) => highlightLoginErrors(evt, userNickValidation));
nameInput.addEventListener('input', (evt) => highlightLoginErrors(evt, userNameValidation));

// User login
loginBtn.addEventListener('click', () => loginUser(validateNameAndNickname));