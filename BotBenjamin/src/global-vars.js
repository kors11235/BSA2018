export let nickname = sessionStorage.getItem('nickname') || false;
export let scroll = false; // Help-variable for scrolling messages-container down
export const socket = io.connect();