export const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;